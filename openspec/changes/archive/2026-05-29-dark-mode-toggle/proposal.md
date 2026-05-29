# Proposal: Dark Mode Toggle

**Issue**: [#74](https://github.com/Deadflight/portfolio-next/issues/74) | **Lines**: ~163 | **Base**: `main` (after PR 1A(i)) | **Delivery**: PR 1A(ii) of stacked-to-main chain

## Intent

Add a Sun/Moon toggle button to the navigation bar so users can manually switch between light and dark themes. Depends on the ThemeProvider context and CSS var refactor delivered in PR 1A(i).

## Scope

| In | Out |
|----|-----|
| Sun + Moon SVG icons in `Icons.tsx` | Flash prevention (done in PR 1A(i)) |
| `ThemeToggle` client component with `role="switch"` | CSS var refactoring (done) |
| Desktop nav integration (next to locale switcher) | New i18n keys (already added) |
| Mobile nav integration (next to locale switcher) | Error boundaries, GA events |
| Unit tests for ThemeToggle | Any other PR 1B or Phase 2+ items |

## Capabilities

- **New**: None — this is pure UI integration of an existing capability (`dark-mode`)
- **Modified**: `dark-mode` — adds user-initiated toggle UX to the existing `useTheme()` hook

## Approach

1. Add `SvgIcons.Sun` and `SvgIcons.Moon` to `Icons.tsx` following the existing 24x24, `currentColor`, stroke-based pattern
2. Create `ThemeToggle.tsx` — `"use client"` component consuming `useTheme()`. Renders Sun in dark mode, Moon in light mode (inverted because the icon represents what you'll switch to). Uses `role="switch"`, `aria-checked`, `aria-label={common("toggleDarkMode")}`, with `title` attributes using `common.lightMode`/`common.darkMode`
3. Insert `<ThemeToggle />` in `Navigation.tsx` desktop `<ul>` (before locale switcher) and mobile `<ul>` (after locale switcher button, matching position)
4. Test at `src/lib/theme/ThemeToggle.test.tsx` — render, click toggles theme via `useTheme`, aria attributes reflect current state

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/shared/components/Icons/Icons.tsx` | Modified | +2 SVG icons (Sun, Moon) |
| `src/lib/theme/ThemeToggle.tsx` | New | Client component, ~35 lines |
| `src/shared/components/Navigation/Navigation.tsx` | Modified | +ThemeToggle in desktop & mobile nav |
| `src/lib/theme/ThemeToggle.test.tsx` | New | Unit tests, ~35 lines |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Import path mismatch | Low | Align with existing `@/lib/theme/` pattern |
| Accidental layout shift | Low | Icon has fixed 24x24 size, same as other nav icons |

## Rollback Plan

1. `git revert <commit>` — reverts all 4 files atomically
2. Delete `src/lib/theme/ThemeToggle.tsx` and test file
3. Remove `SvgIcons.Sun`, `SvgIcons.Moon` from Icons.tsx
4. Remove `<ThemeToggle />` from Navigation.tsx
5. Verify `npm run build` passes

Under 170 lines revert impact.

## Dependencies

- PR 1A(i) merged to `main` (provides `ThemeProvider`, `useTheme()`, CSS vars, i18n keys)

## Success Criteria

- [ ] `npm run build` passes
- [ ] Sun icon visible in dark mode, Moon icon in light mode
- [ ] Click toggles theme and `aria-checked` updates
- [ ] `aria-label` reads from `common.toggleDarkMode`
- [ ] Unit: renders correct icon per theme, click calls `toggleTheme`, focusable via keyboard
