# Design System Playground

A public React + TypeScript code sample exploring reusable components, interaction patterns, accessibility, and design-system architecture.

### Why this exists

This focused engineering sample demonstrates how a compact component system can feel deliberate in both code and product context. It emphasizes a coherent visual language, practical APIs, and interactions that hold up outside a static mockup.

### Highlights

- React, TypeScript, Vite, SCSS Modules, and Storybook
- Semantic CSS custom-property tokens with light and dark themes
- Responsive Workspace Preferences surface built from the system
- Accessible dialog, tooltip, tabs, switch, form feedback, and command menu
- Focused Vitest and React Testing Library behavior coverage

### Architecture

`src/components` contains small, independently consumable components with colocated styles, stories, and tests. `src/styles/tokens.scss` is the single source for semantic visual tokens; components reference those roles rather than hard-coded palette values. `src/pages/App.tsx` is intentionally a product surface, showing composition rather than a component gallery.

The dialog and tooltip use Radix primitives. This is a small, purposeful dependency: their robust focus containment, restoration, keyboard behavior, portals, and accessible relationships avoid reimplementing difficult interaction primitives poorly. The remaining components use native HTML semantics where those are sufficient.

### Design Tokens

Tokens cover canvas and surface layers, text and semantic feedback colors, spacing, typography, radius, elevation, transitions, focus rings, and z-index. Applying `data-theme="light"` or `data-theme="dark"` changes semantic values without changing component code. Storybook includes a theme toolbar for checking both modes.

### Accessibility

Native controls lead the implementation. Inputs connect labels, help, validation, and character counts through IDs; tabs use roving tab stops and arrow-key navigation; switches expose the `switch` role and checked state; dialogs trap focus and close on Escape. Focus rings, contrast-aware tokens, live notification status, and reduced-motion CSS are included throughout.

### Testing

Behavior-focused tests cover loading/disabled buttons, error descriptions, switch keyboard use, tab navigation, dialog Escape handling, and command filtering/selection. Storybook’s accessibility addon is included for component-level checks.

### Running locally

```bash
npm install
npm run dev
```

Then open the local URL reported by Vite.

### Storybook

```bash
npm run storybook
```

For a static Storybook build:

```bash
npm run build-storybook
```

### Quality checks

```bash
npm run lint
npm run test
npm run build
```

### Screenshots

_Desktop workspace-preferences screenshot goes here._

_Mobile workspace-preferences screenshot goes here._
