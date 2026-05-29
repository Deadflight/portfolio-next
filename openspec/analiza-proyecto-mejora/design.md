# Design: Portfolio Next — Multi-Phase Improvements

## Technical Approach

Three sequential phases delivering foundation stability (Phase 1), content
engagement (Phase 2), and visual delight (Phase 3). Each phase is
independently deliverable as a PR. Design decisions are optimized for the
existing Tailwind v4 + next-intl architecture — minimal new dependencies,
maximal use of existing patterns.

---

## Architecture Overview

### Component Tree Changes

```
app/layout.tsx (root)
  └── <ThemeProvider>          ← NEW: wraps everything
  └── <html class={...}>       ← theme class managed by ThemeProvider
  └── <body>
      ├── <Analytics />        ← renamed from analitycs/
      └── locale/layout.tsx
          ├── <NavigationExperience>
          │   └── <DarkModeToggle />  ← NEW: sun/moon icon button
          └── locale/page.tsx
              ├── <ErrorBoundary>     ← NEW: section-level
              │   └── <ProfessionalIdentityHero />
              ├── <ErrorBoundary>
              │   └── <WorkExperienceShowcase />
              ├── <ErrorBoundary>
              │   └── <ProjectsShowCase />
              │       └── <TagFilter />           ← NEW: Phase 2
              ├── <ErrorBoundary>
              │   └── <AboutMeShowcase />
              ├── <ErrorBoundary>
              │   └── <SkillsExperienceShowCase />
              ├── <ErrorBoundary>
              │   └── <Testimonials />            ← NEW: Phase 3
              ├── <ErrorBoundary>
              │   └── <Contact />
              └── locale/error.tsx                 ← NEW: root error (whole page)
```

### Route Structure Changes

```
src/app/
  [locale]/
    error.tsx                        ← NEW: root error UI
    page.tsx                         ← MODIFY: wrap sections in ErrorBoundary
    blog/                            ← NEW: Phase 2
      page.tsx                       ← listing page
      [slug]/
        page.tsx                     ← article detail
    projects/                        ← NEW: Phase 2
      [id]/
        page.tsx                     ← project detail
```

### Data Flow

```
[constants/data/**/*.data.ts]
       │ (server component, locale-aware import)
       ▼
[page.tsx: async Server Component]
       │ (await getWorkExperience(), getProjects(), getSkillData())
       ▼
[Client Components: pass as props]
       │
       ├── ProjectsShowCase ──→ TagFilter (client-side filtering)
       │         │
       │         └── ProjectCard ──→ [link to /projects/[id]]
       │
       ├── Testimonials ──→ static data (MD or data file)
       │
       └── Contact ──→ GAEvent (form submit)

[ThemeProvider Context]
  localStorage ←→ React Context ←→ <html class="dark|light">
       │
       └── DarkModeToggle (reads/writes context)
       └── globals.css :root / .dark vars (reactive via CSS)
```

---

## Architecture Decisions

### AD-1: CSS Custom Properties for Dark Mode (NOT `dark:` prefix)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `dark:` prefix on every element | Massive refactor of ~30+ components; no dark: on @component layer; hard to maintain | ❌ REJECTED |
| CSS custom properties on `:root`/`.dark` | Components reference `var(--color-*)` automatically; zero component changes needed | ✅ SELECTED |

**Rationale**: The entire codebase uses Tailwind v4 theme tokens (`bg-background-main`,
`text-text-main`, etc.) resolved through `@theme {}`. By overriding the
underlying CSS custom properties when `.dark` class is present on `<html>`,
EVERY existing component gets dark mode for free. No `dark:` class needed
anywhere. This is the key architectural insight.

### AD-2: next-mdx-remote (NO new build-time MDX plugin)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `@next/mdx` (build-time) | Adds compile step; requires MDX files at build time; harder to localize | ❌ REJECTED |
| `next-mdx-remote` (runtime) | Serialize at request time; no build config; can load any source (files, CMS) | ✅ SELECTED |

**Rationale**: For 2-3 articles, a full build-time MDX pipeline is overkill.
`next-mdx-remote` gives us runtime MDX rendering from markdown files in
`content/` directory. Easy to migrate later if blogging grows.

