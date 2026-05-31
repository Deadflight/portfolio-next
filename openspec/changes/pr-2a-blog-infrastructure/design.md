# Design: PR 2A — Blog Code Infrastructure

**Issue**: [#76](https://github.com/Deadflight/portfolio-next/issues/76) | **PR**: 2A | **Mode**: hybrid

## Architecture Overview

```
sanity.io (hosted CMS)
    │
    ├── CDN (public cached reads)
    │     └── next-sanity/client.fetch() — Server Components
    │           ├── src/app/[locale]/blog/page.tsx        (listing)
    │           └── src/app/[locale]/blog/[slug]/page.tsx  (detail)
    │
    └── Webhook (on publish/archive)
          └── POST /api/revalidate → revalidatePath('/blog')
                                   → revalidateTag('sanity')
```

- **Stale-while-revalidate**: CDN cache first, revalidate in background
- **Draft mode**: bypasses CDN via `draftMode().isEnabled` → `useCdn: false` + token

## Architecture Decisions

| Decision | Option | Tradeoff | Verdict |
|----------|--------|----------|---------|
| **Schema** | Single `post` + `locale` field vs collection per locale | One dataset, simpler queries. Risk: must always filter by locale in GROQ | ✅ Single schema with locale filter |
| **Client** | `next-sanity` `createClient` vs raw `@sanity/client` | `next-sanity` provides `defineQuery`, `stega`, and built-in Server Component support | ✅ `next-sanity` |
| **Image handling** | `@sanity/image-url` + `next/image` vs `<img>` | Must build URL builder + use Next.js `remotePatterns` for optimization | ✅ `@sanity/image-url` + `remotePatterns` in `next.config.ts` |
| **ISR default** | `revalidate: 60` vs `revalidate: 300` | 60s = faster updates post-publish, 300s = fewer CDN hits. Blog content changes rarely | ✅ `revalidate: 60` |
| **Studio location** | Embedded vs `sanity deploy` | Embedded = monolith convenience but adds deps to frontend build | ✅ Separate deploy (PR 2B or later) |
| **Webhook auth** | HMAC secret vs IP whitelist | Secret is simpler and works across hosts | ✅ `SANITY_WEBHOOK_SECRET` via `x-sanity-webhook-secret` header |

## Data Flow

```
Page Request
  │
  ├── draftMode().isEnabled?
  │     ├── YES → client = createClient({ useCdn: false, token })
  │     └── NO  → client = createClient({ useCdn: true })  // public cached
  │
  ├── client.fetch(postsByLocaleQuery, { locale })
  │     └── GROQ API → Sanity CDN → typed response
  │
  ├── listing: map posts[] → <PostCard>
  └── detail: single post → <PostBody> → @portabletext/react
                     └── custom components (headings, code, images, links)
```

## File Changes

| File | Action | Purpose |
|------|--------|---------|
| `sanity/schemas/post.ts` | Create | Post document schema (title, slug, body, locale, tags, coverImage, publishedAt) |
| `sanity/schemas/blockContent.ts` | Create | Portable Text block definition (headings, code, image, link, blockquote) |
| `sanity/lib/client.ts` | Create | `createClient` with CDN config + `defineQuery` helper |
| `sanity/lib/queries.ts` | Create | `POSTS_BY_LOCALE_QUERY` (listing) + `POST_BY_SLUG_QUERY` (detail) |
| `sanity/lib/token.ts` | Create | Export `SANITY_API_READ_TOKEN` w/ env validation |
| `sanity/sanity.config.ts` | Create | Studio config (projectId, dataset, schema) |
| `sanity/sanity.cli.ts` | Create | CLI config for `sanity deploy` |
| `src/app/[locale]/blog/page.tsx` | Create | Async Server Component — listing page with ISR |
| `src/app/[locale]/blog/[slug]/page.tsx` | Create | Async Server Component — detail with `generateStaticParams` + `generateMetadata` |
| `src/app/[locale]/blog/[slug]/not-found.tsx` | Create | Blog-specific 404 |
| `src/app/components/blog/PostCard.tsx` | Create | Card for listing (title, desc, date, tags, image) |
| `src/app/components/blog/PostBody.tsx` | Create | `@portabletext/react` with custom component map |
| `src/app/api/revalidate/route.ts` | Create | Webhook handler — secret validation + `revalidatePath` |
| `package.json` | Modify | Add `next-sanity`, `@portabletext/react`, `@sanity/image-url` |
| `next.config.ts` | Modify | Add `remotePatterns` for Sanity CDN images |
| `messages/{en,es}.json` | Modify | Add `blog.*` i18n keys |
| `src/shared/components/Navigation/Navigation.tsx` | Modify | Add blog link to nav |
| `.env.local` | Modify | Add Sanity env vars |

## Sanity Integration

### `sanity/lib/client.ts` — Config pattern

```ts
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

export function getClient() {
  const { isEnabled } = draftMode();
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2024-03-01",
    useCdn: !isEnabled,         // CDN in production, direct when drafting
    stega: { enabled: isEnabled, studioUrl: "/studio" },
    token: isEnabled ? process.env.SANITY_API_READ_TOKEN : undefined,
  });
}
```

### `sanity/lib/queries.ts` — GROQ

```groq
// POSTS_BY_LOCALE_QUERY — listing
*[_type == "post" && locale == $locale && defined(slug.current)]
  | order(publishedAt desc)
  { title, "slug": slug.current, description, publishedAt, tags, coverImage }

// POST_BY_SLUG_QUERY — detail
*[_type == "post" && slug.current == $slug && locale == $locale][0]{
  title, "slug": slug.current, description, body, publishedAt, tags, coverImage,
  "locale": locale
}
```

### `sanity/lib/token.ts`

```ts
export const token = process.env.SANITY_API_READ_TOKEN ?? "";
if (!token && process.env.NODE_ENV === "production") {
  throw new Error("SANITY_API_READ_TOKEN is required in production");
}
```

## Server Components

### Listing — `[locale]/blog/page.tsx`

```tsx
import { getClient } from "@/sanity/lib/client";
import { POSTS_BY_LOCALE_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/app/components/blog/PostCard";
import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export const revalidate = 60;

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = await getClient().fetch<Post[]>(POSTS_BY_LOCALE_QUERY, { locale });
  const t = useTranslations("blog");
  // ... render PostCard[] or empty state
}
```

### Detail — `[locale]/blog/[slug]/page.tsx`

```tsx
export async function generateStaticParams() {
  const slugs = await getClient().fetch<{ slug: string; locale: string }[]>(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, locale }`
  );
  return slugs.map(({ slug, locale }) => ({ locale, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getClient().fetch<Post>(POST_BY_SLUG_QUERY, { slug, locale });
  if (!post) return {};
  return { title: post.title, description: post.description };
}
```

## Portable Text Components (`PostBody.tsx`)

| Block/Inline | Component | Behavior |
|---|---|---|
| `heading` (`h2`-`h4`) | `HeadingRenderer` | `id` from text, anchor link on hover |
| `code` (fenced) | `CodeRenderer` | `<pre><code>` with copy button |
| `image` | `ImageRenderer` | `urlFor(image).width(800).url()` → `<Image>` with Sanity CDN |
| `link` (external) | `LinkRenderer` | `target="_blank" rel="noopener noreferrer"` |
| `blockquote` | `BlockquoteRenderer` | Styled `<blockquote>` with left border |
| `normal` (paragraph) | Default | Tailwind `text-body` typography |

## Cache Strategy

| Layer | Mechanism | Trigger |
|---|---|---|
| Default ISR | `revalidate = 60` on page export | Request-based, background revalidation |
| On-demand | `revalidatePath('/blog')` + `revalidateTag('sanity')` | Sanity webhook → `/api/revalidate` |
| Draft mode | `useCdn: false` + `token` | `draftMode().isEnabled` → bypasses CDN |

## Webhook Handler (`/api/revalidate/route.ts`)

```ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sanity-webhook-secret");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  revalidatePath("/blog", "page");
  revalidatePath("/blog/[slug]", "page");
  revalidateTag("sanity");
  return NextResponse.json({ revalidated: true });
}
```

## i18n Approach

- All GROQ queries filter by `$locale` parameter
- `locale` field in Sanity: `"en"` or `"es"` — one document per locale per article
- Nav link uses `Link` from `@/i18n/navigation` → auto-prefixes locale
- No `locale` parameter in route handlers — locale comes from `getLocale()` in Server Components

## Error Handling

| Scenario | Handling |
|---|---|
| No posts exist | Listing renders empty state: `"No articles yet"` with translated i18n key |
| Slug not found | `notFound()` → `[slug]/not-found.tsx` renders blog-specific 404 |
| Sanity API down | `ErrorBoundary` wraps blog sections (existing pattern) |
| Missing `coverImage` | Conditional render: `<Image>` only when `coverImage?.asset` exists |
| Missing `description` | Detail page: omit meta description, don't render empty `<p>` |
| Missing `tags` | Listing: omit tag pills, don't render empty container |

## Testing Strategy

| Layer | What | Approach |
|---|---|---|
| Unit | `PostCard` rendering | Mock Sanity client → test title, date, tags render |
| Unit | `PostBody` custom components | Mock `@portabletext/react` → test heading, code, image renderers |
| Unit | `not-found.tsx` | Existing pattern: mock next-intl + i18n/navigation |
| Integration | GROQ queries | Sanity client integration test with `SANITY_API_READ_TOKEN` (CI) |
| E2E | Navigation + listing + detail | Playwright: nav click → listing renders → click → detail renders |
| E2E | 404 slug | Navigate to `/blog/unknown-slug` → assert 404 |

## Env Vars

| Var | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Sanity project ID (safe to expose) |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Dataset name (e.g. `production`) |
| `SANITY_API_READ_TOKEN` | Server | Read token for draft/preview mode |
| `SANITY_WEBHOOK_SECRET` | Server | Shared secret for webhook validation |

Add envs to `src/lib/config/envs.ts`: extend `ServerEnvs` type with `SANITY_API_READ_TOKEN` and `SANITY_WEBHOOK_SECRET`.
