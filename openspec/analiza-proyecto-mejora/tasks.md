# Tasks: Portfolio-Next Multi-Phase Improvements

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | **~1,900–2,200** (across all phases) |
| 400-line budget risk | **High** |
| Chained PRs recommended | **Yes** |
| Suggested split | PR 1A(i) → PR 1A(ii) → PR 1B → PR 2A → PR 2B → PR 2C(i) → PR 2C(ii) → PR 3 |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

> **Why stacked-to-main?** Each PR is independently reviewable and merges to main. No feature branch needed — the changes are additive (new routes, new components) and don't conflict with each other. Phase 1 must merge first since Phase 2/3 depend on it.

### Suggested Work Units

| Unit | Goal | PR | Lines |
|------|------|----|-------|
| 1 | Dark mode foundation (CSS vars + ThemeProvider) | PR 1A(i) | ~201 |
| 2 | Dark mode toggle UI (icons + ThemeToggle) | PR 1A(ii) | ~163 |
| 3 | Error boundaries, GA events, P0 fixes, coverage | PR 1B | ~280 |
| 4 | Blog: code infrastructure (types, MDX, pages, messages, nav) | PR 2A | ~390 |
| 5 | Blog: sample articles (4 markdown files, EN + ES) | PR 2B | ~320 |
| 6 | Project detail pages | PR 2C(i) | ~360 |
| 7 | Tag filtering | PR 2C(ii) | ~120 |
| 8 | Scroll-reveal animations + testimonials section | PR 3 | ~360 |

---

## PR Splitting Strategy Overview

```
main
 ├── PR 1A(i): Dark Mode Foundation (~201 lines)    ← Phase 1, chunk 1a
 ├── PR 1A(ii): Dark Mode Toggle UI (~163 lines)     ← Phase 1, chunk 1b
 ├── PR 1B: Stability & Quality (~280 lines)         ← Phase 1, chunk 2
 ├── PR 2A: Blog Code (~390 lines)                   ← Phase 2, chunk 1
 ├── PR 2B: Blog Content (~320 lines)                ← Phase 2, chunk 2
 ├── PR 2C(i): Project Details (~360 lines)          ← Phase 2, chunk 3a
 ├── PR 2C(ii): Tag Filtering (~120 lines)           ← Phase 2, chunk 3b
 └── PR 3: Animations + Testimonials (~360)          ← Phase 3
```

**Dependency chain**: PR 1A(i) → PR 1A(ii) → PR 1B → (PR 2A, PR 2B, PR 2C(i), PR 2C(ii), PR 3)

Phase 2/3 require Phase 1 (ErrorBoundary + ThemeProvider wrappers in page.tsx). Blog and Project routes are independent of each other but both need Phase 1's error boundaries and dark mode.

---

## Phase 1 — Foundation (~644 lines total)

### PR 1A(i): Dark Mode Foundation (~201 lines)

**PR Title**: feat: dark mode foundation — CSS custom properties + ThemeProvider
**Scope**: ThemeProvider context, CSS var refactor (hex → var), inline script to prevent flash, messages
**Risk**: Medium — CSS changes affect global styles
**Depends on**: None — base = main
**Safe to review independently**: Yes — pure foundation, UI comes next

| File | Action | Est. Lines |
|------|--------|-----------|
| `src/lib/theme/ThemeProvider.tsx` | NEW | 45 |
| `src/lib/theme/useTheme.ts` | NEW | 8 |
| `src/app/globals.css` | MODIFY (hex→var, add `.dark`) | 50 |
| `src/app/layout.tsx` | MODIFY (wrap ThemeProvider, inline script) | 20 |
| `messages/en.json` | MODIFY (dark mode keys) | 4 |
| `messages/es.json` | MODIFY (dark mode keys) | 4 |
| `src/__tests__/components/ThemeProvider.test.tsx` | NEW | 40 |
| `tests/e2e/theme.spec.ts` | NEW | 30 |
| **Subtotal** | | **~201** |

**Tests to write**: ThemeProvider initial state + toggle + localStorage + SSR guard; E2E: system preference detection + toggle persistence

---

### PR 1A(ii): Dark Mode Toggle UI (~163 lines)

**PR Title**: feat: dark mode toggle — Sun/Moon icons + ThemeToggle component
**Scope**: SVG icons, toggle button, Navigation integration
**Risk**: Low — isolated UI, depends on PR 1A(i) foundation
**Depends on**: PR 1A(i) (needs ThemeProvider context)
**Safe to review independently**: Yes — pure UI addition

