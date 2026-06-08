# Tasks: core-blog-ui

## Batch 1 — Fixes (PR-1 of 4)

### T-01: Consolidar cliente Sanity y queries con locale fix

- [x] Create `src/sanity/lib/queries.ts` with locale-fixed queries
- [x] Replace `src/sanity/lib/client.ts` with `getClient()` factory
- [x] Write unit tests for config branching and query locale filtering
- [x] Delete root `sanity/lib/client.ts`
- [x] Delete root `sanity/lib/queries.ts`
- [x] Delete `sanity/lib/defineLive.ts` (dead code)
- [x] Delete `sanity/lib/token.ts` (dead code)
- [x] Delete `src/sanity/lib/live.ts` (dead code)
- [x] Add `{date}` placeholder to `messages/{en,es}.json`
- [x] Verify no broken imports in `image.ts` or `env.ts`
- [x] `npm test` passes (210 baseline + 10 new = 220)
- [x] `npm run build` passes

## Batch 2 — Blog Components (PR-2 of 4)

### T-02: Create blog components (PostCard + PostBody) with tests

- [x] Implement PostCard server component with conditional renders
- [x] Implement PostBody with Portable Text component map
- [x] Write unit tests for PostCard (render, missing fields, date formatting)
- [x] Write unit tests for PostBody (headings, code, images, links, blockquotes)

## Batch 3 — Blog Pages (PR-3 of 4)

### T-03: Create blog listing + detail pages

- [x] Implement `[locale]/blog/page.tsx` listing with ISR
- [x] Implement `[locale]/blog/[slug]/page.tsx` detail with generateStaticParams
- [x] Implement `[locale]/blog/[slug]/not-found.tsx` blog-specific 404
- [x] Add `generateMetadata` with SEO fields

## Batch 4 — Revalidation + E2E (PR-4 of 4)

### T-04: Create webhook revalidation endpoint

- [x] Implement `POST /api/revalidate` with secret validation
- [x] Add `revalidatePath` + `revalidateTag` calls
- [x] Handle invalid secret (401) and wrong method (405)
- [x] Unit tests for all three spec scenarios (E41-E43)

### E2E Tests (FR-10)

- [x] Write E2E tests for blog navigation flow (E50-E54)
