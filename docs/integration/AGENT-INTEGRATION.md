# @braisenly/mui Agent Integration Protocol

> **Zero-Ambiguity Integration Document for AI Agents**
> Complete integration in ONE SHOT with NO follow-up questions.

---

## 1. One-Shot Integration Prompt

Copy this prompt to integrate `@braisenly/mui` into any React project:

```
Integrate @braisenly/mui theme package:

1. Install peer dependencies:
   npm install @emotion/react @emotion/styled @mui/material

2. Install the package:
   npm install @braisenly/mui

3. Wrap the app root with ThemeProvider and CssBaseline:
   - Import: import theme from '@braisenly/mui';
   - Import: import { ThemeProvider, CssBaseline } from '@mui/material';
   - Wrap: <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>

4. Verify: Access theme.palette.colorGuide in any component using useTheme().
```

---

## 2. Import Paths Reference

```typescript
// Default theme (recommended - pre-built, ready to use)
import theme from '@braisenly/mui';
// OR explicit named import
import { finalTheme } from '@braisenly/mui';

// Other theme exports
import { 
  defaultTheme,      // MUI default theme with name="Default"
  customBaseTheme,   // Base theme without component overrides
  palette,           // Extended palette with colorGuide
  styleOverrides     // Component style overrides (for extending)
} from '@braisenly/mui';

// Type exports
import type { 
  ColorGuide,
  ColorName,
  ColorValue,
  ColorMap,
  ColorMapEntry,
  ColorMapEntries 
} from '@braisenly/mui';

// Re-exported MUI types (augmented with custom properties)
import type {
  Theme,
  ThemeOptions,
  Palette,
  PaletteOptions,
  TypeBackground,
  PaletteColor,
  TypographyVariants,
  TypographyVariantsOptions
} from '@braisenly/mui';
```

---

## 3. File-by-File Changes (Universal Pattern)

### Required Changes
Every React project needs these two modifications:

**Entry Point (main.tsx, index.tsx, _app.tsx):**
```typescript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@braisenly/mui';

// Wrap your app
<ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

---

## 4. Vite Project Integration

### `src/main.tsx` - COMPLETE FILE
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@braisenly/mui';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### `src/App.tsx` - MINIMAL EXAMPLE
```typescript
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function App() {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" color="primary">
        Theme Active: {theme.name}
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Styled Button
      </Button>
    </Box>
  );
}

export default App;
```

### `vite.config.ts` - NO CHANGES REQUIRED
The package works with default Vite configuration.

---

## 5. Next.js App Router Integration

### `app/providers.tsx` - NEW FILE
```typescript
'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@braisenly/mui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

### `app/layout.tsx` - MODIFY
```typescript
import { Providers } from './providers';

export const metadata = {
  title: 'My App',
  description: 'Using @braisenly/mui theme',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### `next.config.js` - NO CHANGES REQUIRED
The package works with default Next.js configuration.

---

## 6. Next.js Pages Router Integration

### `pages/_app.tsx` - COMPLETE FILE
```typescript
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@braisenly/mui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### `pages/_document.tsx` - OPTIONAL (for SSR)
```typescript
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/createEmotionCache';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return { ...initialProps, styles: [...emotionStyleTags, initialProps.styles] };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

---

## 7. Create React App Integration

### `src/index.tsx` - COMPLETE FILE
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@braisenly/mui';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### `src/App.tsx` - MINIMAL EXAMPLE
```typescript
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function App() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        @braisenly/mui Theme Active
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Theme name: {theme.name}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>
    </Box>
  );
}

export default App;
```

---

## 8. Type Augmentation Verification

Run this code to verify type augmentations are working correctly:

```typescript
import { useTheme } from '@mui/material/styles';
import type { ColorGuide } from '@braisenly/mui';

