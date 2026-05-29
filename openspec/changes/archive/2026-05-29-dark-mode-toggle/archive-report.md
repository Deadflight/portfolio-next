# Archive Report: Dark Mode Toggle

**Date**: 2026-05-29
**Change**: dark-mode-toggle
**Issue**: [#74](https://github.com/Deadflight/portfolio-next/issues/74)
**PR**: 1A(ii) — stacked-to-main chain
**Status**: ✅ ARCHIVED — SDD cycle complete

## Change Summary

Added a Sun/Moon toggle button (`ThemeToggle` component) to the navigation bar so users can manually switch between light and dark themes. Implementation was additive and backwards-compatible — it hooks into the existing `useTheme()` context and `ThemeProvider` from PR 1A(i) without modifying any existing behavior.

### Key Design Decisions

- **Inverted icons**: Sun displayed in dark mode (switching TO light), Moon in light mode (switching TO dark). The `aria-checked` attribute signals current state to AT.
- **Standalone `<button>` with `role="switch"`**: Native keyboard handling (Enter/Space) without custom event wiring.
- **Co-located with theme logic**: `src/lib/theme/ThemeToggle.tsx` next to `ThemeProvider`, not in shared components.
- **Desktop nav**: ThemeToggle `<li>` before locale switcher. **Mobile nav**: ThemeToggle `<li>` after locale switcher.
- **CSS transition added**: Minor non-breaking enhancement — `transition-transform duration-300` on icon span.

## Requirements Implemented and Verified

| # | Requirement | Verdict | Evidence |
|---|-------------|---------|----------|
| 1 | ThemeToggle renders Sun in dark, Moon in light | ✅ COMPLIANT | 9 unit tests (inverted icon ×4, aria-checked ×2, title ×2, click) |
| 2 | `role="switch"`, `aria-checked`, `aria-label` from i18n | ✅ COMPLIANT | Unit tests + E2E ARIA presence test |
| 3 | Click calls `toggleTheme()`, theme switches, icon updates | ✅ COMPLIANT | Unit click test + E2E toggle state cycle test |
| 4 | Keyboard operable (Enter/Space via native `<button>`) | ✅ COMPLIANT | Unit test asserts native `<button>` element |
| 5 | Desktop nav placement before locale switcher | ✅ COMPLIANT | Source inspection (Navigation.tsx lines 107-110) |
| 6 | Mobile nav placement after locale switcher | ✅ COMPLIANT | Source inspection (Navigation.tsx lines 207-221) |
| 7 | All design decisions followed | ✅ COMPLIANT | 7/7 design decisions confirmed in verify report |

## Files Changed (Final List)

| File | Action | Description |
|------|--------|-------------|
| `src/shared/components/Icons/Icons.tsx` | Modified | Added `SvgIcons.Sun` and `SvgIcons.Moon` (feather-style, 24x24, currentColor) |
| `src/lib/theme/ThemeToggle.tsx` | Created | `"use client"` component, ~40 lines, `useTheme` + `useTranslations`, `role="switch"`, inverted icons |
| `src/lib/theme/ThemeToggle.test.tsx` | Created | 9 unit tests covering all spec scenarios |
| `src/shared/components/Navigation/Navigation.tsx` | Modified | Added ThemeToggle in desktop (before locale) and mobile (after locale) nav |
| `src/shared/components/Navigation/Navigation.test.tsx` | Modified | Added ThemeToggle mock for test isolation |
| `tests/e2e/theme.spec.ts` | Modified | Added 2 E2E tests: toggle ARIA contract + toggle state cycling |

## Test Results

### Build
```
> tsc --noEmit && next build
✓ Compiled successfully in 5.6s
✓ Generating static pages (6/6)
```

### Unit Tests
```
Test Suites: 35 passed, 35 total
Tests:       197 passed, 197 total
```

### E2E Tests
```
Running 4 tests using 4 workers
  4 passed (12.0s)
```

**No regressions** — all pre-existing tests pass (197 unit, 2 E2E preserved).

## Spec Deltas Applied

### Parent spec: `openspec/specs/dark-mode/spec.md`

| Action | Details |
|--------|---------|
| **ADDED** | Requirement: ThemeToggle component (6 scenarios: inverted icon ×2, click toggles, ARIA contract, keyboard operable, desktop nav placement, mobile nav placement) |
| **MODIFIED** | None |
| **REMOVED** | None |

The delta spec was a pure additive delta. The ThemeToggle requirement was appended to the parent spec's Requirements section as a new `### Requirement: ThemeToggle component` entry with all 6 GIVEN/WHEN/THEN scenarios preserved. No existing requirement was altered.

### Design deviations noted during apply

- **Mock in Navigation.test.tsx**: The design didn't anticipate that Navigation tests would need a ThemeToggle mock (ThemeToggle consumes `useTheme` which requires `ThemeProvider` context). Mocking follows the existing pattern (Icons are also mocked). Dedicated `ThemeToggle.test.tsx` covers all component logic.
- **CSS transitions**: Minor addition of `transition-transform duration-300` on the icon span — non-breaking UX enhancement.

## Verification Verdict

**PASS** — All 4 tasks complete, all 7 spec scenarios COMPLIANT, all design decisions followed, no regressions (197/197 unit + 4/4 E2E), build passes cleanly. TDD protocol followed with full cycle evidence.

## Handoff Notes for Next Phases (Issue #75 / PR 1B)

1. **PR 1B scope**: Issue #75 builds on the dark-mode infrastructure. The toggle component is fully functional and verified — PR 1B can consume `useTheme()` and `<ThemeToggle />` directly.
2. **E2E keyboard test gap** (suggestion, not blocking): The spec scenario "Keyboard operable" is verified by the native `<button>` tag check in unit tests, but no E2E test simulates keyboard events on the toggle. Adding a Playwright test using `page.keyboard.press("Enter")` on the focused toggle would close the gap.
3. **Parent spec updated**: `openspec/specs/dark-mode/spec.md` now includes the ThemeToggle requirement with all scenarios — any future dark-mode work references the consolidated spec.
4. **Working artifacts preserved**: `openspec/changes/dark-mode-toggle/` remains in place alongside the archive copy.

## Archived Contents

| Artifact | Path |
|----------|------|
| ✅ proposal.md | `openspec/changes/archive/2026-05-29-dark-mode-toggle/proposal.md` |
| ✅ delta spec | `openspec/changes/archive/2026-05-29-dark-mode-toggle/specs/dark-mode/spec.md` |
| ✅ design.md | `openspec/changes/archive/2026-05-29-dark-mode-toggle/design.md` |
| ✅ tasks.md | `openspec/changes/archive/2026-05-29-dark-mode-toggle/tasks.md` |
| ✅ apply-progress.md | `openspec/changes/archive/2026-05-29-dark-mode-toggle/apply-progress.md` |
| ✅ verify.md | `openspec/changes/archive/2026-05-29-dark-mode-toggle/verify.md` |
| ✅ archive-report.md | `openspec/changes/archive/2026-05-29-dark-mode-toggle/archive-report.md` |

## Engram Observations

| Artifact | Observation ID |
|----------|---------------|
| proposal | #438 |
| spec (delta) | #439 |
| design | #441 |
| tasks | #442 |
| apply-progress | #443 |
| verify | #445 |
| archive (this report) | *(saved below)* |
