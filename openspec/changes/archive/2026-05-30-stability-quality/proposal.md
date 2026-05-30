# Proposal: Stability & Quality

**Issue**: [#75](https://github.com/Deadflight/portfolio-next/issues/75) | **Lines**: ~280 | **Base**: `main` (after PR 1A) | **Delivery**: PR 1B of stacked-to-main

## Intent

No error resilience, no GA events, P0 typos, duplicated data, no coverage enforcement. Fix all in one PR.

## Scope

### In Scope

1. ErrorBoundary — class-based, `role="alert"`, retry, `onError`
2. Root `error.tsx` — translated + "Back to Home"
3. Wrap 6 sections in `page.tsx` in `<ErrorBoundary>`
4. Typed GA `events.ts` + `sendEvent()` (SSR guard, dev log, prod gtag)
5. Wire GA to DownloadLink, ContactForm, Navigation
6. Fix typos: `analitycs/`→`analytics/`, `skilss.spec.ts`→`skills.spec.ts`, nav `#home` label
7. Data dedup — single canonical source for skills
8. Coverage thresholds: global 80/75/80/80
9. i18n: `common.{sectionError,retry,errorTitle}` EN/ES
10. Tests: ErrorBoundary unit, GA unit, E2E error-boundary

### Out of Scope

Dark mode (PR 1A), blog/projects/animations (Phase 2/3), Sentry, GA4 dashboard.

## Capabilities

### New

- `error-boundary`: Section-level `<ErrorBoundary>` with fallback, retry, `onError`. Root `error.tsx`. One crash does not break adjacent sections.
- `ga-events`: Typed constants + `sendEvent()` calling `window.gtag()` in prod, logging in dev, guarding SSR.

### Modified

None — purely additive.

## Approach

Four streams: ErrorBoundary class + root page + wraps; typed GA + wiring; renames + dedup; coverage + i18n. Tests before code (TDD).

## Files

| File | Action |
|------|--------|
| `ErrorBoundary/ErrorBoundary.tsx` | New |
| `[locale]/error.tsx` | New |
| `[locale]/page.tsx` | Modify |
| `lib/ga/events.ts` | New |
| `lib/ga/gatag.ts` | Modify |
| `lib/ga/__tests__/gatag.test.ts` | New |
| `app/components/analitycs/`→`analytics/` | Rename |
| `app/layout.tsx` | Modify |
| `Navigation/Navigation.tsx` | Modify |
| `e2e/skilss.spec.ts`→`skills.spec.ts` | Rename |
| `constants/skills.ts` or data files | Modify |
| `jest.config.ts` | Modify |
| `messages/*.json` | Modify |
| `ErrorBoundary/ErrorBoundary.test.tsx` | New |
| `e2e/error-boundary.spec.ts` | New |

## Risks & Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| layout.tsx conflict with PR 1A(i) | Med | Rebase after merge |
| CSS breakage from wrapper | Low | No style changes |
| GA SSR miss | Low | All targets are `"use client"` |

## Rollback

Revert single commit. Additive changes or localized edits. File renames are only destructive ops — restore old names on rollback.

## Dependencies

PR 1A(i) merge (layout.tsx). No PR 1A(ii) dep. No external deps.

## Success Criteria

- [ ] Error in one section → fallback visible, others OK
- [ ] Retry resets single section error
- [ ] `sendEvent(...)` calls `window.gtag()` in prod, no-op on SSR
- [ ] `analitycs/` gone, `analytics/` works
- [ ] `skills.spec.ts` exists (old name gone)
- [ ] Nav `href` matches label
- [ ] `npm run test:unit` passes with ≥ 80/75/80/80
- [ ] All existing tests pass
