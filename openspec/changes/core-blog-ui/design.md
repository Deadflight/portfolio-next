# Design: Core Blog UI

**Change**: `core-blog-ui` | **Based on**: PR-89 (Sanity infra) | **Risk**: Low | **Mode**: openspec

## Technical Approach

Build blog listing + detail pages as async RSC with ISR, consuming Sanity via consolidated `@/sanity/lib/client` with draft-mode branching. Portable Text renders through `@portabletext/react` with custom component map. Webhook endpoint revalidates on publish.

## Architecture Decisions

### Decision: Sanity Client Consolidation

| Option | Tradeoff | Verdict |
|--------|----------|---------|
| Keep both clients (`sanity/lib/client` + `src/sanity/lib/client`) | Dual paths, confusing imports | ❌ |
| Move everything to `sanity/lib/` + re-exports from `src/sanity/lib/` | Indirection, indirection layer needs maintenance | ❌ |
| **Move queries + client to `src/sanity/lib/`** | Single `@/sanity/lib/*` import path; aligns with `tsconfig.json` `@/*` → `./src/*` | ✅ |

**Choice**: Consolidate into `src/sanity/lib/client.ts` with `getClient()` that branches on draft mode. Move `sanity/lib/queries.ts` → `src/sanity/lib/queries.ts`. Remove legacy `src/sanity/lib/client.ts` AND `sanity/lib/client.ts`. Keep `src/sanity/lib/image.ts` as-is — it already imports from `src/sanity/env.ts`.

**Rationale**: `@/*` maps to `src/` in tsconfig. All page imports resolve naturally. `sanity/sanity.config.ts` (Studio) does NOT import the client — it reads env vars directly. No production code currently imports from either client, so this is safe.

### Decision: Test File Placement

| Option | Tradeoff | Verdict |
|--------|----------|---------|
| `__tests__/` subfolder (per proposal) | Breaks existing convention | ❌ |
| **Co-located test files** (existing pattern) | Consistent with ProjectCard, WorkExperienceCard, SkillsCard | ✅ |

**Choice**: `src/app/components/blog/PostCard.test.tsx` and `PostBody.test.tsx` (not `__tests__/`).

### Decision: Blog Post Type Definition

| Option | Tradeoff | Verdict |
|--------|----------|---------|
| Inline types in each page | Duplication | ❌ |
| **Shared type in `@/sanity/lib/queries.ts`** | Auto-syncs with GROQ projections; single source of truth | ✅ |

## Bugfix: postBySlugQuery locale filter

Current query (`sanity/lib/queries.ts` line 24) is:
```groq
*[_type == "post" && slug.current == $slug][0]
```

Missing locale filter. Result: same slug across locales returns wrong match. Fix:
```groq
*[_type == "post" && slug.current == $slug && locale == $locale][0]
```

Also add `&& locale == $locale` to the `generateStaticParams` fallback query.

## Data Flow

```
Browser → [locale]/blog (RSC)
            │
            ├── await getClient().fetch<Post[]>(query, { locale })
            │     └── Sanity CDN → typed Post[]
            │
            └── PostCard[] (client.components or grid)
                  ├── CoverImage (conditional on asset)
                  ├── title + description + date + tags
                  └── Link → /{locale}/blog/{slug}

Browser → [locale]/blog/[slug] (RSC)
            │
            ├── generateStaticParams → all (locale, slug) pairs
            ├── generateMetadata → <head> title + description + og:image
            │
            ├── getClient().fetch<Post>(query, { slug, locale })
            │     └── notFound() if null
            │
            └── PostBody (@portabletext/react component map)
```

## Component Design

### PostCard

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `post` | `PostCardProps` | Yes | `{ title, slug, description?, publishedAt, tags?, coverImage? }` |

- **Conditional rendering**: `coverImage?.asset` → `<Image>`; `tags?.length` → tag pills; `description` → truncated text
- **Date**: `Intl.DateTimeFormat(locale)` with i18n format
- **Link**: `<Link href={/blog/${slug}}>` from `@/i18n/navigation`
- **States**: Loading (skeleton) done by RSC suspense boundary; Empty (no posts) renders translated `blog.emptyState`

### PostBody

- Receives `body: PortableTextBlock[]` directly from the GROQ query
- Component map (see section below)
- No loading/error state internally — parent handles via error boundary + suspense

### Portable Text Component Map

