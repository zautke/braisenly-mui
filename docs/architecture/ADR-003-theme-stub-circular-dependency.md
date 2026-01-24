# ADR-003: themeStub.ts Circular Dependency Workaround

## Status
Accepted (Legacy - Migration in Progress)

## Context
The codebase has a circular dependency problem in the theme creation flow:

```
buildBaseTheme.ts
    ↓ imports
componentOverrides/index.ts
    ↓ imports (via individual component files)
themeStub.ts (or buildBaseTheme.ts)
    ↓ needs
palette.ts, typography.ts, etc.
    ↑ already loaded, but...
buildBaseTheme.ts hasn't finished executing yet!
```

### The Problem Illustrated
1. `buildBaseTheme.ts` starts executing
2. It imports `componentOverrides/index.ts`
3. `componentOverrides/form.js` imports theme for `theme.typography.inputLabel`
4. If it imports `buildBaseTheme.ts`, that module hasn't finished - returns `undefined`
5. Component override references `undefined.typography` → Runtime crash

### Evidence in Codebase
The comment in `buildBaseTheme.ts` documents this directly:
```typescript
// Create the base theme first to avoid circular dependency issues when components are loaded
// However, since components import 'theme' from here, and we import 'components' from there,
// we have a cycle.
```

## Decision
Create `themeStub.ts` as a minimal theme object that:
1. Contains only the primitive theme tokens (palette, typography, spacing, breakpoints, shape)
2. Does NOT import any component overrides
3. Provides a safe import target for legacy component overrides that need direct theme access

```typescript
// themeStub.ts - Breaks the cycle
const baseTheme = createTheme({
  palette,
  typography,
  spacing,
  breakpoints,
  shape,
});

// Augment with custom tokens not in standard MUI
const theme = {
  ...baseTheme,
  zDepth,
  typography: {
    ...baseTheme.typography,
    ...typography,  // Preserve custom typography variants
  }
};

export default theme;
```

### Dependency Graph (With Stub)
```
buildBaseTheme.ts
    ↓ imports
componentOverrides/index.ts
    ↓ imports (form.js)
themeStub.ts          ← NO cycle! Stub doesn't import overrides
    ↓ imports
palette.ts, typography.ts  ← Pure data, no cycles
```

## Consequences

### Benefits
- **Breaks Circular Dependency**: Component overrides can safely import `themeStub` without triggering the cycle
- **Provides MUI Utilities**: The stub is a real `createTheme()` result, so `theme.spacing()`, `theme.breakpoints.up()`, etc. are available
- **Minimal Footprint**: Only includes what's needed for component overrides

### Drawbacks
- **Dual Theme Objects**: Two theme objects exist (`themeStub` and `finalTheme`), which can cause confusion
- **Stale Token Risk**: If `themeStub` and `buildBaseTheme` diverge, component overrides may use outdated values
- **Legacy Pattern**: Modern MUI component overrides should use callback syntax `({ theme }) => ({...})` which receives the final theme

### Migration Path
The preferred pattern is migrating component overrides from:
```javascript
// OLD (uses themeStub - avoid)
import theme from '../themeStub';
const MuiFormLabel = {
  root: {
    color: theme.typography.inputLabel,  // Static reference to stub
  }
};
```

To:
```javascript
// NEW (receives final theme - preferred)
const MuiFormLabel = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.typography.inputLabel,  // Dynamic reference
    })
  }
};
```

## Alternatives Considered

### 1. Lazy Theme Resolution
Wrap theme access in a function that defers resolution:
```javascript
const getTheme = () => require('./buildBaseTheme').default;
```
Rejected: Complicates static analysis, tree-shaking, and TypeScript inference.

### 2. Dependency Injection
Pass theme as a parameter to component override factories:
```javascript
export const createButtonOverrides = (theme) => ({...});
```
Considered for future refactor. Current codebase would require significant restructuring.

### 3. Move All Overrides Inline
Define all component overrides within `buildBaseTheme.ts` after theme options are defined.
Rejected: Results in 2000+ line file, poor maintainability.

### 4. MUI Callback Pattern (Adopted for New Code)
MUI v5+ supports callback-based style overrides that receive the final theme:
```javascript
styleOverrides: {
  root: ({ theme }) => ({...})
}
```
This is the target pattern. New component overrides use this approach; legacy files (`form.js`) still use `themeStub`.

