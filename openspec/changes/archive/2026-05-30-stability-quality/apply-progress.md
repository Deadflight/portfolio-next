# Apply Progress: Stability & Quality

**Change**: stability-quality | **PR**: 1B | **Issue**: #75
**Mode**: Strict TDD
**Delivery strategy**: single-pr (size:exception)
**Date**: 2026-05-30

## Implementation Status

### Phase 1: Foundation — ✅ Complete
- [x] **1.1** Added `common.sectionError`, `common.retry`, `common.errorTitle` to `messages/{en,es}.json`
- [x] **1.2** Added `navigation.links.home` ("Home" / "Inicio") to `messages/{en,es}.json`
- [x] **1.3** Set `coverageThreshold` in `jest.unit.config.ts`: branches≥80, functions≥75, lines≥80, statements≥80

### Phase 2: Error Resilience — ✅ Complete (test-first)
- [x] **2.1** Wrote `ErrorBoundary.test.tsx` (6 tests: children render, error→fallback, retry, onError, custom fallback)
- [x] **2.2** Created `ErrorBoundary/ErrorBoundary.tsx` class component with `role="alert"`, retry button, `onError` prop
- [x] **2.3** Created `[locale]/error.tsx` root error page with translated heading + "Back to Home" link
- [x] **2.4** Wrapped 6 sections in `page.tsx` each in `<ErrorBoundary>` (Hero, Experience, Projects, About, Skills, Contact)

### Phase 3: GA Events — ✅ Complete (test-first)
- [x] **3.1** Wrote `events.test.ts` (7 tests: constants, SSR guard, dev log, prod gtag)
- [x] **3.2** Created `src/lib/ga/events.ts` with typed `GA_EVENTS` constants + `sendEvent()`
- [x] **3.3** Wired `sendEvent('download_cv')` into `DownloadLink.tsx` onClick
- [x] **3.4** Wired `sendEvent('contact_form_submit')` into `ContactForm.tsx` on success
- [x] **3.5** Wired `sendEvent('nav_click', { href })` into all Navigation link clicks

### Phase 4: Hygiene — ✅ Complete
- [x] **4.1** Renamed `analitycs/` → `analytics/` (git mv) + updated import in `src/app/layout.tsx`
- [x] **4.2** Renamed `tests/e2e/skilss.spec.ts` → `tests/e2e/skills.spec.ts` (git mv)
- [x] **4.3** Fixed `Navigation.tsx` `#home` link label: `t("links.home")` replaces `t("links.about")`
- [x] **4.4** Deleted `src/constants/skills.ts` (dead code — confirmed zero consumers)

### Phase 5: Verification — ✅ Complete
- [x] **5.1** Wrote E2E `error-boundary.spec.ts` — structural + error isolation test
- [x] **5.2** Full suite: 210 tests pass, TypeScript clean, coverage thresholds met

## TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 2.1/2.2 | `ErrorBoundary.test.tsx` | Unit | N/A (new) | ✅ Written | ✅ Passed (6/6) | ✅ 6 cases | ➖ None needed |
| 3.1/3.2 | `events.test.ts` | Unit | N/A (new) | ✅ Written | ✅ Passed (7/7) | ✅ 3 cases | ➖ None needed |

## Test Summary
- **Total tests written**: 13 new (6 ErrorBoundary + 7 GA events)
- **Total tests passing**: 210 (was 197 before)
- **Layers used**: Unit (13 new + 197 existing), E2E (1 new)
- **Coverage**: Branches 90.22%, Functions 77.27%, Lines 97.36%, Statements 97.36%
- **TypeScript**: Clean (`tsc --noEmit` passes)

## Coverage Thresholds
| Metric | Threshold | Actual | Status |
|--------|-----------|--------|--------|
| Branches | 80% | 90.22% | ✅ |
| Functions | 75% | 77.27% | ✅ |
| Lines | 80% | 97.36% | ✅ |
| Statements | 80% | 97.36% | ✅ |

## Deviations from Design
None — implementation matches design exactly.

## Issues Found
None.

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `src/shared/components/ErrorBoundary/ErrorBoundary.tsx` | Created | Class component, `role="alert"`, retry button, `onError` prop |
| `src/shared/components/ErrorBoundary/ErrorBoundary.test.tsx` | Created | Unit tests: catches error, shows fallback, retry works, onError called, custom fallback |
| `src/app/[locale]/error.tsx` | Created | Root error page, `useTranslations`, "Back to Home" link |
| `src/app/[locale]/page.tsx` | Modified | Wrapped 6 sections in `<ErrorBoundary>` |
| `src/lib/ga/events.ts` | Created | `sendEvent(event, params)` + typed `GA_EVENTS` constants |
| `src/lib/ga/events.test.ts` | Created | Unit tests: SSR guard, dev log, prod gtag |
| `src/app/components/shared/DownloadLink/DownloadLink.tsx` | Modified | Wired `sendEvent('download_cv')` on click |
| `src/app/components/contact/ContactForm.tsx` | Modified | Wired `sendEvent('contact_form_submit')` on success |
| `src/shared/components/Navigation/Navigation.tsx` | Modified | Wired `sendEvent('nav_click')`, fixed `#home` label to `t("links.home")` |
| `src/app/layout.tsx` | Modified | Updated import path `analitycs`→`analytics` |
| `jest.unit.config.ts` | Modified | Added `coverageThreshold` block |
| `messages/en.json` | Modified | Added `common.sectionError`, `common.retry`, `common.errorTitle`, `navigation.links.home` |
| `messages/es.json` | Modified | Added Spanish translations for same keys |
| `src/app/components/analitycs/` → `analytics/` | Renamed | `git mv` fixed typo |
| `tests/e2e/skilss.spec.ts` → `skills.spec.ts` | Renamed | `git mv` fixed typo |
| `tests/e2e/error-boundary.spec.ts` | Created | E2E test: page structure + error isolation |
| `src/constants/skills.ts` | Deleted | Dead code — canonical data in `constants/data/*/skills.data.ts` |
