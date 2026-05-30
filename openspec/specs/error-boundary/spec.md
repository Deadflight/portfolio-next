# Error Boundary Specification

## Purpose

Section-level error resilience. One crashed section MUST NOT break adjacent content. Root error page MUST show translated fallback with a way home.

## Requirements

### Requirement: ErrorBoundary Component

ErrorBoundary MUST be a class-based React component that catches render errors in children. On error it MUST render fallback UI with `role="alert"`, a retry button, and call `onError(error, errorInfo)`.

#### Scenario: Normal render

- GIVEN children that render without error
- WHEN the component tree mounts
- THEN children appear normally; no fallback is rendered

#### Scenario: Error caught

- GIVEN a child component throws during render
- WHEN ErrorBoundary catches the error
- THEN the fallback UI with `role="alert"` replaces the children AND `onError` fires with the error and component stack

#### Scenario: Retry resets error

- GIVEN the fallback UI is visible
- WHEN user clicks the retry button
- THEN ErrorBoundary resets its error state and re-renders children

### Requirement: Root Error Page

`[locale]/error.tsx` MUST be a `"use client"` component. MUST display `common.errorTitle` and a link to `/` labeled `common.backToHome`.

#### Scenario: Root error renders

- GIVEN an unhandled error bubbles to the Next.js root error boundary
- WHEN `[locale]/error.tsx` renders
- THEN it shows `common.errorTitle` as heading and a link to `{locale}/` labeled `common.backToHome`

### Requirement: Section-Level Isolation

The 6 sections in `page.tsx` (Hero, Experience, Projects, About, Skills, Contact) MUST each be wrapped in a separate `<ErrorBoundary>`.

#### Scenario: Error isolation

- GIVEN 6 page sections each wrapped in `<ErrorBoundary>`
- WHEN one section's component throws
- THEN only that section shows its fallback; the other 5 sections render uninterrupted

### Requirement: Translation Keys

`messages/{en,es}.json` MUST add `common.sectionError`, `common.retry`, `common.errorTitle`.

#### Scenario: English translations

- GIVEN locale is "en"
- WHEN fallback renders
- THEN `common.sectionError` is "Something went wrong", `common.retry` is "Try again", `common.errorTitle` is "Unexpected Error"

#### Scenario: Spanish translations

- GIVEN locale is "es"
- THEN Spanish equivalents display: "Algo salió mal", "Intentar de nuevo", "Error inesperado"
