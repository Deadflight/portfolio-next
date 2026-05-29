# Apply Progress: Dark Mode Toggle

**Change**: dark-mode-toggle
**Mode**: Strict TDD
**PR base**: `main` (after PR 1A(i) merges)

## Completed Tasks

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | SunIcon/MoonIcon in Icons.tsx | ✅ | Added feather-style SVG icons (24x24, currentColor, strokeWidth=2) |
| 2.1 | ThemeToggle.test.tsx (RED) | ✅ | 9 tests: icon per theme, aria-checked, aria-label, role, title, keyboard, click toggle |
| 2.2 | ThemeToggle.tsx (GREEN) | ✅ | ~40 lines, useTheme + useTranslations, inverted icons, role=switch, smooth CSS transitions |
| 3.1 | Navigation integration | ✅ | Desktop: ThemeToggle before locale; Mobile: ThemeToggle after locale. Mocked in Navigation.test |
| 4.1 | E2E tests | ✅ | 2 new E2E tests verifying ARIA contract + toggle state cycling |

## TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 1.1 | N/A (no test needed for icons) | N/A | ✅ 26/26 | N/A | ✅ | N/A | N/A |
| 2.1-2.2 | `src/lib/theme/ThemeToggle.test.tsx` | Unit | N/A (new file) | ✅ Written | ✅ 9/9 passed | ✅ 9 cases (icon render ×2, aria-checked ×2, click, aria-label, title ×2, keyboard) | ✅ Clean |
| 3.1 | `src/shared/components/Navigation/Navigation.test.tsx` | Unit | ✅ 16/16 | ✅ Approval (add mock) | ✅ 16/16 passed | ➖ Single (structural) | ✅ Added ThemeToggle mock |
| 4.1 | `tests/e2e/theme.spec.ts` | E2E | N/A (new tests added) | ✅ Written | ✅ 4/4 passed | ✅ 2 cases (ARIA presence + toggle cycle) | ➖ None needed |

## Test Summary

- **Total unit tests**: 197 passing (35 suites) — 0 regressions
- **Total E2E tests**: 4 passing — 2 new (toggle ARIA presence, toggle state cycle) + 2 existing
- **Layers used**: Unit (197), E2E (4)
- **Safety net pre-existing**: act() warnings in ThemeProvider tests — pre-existing, not introduced

## Files Changed

| File | Action | What Was Done |
|------|--------|---------------|
| `src/shared/components/Icons/Icons.tsx` | Modified | Added `SvgIcons.Sun` and `SvgIcons.Moon` (feather-style, 24x24, currentColor) |
| `src/lib/theme/ThemeToggle.tsx` | Created | "use client" component, useTheme + useTranslations, role=switch, inverted icons |
| `src/lib/theme/ThemeToggle.test.tsx` | Created | 9 unit tests covering all spec scenarios |
| `src/shared/components/Navigation/Navigation.tsx` | Modified | Added ThemeToggle in desktop (before locale) and mobile (after locale) nav |
| `src/shared/components/Navigation/Navigation.test.tsx` | Modified | Added ThemeToggle mock for test isolation |
| `tests/e2e/theme.spec.ts` | Modified | Added 2 E2E tests: toggle ARIA contract + toggle state cycling |
| `openspec/changes/dark-mode-toggle/tasks.md` | Modified | Marked all tasks [x] |

## Deviations from Design

**Mock in Navigation.test.tsx**: The design didn't anticipate that Navigation tests would need a ThemeToggle mock. This is expected — ThemeToggle consumes useTheme which requires ThemeProvider context. Mocking the child component in Navigation tests follows the existing pattern (Icons are also mocked). The dedicated ThemeToggle.test.tsx covers all component logic.

## Issues Found

None.

## Workload / PR Boundary

- **Mode**: single PR (under 200 lines)
- **Chain strategy**: stacked-to-main — PR 1A(ii), base = `main` (after PR 1A(i) merges)
- **Estimated review budget**: ~150 lines changed
- **Status**: 4/4 tasks complete. Ready for `sdd-verify`.
