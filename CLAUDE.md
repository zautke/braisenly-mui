# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## CRITICAL REQUIREMENTS

### NEVER USE LOCAL PLAYWRIGHT FOR BROWSER TESTING

**USE MCP BROWSER TOOLS ONLY** for all browser-based testing and verification.

**FORBIDDEN:**
- `npx playwright test`
- `pnpm playwright`
- Importing from `@playwright/test`
- Any local Playwright execution

**REQUIRED:**
- Use MCP browser tools for E2E testing
- Use MCP browser tools for visual verification
- Use MCP browser tools for theme testing
- Use MCP browser tools for component testing in browser

This policy applies to the demo app (`demo/`) and all browser-based verification tasks.

---

## Overview

This is a **Material-UI (MUI) v5 custom theme package** that provides extensive theming customization for React applications. It's designed to be imported as a theme module into MUI-based projects.

## Architecture

### Theme Assembly Flow

```
index.ts (entry point)
    ├── buildBaseTheme.ts → Creates base theme with palette, typography, spacing
    │       ├── palette.ts → Extended color palette using colorGuide
    │       ├── typography.ts → Custom fonts (Victor Mono, Barlow, Cormorant)
    │       ├── spacing.ts
    │       └── z-depth.ts
    │
    ├── componentOverrides/index.ts → MUI component style overrides
    │       └── button.js, select.js, switch.js, cssBaseLine.ts (active)
    │       └── [many commented-out component overrides available]
    │
    └── defaultProps/index.ts → Component default prop overrides
```

### Key Design Patterns

**Two-Phase Theme Creation**: The theme is built in two phases using `createTheme()`:
1. Base theme with palette/typography in `buildBaseTheme.ts`
2. Component overrides merged via lodash in `index.ts`

**Color System**: All colors flow from `colorGuide.ts` which defines a `styleguideColors` object. The palette extends MUI's palette with a custom `colorGuide` property accessible via `theme.palette.colorGuide['color-name']`.

**TypeScript Module Augmentation**: Two declaration files extend MUI types:
- `colors.d.ts` - Extends `PaletteOptions`, `Palette`, and `TypeBackground`
- `mui5.d.ts` - Extends `Theme`, `ThemeOptions`, and `TypographyVariants`

### Component Override Pattern

Component overrides in `componentOverrides/` follow MUI v5 structure:
```javascript
const MuiComponentName = {
    styleOverrides: {
        root: { /* base styles */ },
        variantName: { /* variant-specific styles */ }
    }
}
```

They access theme values via the imported `buildBaseTheme` module.

## Exports

- `default` / `finalTheme` - The complete custom theme
- `defaultTheme` - MUI's default theme for comparison

## Fonts

Custom fonts used (must be available in consuming app):
- Victor Mono Variable (primary body font, via @fontsource-variable)
- Barlow (buttons, loaded from `../../assets/fonts/barlow/barlow.css`)
- Cormorant
- PalmBeach

## Notes

- Many component overrides exist but are commented out in `componentOverrides/index.ts` - uncomment as needed
- The `palette.ts` has several `color.XXXX` placeholder values that need real color assignments
- Console logging of theme output is active in `index.ts` for debugging