### AD-3: Per-Locale Content Directories (same pattern as data)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Single MDX with frontmatter locale | Requires custom parsing; breaks next-intl pattern | ❌ REJECTED |
| `content/en/blog/` + `content/es/blog/` | Matches existing `constants/data/en/`, `constants/data/es/` pattern | ✅ SELECTED |

**Rationale**: The project already has per-locale data files for projects,
skills, work experience. Mirroring this for blog content maintains
consistency and makes it easy to add translations.

### AD-4: No Pagination for Blog

**Decision**: No pagination. Blog list is a simple chronological list.
**Rationale**: Expecting 2-3 articles. Pagination would be YAGNI. Can add
when articles exceed 10.

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app/globals.css` | Modify | Replace hardcoded hex in body/component layer with `var(--color-*)`; add dark theme overrides |
| `src/lib/theme/ThemeProvider.tsx` | **New** | React context for dark mode state; localStorage read/write; system preference detection |
| `src/lib/theme/ThemeToggle.tsx` | **New** | Sun/Moon icon button placed in Navigation |
| `src/lib/theme/useTheme.ts` | **New** | Hook for consuming theme context |
| `src/lib/ga/gatag.ts` | Modify | Add typed `GAEvent` type and `sendEvent()` helper |
| `src/lib/ga/events.ts` | **New** | Event category constants and helper factories |
| `src/shared/components/ErrorBoundary/ErrorBoundary.tsx` | **New** | Generic error boundary with fallback and onError |
| `src/app/[locale]/error.tsx` | **New** | Root error page for the locale (catches all sections) |
| `src/app/[locale]/page.tsx` | Modify | Wrap each section in `<ErrorBoundary>` |
| `src/app/components/analitycs/` | **Rename** | Fix typo: → `analytics/` |
| `tests/e2e/skilss.spec.ts` | **Rename** | Fix typo: → `skills.spec.ts` |
| `src/shared/components/Navigation/Navigation.tsx` | Modify | Add `<ThemeToggle />` to desktop + mobile nav |
| `src/constants/navigationConfig.ts` | Modify | Add blog nav item, fix duplicate label |
| `jest.config.ts` | Modify | Enable `coverageThreshold` |
| `content/en/blog/` | **New dir** | English blog articles as .md files |
| `content/es/blog/` | **New dir** | Spanish blog articles as .md files |
| `src/app/[locale]/blog/page.tsx` | **New** | Blog listing page (server component) |
| `src/app/[locale]/blog/[slug]/page.tsx` | **New** | Blog article detail (server component) |
| `src/shared/types/blog.types.ts` | **New** | Blog post type definitions |
| `src/app/[locale]/projects/[id]/page.tsx` | **New** | Project detail page |
| `src/shared/types/project.types.ts` | Modify | Extend IProject with detail fields |
| `src/constants/projects.ts` | Modify | Add detail content to project data |
| `src/app/components/projects/TagFilter.tsx` | **New** | Client-side tag filter component |
| `src/shared/hooks/useInView.ts` | **New** | Intersection Observer hook |
| `src/shared/components/AnimatedSection/AnimatedSection.tsx` | **New** | Scroll-reveal wrapper component |
| `src/app/components/testimonials/Testimonials.tsx` | **New** | Testimonials section |
| `content/testimonials/` | **New dir** | Testimonial markdown files |
| `messages/en.json` | Modify | Add blog, dark mode, testimonials i18n keys |
| `messages/es.json` | Modify | Add blog, dark mode, testimonials i18n keys |

---

## Dark Mode Design (HIGHEST RISK)

### Current State in globals.css

```
@theme {
  --color-background-main: #f2e9e4;
  --color-text-main: #22223b;
  --color-primary-brand: #4a4e69;
  ...hardcoded hex values...
}

@layer base {
  :root { ...HSL custom props (UNUSED by components)... }
  .dark { ...HSL overrides (defined but NEVER applied)... }

  body {
    background-color: #f2e9e4;     /* HARDCODED — MUST change */
    color: #22223b;                 /* HARDCODED — MUST change */
  }
}

