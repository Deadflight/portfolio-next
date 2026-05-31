# Blog Specification

## Purpose

Headless CMS blog with EN/ES i18n via Sanity.io. Server-rendered listing + detail pages with Portable Text content, locale filtering via GROQ, and on-demand revalidation.

## Requirements

### Requirement: Sanity Post Schema

A `post` document type MUST define fields: `title` (string, required), `slug` (slug, source: title), `description` (text), `body` (blockContent), `publishedAt` (datetime), `locale` (string, en|es), `tags` (string[]), `coverImage` (image, hotspot). Preview MUST show title + locale.

### Requirement: Locale-Filtered Listing

`GET /[locale]/blog` MUST query posts WHERE locale = current locale, ordered `publishedAt DESC`. Renders `<PostCard>` list (title, description, date, tags).

#### Scenario: Posts exist for locale

- GIVEN posts exist with matching locale
- WHEN `GET /en/blog` renders
- THEN only English posts appear, sorted newest-first

#### Scenario: No posts for locale (empty state)

- GIVEN no posts for current locale
- WHEN listing renders
- THEN a meaningful empty-state message is shown (not a blank list)

#### Scenario: Cross-locale isolation

- GIVEN posts in both EN and ES
- WHEN `GET /es/blog` renders
- THEN only Spanish posts appear; English posts are excluded

### Requirement: Slug-Based Detail Page

`GET /[locale]/blog/[slug]` MUST resolve one post by slug + locale. No match → `notFound()`. Renders full post via `<PostBody>`. `generateStaticParams` pre-builds all known (locale, slug) pairs. `generateMetadata` returns title + description from the post.

#### Scenario: Known slug renders content

- GIVEN post "hello-world" exists in EN
- WHEN `GET /en/blog/hello-world` renders
- THEN title, description, date, and body render via PostBody

#### Scenario: Unknown slug returns 404

- GIVEN no post with slug "does-not-exist"
- WHEN `GET /en/blog/does-not-exist` renders
- THEN `not-found.tsx` renders with HTTP 404

#### Scenario: Slug exists in wrong locale

- GIVEN "hola-mundo" exists only in ES
- WHEN `GET /en/blog/hola-mundo` renders
- THEN 404 (slug + locale combo not found)

### Requirement: Portable Text Rendering

`<PostBody>` MUST render Portable Text with custom components: headings (h2-h4 with anchor links), code blocks, Sanity images via `next-sanity/image`, external links (`target="_blank"`), blockquotes. Unknown types MUST fall back gracefully (no crash).

#### Scenario: Heading with anchor

- GIVEN a block `{style: "h2", text: "Intro"}`
- WHEN PostBody renders it
- THEN output is `<h2 id="intro">Intro</h2>` with anchor link

#### Scenario: Image from Sanity CDN

- GIVEN a block `{_type: "image", asset: {...}}`
- WHEN PostBody renders it
- THEN `next-sanity/image` produces an optimized `<img>` from Sanity CDN

#### Scenario: Unknown block type

- GIVEN a block with `_type: "unknownType"`
- WHEN PostBody encounters it
- THEN it renders the default Portable Text fallback (no crash)

### Requirement: Webhook Revalidation

`POST /api/revalidate` MUST validate a shared secret (header or body), call `revalidatePath('/blog')` on match, return 200. Mismatch → 401. Enables Sanity webhook → ISR cache purge on publish.

#### Scenario: Valid webhook revalidates

- GIVEN POST to `/api/revalidate` with correct secret
- WHEN handler validates and calls `revalidatePath('/blog')`
- THEN response is 200 OK
- AND next blog request fetches fresh Sanity data

#### Scenario: Invalid secret rejected

- GIVEN POST to `/api/revalidate` with wrong/missing secret
- WHEN handler checks auth
- THEN response is 401 Unauthorized
- AND no revalidation occurs

### Non-Functional: Rendering Strategy

- Listing page: Server Component with `revalidate = 60` (ISR fallback)
- Detail page: `generateStaticParams` for SSG; server-rendered at runtime for unknown slugs
- Sanity client: `useCdn: true` in production, token-based draft mode in development
- Nav link MUST use `next-intl` `<Link>` pointing to `/blog` (real route, not anchor)

## Data Contracts

### Sanity Schema: `post`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | `string` | Yes | |
| `slug` | `slug` | No | Source: `title` |
| `description` | `text` | No | rows=3 |
| `body` | `blockContent` | No | Portable Text |
| `publishedAt` | `datetime` | No | ISO 8601 |
| `locale` | `string` | No | `en` \| `es` |
| `tags` | `array(string)` | No | |
| `coverImage` | `image` | No | hotspot=true |

### GROQ Queries

```
─── postsByLocale ($locale: string) ──────────────────────────
*[_type == "post" && locale == $locale]
| order(publishedAt desc) {
  _id, title, "slug": slug.current,
  description, publishedAt, tags,
  "coverImage": coverImage.asset->url
}

─── postBySlug ($slug: string, $locale: string) ──────────────
*[_type == "post" && slug.current == $slug && locale == $locale][0] {
  _id, title, "slug": slug.current,
  description, body, publishedAt, tags,
  "coverImage": coverImage.asset->url
}
```

## i18n Keys

Namespace: `blog`

| Key | EN | ES |
|-----|----|----|
| `blog.title` | Blog | Blog |
| `blog.readMore` | Read more → | Leer más → |
| `blog.publishedAt` | Published {date} | Publicado {date} |
| `blog.backToBlog` | ← Back to blog | ← Volver al blog |
| `blog.notFound` | Post not found | Artículo no encontrado |
| `blog.emptyState` | No posts yet. Check back soon. | No hay artículos aún. Vuelve pronto. |
| `blog.navLink` | Blog | Blog |
