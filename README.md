# Design System Playground

A public React + TypeScript code sample exploring reusable components, interaction patterns, accessibility, and design-system architecture.

## Overview

This repository is a focused public engineering sample. It explores how a compact component system can feel intentional in both code and product context: a small set of reusable primitives, a semantic token layer, and a responsive Workspace Preferences surface that composes them into a realistic interface.

It is deliberately not a UI framework or a portfolio site. The aim is to make architecture, interaction design, accessibility decisions, and trade-offs easy for an engineering or design-engineering reviewer to inspect.

## What to look at

- [`src/pages/App.tsx`](src/pages/App.tsx) — the responsive product surface and component composition.
- [`src/styles/tokens.scss`](src/styles/tokens.scss) — semantic tokens and the light/dark theme contract.
- [`src/components`](src/components) — colocated implementation, SCSS Modules, Storybook stories, and focused behavior tests.
- [`.storybook/preview.tsx`](.storybook/preview.tsx) — theme switching and accessibility checks in Storybook.

## Highlights

- React, TypeScript, Vite, SCSS Modules, and Storybook
- Semantic CSS custom-property tokens with light and dark themes
- Responsive layout designed for desktop, tablet, and small touch screens
- Accessible form feedback, dialog, tooltip, tabs, switch, notifications, and command-menu interactions
- Focused Vitest and React Testing Library coverage for user-visible behavior

## Component inventory

| Component / pattern | Demonstrates |
| --- | --- |
| Button | Visual variants, sizes, loading/disabled behavior, icon-only accessible names |
| Text Input | Labels, descriptions, validation feedback, icons, and character count relationships |
| Switch and Tabs | Keyboard operation, selected state, focus visibility, and responsive overflow |
| Card and Empty State | Composable layout primitives and product-level empty-state composition |
| Dialog and Tooltip | Accessible overlay behavior built on small, dedicated Radix primitives |
| Toast | Semantic feedback variants, dismiss controls, auto-dismiss, and reduced-motion support |
| Command Menu | Filtering, match highlighting, keyboard navigation, empty states, and selection |

Every component has a Storybook story; the most interaction-heavy components also have automated behavior tests.

## Architecture

The system uses a deliberately flat structure rather than a monorepo or broad abstraction layer:

```text
src/
  components/       reusable UI primitives, styles, stories, and tests
  pages/            composed application surfaces
  styles/           global styles and semantic tokens
  test/             test environment setup
```

Components are independently consumable and keep their implementation, SCSS Module, stories, and tests together. The application page is intentionally a product surface—not a grid of isolated controls—so the system can be evaluated in context.

### Why Radix is used selectively

Dialog and Tooltip use Radix primitives. Those interactions require safe focus containment/restoration, Escape handling, portals, and reliable ARIA relationships; using a small headless accessibility primitive keeps the code focused on the system’s behavior and presentation. Other components prefer native HTML controls and semantics where they are sufficient.

## Design tokens and themes

[`src/styles/tokens.scss`](src/styles/tokens.scss) defines semantic roles for:

- canvas, surface, border, text, and feedback colors
- type scale and weights
- spacing, radii, elevation, transitions, focus rings, and layers

Components consume semantic roles such as `--color-surface` and `--color-text-muted`, rather than palette values. Setting `data-theme="light"` or `data-theme="dark"` changes values at the theme boundary without changing component code. Storybook exposes the same choice in its toolbar.

## Accessibility

Accessibility is treated as part of each component’s API and interaction model:

- Native controls lead wherever possible.
- Inputs connect label, helper text, validation, and character count through stable IDs and ARIA descriptions.
- Tabs use roving tab stops with Left/Right Arrow navigation; disabled tabs are skipped.
- Switches expose checked state through the `switch` role and remain keyboard operable.
- Dialogs contain focus, restore it on close, and support Escape dismissal.
- Focus rings, contrast-conscious semantic colors, live notification status, and a reduced-motion fallback are included globally.

Storybook includes the accessibility addon for component-level checks.

## Testing

Tests intentionally verify user outcomes rather than implementation details:

- loading buttons are disabled and announce busy state
- input errors are available through the accessible description
- switch and tab keyboard interactions change state correctly
- dialogs close with Escape
- command search filters results and selects with Enter

## Run locally

**Requirements:** Node.js 18.20+ and npm.

```bash
npm install
npm run dev
```

Vite prints the local URL after startup.

## Storybook

```bash
npm run storybook
```

To create a static Storybook build:

```bash
npm run build-storybook
```

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

The test suite runs in jsdom with Vitest and React Testing Library. Generated output (`dist/` and `storybook-static/`) and dependencies are excluded from version control.

## Screenshots

Add rendered screenshots here when a hosted preview is available. Suggested captures:

- Workspace Preferences on a wide desktop viewport in dark theme
- Workspace Preferences on a 375px viewport in light theme
- Command Menu or Dialog interaction state