@layer components {
  .card { background-color: #f2e9e4; ... }  /* HARDCODED */
  .btn-primary { background-color: #22223b; ... }  /* HARDCODED */
  .btn-secondary { background-color: white; ... }   /* HARDCODED */
  .input-field { background-color: white; ... }     /* HARDCODED */
}
```

### The Problem

The `@theme` block defines Tailwind utility classes (`bg-background-main`,
`text-text-main`) correctly — components using these work fine. BUT:
1. The `@layer base` and `@layer components` blocks use **hardcoded hex
   values** directly, NOT the theme variables
2. The `.dark` class with HSL vars exists but is never activated
3. Components using TW utilities (`bg-background-main`) will auto-resolve to
   dark values IF the underlying CSS custom property changes — but the
   `@layer` styles won't

### Step-by-Step Changes

**Step 1**: Replace all hardcoded hex in `@layer base` `body` with theme vars:

```css
body {
  background-color: var(--color-background-main);
  color: var(--color-text-main);
}
```

**Step 2**: Replace all hardcoded colors in `@layer components`:

```css
.card {
  background-color: var(--color-background-main);
  border: 1px solid color-mix(in srgb, var(--color-text-main) 10%, transparent);
}
.btn-primary {
  background-color: var(--color-text-main);
  color: var(--color-background-main);
}
.btn-secondary {
  background-color: var(--color-background-main);
  color: var(--color-text-main);
  border: 2px solid var(--color-text-main);
}
.input-field {
  background-color: var(--color-background-main);
  color: var(--color-text-main);
  border: 2px solid var(--color-accent);
}
.link-text {
  color: var(--color-text-main);
}
.link-text:hover {
  color: var(--color-primary-brand);
}
```

**Step 3**: Define dark theme overrides for the Tailwind v4 theme tokens:

```css
.dark {
  --color-background-main: #1a1a2e;
  --color-text-main: #e4e4e7;
  --color-primary-brand: #a8a8b3;
  --color-secondary: #4a4e69;
  --color-accent: #6b7280;
  --shadow-subtle: 0px 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-interactive: 0px 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-modal: 0 4px 8px rgba(0, 0, 0, 0.4);
}
```

**Step 4**: The existing HSL-based `.dark` block in `@layer base` becomes
dead code — remove it (or keep as reference, components don't use those
vars).

### How Existing Components Change

Components using Tailwind utilities:
- `<body className="bg-background-main text-text-main">` → **NO CHANGE**,
  the `@theme` tokens resolve to whatever the current CSS custom property
  value is

Components using CSS classes (`.card`, `.btn-primary`, `.input-field`):
- **NO CHANGE** — after we replace hardcoded hex with `var(--color-*)` in
  globals.css, they react to dark mode automatically

The ONLY components that need direct modification:
- **Navigation.tsx**: Add `<ThemeToggle />` button
- **Navigation.tsx**: `bg-background-main/95` already reacts via CSS var

### ThemeProvider Implementation

```typescript
// src/lib/theme/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Listen for system preference changes when no stored preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => setTheme((prev) => prev === "light" ? "dark" : "light");

  // Prevent hydration mismatch
  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

### Integration Point

In `src/app/layout.tsx` (root layout), wrap the body content:

```typescript
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

// Wrap around children:
<ThemeProvider>
  {children}
</ThemeProvider>
```

This wraps at root level (before locale) so the theme class on `<html>` is
available before any locale-specific content renders.

### Toggle Button Design

- **Position**: In Navigation, next to locale switcher (both desktop and
  mobile menus)
- **Icon**: Sun icon (light mode) / Moon icon (dark mode) — add to
  `SvgIcons` in `src/shared/components/Icons/Icons.tsx`
- **Accessibility**: `aria-label="Toggle dark mode"`, `role="switch"`
- **Behavior**: Click toggles; icon reflects current state; transition for
  smooth switch

### Dark Mode Color Palette

| Token | Light (current) | Dark |
|-------|----------------|------|
| `--color-background-main` | `#F2E9E4` | `#1a1a2e` |
| `--color-text-main` | `#22223B` | `#e4e4e7` |
| `--color-primary-brand` | `#4A4E69` | `#a8a8b3` |
| `--color-secondary` | `#C9ADA7` | `#4a4e69` |
| `--color-accent` | `#9A8C98` | `#6b7280` |
| `--shadow-subtle` | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.3)` |

---

## Error Boundary Design

### ErrorBoundary Component

```typescript
// src/shared/components/ErrorBoundary/ErrorBoundary.tsx
"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, errorInfo.componentStack);
    this.props.onError?.(error, errorInfo);
    // Future: sendEvent("error", "boundary", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-8 text-center">
          <h2 className="text-xl font-heading font-bold text-error mb-2">
            Something went wrong
          </h2>
          <p className="text-text-main/70">
            This section encountered an error. Please try refreshing.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Section Wrapping in page.tsx

```typescript
<section>
  <ErrorBoundary>
    <ProfessionalIdentityHero />
  </ErrorBoundary>
  <ErrorBoundary>
    <WorkExperienceShowcase workExperienceData={workExperienceData} />
  </ErrorBoundary>
  {/* ... each subsequent section */}
</section>
```

Each section gets its own boundary so one failing section doesn't take down
the entire page.

### Error Reporting

On `componentDidCatch`:
1. `console.error` with component stack (dev debugging)
2. Optional `sendEvent("error", "boundary_catch", error.message)` via the GA
   helper (Phase 1, but event fires only if GA ID is configured)

---

## GA Events

### GAEvent Type

```typescript
// src/lib/ga/events.ts
export type GAEventCategory = "engagement" | "navigation" | "error";

export interface GAEvent {
  event: string;         // e.g. "file_download", "form_submit"
  event_category: GAEventCategory;
  event_label?: string;
  value?: number;
}

export function sendEvent(event: string, category: GAEventCategory, label?: string, value?: number) {
  if (typeof window === "undefined") return;
  if (!window.gtag) {
    console.debug("[GA Event]", { event, category, label, value });
    return;
  }
  window.gtag("event", event, {
    event_category: category,
    event_label: label,
    value,
  });
}
```

### Event Map

| Event Name | Category | Fires When | Where |
|-----------|----------|------------|-------|
| `file_download` | engagement | CV download button clicked | `DownloadLink.tsx` |
| `form_submit` | engagement | Contact form submitted | `ContactForm.tsx` |
| `form_submit_error` | error | Contact form submission fails | `ContactForm.tsx` |
| `nav_click` | navigation | Any nav link clicked | `Navigation.tsx` |
| `locale_switch` | navigation | Language toggled | `Navigation.tsx` |
| `theme_toggle` | engagement | Dark mode toggled | `ThemeToggle.tsx` |
| `project_view` | engagement | Project card "View" clicked | `ProjectCard.tsx` |
| `external_link` | navigation | GitHub/live link clicked | `ProjectCard.tsx` |
| `error_boundary` | error | Error boundary catches error | `ErrorBoundary.tsx` |

Only fires in production (NODE_ENV === "production"). In development,
`console.debug` logs the event.

---

## Blog Architecture

### Content Structure

```
content/
  blog/
    en/
      building-scalable-apis-with-node.md
      react-performance-tips.md
    es/
      construyendo-apis-escalables-con-node.md
      consejos-rendimiento-react.md
```

### MDX Setup

```typescript
// src/lib/mdx/serialize.ts (server-only)
import "server-only";
import { readFile } from "fs/promises";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export async function getPost(locale: string, slug: string) {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.md`);
  const source = await readFile(filePath, "utf-8");
  const mdxSource = await serialize(source);
  return mdxSource;
}

