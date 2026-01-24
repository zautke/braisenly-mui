# @braisenly/mui Installation Guide

A comprehensive custom MUI theme with pre-configured palette, typography, and component overrides.

---

## Quick Start

Get up and running in 5 minutes:

```bash
# Install the package
npm install @braisenly/mui

# Install peer dependencies (if not already installed)
npm install @mui/material @emotion/react @emotion/styled react react-dom
```

```tsx
// App.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { finalTheme } from '@braisenly/mui';

function App() {
  return (
    <ThemeProvider theme={finalTheme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js     | 20.x or later |
| React       | ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0 |
| React DOM   | ^17.0.0 \|\| ^18.0.0 \|\| ^19.0.0 |
| MUI Material| ^7.0.0 |
| Emotion React | ^11.5.0 |
| Emotion Styled | ^11.3.0 |

---

## Installation

### 1. Install the Package

Choose your package manager:

```bash
# npm
npm install @braisenly/mui

# yarn
yarn add @braisenly/mui

# pnpm
pnpm add @braisenly/mui
```

### 2. Install Peer Dependencies

```bash
# npm
npm install @mui/material@^7.0.0 @emotion/react@^11.5.0 @emotion/styled@^11.3.0

# yarn
yarn add @mui/material@^7.0.0 @emotion/react@^11.5.0 @emotion/styled@^11.3.0

# pnpm
pnpm add @mui/material@^7.0.0 @emotion/react@^11.5.0 @emotion/styled@^11.3.0
```

**Optional:** Install MUI Icons if needed:

```bash
npm install @mui/icons-material@^7.0.0
```

### 3. Verify Installation

```bash
# Check the package is installed correctly
npm ls @braisenly/mui
```

---

## Basic Setup

### Wrap Your App with ThemeProvider

```tsx
// src/App.tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { finalTheme } from '@braisenly/mui';

function App() {
  return (
    <ThemeProvider theme={finalTheme}>
      <CssBaseline />
      <YourAppContent />
    </ThemeProvider>
  );
}

export default App;
```

### Available Exports

```tsx
import {
  finalTheme,      // Default export - the complete custom theme
  defaultTheme,    // MUI's default theme for comparison
  palette,         // Extended palette with colorGuide
  customBaseTheme, // Base theme without component overrides
  styleOverrides,  // Component style overrides (for extending)
} from '@braisenly/mui';

// Types are also exported
import type {
  ColorGuide,
  ColorName,
  ColorValue,
} from '@braisenly/mui';
```

---

## TypeScript Configuration

**No additional configuration required!** Types are bundled with the package.

The package includes module augmentations that extend MUI's type definitions. Once installed, you automatically get IntelliSense for:

### Extended Palette Types

```tsx
// theme.palette.colorGuide is fully typed
theme.palette.colorGuide.treegreen;  // ✓ TypeScript knows this exists
theme.palette.colorGuide.walnut;     // ✓ TypeScript knows this exists

// Custom backgrounds (bk1-bk4)
theme.palette.background.bk1;  // ✓ TypeScript knows this exists
theme.palette.background.bk2;  // ✓ TypeScript knows this exists

// ext property for custom extensions
theme.palette.ext;  // ✓ TypeScript knows this exists
```

### Extended Theme Types

```tsx
// Theme name property
theme.name;  // ✓ Returns "Custom" for finalTheme

// Poster typography variant
theme.typography.poster;  // ✓ Custom typography variant
```

---

## Using the Theme

### Accessing Theme Values

```tsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
    }}>
      Theme Name: {theme.name}
    </div>
  );
}
```

### Using colorGuide

The `colorGuide` provides a comprehensive color palette:

```tsx
import { useTheme } from '@mui/material/styles';

function ColorDemo() {
  const theme = useTheme();
  const { colorGuide } = theme.palette;

  return (
    <div>
      {/* Primary brand colors */}
      <div style={{ color: colorGuide.treegreen }}>Primary Green</div>
      <div style={{ color: colorGuide.walnut }}>Secondary Walnut</div>
      <div style={{ color: colorGuide.crimson }}>Error Crimson</div>

      {/* Semantic colors */}
      <div style={{ color: colorGuide.applegreen }}>Success</div>
      <div style={{ color: colorGuide.burntorange }}>Warning</div>
      <div style={{ color: colorGuide.lemon }}>Info</div>
    </div>
  );
}
```

### Using Custom Backgrounds (bk1-bk4)

```tsx
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function BackgroundDemo() {
  const theme = useTheme();

  return (
    <Box sx={{
      backgroundColor: theme.palette.background.bk1,
      // Available: bk1, bk2, bk3, bk4
    }}>
      Custom background layer
    </Box>
  );
}
```

### Using the Poster Typography Variant

```tsx
import Typography from '@mui/material/Typography';

// First, enable the variant in your app
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
  }
}

