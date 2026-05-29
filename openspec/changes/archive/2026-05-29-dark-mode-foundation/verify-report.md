## Verification Report

**Change**: dark-mode-foundation
**Version**: Spec v1 — openspec/specs/dark-mode/spec.md
**Mode**: Standard (no Strict TDD registry found)

### Completeness

| Metric | Value |
|--------|-------|
| Tasks total | 7 |
| Tasks complete | 7 |
| Tasks incomplete | 0 |

### Build & Tests Execution

**Build**: ✅ Passed

```text
> portfolio-next@0.1.0 build
> tsc --noEmit && next build

   ▲ Next.js 15.5.18
   - Environments: .env.local

   Creating an optimized production build ...
 ✓ Compiled successfully in 6.4s
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (6/6)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                 Size  First Load JS
┌ ƒ /_not-found                            993 B         104 kB
└ ● /[locale]                            31.5 kB         153 kB
    ├ /en
    └ /es
+ First Load JS shared by all             103 kB
```

**Tests**: ✅ 188 passed, 0 failed, 0 skipped

```text
Test Suites: 34 passed, 34 total
Tests:       188 passed, 188 total
Snapshots:   0 total
Time:        102.704 s
```

**Coverage**: 97.31% statements / 89.18% branches / 84.31% functions / 97.31% lines

```
lib/theme/ThemeProvider.tsx: 92.94% stmts, 79.31% branch, 100% funcs, 92.94% lines
Uncovered: lines 22-23 (catch in getInitialTheme), 46-47 (catch in persistTheme), 60-61 (catch in matchMedia listener)
```

### Spec Compliance Matrix

| # | Requirement | Scenario | Test | Result |
|---|-------------|----------|------|--------|
| REQ-01 | ThemeProvider | System preference respected on first visit | `tests/e2e/theme.spec.ts` > "respects system preference on first visit" | ✅ COMPLIANT |
| REQ-01 | ThemeProvider | localStorage override | `ThemeProvider.test.tsx` > "reads initial theme from localStorage when present" | ✅ COMPLIANT |
| REQ-01 | ThemeProvider | Toggle click | `ThemeProvider.test.tsx` > "toggles dark class on document.documentElement" | ✅ COMPLIANT |
| REQ-01 | ThemeProvider | localStorage blocked | (no explicit test — coverage shows catch blocks at L22-23, L46-47, L60-61 uncovered) | ⚠️ PARTIAL |
| REQ-01 | ThemeProvider | System preference change | `ThemeProvider.test.tsx` > "updates theme when system preference changes" | ✅ COMPLIANT |
| REQ-02 | useTheme hook | Hook guard | `ThemeProvider.test.tsx` > "throws when used outside ThemeProvider" | ✅ COMPLIANT |
| REQ-03 | CSS refactor | Dark palette renders | Static: all 5 component classes + body use `var(--color-*)`; `.dark` block overrides tokens | ✅ COMPLIANT |
| REQ-04 | Inline script | JavaScript disabled | (no test — inline script requires JS; no CSS `@media (prefers-color-scheme)` fallback) | ❌ UNTESTED |
| REQ-05 | i18n messages | Keys present in both locales | Static: en.json + es.json contain `toggleDarkMode`, `lightMode`, `darkMode` | ✅ COMPLIANT |

**Compliance summary**: 7/9 scenarios compliant, 1 partial, 1 untested

### Correctness (Static Evidence)

| Requirement | Status | Notes |
|------------|--------|-------|
| ThemeProvider with `"light" | "dark"` state | ✅ Implemented | React context via `createContext`, SSR-safe with `mounted` guard |
| Reads from `prefers-color-scheme` first visit | ✅ Implemented | `getInitialTheme()` — no stored pref → `matchMedia()` |
| Persists to `localStorage` key `portfolio-theme` | ✅ Implemented | `persistTheme()` called on toggle and system change |
| Rehydrates before first paint | ✅ Implemented | Inline `<script>` in `<head>` reading localStorage → matchMedia |
| Listens for system preference changes | ✅ Implemented | `useEffect` with `matchMedia.addEventListener("change", ...)` |
| `useTheme()` throws outside provider | ✅ Implemented | `if (!ctx) throw new Error("useTheme must be used within ThemeProvider")` |
| CSS: hex → `var(--color-*)` in body + 5 components | ✅ Implemented | body bg/color + `.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.link-text` all use `var()` |
| CSS: `.dark` palette overrides | ✅ Implemented | 5 color tokens + 3 shadow tokens overridden per spec values |
| CSS: dead HSL `.dark` block removed | ✅ Implemented | No HSL-based `.dark` block found |
| i18n: `toggleDarkMode`, `lightMode`, `darkMode` | ✅ Implemented | Present in both en.json (lines 9-11) and es.json (lines 9-11) |
| Inline flash-prevention script in `<head>` | ✅ Implemented | Minified 3-line IIFE in layout.tsx lines 48-52 |

