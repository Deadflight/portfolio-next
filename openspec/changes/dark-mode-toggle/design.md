# Design: Dark Mode Toggle

## Technical Approach

Additive implementation: four files touched (one new component, two modified, one new test). Zero new dependencies. The `ThemeToggle` component bridges `useTheme()` state into a `role="switch"` button with inverted Sun/Moon icons, placed in both desktop and mobile nav `<ul>` elements at positions specified by the delta spec.

## Architecture Decisions

### Decision: Icon-inverted rendering

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Sun in light, Moon in dark | Icon matches current theme but doesn't communicate the action | REJECTED |
| Sun in dark, Moon in light | Icon represents the mode you switch TO; `aria-checked` signals current state for AT | SELECTED |

**Rationale**: The spec mandates inverted icons. The icon is an affordance for the action (what happens on click), while `aria-checked` provides the current state for assistive technology. This matches the common dark-mode toggle pattern across the web.

### Decision: Standalone `<button>` with `role="switch"`

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `<button role="switch">` | Native keyboard handling (Enter/Space), accessible out of the box | SELECTED |
| Custom `<div>` with manual ARIA | Requires manual keyboard event wiring, no native focus management | REJECTED |

**Rationale**: `<button>` gives free keyboard operability (Enter, Space, focus ring) per WCAP. `role="switch"` tells AT this is a binary on/off control. `aria-checked` maps directly from `theme === "dark"`. Zero extra event handling.

### Decision: File location — `src/lib/theme/`

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `src/lib/theme/ThemeToggle.tsx` | Co-located with `useTheme()` consumer, avoids circular dep risk | SELECTED |
| `src/shared/components/` | Next to Navigation, but couples theme logic to shared components | REJECTED |

**Rationale**: ThemeToggle is a theme consumer, not a generic shared component. Co-locating with `ThemeProvider` keeps the theme module cohesive and importable via `@/lib/theme/`.

### Decision: Desktop nav placement order

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Before locale switcher | Nav links → ThemeToggle → Locale (global prefs grouped together) | SELECTED |
| After locale switcher | Reads as locale controls last, inconsistent with mobile | REJECTED |

**Rationale**: Spec and proposal both mandate before locale switcher. Logical grouping: theme first (global UX preference), then language (content preference). Mobile is inverted (after locale) to match the spec.

## Data Flow

```
User clicks ThemeToggle (button[role="switch"])
  │
  ▼
onClick → theme = useTheme().toggleTheme()
  │
  ▼
ThemeProvider → setTheme(prev => prev === "light" ? "dark" : "light")
  │               persistTheme(next) → localStorage.setItem("portfolio-theme", next)
  ▼
ThemeContext re-renders all consumers
  │
  ▼
ThemeToggle re-renders:
  theme === "dark" → <SvgIcons.Sun />,  aria-checked=true,  title="Light mode"
  theme === "light" → <SvgIcons.Moon />, aria-checked=false, title="Dark mode"
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/shared/components/Icons/Icons.tsx` | Modify | Add `SvgIcons.Sun` and `SvgIcons.Moon` — each 24x24, `currentColor`, `strokeWidth="2"`, `strokeLinecap="round"`, following existing feather-style pattern |
| `src/lib/theme/ThemeToggle.tsx` | Create | `"use client"` component, ~40 lines. Consumes `useTheme()`, renders current icon + ARIA attributes, calls `toggleTheme()` on click. No props |
| `src/shared/components/Navigation/Navigation.tsx` | Modify | Import `ThemeToggle` from `@/lib/theme/ThemeToggle`. Insert `<li><ThemeToggle /></li>` before locale switcher in desktop `<ul>`, and after locale switcher `<li>` in mobile `<ul>` |
| `src/lib/theme/ThemeToggle.test.tsx` | Create | Unit tests, ~40 lines. Follows same pattern as `ThemeProvider.test.tsx` |

## Interfaces / Contracts

No new public interfaces. The `ThemeToggle` component is internal to the nav module:

- **Props**: none (self-contained, reads from context via `useTheme()` and i18n via `useTranslations()`)
- **Imports**: `useTheme()` from `@/lib/theme/ThemeProvider`, `useTranslations` from `next-intl`
- **Consumes i18n keys** (already exist in `messages/en.json` and `messages/es.json`):
  - `common.toggleDarkMode` → `aria-label`
  - `common.lightMode` → `title` when theme is dark
  - `common.darkMode` → `title` when theme is light
- **Component tree** (flat, no nesting):
  ```
  ThemeProvider
    └── NavigationExperience
          └── <ul> (desktop or mobile)
                └── <li>
                      └── <ThemeToggle />
                            └── <button role="switch" aria-checked={...}>
                                  └── <SvgIcons.Sun | SvgIcons.Moon />
  ```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | Correct icon per theme | Wrap in `ThemeProvider` initialized to light → assert Moon renders; dark → assert Sun renders |
| Unit | Click toggles theme | Click button, assert `aria-checked` toggles, icon switches, theme changes |
| Unit | ARIA contract | Assert `role="switch"`, `aria-checked` matches dark-mode state, `aria-label` renders i18n value |
| Unit | Keyboard operability | `<button>` handles natively — verify Enter/Space trigger toggle without explicit handlers |

No integration or E2E tests needed. This is a pure consumer of existing `ThemeProvider` context.

## Migration / Rollout

No migration required. Feature merges to `main` directly; no feature flag, no data migration, no phased rollout.

## Open Questions

None — all requirements are resolved in the proposal and delta spec.