| Sanity Type | Renderer | Behavior |
|-------------|----------|----------|
| `block.h2` | HeadingRenderer | `id` from slugified text; anchor link on hover |
| `block.h3` | HeadingRenderer | Same anchor pattern |
| `block.h4` | HeadingRenderer | Same anchor pattern |
| `block.normal` | Default | `className="text-body leading-relaxed"` |
| `block.blockquote` | BlockquoteRenderer | Left border accent, italic |
| `type.code` | CodeRenderer | `<pre><code>` with language label + copy button |
| `type.image` | ImageRenderer | `urlFor(image).width(800).auto('format').quality(80)` → `<Image>`; alt from schema field |
| `mark.link` | LinkRenderer | `target="_blank" rel="noopener noreferrer"` if external; internal links via `@/i18n/navigation` |
| `mark.strong` | Default | `<strong>` |
| `mark.em` | Default | `<em>` |
| `mark.code` | Default | `<code>` |

## Caching & ISR Strategy

| Layer | Mechanism | Trigger |
|-------|-----------|---------|
| Default ISR | `revalidate = 60` on page export | Request-based background revalidation |
| On-demand | `revalidatePath("/[locale]/blog", "page")` | Sanity webhook → POST `/api/revalidate` |
| Draft mode | `useCdn: false` + `token` | `draftMode().isEnabled` |
| Static generation | `generateStaticParams` pre-builds all known (locale, slug) | Build time + ISR refresh |

**Webhook handler** (`/api/revalidate/route.ts`):
- Validates `x-sanity-webhook-secret` header
- Calls `revalidatePath("/[locale]/blog", "page")` + `revalidateTag("sanity")`
- Returns 401 on invalid secret, 200 on success

## Route Design

```
/[locale]/blog              → BlogListingPage    (RSC, revalidate=60)
/[locale]/blog/[slug]       → BlogDetailPage     (RSC, generateStaticParams)
/[locale]/blog/[slug]       → not-found.tsx      (blog-specific 404)
```

- `Link` from `@/i18n/navigation` handles locale prefixing automatically (already confirmed in Navigation component)
- `getLocale()` from `next-intl/server` used in pages for GROQ filter param
- `generateMetadata` returns `{ title, description, openGraph }`; cover image as `og:image`

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app/[locale]/blog/page.tsx` | Create | Blog listing RSC with ISR |
| `src/app/[locale]/blog/[slug]/page.tsx` | Create | Blog detail RSC + generateStaticParams + generateMetadata |
| `src/app/[locale]/blog/[slug]/not-found.tsx` | Create | Blog 404 with i18n `blog.notFound` + back link |
| `src/app/api/revalidate/route.ts` | Create | Webhook handler (secret validation + revalidation) |
| `src/app/components/blog/PostCard.tsx` | Create | Card component with conditional renders |
| `src/app/components/blog/PostCard.test.tsx` | Create | Unit tests (render, states, missing data) |
| `src/app/components/blog/PostBody.tsx` | Create | Portable Text component map |
| `src/app/components/blog/PostBody.test.tsx` | Create | Unit tests (heading, code, image, link renderers) |
| `src/sanity/lib/client.ts` | Modify | Replace legacy client with `getClient()` draft-mode branching |
| `src/sanity/lib/queries.ts` | Create | Move from `sanity/lib/queries.ts`; fix postBySlugQuery locale filter |
| `sanity/lib/client.ts` | Remove | Consolidated into `src/sanity/lib/client.ts` |
| `src/sanity/lib/live.ts` | Remove | Unused — `SanityLive` never rendered |
| `tests/e2e/blog.spec.ts` | Create | E2E: navigation → listing → detail → 404 |

## Error States

| Scenario | Handling |
|----------|----------|
| No posts exist | Listing renders `blog.emptyState` translated message |
| Slug not found | `notFound()` → `[slug]/not-found.tsx` with translated + back-to-blog link |
| Slug exists in wrong locale | Fixed by `&& locale == $locale` filter → `notFound()` |
| Sanity API unreachable | `ErrorBoundary` wraps blog section (existing pattern: `@/shared/components/ErrorBoundary`) |
| Missing coverImage | Conditional: `<Image>` only when `coverImage?.asset` defined |
| Missing description/tags | Omit element; don't render empty containers |
| Invalid webhook secret | Return 401 — no revalidation occurs |

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | PostCard rendering | Mock `next/image`, `next-intl` via `renderWithI18n`. Test title, date, conditional tags/image. Test missing fields. |
| Unit | PostBody renderers | Mock `@portabletext/react`. Test heading with anchor id, code block, image with urlFor, external link target. Test unknown type fallback. |
| Integration | GROQ queries | Sanity client with `SANITY_API_READ_TOKEN` (CI env) — verify locale filtering works. |
| E2E | Navigation → listing → detail | Playwright: click blog link → listing renders → click post → detail renders. |
| E2E | 404 for unknown slug | Navigate to `/es/blog/slug-inexistente` → assert 404 text + back link. |
| E2E | Locale isolation | `/en/blog` shows only English posts; `/es/blog` shows only Spanish posts. |

## Open Questions

- None identified. All decisions map to existing codebase patterns.
