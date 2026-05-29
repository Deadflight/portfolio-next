# Delta for dark-mode

## ADDED Requirements

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

## MODIFIED Requirements

None — all existing requirements in `openspec/specs/dark-mode/spec.md` are unchanged. The ThemeToggle is an additive consumer of the existing `useTheme()` API and does not alter any existing behavior.

## REMOVED Requirements

None.
