# GA Events Specification

## Purpose

Typed Google Analytics event tracking for key user interactions, with SSR safety and dev logging.

## Requirements

### Requirement: Typed sendEvent Function

`lib/ga/events.ts` MUST export typed event name constants and a `sendEvent(name, params?)` function. `sendEvent` MUST guard against SSR (no-op if `window` undefined), `console.log` in development, and call `window.gtag('event', name, params)` in production.

#### Scenario: SSR guard

- GIVEN `sendEvent` is called during SSR (window undefined)
- WHEN the function executes
- THEN it returns immediately; no gtag call, no error

#### Scenario: Dev mode logging

- GIVEN `NODE_ENV` is "development"
- WHEN `sendEvent` is called with a name and params
- THEN the event is logged via `console.log('[GA Event]', name, params)`

#### Scenario: Production gtag call

- GIVEN `NODE_ENV` is "production" and `window.gtag` exists
- WHEN `sendEvent('some_event', { key: 'val' })` is called
- THEN `window.gtag('event', 'some_event', { key: 'val' })` is invoked

### Requirement: DownloadLink Event

DownloadLink MUST call `sendEvent('download_cv')` on click.

#### Scenario: Download click tracked

- GIVEN a DownloadLink is clicked
- THEN `sendEvent('download_cv')` MUST fire

### Requirement: ContactForm Event

ContactForm MUST call `sendEvent('contact_form_submit')` on successful form submission.

#### Scenario: Contact submit tracked

- GIVEN the ContactForm submission succeeds (no server error)
- THEN `sendEvent('contact_form_submit')` MUST fire

### Requirement: Navigation Click Event

Navigation link clicks MUST call `sendEvent('nav_click', { href })`.

#### Scenario: Nav click tracked

- GIVEN a Navigation link is clicked
- THEN `sendEvent('nav_click', { href: '#target' })` MUST fire