| File | Action | Est. Lines |
|------|--------|-----------|
| `src/lib/theme/ThemeToggle.tsx` | NEW | 40 |
| `src/shared/components/Icons/Icons.tsx` | MODIFY (add Sun, Moon) | 80 |
| `src/shared/components/Navigation/Navigation.tsx` | MODIFY (add toggle) | 8 |
| `src/__tests__/components/DarkModeToggle.test.tsx` | NEW | 35 |
| **Subtotal** | | **~163** |

**Tests to write**: DarkModeToggle render + click toggles theme + aria-label updates; icon rendering

### PR 1B: Stability & Quality (~280 lines)

**PR Title**: feat: error boundaries, GA events, P0 fixes, coverage thresholds
**Scope**: Section-level error boundaries, typed GA events, typo fixes, data dedup, jest coverage
**Risk**: Low — well-defined, isolated changes

| File | Action | Est. Lines |
|------|--------|-----------|
| `src/shared/components/ErrorBoundary/ErrorBoundary.tsx` | NEW | 50 |
| `src/app/[locale]/error.tsx` | NEW | 25 |
| `src/app/[locale]/page.tsx` | MODIFY (wrap 6 sections) | 10 |
| `src/lib/ga/events.ts` | NEW | 30 |
| `src/lib/ga/gatag.ts` | MODIFY (add sendEvent) | 12 |
| `src/app/layout.tsx` | MODIFY (fix analytics import) | 2 |
| `src/app/components/analitycs/` → `analytics/` | RENAME | 1 |
| `tests/e2e/skilss.spec.ts` → `skills.spec.ts` | RENAME | 1 |
| `src/shared/components/Navigation/Navigation.tsx` | MODIFY (fix #home→about) | 5 |
| `src/constants/skills.ts` OR data files | MODIFY (dedup) | 20 |
| `jest.config.ts` | MODIFY (coverageThreshold) | 15 |
| `messages/en.json` | MODIFY (error boundary keys) | 3 |
| `messages/es.json` | MODIFY (error boundary keys) | 3 |
| `src/__tests__/components/ErrorBoundary.test.tsx` | NEW | 40 |
| `src/__tests__/lib/ga/gatag.test.ts` | NEW | 35 |
| `tests/e2e/error-boundary.spec.ts` | NEW | 25 |
| **Subtotal** | | **~280** |

**Dependencies**: Phase 1 must be in main first (page.tsx changes could conflict)
**Safe to review independently**: Yes — components are isolated
**Tests to write**: ErrorBoundary render/fallback/retry; GAEvent production guard; E2E: section crash isolation

---

## Phase 2 — Engagement (~1,170 lines total)

### PR 2A: Blog Code Infrastructure (~390 lines)

**PR Title**: feat: blog with MDX — listing + detail pages
**Scope**: Blog types, MDX serialization, listing/detail routes, custom MDX components, i18n labels, nav link
**Risk**: Medium — new route structure, first MDX integration

| File | Action | Est. Lines |
|------|--------|-----------|
| `src/shared/types/blog.types.ts` | NEW | 15 |
| `src/lib/mdx/serialize.ts` | NEW | 50 |
| `src/app/[locale]/blog/page.tsx` | NEW | 60 |
| `src/app/[locale]/blog/[slug]/page.tsx` | NEW | 80 |
| `src/app/components/blog/MdxComponents.tsx` | NEW | 40 |
| `src/constants/navigationConfig.ts` | MODIFY (add blog link) | 5 |
| `src/shared/components/Navigation/Navigation.tsx` | MODIFY (add blog nav item) | 20 |
| `messages/en.json` | MODIFY (blog keys ×7) | 14 |
| `messages/es.json` | MODIFY (blog keys ×7) | 14 |
| `src/__tests__/components/BlogListing.test.tsx` | NEW | 40 |
| `src/__tests__/components/BlogDetail.test.tsx` | NEW | 40 |
| `tests/e2e/blog.spec.ts` | NEW | 35 |
| **Subtotal** | | **~390** |

**Dependencies**: PR 1B (ErrorBoundary for wrapping blog sections)
**Safe to review independently**: Yes — new routes, no existing code modified except nav + messages

### PR 2B: Blog Content (~320 lines)

**PR Title**: content: sample blog articles (EN + ES)
**Scope**: 4 markdown files — 2 articles × 2 locales
**Risk**: Low — markdown content only

| File | Action | Est. Lines |
|------|--------|-----------|
| `content/blog/en/building-scalable-apis-with-node.md` | NEW | 80 |
| `content/blog/en/react-performance-tips.md` | NEW | 80 |
| `content/blog/es/construyendo-apis-escalables-con-node.md` | NEW | 80 |
| `content/blog/es/consejos-rendimiento-react.md` | NEW | 80 |
| **Subtotal** | | **~320** |

**Dependencies**: PR 2A (blog infrastructure must exist to render content)
**Safe to review independently**: Yes — pure content, no code logic
**Note**: This PR is 100% markdown. Review is content-focused (grammar, accuracy, tone). Code review is minimal.

### PR 2C: Project Detail Pages + Tag Filtering (~480 lines)

**PR Title**: feat: project detail pages and client-side tag filtering
**Scope**: New dynamic route, IProject extension, detail data, tag filter component
**Risk**: Medium — page.tsx section needs conversion to client component for filtering

**Recommendation**: Split into 2 sub-PRs
- **PR 2C(i)**: Project Detail Pages (~360 lines)
- **PR 2C(ii)**: Tag Filtering (~120 lines)

#### PR 2C(i): Project Detail Pages (~360 lines)

| File | Action | Est. Lines |
|------|--------|-----------|
| `src/app/[locale]/projects/[id]/page.tsx` | NEW | 90 |
| `src/shared/types/project.types.ts` | MODIFY (extend IProject) | 15 |
| `src/constants/projects.ts` | MODIFY (add detail content) | 80 |
| `src/constants/data/en/projects.data.ts` | MODIFY (add detail content) | 60 |
| `src/constants/data/es/projects.data.ts` | MODIFY (add detail content) | 60 |
| `messages/en.json` | MODIFY (project detail keys) | 4 |
| `messages/es.json` | MODIFY (project detail keys) | 4 |
| `src/__tests__/components/ProjectDetail.test.tsx` | NEW | 40 |
| `tests/e2e/project-detail.spec.ts` | NEW | 25 |
| **Subtotal** | | **~360** |

#### PR 2C(ii): Tag Filtering (~120 lines)

| File | Action | Est. Lines |
|------|--------|-----------|
| `src/app/components/projects/TagFilter.tsx` | NEW | 50 |
| `src/app/components/projects/ProjectsShowCase.tsx` | MODIFY (add client state + filter) | 30 |
| `messages/en.json` | MODIFY (tag filter keys) | 3 |
| `messages/es.json` | MODIFY (tag filter keys) | 3 |
| `src/__tests__/components/TagFilter.test.tsx` | NEW | 30 |
| `tests/e2e/tag-filter.spec.ts` | NEW | 25 |
| **Subtotal** | | **~120** |

**Dependencies**: PR 1B for ErrorBoundary wrapping context
**Safe to review independently**: Yes for both — new routes, localized changes to existing files
**Note**: PR 2C(ii) depends on 2C(i) because ProjectsShowCase.tsx passes filtered projects to the detail links. However, 2C(ii) could also be done independently if ProjectsShowCase already has the `projects` prop.

---

## Phase 3 — Delight (~360 lines)

### PR 3: Scroll-reveal Animations + Testimonials (~360 lines)

**PR Title**: feat: scroll-reveal animations and testimonials section
**Scope**: useInView hook, AnimatedSection wrapper, testimonial types/data/component
**Risk**: Low — intersection observer is well-understood, testimonials are static data

| File | Action | Est. Lines |
|------|--------|-----------|
| `src/shared/hooks/useInView.ts` | NEW | 40 |
| `src/shared/components/AnimatedSection/AnimatedSection.tsx` | NEW | 50 |
| `src/shared/types/testimonial.types.ts` | NEW | 12 |
| `src/app/components/testimonials/Testimonials.tsx` | NEW | 60 |
| `content/testimonials/en.json` | NEW | 40 |
| `content/testimonials/es.json` | NEW | 40 |
| `src/app/[locale]/page.tsx` | MODIFY (wrap sections + add Testimonials) | 25 |
| `messages/en.json` | MODIFY (testimonials keys) | 2 |
| `messages/es.json` | MODIFY (testimonials keys) | 2 |
| `src/__tests__/hooks/useInView.test.ts` | NEW | 35 |
| `src/__tests__/components/AnimatedSection.test.tsx` | NEW | 30 |
| `src/__tests__/components/Testimonials.test.tsx` | NEW | 25 |
| `tests/e2e/animations.spec.ts` | NEW | 25 |
| **Subtotal** | | **~360** |

**Dependencies**: PR 1B for ErrorBoundary + AnimatedSection wrapping in page.tsx
**Safe to review independently**: Yes — new hooks, new section, isolated changes to page.tsx

---

## Dependency Graph

```
PR 1A(i) (Dark Mode Foundation — CSS vars + ThemeProvider)
 └──> base = main
 └──> No deps

PR 1A(ii) (Dark Mode Toggle UI)
 └──> base = main (after PR 1A(i))
 └──> Depends on: PR 1A(i) — needs ThemeProvider and CSS vars
 └──> Sequential: PR 1A(i) → main → PR 1A(ii) rebase → PR 1A(ii) → main

PR 1B (Stability & Quality)
 └──> base = main
 └──> Wait for PR 1A? → No, page.tsx changes don't overlap
 └──> CAN merge in parallel with PR 1A(i) and PR 1A(ii) (no file conflicts)
      Exception: layout.tsx changes if both modify the root layout.
      If PR 1A(i) wraps ThemeProvider and PR 1B fixes Analytics import,
      these touch the same file — do sequentially:
      PR 1A(i) → main → PR 1B rebase → PR 1B → main

PR 2A (Blog Code)
 └──> base = main (after PR 1A + PR 1B)
 └──> Depends on: ErrorBoundary (PR 1B) for section wrapping pattern
 └──> No dependency on dark mode

PR 2B (Blog Content)
 └──> base = main (after PR 2A)
 └──> ONLY depends on PR 2A (needs the blog routes to exist)

PR 2C(i) (Project Details)
 └──> base = main (after PR 1B for ErrorBoundary pattern)
 └──> Independent of PR 2A/2B

PR 2C(ii) (Tag Filtering)
 └──> base = main (after PR 2C(i) for ProjectsShowCase context)
 └──> OR: base = 2C(i) branch if using feature-branch-chain

PR 3 (Animations + Testimonials)
 └──> base = main (after PR 1B for ErrorBoundary + page.tsx pattern)
 └──> Independent of all Phase 2 PRs
```

**Parallelization opportunities**:
- PR 2A, PR 2C(i), and PR 3 can be reviewed in parallel once PR 1A and PR 1B are in main
- PR 2B (content) can be reviewed as soon as PR 2A is in main

---

## Review Workload Forecast — Definitive Numbers

### Line Count Summary

| PR | Scope | Code | Content | Tests | Total | Over 400? |
|-----|-------|------|---------|-------|-------|-----------|
| PR 1A(i) | Dark Mode Foundation | 127 | 0 | 70 | **~201** | ✅ Safe |
| PR 1A(ii) | Dark Mode Toggle UI | 128 | 0 | 35 | **~163** | ✅ Safe |
| PR 1B | Stability & Quality | 177 | 0 | 100 | **~280** | ✅ Safe |
| PR 2A | Blog Code | 264 | 0 | 115 | **~390** | ✅ Safe |
| PR 2B | Blog Content | 0 | 320 | 0 | **~320** | ✅ Safe (content) |
| PR 2C(i) | Project Details | 253 | 0 | 65 | **~360** | ✅ Safe |
| PR 2C(ii) | Tag Filtering | 86 | 0 | 55 | **~120** | ✅ Safe |
| PR 3 | Animations + Testimonials | 229 | 80 | 115 | **~360** | ✅ Safe |
| **Total** | | **~1,264** | **~400** | **~555** | **~2,220** | |

### Risk Assessment

| Phase | Total Lines | 400-Line Budget Risk | Recommendation |
|-------|-------------|---------------------|----------------|
| **Phase 1** | ~644 | **Low** → split into 3 PRs (1A(i), 1A(ii), 1B) | All under 400 ✓ |
| **Phase 2** | ~1,170 | **High** → split into 4 PRs (2A, 2B, 2Ci, 2Cii) | All under 400 ✓ |
| **Phase 3** | ~360 | **Low** → single PR (PR 3) | Under 400 ✓ |

### Chain Strategy: Stacked-to-main

Reasons:
1. **No feature branch needed** — each PR is additive and independently reviewable
2. **No rollback cascade** — if PR 2A is problematic, it reverts to main without affecting PR 1B
3. **Incremental value** — dark mode and error boundaries deploy immediately, blog etc. follows
4. **PR 2A and PR 2C(i) can review in parallel** after Phase 1 merges — faster throughput

### Explicit Guard Lines

```
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High
```

---

## Full Task List — Ready for GitHub Issues

> **Labels used**: `phase-1`, `phase-2`, `phase-3`, `feature/dark-mode`, `feature/error-boundary`, `feature/ga-events`, `feature/blog`, `feature/project-detail`, `feature/tag-filter`, `feature/animations`, `feature/testimonials`, `tech-debt`, `testing`, `content`, `size/small`, `size/medium`, `size/large`

### Phase 1 — Foundation

#### PR 1A(i): Dark Mode Foundation (base = main, no deps)

- [ ] **1.1** Create `src/lib/theme/ThemeProvider.tsx` — context for dark mode state, localStorage persistence, system preference detection
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1ai`
  - Acceptance: ThemeProvider wraps children, provides `{ theme, toggleTheme }`, reads `localStorage` and `prefers-color-scheme`
- [ ] **1.2** Create `src/lib/theme/useTheme.ts` — hook exporting theme context with guard
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1ai`
  - Acceptance: `useTheme()` returns context or throws outside provider
- [ ] **1.3** Modify `src/app/globals.css` — replace hardcoded hex in `@layer base` and `@layer components` with `var(--color-*)`; add `.dark` theme overrides; remove dead HSL `.dark` block
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1ai`
  - Acceptance: body, .card, .btn-primary, .btn-secondary, .input-field use `var()`; `.dark` changes all colors; no flash on load
- [ ] **1.4** Modify `src/app/layout.tsx` — wrap children in `<ThemeProvider>`; add inline `<script>` in `<head>` to apply `.dark` class before first paint
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1ai`
  - Acceptance: No flash of wrong theme; localStorage preference respected
- [ ] **1.5** Add `common.toggleDarkMode`, `common.lightMode`, `common.darkMode` to `messages/en.json` and `messages/es.json`
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1ai`
  - Acceptance: Messages readable via `useTranslations("common")`
- [ ] **1.6** Write unit tests for ThemeProvider (initial state, toggle, localStorage persistence, SSR guard)
  - Labels: `phase-1`, `feature/dark-mode`, `testing`, `pr-1ai`
  - File: `src/__tests__/components/ThemeProvider.test.tsx`
- [ ] **1.7** Write E2E test for dark mode foundation (system preference detection, toggle + reload persistence)
  - Labels: `phase-1`, `feature/dark-mode`, `testing`, `pr-1ai`
  - File: `tests/e2e/theme.spec.ts` (basic scenarios)

#### PR 1A(ii): Dark Mode Toggle UI (depends on PR 1A(i))

- [ ] **1.8** Add Sun and Moon SVG icons to `src/shared/components/Icons/Icons.tsx`
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1aii`
  - Acceptance: `SvgIcons.Sun` and `SvgIcons.Moon` render correct SVGs
- [ ] **1.9** Create `src/lib/theme/ThemeToggle.tsx` — sun/moon toggle button with `role="switch"`, `aria-checked`, `aria-label`
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1aii`
  - Acceptance: Renders sun icon in dark mode, moon in light; clicks toggle theme
- [ ] **1.10** Modify `src/shared/components/Navigation/Navigation.tsx` — add `<ThemeToggle />` to desktop nav (next to locale switcher) and mobile nav
  - Labels: `phase-1`, `feature/dark-mode`, `pr-1aii`
  - Acceptance: Toggle appears in both nav variants; icon changes on click
- [ ] **1.11** Write unit tests for DarkModeToggle (render, click toggles, aria-label updates)
  - Labels: `phase-1`, `feature/dark-mode`, `testing`, `pr-1aii`
  - File: `src/__tests__/components/DarkModeToggle.test.tsx`

#### PR 1B: Error Boundaries + GA Events + P0 Fixes + Coverage

- [ ] **1.12** Create `src/shared/components/ErrorBoundary/ErrorBoundary.tsx` — class-based React error boundary with `getDerivedStateFromError`, `componentDidCatch`, optional fallback and `onError` callback, `role="alert"`
  - Labels: `phase-1`, `feature/error-boundary`
  - Acceptance: Catches errors, renders fallback, retry resets state, `onError` called
- [ ] **1.13** Create `src/app/[locale]/error.tsx` — root error page with translated message and "Back to Home" link
  - Labels: `phase-1`, `feature/error-boundary`
  - Acceptance: Renders full-page error with translated text and navigation
- [ ] **1.14** Modify `src/app/[locale]/page.tsx` — wrap each section (Hero, Experience, Projects, About, Skills, Contact) in `<ErrorBoundary>` with unique fallbacks
  - Labels: `phase-1`, `feature/error-boundary`
  - Acceptance: One section error doesn't break others; "Retry" resets individual section
- [ ] **1.15** Create `src/lib/ga/events.ts` — typed event constants and `sendEvent()` helper with SSR guard and dev logging
  - Labels: `phase-1`, `feature/ga-events`
  - Acceptance: `sendEvent("download_cv", "engagement")` calls `window.gtag` in production, logs in dev
- [ ] **1.16** Modify `src/lib/ga/gatag.ts` — export `GAEventCategory` type, `sendEvent` function signature
  - Labels: `phase-1`, `feature/ga-events`
  - Acceptance: Existing `pageview` unchanged; new `sendEvent` available
- [ ] **1.17** Wire GA events: `file_download` in DownloadLink.tsx, `form_submit` in ContactForm.tsx, `nav_click` in Navigation.tsx
  - Labels: `phase-1`, `feature/ga-events`
  - Acceptance: Clicking Download CV fires gtag; submitting contact fires gtag; clicking nav link fires gtag
- [ ] **1.18** Rename `src/app/components/analitycs/` → `analytics/` and update root layout.tsx import
  - Labels: `phase-1`, `tech-debt`
  - Acceptance: `Analytics` component still works, import path is correct
- [ ] **1.19** Rename `tests/e2e/skilss.spec.ts` → `tests/e2e/skills.spec.ts`
  - Labels: `phase-1`, `tech-debt`
  - Acceptance: Playwright test file name matches content
- [ ] **1.20** Fix nav label confusion in Navigation.tsx — change `href="#home"` that shows "About" to `href="#about"` OR add "Home" nav item
  - Labels: `phase-1`, `tech-debt`
  - Acceptance: Nav link href matches the section label it displays
- [ ] **1.21** Resolve data duplication: choose canonical source between `constants/skills.ts` and `constants/data/{locale}/skills.data.ts` — either make skills.ts the source with locale imports OR remove skills.ts and keep locale files
  - Labels: `phase-1`, `tech-debt`
  - Acceptance: Single source of truth for skill data; locale files import or are canonical
- [ ] **1.22** Add `coverageThreshold` to `jest.config.ts` (global: 80/75/80/80; `src/app/components/`: 85/80/85/85)
  - Labels: `phase-1`, `testing`
  - Acceptance: `npm run test:unit` fails if coverage drops below thresholds
- [ ] **1.23** Add `common.sectionError`, `common.retry`, `common.errorTitle` to messages files
  - Labels: `phase-1`, `feature/error-boundary`
- [ ] **1.24** Write unit tests for ErrorBoundary (render fallback, retry resets, section isolation, onError callback)
  - Labels: `phase-1`, `feature/error-boundary`, `testing`
- [ ] **1.25** Write unit tests for GA `sendEvent` (production calls gtag, dev does not, SSR guard)
  - Labels: `phase-1`, `feature/ga-events`, `testing`
- [ ] **1.26** Write E2E test for error boundaries (inject error, verify fallback shows, retry works)
  - Labels: `phase-1`, `feature/error-boundary`, `testing`

### Phase 2 — Engagement

#### PR 2A: Blog Code Infrastructure

- [ ] **2.1** Create `src/shared/types/blog.types.ts` — `BlogPost` interface (slug, title, description, date, tags, locale)
  - Labels: `phase-2`, `feature/blog`
- [ ] **2.2** Create `src/lib/mdx/serialize.ts` — `getPost(locale, slug)` and `getPosts(locale)` using `fs/promises` + `next-mdx-remote`
  - Labels: `phase-2`, `feature/blog`
  - Acceptance: Reads `.md` files from `content/blog/{locale}/`, returns serialized MDX + frontmatter
- [ ] **2.3** Create `src/app/[locale]/blog/page.tsx` — blog listing page showing post cards (title, excerpt, date, reading time, "Read More" link)
  - Labels: `phase-2`, `feature/blog`
  - Acceptance: Lists all posts for locale; empty state shows translated "No articles yet"
- [ ] **2.4** Create `src/app/[locale]/blog/[slug]/page.tsx` — blog detail page rendering MDX content with custom components + 404 for unknown slugs
  - Labels: `phase-2`, `feature/blog`
  - Acceptance: Renders full MDX with headings/code blocks/images; unknown slug → notFound()
- [ ] **2.5** Create custom MDX components (code blocks, images, links) to pass to `MDXRemote`
  - Labels: `phase-2`, `feature/blog`
- [ ] **2.6** Add `blog.*` keys (title, subtitle, readMore, minuteRead, publishedOn, backToBlog, emptyState) to `messages/en.json` and `messages/es.json`
  - Labels: `phase-2`, `feature/blog`
- [ ] **2.7** Add blog nav link to `src/constants/navigationConfig.ts` and render in Navigation.tsx (desktop + mobile)
  - Labels: `phase-2`, `feature/blog`
- [ ] **2.8** Write unit/integration tests for blog listing (renders posts, empty state, correct links)
  - Labels: `phase-2`, `feature/blog`, `testing`
- [ ] **2.9** Write integration tests for blog detail (MDX rendering, headings/paragraphs work)
  - Labels: `phase-2`, `feature/blog`, `testing`
- [ ] **2.10** Write E2E test for blog navigation (listing → detail, back to blog)
  - Labels: `phase-2`, `feature/blog`, `testing`

#### PR 2B: Blog Content

- [ ] **2.11** Create `content/blog/en/building-scalable-apis-with-node.md` — sample article with frontmatter
  - Labels: `phase-2`, `feature/blog`, `content`
- [ ] **2.12** Create `content/blog/en/react-performance-tips.md` — sample article with frontmatter
  - Labels: `phase-2`, `feature/blog`, `content`
- [ ] **2.13** Create `content/blog/es/construyendo-apis-escalables-con-node.md` — Spanish translation of first article
  - Labels: `phase-2`, `feature/blog`, `content`
- [ ] **2.14** Create `content/blog/es/consejos-rendimiento-react.md` — Spanish translation of second article
  - Labels: `phase-2`, `feature/blog`, `content`

#### PR 2C(i): Project Detail Pages

- [ ] **2.15** Extend `IProject` in `src/shared/types/project.types.ts` — add optional fields (`challenge_detail`, `solution_detail`, `results_detail`, `screenshots`, `features`, `architecture`, `learnings`)
  - Labels: `phase-2`, `feature/project-detail`
- [ ] **2.16** Add detail content to `src/constants/projects.ts` (canonical source) and both locale data files
  - Labels: `phase-2`, `feature/project-detail`
- [ ] **2.17** Create `src/app/[locale]/projects/[id]/page.tsx` — server component with `generateStaticParams`, null-safe URL rendering, translated "Back to Projects", notFound for invalid IDs
  - Labels: `phase-2`, `feature/project-detail`
  - Acceptance: renders full project info; null githubUrl hides link; unknown ID → notFound
- [ ] **2.18** Add `projects.backToProjects`, `projects.detailTitle`, `projects.notFound` to messages files
  - Labels: `phase-2`, `feature/project-detail`
- [ ] **2.19** Write unit/integration tests for project detail (renders all fields, missing URL hidden, notFound for invalid ID)
  - Labels: `phase-2`, `feature/project-detail`, `testing`
- [ ] **2.20** Write E2E test for project detail navigation (card → detail, back to projects)
  - Labels: `phase-2`, `feature/project-detail`, `testing`

#### PR 2C(ii): Tag Filtering

- [ ] **2.21** Create `src/app/components/projects/TagFilter.tsx` — client component rendering deduplicated, alphabetically sorted tag chips with `aria-pressed`, active state, "Show All" reset
  - Labels: `phase-2`, `feature/tag-filter`
- [ ] **2.22** Modify `ProjectsShowCase.tsx` — convert to client component (`"use client"`), add `useState` for `selectedTag`, `useMemo` filter logic, pass filtered projects to `ProjectsList`
  - Labels: `phase-2`, `feature/tag-filter`
  - Acceptance: Clicking a tag filters projects; "Show All" resets; empty filter shows translated message
- [ ] **2.23** Add `projects.showAll`, `projects.noMatch`, `projects.filterBy` to messages files
  - Labels: `phase-2`, `feature/tag-filter`
- [ ] **2.24** Write unit tests for TagFilter (render tags, click calls onTagChange, empty state)
  - Labels: `phase-2`, `feature/tag-filter`, `testing`
- [ ] **2.25** Write E2E test for tag filtering (click tag → only matching projects shown, "Show All" resets)
  - Labels: `phase-2`, `feature/tag-filter`, `testing`

### Phase 3 — Delight

#### PR 3: Animations + Testimonials

- [ ] **3.1** Create `src/shared/hooks/useInView.ts` — Intersection Observer hook with configurable threshold, rootMargin, `once` option; respects `prefers-reduced-motion`
  - Labels: `phase-3`, `feature/animations`
  - Acceptance: Returns `{ ref, isInView }`; fires once by default; no animation when reduced motion
- [ ] **3.2** Create `src/shared/components/AnimatedSection/AnimatedSection.tsx` — wraps children, applies fade-up/fade-in/slide-left CSS transitions based on `isInView`
  - Labels: `phase-3`, `feature/animations`
  - Acceptance: Section fades in with translateY on scroll; reduced motion disables animation
- [ ] **3.3** Wrap all sections in `page.tsx` with `<AnimatedSection>` (appropriate animation per section)
  - Labels: `phase-3`, `feature/animations`
- [ ] **3.4** Create `src/shared/types/testimonial.types.ts` — `Testimonial` interface (id, quote, author, role, company, avatar?)
  - Labels: `phase-3`, `feature/testimonials`
- [ ] **3.5** Create `content/testimonials/en.json` and `content/testimonials/es.json` — testimonial data as JSON arrays
  - Labels: `phase-3`, `feature/testimonials`, `content`
- [ ] **3.6** Create `src/app/components/testimonials/Testimonials.tsx` — renders `<blockquote>` cards with star rating, author, role; section hidden if empty array
  - Labels: `phase-3`, `feature/testimonials`
  - Acceptance: Renders 3 testimonials in a grid; empty array → section not rendered
- [ ] **3.7** Add Testimonials to `page.tsx` between Skills and Contact sections, wrapped in ErrorBoundary + AnimatedSection
  - Labels: `phase-3`, `feature/testimonials`
- [ ] **3.8** Add `testimonials.title`, `testimonials.subtitle` to messages files
  - Labels: `phase-3`, `feature/testimonials`
- [ ] **3.9** Write unit tests for `useInView` (mock IntersectionObserver, verify callback at threshold, reduced motion respect)
  - Labels: `phase-3`, `feature/animations`, `testing`
- [ ] **3.10** Write integration tests for AnimatedSection (render, mock intersection, verify CSS class change)
  - Labels: `phase-3`, `feature/animations`, `testing`
- [ ] **3.11** Write unit tests for Testimonials (render with data, hidden when empty)
  - Labels: `phase-3`, `feature/testimonials`, `testing`
- [ ] **3.12** Write E2E test for animations (scroll to section, verify opacity change)
  - Labels: `phase-3`, `feature/animations`, `testing`

---

## GitHub Issues

| PR | Issue | Scope | Lines |
|----|-------|-------|-------|
| PR 1A(i) | [#73](https://github.com/Deadflight/portfolio-next/issues/73) | Dark Mode Foundation | ~201 |
| PR 1A(ii) | [#74](https://github.com/Deadflight/portfolio-next/issues/74) | Dark Mode Toggle UI | ~163 |
| PR 1B | [#75](https://github.com/Deadflight/portfolio-next/issues/75) | Stability & Quality | ~280 |
| PR 2A | [#76](https://github.com/Deadflight/portfolio-next/issues/76) | Blog Code Infrastructure | ~390 |
| PR 2B | [#77](https://github.com/Deadflight/portfolio-next/issues/77) | Blog Content | ~320 |
| PR 2C(i) | [#78](https://github.com/Deadflight/portfolio-next/issues/78) | Project Detail Pages | ~360 |
| PR 2C(ii) | [#79](https://github.com/Deadflight/portfolio-next/issues/79) | Tag Filtering | ~120 |
| PR 3 | [#80](https://github.com/Deadflight/portfolio-next/issues/80) | Animations + Testimonials | ~360 |

## Summary

| Metric | Value |
|--------|-------|
| **Total phases** | 3 |
| **Total features** | 10 |
| **Total tasks** | 62 |
| **Recommended PRs** | 8 — all tracked as GitHub Issues |
| **PRs over 400 lines** | 0 ✅ |
| **Total estimated lines** | ~2,220 (code: ~1,264 + content: ~400 + tests: ~555) |
| **Chain strategy** | **Stacked-to-main** — each PR merges to main in order |
| **Parallel review potential** | PR 2A, PR 2C(i), and PR 3 can review in parallel after Phase 1 |
| **Decisions made** | ✅ stacked-to-main, ✅ PR 1A split into 1A(i) + 1A(ii) |
