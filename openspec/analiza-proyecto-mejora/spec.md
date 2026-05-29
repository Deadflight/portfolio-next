# Delta Spec: Portfolio-Next Improvements

> **Change**: analiza-proyecto-mejora  
> **Mode**: Hybrid (filesystem + Engram)  
> **Base**: Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, next-intl v4  
> **Status**: New spec (no existing openspec/)

---

## Phase 1 — Foundation

---

### 1. Dark Mode Toggle

#### Requirement: ThemeProvider with CSS Custom Properties

The system MUST provide a dark mode that toggles via CSS custom properties on `<html>`, using the `class` strategy (`.dark` class) for Tailwind v4 compatibility. The system SHALL read initial preference from `prefers-color-scheme` media query. The system SHALL persist the user's choice to `localStorage` under key `theme-preference`. The system MUST rehydrate before first paint to prevent flash (use inline script in `layout.tsx` `<head>`).

The system MUST NOT migrate existing `dark:` Tailwind prefix usage — all dark values SHALL live as CSS custom property overrides in a `:root.dark` / `html.dark` block.

Existing hardcoded colors in `globals.css` (`body { background-color: #f2e9e4; color: #22223b; }`) MUST be replaced with `var()` references.

The toggle button MUST be placed in the `Navigation` component and SHALL use a sun/moon icon pair with accessible labels.

#### Scenario: System preference respected on first visit

- GIVEN a user visits for the first time with `prefers-color-scheme: dark`
- WHEN the page loads
- THEN `<html>` has class `dark` AND the toggle shows the sun icon
- AND no flash of light mode occurs

#### Scenario: localStorage override

- GIVEN a user previously selected light mode (stored in localStorage)
- WHEN they return with `prefers-color-scheme: dark`
- THEN the page loads in light mode (localStorage wins)

#### Scenario: Toggle click

- GIVEN the page is in light mode
- WHEN the user clicks the dark mode toggle button
- THEN `<html>` receives class `dark`, localStorage key `theme-preference` is set to `"dark"`, and the icon changes

#### Scenario: localStorage disabled/blocked

- GIVEN a browser with localStorage blocked
- WHEN the toggle is clicked
- THEN dark mode applies for the session but no error is thrown
- AND the preference resets to `prefers-color-scheme` on next visit

#### Scenario: JavaScript disabled

- GIVEN JavaScript is disabled
- WHEN the page loads
- THEN `prefers-color-scheme` is respected via the inline script in `<head>`
- AND the toggle button is hidden (graceful degradation)

---

### 2. Error Boundaries

#### Requirement: Section-level Error Boundaries

Each section in `page.tsx` (Hero, Experience, Projects, About, Skills, Contact) MUST be wrapped in a `<SectionErrorBoundary>` component. The boundary SHALL catch rendering errors in its children and display a fallback UI with:
- A translated error message
- A "Retry" button that resets the error state
- An accessible `role="alert"` announcement

#### Requirement: Root error.tsx

A `/[locale]/error.tsx` root error file SHALL exist at the locale level, catching unhandled errors. It SHALL display a translated error page with a "Go Home" link.

#### Scenario: Section crashes independently

- GIVEN the Contact section throws during render
- WHEN the page renders
- THEN the Contact section shows its fallback UI with "Something went wrong" + "Retry"
- AND the Hero, Experience, Projects, About, and Skills sections render normally

#### Scenario: Retry succeeds

- GIVEN a section rendered an error fallback
- WHEN the user clicks "Retry"
- THEN the section re-renders
- AND if the error is transient, the section resumes normal display

#### Scenario: Root error catches unhandled errors

- GIVEN an error occurs outside any section boundary (e.g., in the layout)
- WHEN the error propagates
- THEN `/[locale]/error.tsx` renders
- AND the user sees a translated error page with a "Back to Home" button

---

### 3. Custom GA Events

#### Requirement: Typed GAEvent helper

The system MUST extend `lib/ga/gatag.ts` with a `GAEvent` function accepting `{ action: string; category: string; label?: string; value?: number }`. It SHALL guard against SSR (`typeof window` check) and NODE_ENV check (production-only).

#### Requirement: Wire GA events to three interactions

