# Proposal: Core Blog UI

**Base**: `main` (PR-89 mergeado) | **Risk**: Low | **Lines**: ~350

## Intent

Implement blog listing + detail UI, PostCard/PostBody components, webhook revalidation, and tests on top of PR-89's Sanity infra. Fix postBySlugQuery locale bug and resolve dual Sanity client.

## Scope

| In | Out |
|----|-----|
| PostCard + PostBody (con tests) | Sample articles (PR 2B) |
| Blog listing `[locale]/blog/page.tsx` | RSS, search, tags filtering |
| Blog detail + `generateStaticParams` + `generateMetadata` | Comments, pagination |
| Blog 404 (`[slug]/not-found.tsx`) | Embedded Studio |
| Webhook revalidation endpoint | OG images per article |
| Bugfix: postBySlugQuery locale filter | |
| Dual client deduplication | |
| E2E tests (both locales) | |

## Capabilities

### New
- `blog`: listing, detail, PostCard, PostBody, webhook revalidation, blog-specific 404.

### Modified
- None — pure implementation of already-spec'd capability from PR-89.

## Approach

- **Server Components**: Async RSC with `revalidate = 60` ISR. `getLocale()` → GROQ locale filter.
- **Sanity client**: Consolidate into root `sanity/lib/client.ts` with draft-mode branching (`getClient()`). Remove `src/sanity/lib/client.ts`.
- **Images**: `urlFor()` from `src/sanity/lib/image.ts` → `<Image>` with Sanity CDN (remotePatterns already configured).
- **Portable Text**: `@portabletext/react` custom component map: headings with anchor links, code blocks (pre/code), images, external links (target \_blank), blockquotes. Unknown types → default PT fallback.
- **Revalidation**: POST `/api/revalidate` validates `x-sanity-webhook-secret` header → `revalidatePath("/[locale]/blog", "page")` + `revalidateTag("sanity")`.
- **SEO**: `generateMetadata` returns title + description from post data; cover image as `og:image`.
- **Bugfix postBySlugQuery**: Add `&& locale == $locale` to GROQ filter.

## Affected Files

| File | Action |
|------|--------|
| `sanity/lib/queries.ts` | **Modify** — add locale filter to postBySlugQuery |
| `sanity/lib/client.ts` | **Modify** — add `getClient()` draft-mode branching |
| `src/sanity/lib/client.ts` | **Remove** — consolidate into root |
| `src/app/[locale]/blog/page.tsx` | **Create** — listing page |
| `src/app/[locale]/blog/[slug]/page.tsx` | **Create** — detail page |
| `src/app/[locale]/blog/[slug]/not-found.tsx` | **Create** — blog 404 |
| `src/app/components/blog/PostCard.tsx` | **Create** — card component |
| `src/app/components/blog/PostBody.tsx` | **Create** — PT renderer |
| `src/app/api/revalidate/route.ts` | **Create** — webhook handler |
| `src/app/components/blog/__tests__/PostCard.test.tsx` | **Create** — unit test |
| `src/app/components/blog/__tests__/PostBody.test.tsx` | **Create** — unit test |
| `tests/e2e/blog.spec.ts` | **Create** — e2e tests |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Dual client consolidation breaks imports | Low | Grep all imports to `src/sanity/lib/client` and update |
| Webhook secret missing in env | Low | Validate optional; return 401 gracefully |
| postBySlugQuery fix is safe | None | Only used in detail page not yet deployed |

## Rollback

`git revert` merge commit. No schema or data changes. Dual client revert separately if needed — just restore `src/sanity/lib/client.ts`.

## Dependencies

- PR-89 merged (all Sanity infra exists)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_WEBHOOK_SECRET` in `.env.local`

## Success Criteria

- [ ] `npm run build` + `npm test` pass
- [ ] Listing renders posts filtered by locale (EN vs ES isolation)
- [ ] Detail renders post body w/ custom PT components
- [ ] Unknown slug in wrong locale → 404
- [ ] Blog-specific 404 with translated message + back link
- [ ] Webhook POST w/ valid secret → 200 + revalidation
- [ ] Webhook POST w/ invalid secret → 401
- [ ] No remaining imports to `src/sanity/lib/client`
- [ ] E2E tests pass for EN and ES flows
