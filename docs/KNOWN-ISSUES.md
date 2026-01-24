# Known Issues & Technical Debt

> Last updated: 2026-01-24  
> Package: @braisenly/mui v0.0.2

---

## Critical Issues

### 1. TypeScript Build Errors (csstype Reference)

**Severity:** Critical  
**Files Affected:**
- `componentOverrides/autocomplete.ts`
- `componentOverrides/breadcrumbs.ts`
- `componentOverrides/dataGrid.ts`
- `componentOverrides/pagination.ts`

**Description:**  
Running `pnpm tsc --noEmit` produces errors like:
```
error TS2742: The inferred type of 'default' cannot be named without a reference to '.pnpm/csstype@3.2.3/node_modules/csstype'. This is likely not portable. A type annotation is necessary.
```

**Impact:** These errors prevent clean TypeScript builds and may cause issues when consumers import the package.

**Suggested Fix:**  
Add explicit type annotations to the default exports in affected files:
```typescript
import type { Components, Theme } from '@mui/material/styles';

const overrides: Components<Theme> = { /* ... */ };
export default overrides;
```

---

## High Priority

### 2. Placeholder Color Values in palette.ts

**Severity:** High  
**File:** `palette.ts` (lines 74-83)

**Description:**  
Multiple palette properties use `color.XXXX` placeholder value (`#222`) instead of proper design tokens:

| Property | Line | Current Value |
|----------|------|---------------|
| `common.black` | 74 | `color.XXXX` |
| `common.white` | 75 | `color.XXXX` |
| `text.primary` | 79 | `color.XXXX` |
| `text.secondary` | 80 | `color.XXXX` |
| `text.disabled` | 81 | `color.XXXX` |
| `divider` | 83 | `color.XXXX` |

**Impact:** Text and common colors display as dark gray (`#222`) instead of appropriate design colors.

**Suggested Fix:**  
Replace with proper values from `colorGuide.ts`:
```typescript
common: {
  black: color.ink,        // '#000000'
  white: color.white,      // '#ffffff'
},
text: {
  primary: color.ink,
  secondary: color['ink-light'],
  disabled: color['grey-05'],
},
divider: color['grey-03'],
```

---

### 3. Console.log Statements in Production Code

**Severity:** High  
**File:** `index.ts` (lines 44, 46)

**Description:**  
Active console.log statements output full theme JSON on every import:
```typescript
console.log("finalTheme", JSON.stringify(finalTheme, null, 2));
console.log('default theme', JSON.stringify(defaultTheme, null, 2))
```

**Impact:** Pollutes console output in consuming applications and exposes theme internals. Performance impact from JSON.stringify on every import.

**Suggested Fix:**  
Remove or gate behind `process.env.NODE_ENV !== 'production'`:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log("finalTheme", JSON.stringify(finalTheme, null, 2));
}
```

---

## Medium Priority

### 4. Commented-Out Component Override (form.js)

**Severity:** Medium  
**Files:** 
- `componentOverrides/index.ts` (line 16, 54)
- `componentOverrides/form.js`

**Description:**  
The form component overrides are commented out:
```typescript
// import form from './form';
// ...
// ...form,
```

**Reason:** The `form.js` file uses legacy JSX syntax (`$focused`, `$error`) and relies on `theme.typography.inputLabel` and `theme.typography.inputHelperText` which may not exist in the current typography configuration.

**Impact:** Form components (FormControl, FormLabel, FormControlLabel, FormHelperText) use MUI defaults instead of custom styles.

**Suggested Fix:**  
Either update `form.js` to use MUI v5/v6 syntax and ensure typography extensions exist, or remove the file if not needed.

---

### 5. Font Loading Responsibility on Consumer

**Severity:** Medium  
**File:** `typography.ts`

**Description:**  
The theme uses custom fonts that must be loaded by the consuming application:

| Font | Usage | Loading Status |
|------|-------|----------------|
| Victor Mono Variable | Primary body font | Bundled via `@fontsource-variable/victor-mono` |
| Barlow | Button text | Must be loaded by consumer |
| Cormorant | Typography overrides | Must be loaded by consumer |
| PalmBeach | Special typography | Must be loaded by consumer |

**Impact:** If consuming apps don't load these fonts, text will fall back to the fallback stack: `Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

**Suggested Fix:**  
Document required font loading in README or provide optional font bundle exports.

---

### 6. Incomplete Palette Light/Dark/ContrastText Values

**Severity:** Medium  
**File:** `palette.ts` (lines 34-69)

**Description:**  
Primary, secondary, error, warning, info, and success palette entries only define `main` color. The `light`, `dark`, and `contrastText` values are commented out.

**Impact:** MUI auto-calculates these values, which may not match design intentions.

**Suggested Fix:**  
Explicitly define all palette variants for brand consistency.

---

## Low Priority / Nice to Have

### 7. themeVariant Module Augmentation Not Used

**Severity:** Low  
**File:** `mui/themeVariants.ts`

**Description:**  
Module augmentation adds `themeVariant` property to Theme, but it's not exported or used in the main theme build.

**Impact:** Feature is available but undocumented and unexposed.

---

### 8. pnpm Version Warning

**Severity:** Low  
**File:** `package.json` (line 4)

**Description:**  
`"packageManager": "pnpm@10"` produces warning: `Cannot switch to pnpm@10: "10" is not a valid version`

**Suggested Fix:**  
Use a specific version: `"packageManager": "pnpm@10.0.0"` or remove if not using corepack.

---

## Future Considerations

### Emotion vs Pigment CSS Migration

**Current State:** Package uses `@emotion/react` and `@emotion/styled` (v11.11.0)

**MUI v7 Direction:** MUI is transitioning to Pigment CSS as the default styling solution.

**Considerations:**
1. Pigment CSS uses zero-runtime CSS extraction
2. Current component overrides use `styleOverrides` pattern which works with both
3. Theme augmentation will need review for Pigment compatibility
4. `sx` prop usage in consuming apps will need migration path

**Recommendation:** Monitor MUI v7 release notes. When migrating:
1. Replace `@emotion/react` and `@emotion/styled` with `@pigment-css/react`
2. Test all component overrides for compatibility
3. Update any dynamic style callbacks

---

### MUI Version Compatibility

**Current:** `@mui/material` ^6.0.0, `@mui/icons-material` ^6.0.0

**Notes:**
- Package uses MUI v6 which is backwards compatible with v5 patterns
- Module augmentation files (`colors.d.ts`, `mui5.d.ts`) work with v6
- Consider testing against v6.x latest minor versions regularly

---

## Checklist for Consumers

- [ ] Load Barlow, Cormorant, and PalmBeach fonts if custom typography desired
- [ ] Be aware of console.log output during development
- [ ] Review placeholder colors for text/common if colors appear incorrect
- [ ] Add explicit csstype dependency if TypeScript errors occur during bundling