The system SHALL fire GA events for:
- **CV download**: `{ action: "download_cv", category: "engagement", label: "hero" }`
- **Contact form submit**: `{ action: "submit_contact", category: "conversion" }`
- **Nav link click**: `{ action: "click_nav", category: "navigation", label: "{link_name}" }`

#### Scenario: CV download fires event

- GIVEN the user clicks "Download CV"
- WHEN the download starts
- THEN `window.gtag` is called with `"event"`, `"download_cv"`, `{ event_category: "engagement", event_label: "hero" }`

#### Scenario: No GA on dev

- GIVEN `NODE_ENV` is not "production"
- WHEN a GA event would fire
- THEN `window.gtag` is NOT called

---

### 4. P0 Fixes

#### Requirement: Fix `analitycs/` directory name

The directory `src/app/components/analitycs/` MUST be renamed to `src/app/components/analytics/`. All imports referencing the old path MUST be updated.

#### Requirement: Fix `skilss.spec.ts` file name

The file `tests/e2e/skilss.spec.ts` MUST be renamed to `tests/e2e/skills.spec.ts`.

#### Requirement: Resolve data duplication

The system MUST audit `constants/skills.ts` for duplicated data with `constants/data/{locale}/skills.data.ts`. One source of truth SHALL be selected. If `constants/skills.ts` is the canonical definition, the locale-specific data files MUST import from it and add translations. If locale-specific files are canonical, `constants/skills.ts` MUST be removed.

#### Requirement: Fix nav label confusion

In `Navigation.tsx`, the first nav link has `href="#home"` but displays `t("links.about")`. This MUST be resolved:
- Either change `href` to `#about` OR change the label to `t("links.home")` and add a `"home"` key to navigation messages.

#### Scenario: Nav links match labels

- GIVEN the navigation renders
- WHEN inspecting each link
- THEN `href` target section name matches the translated label text

---

### 5. Jest Coverage Thresholds

#### Requirement: Coverage thresholds in jest.config.ts

The system MUST add `coverageThreshold` to `jest.config.ts` with the following minimums:

| Metric | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| Global | 80%       | 75%      | 80%       | 80%   |
| `src/app/components/` | 85% | 80% | 85% | 85% |

#### Requirement: Coverage-driven workflow

If a change drops coverage below thresholds, the `test:unit` script SHALL fail. Coverage thresholds SHALL be reviewed and raised as the codebase matures.

#### Scenario: Coverage fails CI

- GIVEN a PR adds new components without tests
- WHEN `npm run test:unit` runs in CI
- THEN the command exits non-zero due to unmet thresholds

---

## Phase 2 — Engagement

---

### 6. Blog / MDX

#### Requirement: Blog listing page

A `/[locale]/blog` route SHALL render a listing of blog posts. Each post card SHALL show title, excerpt, date, and estimated reading time. Empty state: "No articles yet. Check back soon." (translated).

#### Requirement: Blog detail page

A `/[locale]/blog/[slug]` route SHALL render the full MDX content using `next-mdx-remote`. The system MUST handle:
- Custom components (code blocks, images, links)
- Frontmatter parsing (title, date, tags, excerpt)
- 404 for unknown slugs

#### Requirement: Sample articles

The system MUST include 2-3 sample articles with translated frontmatter in both EN and ES. Articles SHALL be stored in a content directory (e.g., `content/blog/{locale}/{slug}.mdx`).

#### Requirement: i18n labels

Messages files SHALL include new keys under `blog.*` for:
- `blog.title`, `blog.subtitle`, `blog.readMore`, `blog.minuteRead`, `blog.publishedOn`, `blog.backToBlog`, `blog.emptyState`

#### Scenario: Blog listing renders

- GIVEN there are 2 articles with locale "en"
- WHEN navigating to `/en/blog`
- THEN the page shows 2 article cards with title, excerpt, and date

#### Scenario: Blog detail renders MDX

- GIVEN the slug "getting-started-with-nextjs"
- WHEN navigating to `/en/blog/getting-started-with-nextjs`
- THEN the full MDX content renders with proper headings and code blocks

#### Scenario: Unknown slug shows 404

- GIVEN a slug that does not exist
- WHEN navigating to `/en/blog/nonexistent`
- THEN the user sees a translated 404 message

---

### 7. Project Detail Pages

#### Requirement: Project detail route

A `/[locale]/projects/[id]` route SHALL render full project information including:
- Title, description, challenge, solution, results
- Tech stack (as Chip components)
- Live URL and GitHub URL (with null checks)
- Company, period, role, team size
- Image
- Translated "Back to Projects" link

