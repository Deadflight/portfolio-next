# Tasks: PR 2A — Blog Code Infrastructure

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 450–600 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1–8 | Full blog infrastructure + tests | PR 2A | Single PR per user decision; base = `main` |

## Phase 1: Foundation (Sanity integration)

- [ ] **1.1** Install deps + create `.env.local` vars — `package.json` (+`next-sanity`, `@portabletext/react`, `@sanity/image-url`), `.env.local` (4 Sanity vars), `.env.example` (update). Deps: none.
- [ ] **1.2** Create `sanity/schemas/post.ts` + `sanity/schemas/blockContent.ts` — post schema (title, slug, description, body, publishedAt, locale, tags, coverImage) + blockContent (headings, code, image, link, blockquote). Deps: 1.1.
- [ ] **1.3** Create `sanity/lib/client.ts` + `sanity/lib/token.ts` + `sanity/lib/queries.ts` — `createClient` with draft-mode branching, typed `defineQuery`, `POSTS_BY_LOCALE_QUERY` + `POST_BY_SLUG_QUERY`. Deps: 1.1.
- [ ] **1.4** Create `sanity/sanity.config.ts` + `sanity/sanity.cli.ts` — schema import, projectId/dataset, CLI config for `sanity deploy`. Deps: 1.2.
- [ ] **1.5** Extend `envs.ts` + `next.config.ts` — add `SANITY_API_READ_TOKEN` + `SANITY_WEBHOOK_SECRET` to `ServerEnvs` type, add Sanity CDN `remotePatterns` to `next.config.ts`. Deps: 1.1.

## Phase 2: Core Implementation (Pages & Components)

- [ ] **2.1** Create `src/app/components/blog/PostCard.tsx` — card with title, description, date, tags, coverImage; conditional render for missing image/tags; accepts `Post` type from queries. Deps: 1.3.
- [ ] **2.2** Create `src/app/[locale]/blog/page.tsx` — async Server Component, `getLocale()` → `getClient().fetch(POSTS_BY_LOCALE_QUERY, { locale })`, `revalidate = 60`, renders PostCard list or empty state from i18n key. Deps: 2.1.
- [ ] **2.3** Create `src/app/[locale]/blog/[slug]/page.tsx` — async Server Component with `generateStaticParams` (all locale+slug pairs), `generateMetadata` (title+description), `notFound()` on null. Deps: 2.4 (PostBody needed for render).
- [ ] **2.4** Create `src/app/components/blog/PostBody.tsx` — `@portabletext/react` custom component map: headings with anchor IDs, code blocks with copy button, Sanity images via `@sanity/image-url` + `<Image>`, external links `target="_blank"`, blockquotes; graceful unknown-type fallback. Deps: 1.1.
- [ ] **2.5** Create `src/app/[locale]/blog/[slug]/not-found.tsx` — blog-specific 404 with translated message + "Back to blog" link. Deps: 2.2.

## Phase 3: Integration (API & Nav)

- [ ] **3.1** Create `src/app/api/revalidate/route.ts` — `POST` handler validates `x-sanity-webhook-secret` header, calls `revalidatePath('/blog')` + `revalidateTag('sanity')`, returns 200/401. Deps: 1.5.
- [ ] **3.2** Add i18n keys + nav link — add `blog.*` namespace to `messages/{en,es}.json` (title, readMore, publishedAt, backToBlog, notFound, emptyState, navLink); add Blog `<Link>` to `Navigation.tsx` using `@/i18n/navigation`. Deps: none.

## Phase 4: Testing

- [ ] **4.1** Unit tests: `PostCard` rendering — mock Sanity client data, test title/date/tags/image render and conditional omission. Deps: 2.1.
- [ ] **4.2** Unit tests: `PostBody` custom components — mock Portable Text blocks, test heading anchor, code, image, link, blockquote, unknown-type fallback. Deps: 2.4.
- [ ] **4.3** E2E: `tests/e2e/blog.spec.ts` — nav click → listing renders → detail renders → 404 for unknown slug; test both locales. Deps: 3.2 (nav link exists), 2.3, 2.5.

## Return Envelope

**Status**: success
**Summary**: Tasks breakdown created for PR 2A (Blog Code Infrastructure). 13 tasks across 4 phases: foundation (5), core implementation (5), integration (2), testing (3).
**Artifacts**: `openspec/changes/pr-2a-blog-infrastructure/tasks.md` (openspec) + Engram `sdd/pr-2a-blog-infrastructure/tasks`
**Next**: sdd-apply
**Risks**: None
**Skill Resolution**: none — no skill registry or project standards injected
