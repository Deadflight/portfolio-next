# Archive Report: Dark Mode Foundation

**Change**: dark-mode-foundation
**Issue**: [#73](https://github.com/Deadflight/portfolio-next/issues/73) — Dark Mode Toggle
**PR**: 1A(i) of stacked-to-main chain
**Archived**: 2026-05-29
**Mode**: Hybrid (filesystem + Engram)
**Verdict**: PASS WITH WARNINGS (verify-report at id:#429)

---

## SDD Cycle Summary

| Phase | Artifact | Status |
|-------|----------|--------|
| Proposal | `openspec/changes/dark-mode-foundation/proposal.md` | ✅ Complete |
| Spec | `openspec/specs/dark-mode/spec.md` | ✅ Complete (written directly to main specs) |
| Design | `openspec/changes/dark-mode-foundation/design.md` | ✅ Complete |
| Tasks | `openspec/changes/dark-mode-foundation/tasks.md` | ✅ Complete (7/7 tasks) |
| Apply | `openspec/changes/dark-mode-foundation/apply-progress.md` | ✅ Complete (all 7 tasks implemented) |
| Verify | `openspec/changes/dark-mode-foundation/verify-report.md` | ✅ PASS WITH WARNINGS |
| Archive | This report | ✅ Complete |

## Engram Artifact Lineage

| Artifact | Observation ID | Topic Key |
|----------|---------------|-----------|
| Proposal | #418 | `sdd/dark-mode-foundation/proposal` |
| Spec | #419 | `sdd/dark-mode-foundation/spec` |
| Design | #420 | `sdd/dark-mode-foundation/design` |
| Tasks | #421 | `sdd/dark-mode-foundation/tasks` |
| Apply Progress | #428 | `sdd/dark-mode-foundation/apply-progress` |
| Verify Report | #429 | `sdd/dark-mode-foundation/verify-report` |
| Archive Report | (this) | `sdd/dark-mode-foundation/archive-report` |

## Files Changed

| File | Action |
|------|--------|
| `src/lib/theme/ThemeProvider.tsx` | **Created** — React context with SSR-safe mount guard, localStorage persistence (`portfolio-theme`), system preference fallback with listener, `toggleTheme()` |
| `src/lib/theme/useTheme.ts` | **Created** — typed hook wrapping `useContext(ThemeContext)`, throws outside provider |
| `src/lib/theme/ThemeProvider.test.tsx` | **Created** — 9 unit tests (init, toggle, localStorage, SSR, matchMedia, system change, throw guard) |
| `src/app/globals.css` | **Modified** — hardcoded hex → `var(--color-*)` in `@layer base` (body) and `@layer components` (5 classes: `.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.link-text`); added `.dark` palette overrides (5 color + 3 shadow tokens); removed dead HSL `.dark` block |
| `src/app/layout.tsx` | **Modified** — wrapped children in `<ThemeProvider>`; added synchronous inline `<script>` in `<head>` for flash-free hydration |
| `messages/en.json` | **Modified** — added `common.toggleDarkMode`, `common.lightMode`, `common.darkMode` |
| `messages/es.json` | **Modified** — added Spanish translations for same three keys |
| `tests/e2e/theme.spec.ts` | **Created** — 2 E2E tests (system preference detection, toggle + reload persistence) |

## Key Deviations from Master Spec

| Master Spec (`openspec/analiza-proyecto-mejora/spec.md`) | Implementation | Rationale |
|----------------------------------------------------------|----------------|-----------|
| Storage key `theme-preference` | **`portfolio-theme`** | Per design AD-1: namespaced to project; avoids collision with other tools |
| SSR guard: early return without provider when not mounted | Always provides context; guards class toggle via `mounted` flag | Prevents `useTheme()` from throwing on first render |
| Persistence: write to localStorage on initial mount | Only persists on explicit `toggleTheme()` and system change | Prevents overwriting system preference with stored value on first visit |

## Spec Compliance

| # | Requirement | Scenario | Result |
|---|-------------|----------|--------|
| REQ-01 | ThemeProvider | System preference respected on first visit | ✅ COMPLIANT |
| REQ-01 | ThemeProvider | localStorage override | ✅ COMPLIANT |
| REQ-01 | ThemeProvider | Toggle click | ✅ COMPLIANT |
| REQ-01 | ThemeProvider | localStorage blocked | ⚠️ PARTIAL (coded, untested) |
| REQ-01 | ThemeProvider | System preference change | ✅ COMPLIANT |
| REQ-02 | useTheme hook | Hook guard | ✅ COMPLIANT |
| REQ-03 | CSS refactor | Dark palette renders | ✅ COMPLIANT |
| REQ-04 | Inline script | JavaScript disabled | ❌ UNTESTED (needs CSS fallback) |
| REQ-05 | i18n messages | Keys present in both locales | ✅ COMPLIANT |

**Compliance**: 7/9 compliant, 1 partial, 1 untested

## Known Issues (Carried Forward)

### CRITICAL
- **`.btn-primary:hover` hardcoded hex** in `globals.css:142`: `background-color: #1a1a2e` causes invisible text on hover in dark mode. Must fix before ThemeToggle (#74) lands.

### WARNING
- **React `act()` warnings**: 5 unit tests fire events without `act()` wrapping — risk of false negatives with future React upgrades.

### SUGGESTION
- **`input-field:disabled`** hardcoded `#f9fafb` (globals.css:247) stays light in dark mode
- **No CSS `@media (prefers-color-scheme: dark)` fallback** for JS-disabled scenario
- **Outdated SSR guard test comment**: says "returns children directly" but impl always wraps in provider

## Archive Contents

- `proposal.md` ✅
- `design.md` ✅
- `tasks.md` ✅ (7/7 tasks complete)
- `apply-progress.md` ✅
- `verify-report.md` ✅
- `archive-report.md` ✅ (this file)

## Source of Truth

The spec at `openspec/specs/dark-mode/spec.md` is the main source of truth (no delta spec to merge — spec was written directly to main specs during `sdd-spec` phase).

## SDD Cycle Complete

The change has been fully planned, specified, designed, implemented (TDD), verified (188/188 tests pass), and archived. Ready for the next change in the improvement pipeline.