The route SHALL use `generateStaticParams` to pre-render all known project IDs for both locales.

#### Requirement: Project type extension

The `IProject` interface in `shared/types/project.types.ts` MUST include an optional `detailedDescription` field for the detail page (longer than the card description).

#### Scenario: Navigate to project detail

- GIVEN the user clicks "View Project" on a project card
- WHEN the page loads `/en/projects/1`
- THEN full project information is displayed with all fields populated

#### Scenario: Project not found

- GIVEN an invalid project ID
- WHEN navigating to `/es/projects/999`
- THEN the page shows a translated "Project not found" message

#### Scenario: Missing URLs handled

- GIVEN a project with `githubUrl: null`
- WHEN the detail page renders
- THEN the GitHub link is hidden (not rendered as a broken link)

---

### 8. Tag Filtering

#### Requirement: Client-side tag filter

The project listing at the top of the Projects section SHALL include a row of tag chips. Clicking a tag SHALL filter the displayed projects to only those whose `technologies` array includes the selected tag. A "Show All" option SHALL reset the filter.

#### Requirement: Tag behavior

- Tags MUST be deduplicated across all projects
- Tags SHALL be sorted alphabetically
- Selected tag SHALL have a visual "active" state
- Empty filter result SHALL show "No projects match this filter" (translated)

#### Scenario: Filter by tag

- GIVEN the user clicks the "React" tag chip
- WHEN the filter applies
- THEN only projects containing "React" in their technologies array are shown

#### Scenario: Reset filter

- GIVEN a tag filter is active
- WHEN the user clicks "Show All"
- THEN all projects are displayed again

#### Scenario: Empty filter result

- GIVEN an obscure tag with no matching projects
- WHEN the filter is applied
- THEN a translated "No projects match this filter" message is shown

---

## Phase 3 — Delight

---

### 9. Scroll-reveal Animations

#### Requirement: Intersection Observer-based reveal

The system MUST implement a `useScrollReveal` hook (or `<ScrollReveal>` component) using the Intersection Observer API. As sections enter the viewport, they SHALL fade in and translate upward. Framer Motion SHALL NOT be used.

#### Requirement: Behavior

- Animations MUST respect `prefers-reduced-motion`
- Animations SHALL use CSS transitions (no JS animation frames)
- Intersection Observer threshold SHALL be 0.1-0.2
- Animation direction SHOULD be subtle (15-20px translateY, 300-500ms duration)
- Each section SHALL reveal independently

#### Scenario: Section reveals on scroll

- GIVEN the user scrolls down to the Experience section
- WHEN the section enters the viewport (10% visible)
- THEN the section fades in with a smooth upward transition

#### Scenario: Reduced motion respected

- GIVEN `prefers-reduced-motion: reduce`
- WHEN any section enters the viewport
- THEN the section is fully visible immediately (no animation)

---

### 10. Testimonials Section

#### Requirement: Testimonials section

A new `<Testimonials>` section SHALL be added to the homepage between the Projects and About sections. It SHALL display social proof with:
- Quote, author name, author title/company
- Optional avatar
- Star rating (1-5)

#### Requirement: Data structure and i18n

Testimonials SHALL be defined in a new `constants/testimonials.ts` with locale-specific data in `constants/data/{locale}/testimonials.data.ts`. Messages SHALL include `testimonials.title` and `testimonials.subtitle`.

#### Requirement: Display

- Testimonials SHALL render in a carousel or grid layout
- Empty state: section is hidden if no testimonials exist
- Each card SHALL have proper `blockquote` semantics

#### Scenario: Testimonials section renders

- GIVEN there are 3 testimonials defined
- WHEN the homepage loads
- THEN the Testimonials section displays between Projects and About with all 3 entries

#### Scenario: Empty testimonials

- GIVEN no testimonials are defined (empty array)
- WHEN the homepage loads
- THEN the Testimonials section is not rendered (no empty section shown)

---

## Cross-cutting Requirements

### Accessibility

