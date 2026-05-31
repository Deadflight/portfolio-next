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

## Future Batches

### T-02: Create blog components (PostCard + PostBody) with tests

- [ ] Implement PostCard server component with conditional renders
- [ ] Implement PostBody with Portable Text component map
- [ ] Write unit tests for PostCard (render, missing fields, date formatting)
- [ ] Write unit tests for PostBody (headings, code, images, links, blockquotes)

### T-03: Create blog listing + detail pages

- [ ] Implement `[locale]/blog/page.tsx` listing with ISR
- [ ] Implement `[locale]/blog/[slug]/page.tsx` detail with generateStaticParams
- [ ] Implement `[locale]/blog/[slug]/not-found.tsx` blog-specific 404
- [ ] Add `generateMetadata` with SEO fields
- [ ] Write E2E tests for navigation flow

### T-04: Create webhook revalidation endpoint

- [ ] Implement `POST /api/revalidate` with secret validation
- [ ] Add `revalidatePath` + `revalidateTag` calls
- [ ] Handle invalid secret (401) and wrong method (405)
