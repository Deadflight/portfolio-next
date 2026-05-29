# Apply Progress: Dark Mode Foundation

**Change**: dark-mode-foundation
**Mode**: Strict TDD
**Status**: All 7 tasks complete

## Completed Tasks

| # | Task | Status |
|---|------|--------|
| 1.1 | Create `src/lib/theme/ThemeProvider.tsx` | ✅ Done |
| 1.2 | Create `src/lib/theme/useTheme.ts` | ✅ Done |
| 2.1 | Modify `src/app/globals.css` | ✅ Done |
| 2.2 | Modify `src/app/layout.tsx` | ✅ Done |
| 2.3 | Add i18n messages | ✅ Done |
| 3.1 | Create `src/lib/theme/ThemeProvider.test.tsx` | ✅ Done |
| 3.2 | Create `tests/e2e/theme.spec.ts` | ✅ Done |

## Files Changed

| File | Action | What Was Done |
|------|--------|---------------|
| `src/lib/theme/ThemeProvider.tsx` | Created | React context with SSR-safe mount guard, localStorage persistence (`portfolio-theme`), system preference fallback with listener, `toggleTheme()` |
| `src/lib/theme/useTheme.ts` | Created | Re-export of `useTheme` from ThemeProvider for clean imports |
| `src/lib/theme/ThemeProvider.test.tsx` | Created | 9 unit tests covering: default light, SSR guard, toggle class, localStorage write/read, system preference detection, system change listener, stored preference override, useTheme throws outside provider |
| `src/app/globals.css` | Modified | Removed dead HSL-based `.dark` block; replaced all hardcoded hex in `@layer base` (body, focus, skip-link) and `@layer components` (5 classes) with `var(--color-*)`; added `.dark` palette overrides with dark palette tokens and shadow overrides |
| `src/app/layout.tsx` | Modified | Added `ThemeProvider` import, wrapped `{children}` in `<ThemeProvider>`, added synchronous inline `<script>` in `<head>` to prevent flash of wrong theme |
| `messages/en.json` | Modified | Added `common.toggleDarkMode`, `common.lightMode`, `common.darkMode` |
| `messages/es.json` | Modified | Added Spanish translations for same three keys |
| `tests/e2e/theme.spec.ts` | Created | 2 E2E tests: system preference detection via `page.emulateMedia`, localStorage persistence across reload |

## TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 1.1 | `src/lib/theme/ThemeProvider.test.tsx` | Unit | ✅ 33/33 | ✅ Written | ✅ Passed | ✅ 9 cases | ✅ Clean |
| 1.2 | `src/lib/theme/useTheme.ts` | Unit | N/A (new) | ✅ Written | ✅ Passed | ➖ Single | ➖ None needed |
| 2.1 | N/A (CSS) | E2E | ✅ 33/33 | N/A (CSS) | ✅ Build | N/A (CSS) | ✅ Clean |
| 2.2 | N/A (layout) | E2E | ✅ 33/33 | N/A (layout) | ✅ Build | N/A (layout) | ✅ Clean |
| 2.3 | N/A (messages) | Manual | ✅ 33/33 | N/A (JSON) | ✅ Build | N/A (JSON) | ✅ Clean |
| 3.1 | `src/lib/theme/ThemeProvider.test.tsx` | Unit | ✅ 33/33 | ✅ Written | ✅ Passed | ✅ 9 cases | ✅ Clean |
| 3.2 | `tests/e2e/theme.spec.ts` | E2E | N/A (new) | ✅ Written | ✅ Build | ✅ 2 cases | ➖ None needed |

### Test Summary
- **Total tests written**: 11 (9 unit + 2 E2E)
- **Total tests passing**: 188 (179 existing + 9 new)
- **Layers used**: Unit (9), E2E (2)
- **Approval tests** (refactoring): None — CSS/layout changes verified by build
- **Pure functions created**: `getInitialTheme()`, `persistTheme()` (both internal to ThemeProvider)

## Deviations from Design
- **SSR Guard**: Design specified `if (!mounted) return <>{children}</>`. This caused `useTheme()` to throw because children render without context on first render. Fixed by always wrapping children in `<ThemeContext.Provider>`, but guarding the `document.documentElement.classList` toggle with `if (!mounted) return`. This ensures the provider is always available while preventing hydration mismatch on the class toggle.
- **Persistence strategy**: Design wrote to localStorage in the `[theme, mounted]` effect. This created a stored preference on first visit, defeating the system preference listener. Fixed by only persisting on explicit `toggleTheme()` and system preference changes (via the listener). Initial load does NOT write to localStorage.
- Type assertion `as MediaQueryListEvent` used in tests for the mock event object — this is a test-only deviation since `MediaQueryListEvent` constructor requires specific args in real browsers.

## Issues Found
None.

## Workload / PR Boundary
- Mode: Single PR (PR 1A(i) of dark-mode-foundation)
- Budget risk: Low (~256 lines estimated, under 400 limit)
- Status: Ready for verify
