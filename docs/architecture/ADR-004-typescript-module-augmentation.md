# ADR-004: TypeScript Module Augmentation Strategy

## Status
Accepted

## Context
MUI's TypeScript definitions are comprehensive but closed. When extending MUI with custom:
- Palette colors (e.g., `colorGuide`, `ext`)
- Typography variants (e.g., `poster`, `inputLabel`)
- Theme properties (e.g., `name`, `zDepth`)
- Background variants (e.g., `bk1`, `bk2`, `bk3`, `bk4`)

TypeScript will error because these properties don't exist in MUI's type definitions.

### The Problem
```typescript
// palette.ts
const palette = {
  colorGuide: color,  // TS Error: 'colorGuide' does not exist on type 'PaletteOptions'
  background: {
    bk1: color.offwhite,  // TS Error: 'bk1' does not exist on type 'TypeBackground'
  }
};

// Usage in component
theme.palette.colorGuide.treegreen;  // TS Error: Property 'colorGuide' does not exist
```

## Decision
Use TypeScript's module augmentation feature across two declaration files:

### `colors.d.ts` - Palette Extensions
Augments MUI's palette system:
```typescript
declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    colorGuide?: ColorGuide;
    ext?: any;
  }

  export interface TypeBackground {
    bk1?: string;
    bk2?: string;
    bk3?: string;
    bk4?: string;
  }

  export interface Palette {
    colorGuide: ColorGuide;
    ext?: any;
  }
}
```

### `mui5.d.ts` - Theme & Typography Extensions
Augments core theme structure:
```typescript
declare module "@mui/material/styles/createTheme" {
  interface ThemeOptions {
    name?: string;
  }

  interface Theme {
    name?: string;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}
```

## Consequences

### Benefits

#### 1. Type Safety for Custom Properties
After augmentation, TypeScript recognizes custom properties:
```typescript
theme.palette.colorGuide.treegreen;  // ✓ Valid
theme.name;                           // ✓ Valid
theme.palette.background.bk1;         // ✓ Valid
```

#### 2. IDE Autocomplete
Custom properties appear in autocomplete suggestions, improving developer experience.

#### 3. No Runtime Overhead
Module augmentation is purely a compile-time feature. No code is generated; types are simply extended.

#### 4. Preserved MUI Types
Augmentation extends rather than replaces. All original MUI types remain intact:
```typescript
theme.palette.primary.main;    // ✓ Still works
theme.palette.colorGuide.ink;  // ✓ Also works
```

### Drawbacks

#### 1. Global Type Pollution
Augmentations apply globally. Any project importing this package will have its MUI types modified, which may conflict with their own augmentations.

#### 2. Duplicate Interface Declarations
`colors.d.ts` declares `Palette` twice (lines 60-64 and 66-70). While TypeScript merges these, it's confusing and should be consolidated.

#### 3. Commented-Out Properties
`mui5.d.ts` contains many commented-out augmentations (e.g., `inputLabel`, `CommonColors` extensions), indicating incomplete migration or abandoned experiments.

#### 4. Import Side Effects
The augmentation files use empty imports for side effects:
```typescript
import { } from "@mui/material/styles"  // Triggers augmentation
```
This pattern is non-obvious and could be accidentally removed.

## Alternatives Considered

### 1. Type Assertions
Cast theme objects when accessing custom properties:
```typescript
(theme.palette as any).colorGuide.treegreen;
```
Rejected: Loses type safety entirely, defeats the purpose.

### 2. Wrapper Types
Create custom interfaces that extend MUI types:
```typescript
interface CustomPalette extends Palette {
  colorGuide: ColorGuide;
}
```
Rejected: Requires type assertions at every usage point. Doesn't integrate with MUI's internal typing.

### 3. Declaration Merging in Component Files
Add `declare module` blocks in individual component files.
Rejected: Scatters type augmentations across codebase, harder to maintain.

### 4. Separate Types Package
Publish a `@braisenly/mui-types` package with augmentations.
Considered for future. Would allow consumers to opt-in to type extensions.