export async function getPosts(locale: string) {
  const dir = path.join(CONTENT_DIR, locale);
  const files = await readdir(dir);  // or use glob
  // Parse frontmatter, sort by date
}
```

### No new dependency for `readdir`/`glob` — use Node's `fs/promises` since
these are server-only modules.

### Blog Types

```typescript
// src/shared/types/blog.types.ts
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;      // ISO date for sorting
  tags?: string[];
  locale: string;    // "en" | "es"
}
```

Frontmatter in each `.md` file contains title, description, date. The MD
body is the article content.

### i18n for Blog

- Blog content itself is NOT translated via next-intl messages — it's
  per-locale markdown files
- The page template uses next-intl for structural text (e.g., "Back to
  blog", "Read more")
- Blog config: `/[locale]/blog` route resolves locale-aware content

### Listing Page

```typescript
// src/app/[locale]/blog/page.tsx
import { getPosts } from "@/lib/mdx/serialize";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = await getPosts(locale);
  // sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
            <time>{post.date}</time>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

For 2-3 articles, no pagination. Simple chronological list.

---

## Project Detail Pages

### Route

`/[locale]/projects/[id]` — the `[id]` is a dynamic segment matching the
project id (number) from the `IProject` data.

### Data Flow

1. `page.tsx` reads `params.id` as a string
2. Calls `getProjects()` (locale-aware) and filters by `id`
3. If not found, calls `notFound()`
4. Renders full project detail view

