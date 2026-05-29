# Tasks: Dark Mode Foundation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~256 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Theme infrastructure + CSS + Messages + Tests | PR 1A(i) | base=main; single PR, ~256 lines |

## Phase 1: Foundation — Theme Infrastructure

- [ ] 1.1 Create `src/lib/theme/ThemeProvider.tsx` — React context with SSR-mounted guard, localStorage key `portfolio-theme`, `prefers-color-scheme` fallback, and `toggleTheme()`
- [ ] 1.2 Create `src/lib/theme/useTheme.ts` — hook wrapping `useContext(ThemeContext)`, throws if used outside `<ThemeProvider>`

## Phase 2: CSS + Wiring

- [ ] 2.1 Modify `src/app/globals.css` — replace hardcoded hex with `var(--color-*)` in `@layer base` and 5 component classes (`.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.link-text`); add `.dark` palette overrides; remove dead HSL `.dark` block
- [ ] 2.2 Modify `src/app/layout.tsx` — wrap `<body>` children in `<ThemeProvider>`; add inline `<script>` in `<head>` that reads `localStorage` → `matchMedia` → applies `.dark` class before hydration
- [ ] 2.3 Add `common.toggleDarkMode`, `common.lightMode`, `common.darkMode` to `messages/en.json` and `messages/es.json`

## Phase 3: Testing & Verification

- [ ] 3.1 Create `src/__tests__/components/ThemeProvider.test.tsx` — unit tests for: default light theme, toggle updates class + localStorage, reads stored preference, SSR guard, matchMedia listener, useTheme throws outside provider
- [ ] 3.2 Create `tests/e2e/theme.spec.ts` — E2E tests for: system preference detection via `page.emulateMedia`, toggle + reload persistence via `page.evaluate`
