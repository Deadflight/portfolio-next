# Design: Stability & Quality

**Issue**: [#75](https://github.com/Deadflight/portfolio-next/issues/75) | **PR**: 1B | **Mode**: hybrid (Engram + filesystem)

## Technical Approach

Four independent streams merged in one PR:

1. **Error resilience** — class `ErrorBoundary` wrapping each of 6 page sections, plus a root `[locale]/error.tsx` for catastrophic failures
2. **Typed GA events** — `events.ts` with event-name constants + `sendEvent()`; wire into DownloadLink, ContactForm, Navigation
3. **Hygiene fixes** — rename `analitycs/` → `analytics/`, rename `skilss.spec.ts`, fix nav `#home` label, delete dead `constants/skills.ts`
4. **Enforcement** — coverage thresholds in `jest.config.ts`, i18n keys for error fallback UI

Architecture principle: **additive** — no existing component changes other than wrapping and GA wiring. This keeps rollback safe and review focused.

## Architecture Decisions

### Decision: ErrorBoundary placement

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Single error boundary for whole page | One crash kills everything, defeats purpose | ❌ |
| Wrap each section individually in `page.tsx` | More wrappers but isolated failures | ✅ |
| Boundary inside each child component | Duplication, changes every component | ❌ |

### Decision: ErrorBoundary class vs hook

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Hooks + functional | Cannot implement `componentDidCatch` — React requires class component | ❌ |
| Class component | Only way to catch render errors in React 19 | ✅ |

### Decision: GA events module location

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Inline `gtag()` calls per component | Duplicated dev/SSR guards, no type safety | ❌ |
| `lib/ga/events.ts` with typed constants + `sendEvent()` | Single SSR guard, dev vs prod routing, autocomplete | ✅ |

### Decision: Data dedup strategy

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep `constants/skills.ts` and redirect | Maintains dead code, confuses devs | ❌ |
| Delete `constants/skills.ts` + update imports | Clean, canonical source is `constants/data/*/skills.data.ts` | ✅ |

`constants/skills.ts` is already unreachable — no file imports it. No import updates needed; just delete the file.

### Decision: Coverage thresholds

| Threshold | Meaning |
|-----------|---------|
| `branches: 80` | Conditionals tested |
| `functions: 75` | Functions covered |
| `lines: 80` | Statement coverage |
| `statements: 80` | Overall |

Enforced in `jest.config.ts` via `coverageThreshold`. CI will fail below these.

## Data Flow

```
ErrorBoundary flow:
  Section render → Error thrown → componentDidCatch catches → fallback UI (role="alert")
  User clicks "Retry" → setState(hasError: false) → re-renders section
  onError callback → sendErrorEvent via GA events

GA events flow:
  Component (DownloadLink/ContactForm/Navigation)
    → sendEvent(eventName, params) [imported from lib/ga/events]
      → SSR guard: return if typeof window === "undefined"
      → Dev guard: console.log("[GA]", eventName, params)
      → Production: window.gtag("event", eventName, params)

Typo fix Data flow:
  Rename: src/app/components/analitycs/ → src/app/components/analytics/
  Rename: tests/e2e/skilss.spec.ts → tests/e2e/skills.spec.ts
  Fix: Navigation href="#home" → label matches (add i18n key "links.home")
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/shared/components/ErrorBoundary/ErrorBoundary.tsx` | Create | Class component, `role="alert"`, retry button, `onError` prop |
| `src/shared/components/ErrorBoundary/ErrorBoundary.test.tsx` | Create | Unit tests: catches error, shows fallback, retry works, onError called |
| `src/app/[locale]/error.tsx` | Create | Root error page, `useTranslations`, "Back to Home" link |
| `src/app/[locale]/page.tsx` | Modify | Wrap 6 sections: `<ErrorBoundary>` each |
| `src/app/[locale]/layout.tsx` | Modify | Import `ErrorBoundary` wrapper if needed for layout-level catch |
| `src/lib/ga/events.ts` | Create | `sendEvent(event, params)` + typed event name constants |
| `src/lib/ga/gatag.ts` | Modify | Export `gtag` type, keep backward compat |
| `src/lib/ga/__tests__/gatag.test.ts` | Create | Unit test: SSR no-op, dev log, prod calls window.gtag |
| `src/app/components/analitycs/` → `analytics/` | Rename | Fix typo in folder name |
| `src/app/components/analytics/Analytics.tsx` | Modify | Update import from `@/lib/ga/gatag` (already correct — just path changes) |
| `src/app/layout.tsx` | Modify | Update import path from `analitycs/` → `analytics/` |
| `src/shared/components/Navigation/Navigation.tsx` | Modify | Wire `sendEvent("nav_click", ...)`, fix `#home` label |
| `src/app/components/shared/DownloadLink/DownloadLink.tsx` | Modify | Wire `sendEvent("download_cv", ...)` |
| `src/app/components/contact/ContactForm.tsx` | Modify | Wire `sendEvent("contact_submit", ...)` on success/failure |
| `tests/e2e/skilss.spec.ts` → `skills.spec.ts` | Rename | Fix typo in filename |
| `tests/e2e/error-boundary.spec.ts` | Create | Playwright E2E: inject error, verify fallback + retry |
| `src/constants/skills.ts` | Delete | Dead code — canonical data is in `src/constants/data/*/skills.data.ts` |
| `jest.config.ts` | Modify | Add `coverageThreshold` block |
| `messages/en.json` | Modify | Add `common.sectionError`, `common.retry`, `common.errorTitle` |
| `messages/es.json` | Modify | Same keys, Spanish translations |

## Interfaces / Contracts

```typescript
// src/lib/ga/events.ts
export const GA_EVENTS = {
  DOWNLOAD_CV: "download_cv",
  NAV_CLICK: "nav_click",
  CONTACT_SUBMIT: "contact_submit",
  ERROR_BOUNDARY: "error_boundary",
} as const;

export type GAEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

export function sendEvent(
  event: GAEventName,
  params?: Record<string, string | number | boolean>
): void;

// src/shared/components/ErrorBoundary/ErrorBoundary.tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

## Component Tree

```
[locale]/layout.tsx
  ├── NavigationExperience ← GA wired (nav_click)
  └── [locale]/page.tsx
      ├── <ErrorBoundary>
      │   └── ProfessionalIdentityHero
      │       └── DownloadLink ← GA wired (download_cv)
      ├── <ErrorBoundary>
      │   └── WorkExperienceShowcase
      ├── <ErrorBoundary>
      │   └── ProjectsShowCase
      ├── <ErrorBoundary>
      │   └── AboutMeShowcase
      ├── <ErrorBoundary>
      │   └── SkillsExperienceShowCase
      └── <ErrorBoundary>
          └── Contact
              └── ContactForm ← GA wired (contact_submit)
  └── Footer

[locale]/error.tsx (catches unhandled errors, translated, "Back to Home")
```

Error boundary wrappers are in `page.tsx` only — the `layout.tsx` already has its own error boundary via Next.js convention.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | ErrorBoundary | Render with child that throws → verify fallback visible, retry re-renders, `onError` called |
| Unit | `gatag.ts` | SSR env (mock `window`), dev env (`NODE_ENV=development`), prod env (`NODE_ENV=production`) — assert correct behavior |
| Unit | `events.ts` | `sendEvent` delegates correctly based on SSR/dev/prod |
| E2E | error-boundary | Navigate to page, inject JS error in a section, verify fallback UI + retry + other sections intact |
| E2E | Typo regression | Verify `analitycs/` URL 404s, `analytics/` resolves, `skills.spec.ts` runs |

## Migration / Rollout

No migration required. All changes are additive or file renames.

**Rollback**: Revert single commit. Renames are the only destructive ops — restore old names on revert.

## Open Questions

- None identified. Proposal + codebase exploration resolved all design unknowns.
