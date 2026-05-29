# Tasks: Dark Mode Toggle

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~150 |
| 400-line budget risk | **Low** |
| Chained PRs recommended | No |
| Delivery strategy | stacked-to-main (PR 1A(ii) of chain) |
| Suggested split | Single PR |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Sun/Moon icons + ThemeToggle + Navigation + tests | PR 1A(ii) | Base = `main` (after PR 1A(i)); single unit, under 200 lines |

## Phase 1: Foundation

- [x] 1.1 Add `SvgIcons.Sun` and `SvgIcons.Moon` to `src/shared/components/Icons/Icons.tsx` — 24x24, `currentColor`, stroke-width 2, feather-style, following existing patterns

## Phase 2: TDD (RED → GREEN)

- [x] 2.1 Write `src/lib/theme/ThemeToggle.test.tsx` — RED: test renders Sun when dark, Moon when light, `aria-checked` maps to theme, click calls `toggleTheme()`, `role="switch"` and `aria-label` present, keyboard Enter/Space triggers toggle (native via `<button>`)
- [x] 2.2 Create `src/lib/theme/ThemeToggle.tsx` — GREEN: `"use client"` component consuming `useTheme()` and `useTranslations("common")`. Renders `<button role="switch">` with inverted icons (Sun in dark, Moon in light), `aria-checked`, `aria-label={common("toggleDarkMode")}`, `title` per current mode. ~40 lines. Zero props.

## Phase 3: Integration

- [x] 3.1 Insert `<ThemeToggle />` in `src/shared/components/Navigation/Navigation.tsx` — desktop `<ul>`: `<li>` before locale switcher. Mobile `<ul>`: `<li>` after locale switcher `<button>` `<li>`. Import from `@/lib/theme/ThemeToggle`.

## Phase 4: E2E Testing

- [x] 4.1 Add Playwright test(s) to `tests/e2e/theme.spec.ts` — verify toggle button renders, click switches `html` class to `dark`, `aria-checked` toggles, icon swaps. Follow existing pattern (no system-preference emulation needed for toggle logic).

## Next Step

Ready for `sdd-apply`. Single PR under 200 lines, stacked to main after PR 1A(i) merges.
