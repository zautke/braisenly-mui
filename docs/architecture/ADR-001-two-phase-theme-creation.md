# ADR-001: Two-Phase Theme Creation Pattern

## Status
Accepted

## Context
MUI's `createTheme()` function requires component overrides to reference theme tokens (e.g., `theme.palette.primary.main`, `theme.typography.button`) that don't exist until the theme is created. This creates a chicken-and-egg problem:

1. Component overrides need access to theme values (palette colors, typography, spacing)
2. The complete theme needs component overrides to be fully defined
3. Attempting to reference undefined theme values during module initialization causes runtime errors

The `@braisenly/mui` package needed a pattern that allows component overrides to access theme tokens while still being composable into the final theme.

## Decision
Implement theme creation in two phases:

### Phase 1: Base Theme (`buildBaseTheme.ts`)
Create a base theme containing only foundational tokens:
- `palette` - Color definitions
- `typography` - Font configurations
- `spacing` - Spacing scale
- `breakpoints` - Responsive breakpoints
- `shape` - Border radius and shape tokens
- `zDepth` - Custom shadow/elevation tokens

This base theme is created via `createTheme(themeOptions)` and exported for component overrides to import.

### Phase 2: Component Override Merge (`index.ts`)
The final theme is composed by merging:
1. The base theme from Phase 1
2. Component style overrides (`componentOverrides/index.ts`)
3. Default prop overrides (`defaultProps/index.ts`)

```typescript
const customThemeOptions: ThemeOptions = _.merge({
  ...customBaseTheme,
  ...componentOverrides,
  name: "Custom",
});

export const finalTheme: Theme = createTheme(customThemeOptions);
```

## Consequences

### Benefits
- **Type Safety**: Component overrides can safely reference `theme.palette.*` and `theme.typography.*` since the base theme is already constructed
- **Modularity**: Each component override is isolated in its own file, making maintenance easier
- **Theme Composability**: The pattern allows multiple themes (e.g., light/dark variants) to share the same component overrides
- **Lazy Evaluation**: Component overrides using callback syntax `({ theme }) => ({...})` receive the fully resolved theme

### Drawbacks
- **Two-Step Mental Model**: Developers must understand that theme values are available in Phase 1, but component overrides are applied in Phase 2
- **Potential for Stale References**: If a component override imports `themeStub.ts` directly (legacy pattern), it may not reflect the final theme configuration
- **Build Complexity**: The two-phase approach requires careful import ordering to avoid circular dependencies

## Alternatives Considered

### 1. Single `createTheme()` Call with Inline Overrides
Defining all component overrides inline within a single `createTheme()` call. Rejected because:
- Results in a 1000+ line theme file
- Makes it difficult to maintain individual component overrides
- Doesn't scale well as component library grows

### 2. Theme Factory Function
Creating a factory `buildTheme(options)` that generates the complete theme. Considered but not adopted because:
- Adds runtime overhead for theme generation
- Complicates static analysis and tree-shaking
- Current pattern works well with MUI's callback-based component overrides

### 3. CSS Variables-First Approach
Using MUI's experimental CSS theme variables. Not adopted because:
- Requires MUI v5.6+ experimental features
- Breaking change for existing consumers
- May be considered for future major version

