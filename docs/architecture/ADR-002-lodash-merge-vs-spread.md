# ADR-002: Lodash Merge vs Spread Operators

## Status
Accepted

## Context
When composing MUI theme objects, we need to merge multiple configuration sources:
- Base theme options (palette, typography, spacing)
- Style overrides from 30+ component files
- Default prop overrides

JavaScript provides several merging strategies:
1. **Spread operator** (`{...a, ...b}`) - Shallow merge
2. **Object.assign()** - Shallow merge
3. **Lodash `_.merge()`** - Deep recursive merge
4. **Structured cloning** - Deep copy without merge

MUI theme objects are deeply nested. For example, a button component override:
```javascript
{
  MuiButton: {
    styleOverrides: {
      root: { padding: '4px 12px' },
      contained: { boxShadow: 'none' }
    }
  }
}
```

## Decision
Use `lodash.merge()` for all theme composition operations:

```typescript
// index.ts
const mergeStyleandDefaultPropOverrides = _.merge(
  styleOverrides,
  defaultPropOverrides,
);

const customThemeOptions: ThemeOptions = _.merge({
  ...customBaseTheme,
  ...componentOverrides,
  name: "Custom",
});
```

## Consequences

### Benefits

#### 1. Deep Nested Object Preservation
Spread operators perform shallow merges, which would overwrite nested properties:

```javascript
// With spread (WRONG - loses styleOverrides.root):
const a = { MuiButton: { styleOverrides: { root: { color: 'red' } } } };
const b = { MuiButton: { styleOverrides: { contained: { bg: 'blue' } } } };
const result = { ...a, ...b };
// Result: { MuiButton: { styleOverrides: { contained: { bg: 'blue' } } } }
// LOST: root styles!

// With _.merge (CORRECT - preserves both):
const result = _.merge(a, b);
// Result: { MuiButton: { styleOverrides: { root: {...}, contained: {...} } } }
```

#### 2. Component Override Composability
Multiple files can contribute to the same component's configuration:
- `componentOverrides/button.js` - Style overrides
- `defaultProps/index.ts` - Default prop values

`_.merge()` ensures both contributions are preserved in the final theme.

#### 3. Predictable Merge Order
Lodash merge follows left-to-right precedence with deep recursion, making override priority explicit and debuggable.

### Drawbacks

#### 1. Bundle Size Impact
Lodash adds ~4KB (gzipped) to the bundle. However:
- The package already uses lodash for other utilities
- Tree-shaking with `import _ from 'lodash'` is suboptimal
- Could optimize with `import merge from 'lodash/merge'` in future

#### 2. Reference Mutation
`_.merge()` mutates the first argument. Current code mitigates this by creating new objects:
```typescript
_.merge({  // Fresh object as target
  ...customBaseTheme,
  ...componentOverrides,
})
```

#### 3. Array Handling
`_.merge()` merges arrays by index, not concatenation. Not an issue for theme objects since MUI themes don't use arrays for configuration.

## Alternatives Considered

### 1. Spread Operators Only
```typescript
const theme = { ...base, ...overrides };
```
Rejected: Loses deeply nested properties. Would require flattening the entire theme structure, breaking MUI's expected format.

### 2. MUI's `deepmerge` Utility
MUI exports `@mui/utils/deepmerge`. Considered but:
- Functionally identical to lodash merge for our use case
- Lodash already in dependency tree
- Less familiar to team members

### 3. Custom Merge Function
Building a purpose-specific deep merge. Rejected because:
- Reinventing the wheel
- Risk of edge case bugs
- Lodash is battle-tested

### 4. `createTheme()` Cascade
MUI's `createTheme` accepts multiple theme inputs:
```typescript
createTheme(baseTheme, overrides1, overrides2);
```
Currently used in combination with merge. The final implementation uses both patterns for maximum flexibility.