### Extended IProject Interface

```typescript
export interface IProject {
  // ...existing fields...
  // NEW fields for detail pages:
  challenge_detail?: string;     // longer version for detail
  solution_detail?: string;
  results_detail?: string;
  screenshots?: string[];        // additional images
  features?: string[];           // bullet-point features
  architecture?: string;         // architecture description
  learnings?: string[];          // what was learned
}
```

These fields are added to the data files (both `en/projects.data.ts` and
`es/projects.data.ts` and `projects.ts`). The existing `IProject` fields
remain mandatory; new fields are optional (`?`) so the ProjectCard
component still works without them.

---

## Tag Filtering

### Data Model

Tags are derived from `project.technologies[]`. No separate tag field —

technologies serve as the tag vocabulary.

```typescript
// Derive unique tags from projects
function getAllTags(projects: IProject[]): string[] {
  return [...new Set(projects.flatMap(p => p.technologies))].sort();
}

// Filter
function filterByTag(projects: IProject[], tag: string | null): IProject[] {
  if (!tag) return projects;
  return projects.filter(p => p.technologies.includes(tag));
}
```

### Filter UI: TagFilter Component

```typescript
// src/app/components/projects/TagFilter.tsx
"use client";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
}
```

- Renders pill buttons: "All" + each unique technology tag
- Clicking a tag sets it as selected (filter active)
- Clicking the same tag again or "All" clears the filter
- Selected pill gets `bg-primary-brand text-white`, unselected gets
  `bg-background-main border border-accent`

### Client-Side Filtering (no server re-render)

```typescript
// Parent component (ProjectsShowCase becomes "use client"):
const [selectedTag, setSelectedTag] = useState<string | null>(null);
const filteredProjects = useMemo(
  () => selectedTag
    ? projects.filter(p => p.technologies.includes(selectedTag))
    : projects,
  [projects, selectedTag]
);
```

Since all projects are loaded server-side and passed as props, filtering
happens entirely in the browser — no server round trip.

---

## Scroll-Reveal Animations

### useInView Hook

```typescript
// src/shared/hooks/useInView.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView({ threshold = 0.1, rootMargin = "0px", once = true }: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
```

### AnimatedSection Component

```typescript
// src/shared/components/AnimatedSection/AnimatedSection.tsx
"use client";

import { useInView } from "@/shared/hooks/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left";
}

export function AnimatedSection({ children, className = "", animation = "fade-up" }: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  const animations: Record<string, string> = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-in": "opacity-0",
    "slide-left": "-translate-x-8 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "translate-y-0 opacity-100" : animations[animation]
      } ${className}`}
      style={{ willChange: isInView ? "auto" : "transform, opacity" }}
    >
      {children}
    </div>
  );
}
```

### Performance Considerations

- `will-change` only applied when NOT in view (optimizes initial paint)
- `prefers-reduced-motion: reduce` already handled in globals.css — all
  animations/transitions are killed at `0.01ms`
- `once: true` by default — unobserve after first reveal

### Application

Wrap each section in page.tsx:

```typescript
<AnimatedSection>
  <ProfessionalIdentityHero />
</AnimatedSection>
<AnimatedSection animation="fade-in">
  <WorkExperienceShowcase ... />
</AnimatedSection>
```

---

## Testimonials

### Data Structure

```typescript
// src/shared/types/testimonial.types.ts
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}
```

### Content Location

```
content/testimonials/
  en.json       ← { testimonials: Testimonial[] }
  es.json       ← translated versions
```

Static JSON for simplicity. Testimonials are short quotes, not full pages.

### Component Placement

In `page.tsx`, between Skills and Contact sections:

```typescript
<ErrorBoundary>
  <AnimatedSection animation="slide-left">
    <Testimonials />
  </AnimatedSection>
