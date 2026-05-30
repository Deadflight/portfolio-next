# Stability & Quality — Specification

**Change**: stability-quality | **PR**: 1B | **Issue**: [#75](https://github.com/Deadflight/portfolio-next/issues/75)

---

## Domain: error-boundary (NEW)

**Purpose**: Section-level error resilience. One crashed section MUST NOT break adjacent content. Root error page MUST show translated fallback with a way home.

### Requirements

| ID | Requirement | Scenarios |
|----|-------------|-----------|
| EB-1 | ErrorBoundary MUST be a class-based React component that catches render errors in children. On error it MUST render fallback UI with `role="alert"`, a retry button, and call `onError(error, errorInfo)`. | 4 |
| EB-2 | `[locale]/error.tsx` MUST be a `"use client"` component. MUST display `common.errorTitle` and a link to `/` labeled `common.backToHome`. | 1 |
| EB-3 | The 6 sections in `page.tsx` (Hero, Experience, Projects, About, Skills, Contact) MUST each be wrapped in a separate `<ErrorBoundary>`. | 1 |
| EB-4 | `messages/{en,es}.json` MUST add `common.sectionError`, `common.retry`, `common.errorTitle`. | 2 |

#### EB-1 — ErrorBoundary

- GIVEN children that render without error
- WHEN the component tree mounts
- THEN children appear normally; no fallback is rendered

- GIVEN a child component throws during render
- WHEN ErrorBoundary catches the error
- THEN the fallback UI with `role="alert"` replaces the children AND `onError` fires with the error and component stack

- GIVEN the fallback UI is visible
- WHEN user clicks the retry button
- THEN ErrorBoundary resets its error state and re-renders children

#### EB-2 — Root error.tsx

- GIVEN an unhandled error bubbles to the Next.js root error boundary
- WHEN `[locale]/error.tsx` renders
- THEN it shows `common.errorTitle` as heading and a link to `{locale}/` labeled `common.backToHome`

#### EB-3 — Section wrapping

- GIVEN 6 page sections each wrapped in `<ErrorBoundary>`
- WHEN one section's component throws
- THEN only that section shows its fallback; the other 5 sections render uninterrupted

#### EB-4 — Translations

- GIVEN locale is "en"
- WHEN fallback renders
- THEN `common.sectionError` is "Something went wrong", `common.retry` is "Try again", `common.errorTitle` is "Unexpected Error"

- GIVEN locale is "es"
- THEN Spanish equivalents display: "Algo salió mal", "Intentar de nuevo", "Error inesperado"

---

## Domain: ga-events (NEW)

**Purpose**: Typed Google Analytics event tracking for key user interactions, with SSR safety and dev logging.

### Requirements

| ID | Requirement | Scenarios |
|----|-------------|-----------|
| GA-1 | `lib/ga/events.ts` MUST export typed event name constants and a `sendEvent(name, params?)` function. `sendEvent` MUST guard against SSR (no-op if `window` undefined), `console.log` in development, and call `window.gtag('event', name, params)` in production. | 3 |
| GA-2 | DownloadLink MUST call `sendEvent('download_cv')` on click. | 1 |
| GA-3 | ContactForm MUST call `sendEvent('contact_form_submit')` on successful form submission. | 1 |
| GA-4 | Navigation link clicks MUST call `sendEvent('nav_click', { href })`. | 1 |

#### GA-1 — sendEvent()

- GIVEN `sendEvent` is called during SSR (window undefined)
- WHEN the function executes
- THEN it returns immediately; no gtag call, no error

- GIVEN `NODE_ENV` is "development"
- WHEN `sendEvent` is called with a name and params
- THEN the event is logged via `console.log('[GA Event]', name, params)`

- GIVEN `NODE_ENV` is "production" and `window.gtag` exists
- WHEN `sendEvent('some_event', { key: 'val' })` is called
- THEN `window.gtag('event', 'some_event', { key: 'val' })` is invoked

#### GA-2 through GA-4 — Event wiring

- GIVEN a DownloadLink is clicked
- THEN `sendEvent('download_cv')` MUST fire

- GIVEN the ContactForm submission succeeds (no server error)
- THEN `sendEvent('contact_form_submit')` MUST fire

- GIVEN a Navigation link is clicked
- THEN `sendEvent('nav_click', { href: '#target' })` MUST fire

---

## Infrastructure & Cleanup

**Purpose**: Fix P0 typos, eliminate data duplication, enforce quality gates, verify with tests.

### Requirements

| ID | Requirement | Scenarios |
|----|-------------|-----------|
| IC-1 | Rename `src/app/components/analitycs/` → `analytics/`. Rename `tests/e2e/skilss.spec.ts` → `skills.spec.ts`. Fix Navigation `#home` link label to match its href name (not reuse `t("links.about")`). | 3 |
| IC-2 | Remove `src/constants/skills.ts`. All consumers MUST import skills data from `src/constants/data/{locale}/skills.data.ts` via `getSkillData()`. | 1 |
| IC-3 | `jest.config.ts` MUST set `coverageThreshold.global`: branches≥80, functions≥75, lines≥80, statements≥80. | 1 |
| IC-4 | Unit tests: ErrorBoundary (render children, catch error, retry, onError), GA events (SSR guard, dev log, prod gtag). | 7 |
| IC-5 | E2E test `e2e/error-boundary.spec.ts` MUST simulate a render error in one section and verify all other sections remain intact. | 1 |

#### IC-1 — Typos

- GIVEN the old `analitycs/` directory
- WHEN renamed to `analytics/`
- THEN imports from `@/app/components/analytics/Analytics` resolve

- GIVEN the file `skilss.spec.ts`
- WHEN renamed to `skills.spec.ts`
- THEN Playwright picks up the new name; old name no longer exists

- GIVEN the first Navigation link with `href="#home"`
- WHEN rendered
- THEN its label MUST match the `#home` section (not display "About")

#### IC-2 — Data dedup

- GIVEN `src/constants/skills.ts` exists as a duplicate source
- WHEN removed
- THEN all consumers import from the canonical `src/constants/data/{locale}/skills.data.ts` path

#### IC-3 — Coverage thresholds

- GIVEN `jest.config.ts` has `coverageThreshold` unset (currently `undefined`)
- WHEN updated to `{ global: { branches: 80, functions: 75, lines: 80, statements: 80 } }`
- THEN `npm run test:unit` enforces these minimums

#### IC-4 — Unit tests

- GIVEN an ErrorBoundary test suite
- THEN it MUST verify: children render, error caught → fallback shown, retry resets error, onError callback fires

- GIVEN a GA events test suite
- THEN it MUST verify: SSR no-op, dev console.log, prod gtag call

#### IC-5 — E2E error-boundary

- GIVEN a page with 6 ErrorBoundary-wrapped sections
- WHEN a script injection causes one section to throw
- THEN the other 5 sections render normally and only the broken section shows fallback