| Area | Requirement |
|------|-------------|
| Dark mode toggle | MUST have `aria-label`, `role="switch"`, `aria-checked` |
| Error boundaries | MUST use `role="alert"` and focus management on the error boundary fallback |
| Blog | Headings MUST follow proper hierarchy, images MUST have alt text |
| Tag filter | MUST use `role="tablist"` / `role="tab"` pattern or `aria-pressed` on chips |
| Scroll reveal | MUST NOT hide content from screen readers — use `opacity` and `visibility`, not `display: none` |
| Testimonials | MUST use `<blockquote>` with `<cite>` |
| Color contrast | ALL dark mode colors MUST meet WCAG AA (4.5:1 text, 3:1 large text) |

### i18n — New Message Keys

| Feature | Keys (EN + ES required) |
|---------|-------------------------|
| Dark mode | `common.toggleDarkMode`, `common.lightMode`, `common.darkMode` |
| Error boundary | `common.sectionError`, `common.retry`, `common.errorTitle` |
| Blog | `blog.title`, `blog.subtitle`, `blog.readMore`, `blog.minuteRead`, `blog.publishedOn`, `blog.backToBlog`, `blog.emptyState` |
| Project detail | `projects.backToProjects`, `projects.detailTitle`, `projects.notFound`, `projects.detailedDescription` |
| Tag filter | `projects.showAll`, `projects.noMatch`, `projects.filterBy` |
| Testimonials | `testimonials.title`, `testimonials.subtitle` |

### Testing Coverage

| Feature | Unit | Integration | E2E | A11y |
|---------|------|-------------|-----|------|
| Dark mode toggle | ThemeProvider initial state, toggle, localStorage persistence, SSR guard | — | Toggle + reload persistence | `aria-checked`, contrast |
| Error boundaries | Error fallback render, retry click, section isolation | — | Root error page | `role="alert"` |
| GA events | `GAEvent` not calling gtag outside production | — | — | — |
| P0 fixes | — | — | Nav link hrefs match labels | — |
| Blog listing | Renders posts, empty state | MDX compilation | Navigate listing→detail | Heading hierarchy |
| Project detail | Renders all fields, missing URL hidden | — | Navigate to /en/projects/1 | — |
| Tag filter | Filter logic, dedup, empty state | — | Click tag filters projects | `aria-pressed` |
| Scroll reveal | Hook fires callback at threshold, respects reduced motion | — | — | Not hiding content |
| Testimonials | Renders with data, hidden when empty | — | Section renders in order | `blockquote` + `cite` |

### Edge Cases Summary

| Edge Case | Affected Features | Handling |
|-----------|------------------|----------|
| localStorage blocked | Dark mode | Session-only, no error |
| JS disabled | Dark mode, scroll reveal | `prefers-color-scheme` in inline script, reveal = no animation (static visible) |
| Network failure | Blog (MDX fetch if remote) | Local files only — no network dependency |
| Empty data | Blog, testimonials, tag filter | Respective empty states / section hidden |
| Invalid slugs | Blog, project detail | 404 / not found messages |
| No GA ID configured | GA events | Guarded — no-op without ID |
| prefers-reduced-motion | Scroll reveal | No animation, immediate visibility |
| Screen reader | Scroll reveal | Elements always in DOM, never `display: none` |
| Rapid toggle | Dark mode | No debounce needed — sync operation |
| Missing URL | Project detail | Link hidden, no broken anchor rendered |

---

## Specs Written Summary

| Feature | Type | Requirements | Scenarios |
|---------|------|-------------|-----------|
| 1. Dark Mode | New | 2 | 5 |
| 2. Error Boundaries | New | 2 | 3 |
| 3. Custom GA Events | New | 2 | 2 |
| 4. P0 Fixes | New | 4 | 1 |
| 5. Coverage Thresholds | New | 1 | 1 |
| 6. Blog/MDX | New | 4 | 3 |
| 7. Project Detail Pages | New | 2 | 3 |
| 8. Tag Filtering | New | 2 | 3 |
| 9. Scroll-reveal Animations | New | 2 | 2 |
| 10. Testimonials | New | 3 | 2 |
| **Cross-cutting** | — | 3 tables | — |
| **Total** | **10 features** | **24 requirements** | **25 scenarios** |

### Coverage
- Happy paths: All covered ✓
- Edge cases: localStorage disabled, JS disabled, network failure, empty data, invalid slugs, reduced motion all covered ✓
- Error states: Section errors, root errors, missing URLs, empty filter all covered ✓

### Next Step
Ready for design (sdd-design).