</ErrorBoundary>
```

---

## Interfaces / Contracts

### GAEvent Type (add to gatag.ts)

```typescript
// src/lib/ga/gatag.ts
export type GAEventCategory = "engagement" | "navigation" | "error";

export function sendEvent(
  event: string,
  category: GAEventCategory,
  label?: string,
  value?: number
): void;
```

### Theme Context

```typescript
interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
```

### ErrorBoundary Props

```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;     // optional custom fallback UI
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
```

### Blog Post

```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  locale: string;
}
```

### Extended IProject

Additions to existing `IProject`:

```typescript
interface IProject {
  // ...existing fields unchanged...
  challenge_detail?: string;
  solution_detail?: string;
  results_detail?: string;
  screenshots?: string[];
  features?: string[];
  architecture?: string;
  learnings?: string[];
}
```

---

## Testing Strategy

| Layer | Feature | Approach |
|-------|---------|----------|
| **Unit** | ThemeProvider | Render with wrapper, assert context value, simulate toggle, verify class on `document.documentElement` |
| **Unit** | useTheme | Render consumer component, verify throws without provider, returns context with provider |
| **Unit** | DarkModeToggle | Render in nav, click, verify icon changes (Sun→Moon), verify aria-label updates |
| **Unit** | ErrorBoundary | Render with child that throws, assert fallback UI renders, assert onError called |
| **Unit** | GA sendEvent | Mock `window.gtag`, call `sendEvent`, assert gtag called with correct params |
| **Unit** | useInView | Mock `IntersectionObserver`, trigger callback, verify `isInView` state transitions |
| **Unit** | TagFilter | Render with tags, simulate click, verify `onTagChange` called with correct tag |
| **Unit** | Testimonials | Render with mock data, verify author/quote/role rendered |
| **Integration** | Blog listing | Fetch posts, render list, verify links point to correct slugs |
| **Integration** | Blog detail | Render MDX content, verify headings/paragraphs render |
| **Integration** | Project detail | Render with mock project data, verify all detail fields rendered |
| **Integration** | AnimatedSection | Render, mock intersection, verify CSS class changes |
| **E2E** | Dark mode | Playwright: `page.emulateMedia({ colorScheme: 'dark' })`, verify theme applied, toggle button works |
| **E2E** | Blog navigation | Navigate to /blog, click article, verify content renders |
| **E2E** | Tag filtering | Navigate to projects, click tag, verify only matching projects shown |
| **E2E** | Error boundary | Inject error (via URL param or data attr), verify fallback shows |
| **E2E** | Animations | Scroll to section, verify elements become visible (wait for opacity change) |

### Dark Mode Testing (JSDOM)

```typescript
// Jest: test ThemeProvider in jsdom
it("toggles theme and updates document class", () => {
  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>
  );
  // localStorage mock, document.documentElement.classList assertion
});
```

### Dark Mode Testing (Playwright)

```typescript
// tests/e2e/theme.spec.ts
test("dark mode persists across navigation", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  // Assert dark class on html
  await expect(page.locator("html")).toHaveClass(/dark/);
  // Toggle
  await page.click("[data-testid='theme-toggle']");
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  // Refresh and verify persistence
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
```

### Jest Coverage Thresholds

```typescript
// In jest.config.ts (or unit config):
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
  "./src/lib/**": {
    branches: 80,
    functions: 80,
    lines: 80,
  },
}
```

---

## Phase Delivery Strategy

| Phase | Features | PR Lines Estimate | Dependencies |
|-------|----------|-----------------|-------------|
| Phase 1 | Dark mode, ErrorBoundary, GA events, P0 fixes, Coverage | ~400 | None |
| Phase 2 | Blog, Project details, Tag filtering | ~500 (chain recommended) | Phase 1 |
| Phase 3 | Animations, Testimonials | ~250 | Phase 1 |

### Review Guard

- **Decision needed before apply**: Yes — confirm chained PRs for Phase 2
- **Chained PRs recommended**: Phase 2 only (blog alone is ~300 lines,
  project details + tags is ~200)
- **400-line budget risk**: Phase 1 — Medium, Phase 2 — High, Phase 3 — Low

Phase 2 should be split into two chained PRs:
- PR 2a: Blog (content directory, MDX setup, listing + detail pages)
- PR 2b: Project details + Tag filtering
