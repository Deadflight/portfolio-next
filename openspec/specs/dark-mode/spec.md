# Dark Mode Specification

## Purpose

CSS + React infrastructure for dark mode theming via CSS custom properties. Provides `ThemeProvider` context with preference persistence (`portfolio-theme`) and system preference fallback, with flash-free hydration via inline `<script>`.

## Requirements

### Requirement: ThemeProvider with CSS Custom Properties

The system MUST provide a `<ThemeProvider>` context managing `"light" | "dark"` theme via `.dark` class on `<html>`. It MUST:
- Read initial preference from `prefers-color-scheme` on first visit
- Persist user choice to `localStorage` under key `portfolio-theme`
- Respect stored preference over system preference on return visits
- Rehydrate before first paint via synchronous inline `<script>` in `<head>`
- Listen for system preference changes when no stored preference exists

#### Scenario: System preference respected on first visit

- GIVEN first visit with `prefers-color-scheme: dark`
- WHEN the page loads
- THEN `<html>` has class `dark` AND no flash of light mode occurs

#### Scenario: localStorage override

- GIVEN user previously stored `portfolio-theme: "light"`
- WHEN returning with `prefers-color-scheme: dark`
- THEN page loads in light mode

#### Scenario: Toggle click

- GIVEN page in light mode
- WHEN `toggleTheme()` is called
- THEN `<html>` receives class `dark`, localStorage set to `"dark"`

#### Scenario: localStorage blocked

- GIVEN browser blocks localStorage
- WHEN toggle is clicked
- THEN dark mode applies for session, no error thrown

#### Scenario: System preference change

- GIVEN no stored preference
- WHEN system color scheme changes
- THEN theme updates automatically via media query listener

### Requirement: useTheme hook

The system MUST export `useTheme()` returning `{ theme, toggleTheme }`. It MUST throw if used outside `<ThemeProvider>`.

#### Scenario: Hook guard

- GIVEN component rendered outside `<ThemeProvider>`
- WHEN `useTheme()` is called
- THEN an error is thrown

### Requirement: CSS refactor in globals.css

The system MUST replace hardcoded hex in `@layer base` body (`background-color`, `color`) and `@layer components` (`.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.link-text`) with `var(--color-*)` references. A `.dark` block MUST override theme tokens:

| Token | Dark Value |
|-------|-----------|
| `--color-background-main` | `#1a1a2e` |
| `--color-text-main` | `#e4e4e7` |
| `--color-primary-brand` | `#a8a8b3` |
| `--color-secondary` | `#4a4e69` |
| `--color-accent` | `#6b7280` |

Shadow overrides SHALL use darker rgba values. The dead HSL-based `.dark` block SHALL be removed.

#### Scenario: Dark palette renders

- GIVEN `.dark` class on `<html>`
- WHEN any component using `bg-background-main` or `.card` renders
- THEN colors resolve to dark palette values

### Requirement: Inline script in layout.tsx

The system MUST include a synchronous inline `<script>` in `<head>` that reads `localStorage` then falls back to `prefers-color-scheme` to set `.dark` class before React hydrates.

#### Scenario: JavaScript disabled

- GIVEN JS is disabled
- WHEN page loads
- THEN `prefers-color-scheme` is respected via inline script, toggle UI hidden

### Requirement: i18n messages

Both `messages/en.json` and `messages/es.json` MUST include:
- `common.toggleDarkMode`
- `common.lightMode`
- `common.darkMode`

#### Scenario: Keys present in both locales

- GIVEN both locale files
- WHEN inspected
- THEN all three keys exist with translated values

### Requirement: ThemeToggle component

The system MUST provide a `<ThemeToggle />` client component consuming `useTheme()` that renders `<SvgIcons.Sun />` when `theme === "dark"` and `<SvgIcons.Moon />` when `theme === "light"` (inverted: the icon represents the mode you switch TO). It MUST have `role="switch"`, `aria-checked` reflecting whether dark mode is active, `aria-label` from i18n `common.toggleDarkMode`, and `title` from `common.lightMode`/`common.darkMode`. Clicking MUST call `toggleTheme()`. Size MUST be 24x24 fixed, matching adjacent nav icons.

The system MUST insert `<ThemeToggle />` in the desktop nav `<ul>` immediately before the locale switcher `<li>`, and in the mobile nav `<ul>` immediately after the locale switcher `<button>` `<li>`.

#### Scenario: Inverted icon per theme

- GIVEN theme is `"dark"`
- WHEN `<ThemeToggle />` renders
- THEN the Sun icon is shown (represents switching TO light)
- AND `aria-checked` is `true`, `title` is `"Light mode"`

- GIVEN theme is `"light"`
- WHEN `<ThemeToggle />` renders
- THEN the Moon icon is shown (represents switching TO dark)
- AND `aria-checked` is `false`, `title` is `"Dark mode"`

#### Scenario: Click toggles theme

- GIVEN `<ThemeToggle />` rendered in light mode showing Moon
- WHEN the button is clicked
- THEN `toggleTheme()` fires, theme becomes `"dark"`, icon switches to Sun, `aria-checked` becomes `true`

#### Scenario: ARIA contract

- GIVEN `<ThemeToggle />` rendered
- THEN `role` is `"switch"`, `aria-label` reads translated `"Toggle dark mode"`, and both attributes update when theme changes

#### Scenario: Keyboard operable

- GIVEN `<ThemeToggle />` in tab order
- WHEN user presses Enter or Space
- THEN theme toggles identically to click

#### Scenario: Desktop nav placement

- GIVEN desktop nav `<ul>` renders
- THEN `<ThemeToggle />` `<li>` immediately precedes the locale switcher `<li>`

#### Scenario: Mobile nav placement

- GIVEN mobile nav `<ul>` renders
- THEN `<ThemeToggle />` `<li>` immediately follows the locale switcher `<button>` `<li>`
