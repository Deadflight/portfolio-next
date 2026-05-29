# Design: Dark Mode Foundation

## Technical Approach

CSS Custom Properties strategy (AD-1 from master design). Override `--color-*` tokens in a `.dark` class on `<html>` — no `dark:` prefix needed anywhere. Components reference `var(--color-*)` via Tailwind v4 `@theme` tokens (`bg-background-main`, etc.) and the five `@layer components` classes (`.card`, `.btn-primary`, `.btn-secondary`, `.input-field`, `.link-text`) currently using hardcoded hex. ThemeProvider React context manages state with localStorage persistence (`portfolio-theme`), `prefers-color-scheme` fallback, and a sync inline `<script>` in `<head>` to prevent flash of wrong theme before hydration. Full implementation per `openspec/analiza-proyecto-mejora/design.md` §Dark Mode Design.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|----------|---------|--------|-----------|
| CSS vars vs `dark:` prefix | (a) `dark:` on every element (b) CSS vars on `.dark` | **(b) CSS vars** | Zero component changes; Tailwind v4 `@theme` tokens resolve automatically |
| Theme storage key | `portfolio-theme` vs `theme-preference` | **`portfolio-theme`** | Namespaced to project; avoids collision with other tools |
| Flash prevention | (a) inline `<script>` (b) next-themes (c) no guard | **(a) inline script** | Zero dependency; runs before React hydration; 5 LoC |
| SSR/hydration guard | (a) `mounted` state (b) suppressHydrationWarning | **(a) mounted state** | Returns children without provider context until mounted; prevents mismatch on server-rendered content |

## Data Flow

```
[Inline <script> in <head>]          ← sync, before React
  │ localStorage → matchMedia → .dark class on <html>
  ▼
[ThemeProvider (React Context)]       ← async, after hydration
  │ state: "light" | "dark"
  │ init: getInitialTheme() → localStorage → matchMedia → "light"
  │ toggleTheme() → setState → update <html> class → write localStorage
  │ useEffect: system preference listener (when no stored pref)
  ▼
[useTheme() hook]                     ← consumed by ThemeToggle (#74)
  │ throws if used outside <ThemeProvider>
  ▼
[CSS Custom Properties]              ← reactive via CSS cascade
  :root { --color-background-main: #f2e9e4; ... }
  .dark { --color-background-main: #1a1a2e; ... }
  body { background-color: var(--color-background-main); }
```

## File Changes

| File | Action | Lines Δ | Description |
|------|--------|---------|-------------|
| `src/lib/theme/ThemeProvider.tsx` | Create | ~55 | React context + SSR guard + localStorage + system pref listener |
| `src/lib/theme/useTheme.ts` | Create | ~8 | Hook wrapping `useContext(ThemeContext)` with throw guard |
| `src/app/globals.css` | Modify | ~55 | Replace hardcoded hex with `var(--color-*)` in 5 component classes; add `.dark` palette overrides; remove dead HSL `.dark` block |
| `src/app/layout.tsx` | Modify | ~20 | Import ThemeProvider, wrap children, add inline flash-guard script in `<head>` |
| `messages/en.json` | Modify | +4 | Add `common.toggleDarkMode`, `.lightMode`, `.darkMode` |
| `messages/es.json` | Modify | +4 | Same keys, Spanish translations |
| `src/__tests__/components/ThemeProvider.test.tsx` | Create | ~70 | Unit tests for init, toggle, localStorage, SSR, matchMedia |
| `tests/e2e/theme.spec.ts` | Create | ~40 | E2E: system pref detection, toggle + reload persistence |

Total estimated: ~256 lines added/changed. Within PR 1A(i) budget.

## Interfaces / Contracts

```typescript
type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// useTheme() — typed hook
function useTheme(): ThemeContextValue;
// Throws: "useTheme must be used within ThemeProvider"
```

Storage key constant: `const STORAGE_KEY = "portfolio-theme"` (centralized in ThemeProvider).

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit (Jest) | Initial state (light by default, dark if matchMedia) | Render consumer component inside ThemeProvider, assert context value |
| Unit (Jest) | Toggle updates `<html>` class | `render(<ThemeProvider><TestConsumer /></ThemeProvider>)`, simulate toggle, assert `document.documentElement.classList.contains("dark")` |
| Unit (Jest) | localStorage persistence | Mock `localStorage.getItem`/`setItem`, verify key `portfolio-theme` written on toggle |
| Unit (Jest) | SSR guard | Mock `window === undefined`, assert returns `"light"` without error |
| Unit (Jest) | System preference listener | Mock `matchMedia` with `addEventListener`, verify theme updates on change event (only when no stored pref) |
| Unit (Jest) | useTheme throws outside provider | Render consumer outside ThemeProvider, assert error thrown |
| E2E (Playwright) | System preference detection | `page.emulateMedia({ colorScheme: 'dark' })`, navigate to `/`, assert `<html class="dark">` |
| E2E (Playwright) | Toggle + reload persistence | Toggle via script (no UI yet → `page.evaluate(() => toggleTheme())`), reload, assert preference persists |

## Migration / Rollout

No migration required. New files add capabilities without changing existing behavior. Light mode renders identically — only new `.dark` class triggers palette changes. Feature is inert until ThemeToggle is added in PR 1A(ii) (#74), though dark mode can be verified via DevTools by adding `.dark` class to `<html>`.

## Open Questions

None.
