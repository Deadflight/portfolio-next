# Tasks: Stability & Quality

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~280 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Dependency Graph

```
1.1 ──→ 2.3      1.2 ──→ 3.6
2.1 ──→ 2.4      3.1 ──→ 3.2, 3.3, 3.4, 3.5
2.4 ──→ 5.2      (all others: independent)
```

## Phase 1: Foundation

- [x] **1.1** Add `common.sectionError`, `common.retry`, `common.errorTitle` to `messages/{en,es}.json`
- [x] **1.2** Add `navigation.links.home` ("Home" / "Inicio") to `messages/{en,es}.json`
- [x] **1.3** Set `coverageThreshold` in `jest.unit.config.ts`: branches≥80, functions≥75, lines≥80, statements≥80

## Phase 2: Error Resilience (test-first)

- [x] **2.1** Write `ErrorBoundary.test.tsx` — children render, error caught→fallback shown, retry resets, `onError` callback fires
- [x] **2.2** Create `ErrorBoundary/ErrorBoundary.tsx` class component with `role="alert"`, retry button, `onError(error, errorInfo)` prop
- [x] **2.3** Create `[locale]/error.tsx` root error page (`"use client"`) — `common.errorTitle` heading + `<Link>` to `/{locale}/` with `common.backToHome`
- [x] **2.4** Wrap 6 sections in `page.tsx` each in `<ErrorBoundary>` (Hero, Experience, Projects, About, Skills, Contact)

## Phase 3: GA Events (test-first)

- [x] **3.1** Write `events.test.ts` — SSR guard (no-op), dev mode (`console.log`), prod mode (`window.gtag` called)
- [x] **3.2** Create `src/lib/ga/events.ts` — typed `GA_EVENTS` constants + `sendEvent(name, params?)` with SSR guard + dev log + prod gtag
- [x] **3.3** Wire `sendEvent('download_cv')` into `DownloadLink.tsx` onClick
- [x] **3.4** Wire `sendEvent('contact_form_submit')` into `ContactForm.tsx` on success
- [x] **3.5** Wire `sendEvent('nav_click', { href })` into all Navigation link clicks

## Phase 4: Hygiene

- [x] **4.1** Rename `analitycs/` → `analytics/` + update import in `src/app/layout.tsx`
- [x] **4.2** Rename `tests/e2e/skilss.spec.ts` → `tests/e2e/skills.spec.ts`
- [x] **4.3** Fix `Navigation.tsx` `#home` link label: replace `t("links.about")` with new `t("links.home")`
- [x] **4.4** Delete `src/constants/skills.ts` (dead code — confirmed zero consumers)

## Phase 5: Verification

- [x] **5.1** Write E2E `error-boundary.spec.ts` — inject script error in one section, verify other 5 render
- [x] **5.2** Run `npm run test:unit` + `npm run test:e2e` — fix any failures

## File Change Summary

| Action | Files |
|--------|-------|
| Create | `ErrorBoundary.tsx`, `ErrorBoundary.test.tsx`, `[locale]/error.tsx`, `events.ts`, `events.test.ts`, `error-boundary.spec.ts` |
| Modify | `page.tsx`, `Navigation.tsx`, `DownloadLink.tsx`, `ContactForm.tsx`, `layout.tsx`, `jest.config.ts`, `messages/en.json`, `messages/es.json` |
| Rename | `analitycs/`→`analytics/`, `skilss.spec.ts`→`skills.spec.ts` |
| Delete | `constants/skills.ts` |

## Review Workload

- **Estimated lines**: ~280 changed (additions + deletions)
- **15 files touched**: 6 created, 8 modified, 2 renamed, 1 deleted
- **Budget risk**: LOW — well under 400-line threshold
- **Single PR**: Yes — all streams additive, no risky integrations