function TypeTest() {
  const theme = useTheme();

  // ✅ These should NOT error if types are correctly augmented
  const themeName: string | undefined = theme.name;
  const colorGuide: ColorGuide = theme.palette.colorGuide;
  const bk1: string | undefined = theme.palette.background.bk1;
  const bk2: string | undefined = theme.palette.background.bk2;
  const bk3: string | undefined = theme.palette.background.bk3;
  const bk4: string | undefined = theme.palette.background.bk4;

  // ✅ Access specific colors from colorGuide
  const treegreen: string = theme.palette.colorGuide['treegreen'];
  const walnut: string = theme.palette.colorGuide['walnut'];

  // ✅ Custom typography variant
  // theme.typography.poster should be accessible

  console.log({ themeName, bk1, treegreen, walnut });

  return null;
}
```

### TypeScript Config Requirement
Ensure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // or "node16", "nodenext"
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## 9. Validation Checklist

After integration, verify each item:

- [ ] **No TypeScript errors** - `tsc --noEmit` passes
- [ ] **Theme applies to components** - Buttons, Typography use custom colors
- [ ] **colorGuide accessible** - `theme.palette.colorGuide` is defined
- [ ] **Custom backgrounds work** - `theme.palette.background.bk1` is accessible
- [ ] **Theme name property** - `theme.name` returns "Custom"
- [ ] **CssBaseline applied** - Global styles reset correctly
- [ ] **Component overrides active** - Buttons have custom styling

### Quick Verification Component
```typescript
import { Box, Button, Typography, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export function ThemeVerification() {
  const theme = useTheme();
  const checks = {
    themeName: theme.name === 'Custom',
    colorGuide: !!theme.palette.colorGuide,
    primaryColor: theme.palette.primary.main === '#1C6F26',
    bk1Exists: theme.palette.background.bk1 !== undefined,
  };
  const allPassed = Object.values(checks).every(Boolean);

  return (
    <Box sx={{ p: 2 }}>
      <Alert severity={allPassed ? 'success' : 'error'}>
        Theme Integration: {allPassed ? 'SUCCESS' : 'FAILED'}
      </Alert>
      <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
        {JSON.stringify(checks, null, 2)}
      </Typography>
    </Box>
  );
}
```

---

## 10. Error Recovery

### Common Errors and Exact Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module '@braisenly/mui'` | Package not installed | `npm install @braisenly/mui` |
| `Module not found: @emotion/react` | Missing peer deps | `npm install @emotion/react @emotion/styled @mui/material` |
| `Property 'colorGuide' does not exist on type 'Palette'` | Type augmentations not loaded | Ensure importing from `@braisenly/mui`, not building custom theme |
| `Property 'name' does not exist on type 'Theme'` | Same as above | Import theme from `@braisenly/mui` |
| `Property 'bk1' does not exist on type 'TypeBackground'` | Same as above | Use the package's exported theme |
| `Theme not applying` | Missing ThemeProvider wrapper | Wrap app root with `<ThemeProvider theme={theme}>` |
| `Styles reset not working` | Missing CssBaseline | Add `<CssBaseline />` inside ThemeProvider |

### Type Augmentation Troubleshooting

If types are not recognized, ensure:

1. **Package is imported at entry point:**
   ```typescript
   import theme from '@braisenly/mui'; // This loads augmentations
   ```

2. **Not re-creating the theme:**
   ```typescript
   // ❌ WRONG - loses type augmentations
   const myTheme = createTheme({ ...theme });

   // ✅ CORRECT - use exported theme directly
   import theme from '@braisenly/mui';
   ```

3. **Check tsconfig paths:**
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {}  // Should NOT override @braisenly/mui
     }
   }
   ```

---

## 11. Extending the Theme

To customize while preserving type augmentations:

```typescript
import { createTheme } from '@mui/material/styles';
import { finalTheme, styleOverrides } from '@braisenly/mui';
import merge from 'lodash/merge';

// Extend with custom overrides
const customTheme = createTheme(
  merge({}, finalTheme, {
    palette: {
      primary: { main: '#your-color' },
    },
    components: {
      ...styleOverrides,
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 0 },
        },
      },
    },
  })
);
```

---

## 12. Package Details Summary

| Property | Value |
|----------|-------|
| Package name | `@braisenly/mui` |
| Default export | `finalTheme` (Theme object) |
| Theme name | `"Custom"` |
| MUI version | `^6.0.0` |
| Primary color | `#1C6F26` (treegreen) |
| Secondary color | `#7b6748` (walnut) |
| Palette mode | `light` |

### Peer Dependencies (Required)
```json
{
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "@mui/material": "^6.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Optional Peer Dependencies
```json
{
  "@mui/icons-material": "^6.0.0"
}
```

---

## 13. Quick Copy-Paste Snippets

### Minimal Integration (3 lines)
```typescript
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@braisenly/mui';
// Wrap: <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
```

### Install Command
```bash
npm install @braisenly/mui @emotion/react @emotion/styled @mui/material
```

### Verify Theme Active
```typescript
const theme = useTheme();
console.log('Theme:', theme.name, 'Primary:', theme.palette.primary.main);
```

---

*Document Version: 1.0.0 | Package Version: 0.0.2 | Last Updated: 2026-01-24*

