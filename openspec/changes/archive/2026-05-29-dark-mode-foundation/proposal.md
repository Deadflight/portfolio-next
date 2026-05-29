# Proposal: Dark Mode Foundation

**Issue**: [#73](https://github.com/Deadflight/portfolio-next/issues/73) | **Lines**: ~201 | **Base**: `main` | **Delivery**: PR 1A(i) of stacked-to-main chain

## Intent

CSS + React infrastructure for dark mode. Replace hardcoded hex in `globals.css` with `var(--color-*)`, add `.dark` palette overrides, provide `ThemeProvider` context with localStorage persistence (`portfolio-theme`) and system preference fallback. Inline `<script>` in `<head>` prevents flash-of-wrong-theme. Toggle UI is deferred to PR 1A(ii) (#74).

## Scope

| In | Out |
|----|-----|
| `src/lib/theme/ThemeProvider.tsx` — context + SSR guard | Sun/Moon SVG icons (#74) |
| `src/lib/theme/useTheme.ts` — typed hook | `<ThemeToggle>` button (#74) |
| `src/app/globals.css` — hex→var, `.dark` overrides, remove dead HSL | Navigation.tsx integration (#74) |
| `src/app/layout.tsx` — ThemeProvider wrapper + inline script | Error boundaries, GA events, P0 fixes (separate PRs) |
| `messages/*.json` — +3 keys each locale | |
| `src/__tests__/components/ThemeProvider.test.tsx` — unit tests | |
| `tests/e2e/theme.spec.ts` — E2E tests | |

## Capabilities

- **New**: `dark-mode` — CSS custom property theming with preference persistence and system fallback
- **Modified**: None

## Approach

Override `--color-*` vars in `.dark` class on `<html>`. Existing Tailwind v4 `@theme` tokens (`bg-background-main`, etc.) react automatically. Hardcoded hex in `@layer components` (`.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.link-text`) replaced with `var(--color-*)`. No `dark:` prefix needed. Full design per `openspec/analiza-proyecto-mejora/design.md` (AD-1, Dark Mode Design).

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Missed CSS var in component class | Low | Only 5 classes — greppable |
| Flash before inline script | Low | Sync script in `<head>` before React |
| localStorage blocked | Low | Session-only, no error thrown |

## Rollback Plan

1. `git revert <commit>` — reverts all 7 files atomically
2. Delete `src/lib/theme/` directory
3. Remove test files
4. Verify `npm run build` passes

Under 250 lines revert impact. Fully reversible in one commit.

## Dependencies

None. Base = `main`. No external packages.

## Success Criteria

- [ ] `npm run build` passes
- [ ] Unit: ThemeProvider init, toggle, localStorage persistence, SSR guard
- [ ] E2E: system preference detected, toggle + reload persists
- [ ] No flash of wrong theme on cold load with dark OS preference
- [ ] All existing components render identically in light mode
- [ ] Dark palette renders when `.dark` applied via DevTools
