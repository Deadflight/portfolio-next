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