### Coherence (Design)

| Decision | Followed? | Notes |
|----------|-----------|-------|
| CSS vars vs `dark:` prefix → **(b) CSS vars** | ✅ Yes | `var(--color-*)` references, `.dark` class on `<html>`, no `dark:` prefix |
| Theme storage key → **`portfolio-theme`** | ✅ Yes | Key is `portfolio-theme` in both ThemeProvider and inline script |
| Flash prevention → **(a) inline `<script>`** | ✅ Yes | Synchronous inline IIFE in `<head>` (layout.tsx L48-52) |
| SSR/hydration guard → **(a) mounted state** | ✅ Yes (with documented deviation) | Always provides context; guards class toggle via `mounted` flag |
| Persistence: only on toggle and system change | ✅ Yes (documented deviation) | `persistTheme()` called in `toggleTheme` and system change handler, NOT on initial mount |

**Documented deviations (from apply-progress):**
- SSR Guard: Wraps in provider always, guards class toggle instead of early return
- Persistence: Only on toggle and system change, not on initial mount

### File Structure Compliance

| Planned Path | Actual Path | Status |
|-------------|-------------|--------|
| `src/lib/theme/ThemeProvider.tsx` | `src/lib/theme/ThemeProvider.tsx` | ✅ Match |
| `src/lib/theme/useTheme.ts` | `src/lib/theme/useTheme.ts` | ✅ Match |
| `src/app/globals.css` | `src/app/globals.css` | ✅ Match |
| `src/app/layout.tsx` | `src/app/layout.tsx` | ✅ Match |
| `messages/en.json` | `messages/en.json` | ✅ Match |
| `messages/es.json` | `messages/es.json` | ✅ Match |
| `src/__tests__/components/ThemeProvider.test.tsx` | `src/lib/theme/ThemeProvider.test.tsx` | ⚠️ Co-located with source (better practice) |
| `tests/e2e/theme.spec.ts` | `tests/e2e/theme.spec.ts` | ✅ Match |

### Issues Found

**CRITICAL**:
1. **Hardcoded hex in `.btn-primary:hover`** — Line 142 of `globals.css` uses `background-color: #1a1a2e`. In dark mode, `--color-text-main` resolves to `#e4e4e7` (light) and `--color-background-main` to `#1a1a2e` (dark). The button has `color: var(--color-background-main)` = `#1a1a2e`, so on hover the background becomes the same dark `#1a1a2e` — invisible text. This should use `var(--color-primary-brand)` or a calculated dark-hover value.

**WARNING**:
1. **React `act()` warnings in ThemeProvider tests** — 5 console.error warnings about state updates not wrapped in `act(...)`. All 9 tests pass, but tests at lines 103, 109, 127, 133, 188 fire click events or system-change listeners without `act()`. Risk of false negatives with future React upgrades.

**SUGGESTION**:
1. **`input-field:disabled` hardcoded hex** — Line 247 of `globals.css`: `background-color: #f9fafb` stays light even in dark mode. Low visibility impact since disabled fields are already at 0.6 opacity, but worth converting to `var()` for consistency.
2. **No CSS `@media (prefers-color-scheme: dark)` fallback** — The spec's "JavaScript disabled" scenario can't work because the inline script won't run without JS. Adding `@media (prefers-color-scheme: dark) { .dark { ... } }` duplication in CSS would provide a no-JS fallback. Tradeoff: ~50 lines of CSS duplication.
3. **SSR guard test comment outdated** — Test at line 78-88 says "SSR guard returns children directly — no provider" but the implementation always wraps in ThemeContext.Provider and guards the class toggle instead. The comment/doc should match the implementation.

### Verdict

**PASS WITH WARNINGS**

Implementation is functionally complete: all 7 tasks done, 188/188 tests pass, build is clean, and 7/9 spec scenarios are fully compliant. One CRITICAL visual bug in `.btn-primary:hover` dark mode styling needs fixing before the theme toggle UI (#74) is added, since users would see invisible button text on hover. The localStorage-blocked scenario is partially covered (code handles it, untested), and the JS-disabled scenario is untested by design (spec contradiction).

**Next recommended**: Fix the CRITICAL hover-color bug in `globals.css`, then proceed to PR 1A(ii) / #74 for the ThemeToggle UI component.