function PosterDemo() {
  return (
    <Typography variant="poster">
      Large display text
    </Typography>
  );
}
```

---

## Font Loading

### Bundled Fonts

**Victor Mono Variable** is bundled with the package via `@fontsource-variable/victor-mono`. It's automatically available when you import the theme.

### Consumer-Loaded Fonts

The following fonts must be loaded by your application:

| Font | Usage | Where to Get |
|------|-------|--------------|
| Barlow | Button text | [Google Fonts](https://fonts.google.com/specimen/Barlow) |
| Cormorant | Typography overrides | [Google Fonts](https://fonts.google.com/specimen/Cormorant) |
| PalmBeach | Special typography | Custom font (provide your own source) |

### Loading Fonts via Google Fonts (HTML)

```html
<!-- Add to your index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Loading Fonts via Fontsource (Recommended)

```bash
npm install @fontsource/barlow @fontsource/cormorant
```

```tsx
// In your entry file (main.tsx or App.tsx)
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/cormorant/400.css';
import '@fontsource/cormorant/500.css';
```

### Loading Custom Fonts (PalmBeach)

For custom fonts like PalmBeach, add a font-face declaration:

```css
/* In your global CSS */
@font-face {
  font-family: 'PalmBeach';
  src: url('/fonts/palmbeach.woff2') format('woff2'),
       url('/fonts/palmbeach.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

---

## Common Gotchas

### 1. Emotion Cache Setup for SSR

For Next.js or other SSR frameworks, set up an Emotion cache:

```tsx
// emotion-cache.ts
import createCache from '@emotion/cache';

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
```

```tsx
// _app.tsx (Next.js)
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { finalTheme } from '@braisenly/mui';
import { createEmotionCache } from './emotion-cache';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={finalTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
```

### 2. MUI v5 vs v6 Differences

This package targets **MUI v6** but maintains backwards compatibility with v5 patterns:

- Module augmentations work with both v5 and v6
- Component overrides use the current MUI API
- If using v5, ensure you're on a compatible minor version

### 3. Font Loading Order

Load fonts **before** rendering your app to prevent FOUT (Flash of Unstyled Text):

```tsx
// Correct order in main.tsx
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/cormorant/400.css';
// ... then your app
import App from './App';
```

---

## Troubleshooting

### "Cannot find module '@braisenly/mui'" Error

**Cause:** Package not installed or Node modules need refresh.

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Or verify the package is installed
npm ls @braisenly/mui
```

### Type Errors with colorGuide or Theme Extensions

**Cause:** TypeScript not recognizing module augmentations.

**Solutions:**

1. Ensure you're importing from the package (augmentations are side-effects):
```tsx
import { finalTheme } from '@braisenly/mui';
```

2. Restart your TypeScript server (VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server")

3. If using a monorepo, ensure the package is correctly hoisted

### Theme Not Applying

**Cause:** Missing ThemeProvider wrapper or CssBaseline.

**Solution:** Ensure your app is wrapped correctly:
```tsx
<ThemeProvider theme={finalTheme}>
  <CssBaseline />  {/* Required for baseline styles */}
  <App />
</ThemeProvider>
```

### Fonts Not Rendering

**Cause:** Consumer fonts not loaded.

**Solution:** Load required fonts (see [Font Loading](#font-loading) section):
- Barlow, Cormorant, PalmBeach must be loaded by your app
- Victor Mono is bundled automatically

---

## Migration from Vanilla MUI

### What Changes

| Before (Vanilla MUI) | After (@braisenly/mui) |
|---------------------|------------------------|
| `createTheme({})` | Import `finalTheme` directly |
| Define your own palette | Pre-configured with colorGuide |
| No `theme.name` | `theme.name` available |
| Standard backgrounds | Extended with `bk1`, `bk2`, `bk3`, `bk4` |
| Standard typography | Includes `poster` variant |

### What Stays the Same

- All standard MUI components work identically
- `sx` prop, `styled()`, and `useTheme()` work as expected
- You can still override theme values using `createTheme()` with theme merging

### Step-by-Step Migration

**Step 1:** Install the package and peer dependencies
```bash
npm install @braisenly/mui @mui/material @emotion/react @emotion/styled
```

**Step 2:** Replace your theme setup
```tsx
// Before
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({ /* your options */ });

// After
import { ThemeProvider } from '@mui/material/styles';
import { finalTheme } from '@braisenly/mui';
```

**Step 3:** Update ThemeProvider
```tsx
// Before
<ThemeProvider theme={theme}>

// After
<ThemeProvider theme={finalTheme}>
```

**Step 4:** (Optional) Extend the theme
```tsx
import { createTheme } from '@mui/material/styles';
import { finalTheme } from '@braisenly/mui';

const myTheme = createTheme(finalTheme, {
  // Your additional customizations
  palette: {
    primary: {
      main: '#your-color',
    },
  },
});
```

**Step 5:** Load required fonts (see [Font Loading](#font-loading))

---

## Additional Resources

- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [Emotion Documentation](https://emotion.sh/docs/introduction)
- [Package Repository](https://github.com/zautke/braisenly-mui)
