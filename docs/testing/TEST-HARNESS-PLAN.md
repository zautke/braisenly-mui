# Verification Testing Harness Implementation Plan

> **Created**: 2026-02-15
> **Scope**: Evidence-based test suite covering all Acceptance Criteria from `ACCEPTANCE_CRITERIA.md`
> **Companion docs**: `ROADMAP.md`, `ACCEPTANCE_CRITERIA.md`
> **Method**: Multi-agent codebase-retrieval analysis of current source code

---

## 1. Baseline Assessment

The testing harness establishes a **defect-aware baseline**: tests that FAIL today document known gaps; tests that PASS today serve as regression guards. The iterative workflow is:

1. Write all tests (many will fail against current code)
2. Fix one defect (per ROADMAP phase)
3. Re-run tests -- the repaired test should now PASS; all previously-passing tests must still PASS
4. Repeat until all tests are green

### Current Pass/Fail Baseline (52 test assertions)

| Domain | PASS | FAIL | UNKNOWN | Total |
|--------|------|------|---------|-------|
| Theme Creation (AC-1.*) | 8 | 0 | 0 | 8 |
| Palette (AC-2.*) | 4 | 6 | 0 | 10 |
| Typography (AC-3.*) | 2 | 4 | 0 | 6 |
| Component Overrides (AC-4.*) | 5 | 1 | 0 | 6 |
| Type Augmentations (AC-5.*) | 0 | 0 | 5 | 5 |
| Build Output (AC-6.*) | 0 | 0 | 5 | 5 |
| Publishing Infra (AC-7.*) | 0 | 7 | 0 | 7 |
| Preservation (AC-8.*) | 5 | 0 | 3 | 8 |
| **Totals** | **24** | **18** | **13** | **55** |

---

## 2. Prerequisites

### 2.1 Create `__tests__/` directory
No test directory exists at root. Create `__tests__/` with test files.

### 2.2 Vitest configuration
No `vitest.config.ts` exists. Create a minimal config:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    testTimeout: 30_000,
  },
});
```

### 2.3 Build step
Build-output tests (`AC-6.*`) require `dist/` to exist. The `beforeAll` hook in `build-output.test.ts` will run `pnpm build` before assertions.

---

## 3. Test File Manifest

| File | AC Coverage | Tests | Expected PASS/FAIL |
|------|-------------|-------|--------------------|
| `__tests__/theme-creation.test.ts` | AC-1.1 through AC-1.5, AC-8.1, AC-8.6, AC-8.7 | 14 | 14 PASS / 0 FAIL |
| `__tests__/palette-completeness.test.ts` | AC-2.1 through AC-2.9, AC-8.2 | 12 | 4 PASS / 6 FAIL / 2 edge |
| `__tests__/typography-completeness.test.ts` | AC-3.1 through AC-3.6 | 8 | 2 PASS / 4 FAIL |
| `__tests__/component-overrides.test.ts` | AC-4.1 through AC-4.5, AC-8.3 | 8 | 5 PASS / 1 FAIL |
| `__tests__/build-output.test.ts` | AC-6.1 through AC-6.5 | 5 | 0 PASS / 0 FAIL / 5 UNKNOWN |
| `__tests__/publishing-infra.test.ts` | AC-7.1 through AC-7.7 | 7 | 0 PASS / 7 FAIL |
| `__tests__/preservation.test.ts` | AC-8.1 through AC-8.8 | 8 | 5 PASS / 0 FAIL / 3 CI-gate |

---

## 4. Detailed Test Specifications

### 4.1 `__tests__/theme-creation.test.ts`

**Imports**:
```typescript
import { describe, it, expect } from 'vitest';
import finalTheme, {
  finalTheme as namedFinalTheme,
  defaultTheme,
  customBaseTheme,
  palette,
  styleOverrides,
} from '../index';
import { applyThemeVariant } from '../buildBaseTheme';
import zDepth from '../z-depth';
import { createTheme } from '@mui/material/styles';
```

**Tests**:

| ID | Test | Assertion | Baseline |
|----|------|-----------|----------|
| AC-1.1 | finalTheme creates without errors | `finalTheme` has `palette`, `typography`, `spacing`, `breakpoints`, `components` | PASS |
| AC-1.2 | customBaseTheme creates without errors | `customBaseTheme` has same shape, plus `palette.colorGuide` | PASS |
| AC-1.3a | MuiButtonBase has BOTH styleOverrides AND defaultProps | `finalTheme.components.MuiButtonBase` has `styleOverrides.root` AND `defaultProps.disableRipple === true` | PASS* |
| AC-1.3b | MuiAccordion has BOTH defaultProps AND styleOverrides | `defaultProps.disableGutters === true`, `defaultProps.elevation === 0`, `styleOverrides.root` exists | PASS |
| AC-1.3c | MuiButton has root, text, contained, outlined slots | All 4 `styleOverrides` slots exist | PASS |
| AC-1.4 | MuiButtonBase defaultProps from defaultProps/index.ts | `disableRipple === true` AND `styleOverrides` not clobbered | PASS |
| AC-1.5a | finalTheme.name === "Custom" | Direct assertion | PASS |
| AC-1.5b | defaultTheme.name === "Default" | Direct assertion | PASS |
| AC-8.1 | All 6 value exports defined | `finalTheme`, `defaultTheme`, `customBaseTheme`, `palette`, `styleOverrides` all defined; `default === finalTheme` | PASS |
| AC-8.6a | applyThemeVariant is importable | `typeof applyThemeVariant === 'function'` | PASS |
| AC-8.6b | applyThemeVariant('standard') returns theme | Result has `palette` | PASS |
| AC-8.6c | applyThemeVariant('glass') sets themeVariant | `result.themeVariant === 'glass'`, `result.components.MuiPaper.styleOverrides.root` exists | PASS |
| AC-8.7a | zDepth.for('card') returns boxShadow | Exact string: `"0 1px 0 0 rgba(37, 45, 57, 0.02)"` | PASS |
| AC-8.7b | zDepth.for('unknown') returns 'none' | `result.boxShadow === 'none'` | PASS |

*AC-1.3a passes due to lodash `merge(styleOverrides, defaultPropOverrides)` mutating the shared object before the broken single-arg `merge()` in index.ts. Fragile but functional.

---

### 4.2 `__tests__/palette-completeness.test.ts`

**Imports**:
```typescript
import { describe, it, expect } from 'vitest';
import { createTheme, getContrastRatio } from '@mui/material/styles';
import { paletteOptionExtensions } from '../palette';
import { styleguideColors } from '../colorGuide';

// Resolve palette through createTheme to get MUI-computed values
const resolvedPalette = createTheme({ palette: paletteOptionExtensions }).palette;
```

**Helper: hexToHSL**:
```typescript
function hexToHSL(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function isHueInRange(hue: number, min: number, max: number): boolean {
  return min <= max ? (hue >= min && hue <= max) : (hue >= min || hue <= max);
}
```

**Tests**:

| ID | Test | Baseline | Blocking Defect |
|----|------|----------|-----------------|
| AC-2.1 | 6 intents have main/light/dark/contrastText as non-empty strings | **PASS** | MUI auto-generates from `main` |
| AC-2.2 | contrastText/main pairs >= 4.5:1 contrast | **FAIL** | warning (~3.61) and success (~3.28) fail WCAG AA |
| AC-2.3 | bk1-bk4 are non-empty hex strings | **FAIL** | bk2, bk3, bk4 are `undefined` |
| AC-2.4 | text.primary/secondary/disabled non-empty | **PASS** | Already set correctly |
| AC-2.5 | divider non-empty | **PASS** | Already `#c8d2e6` |
| AC-2.6 | No empty-string keys in colorGuide | **FAIL** | `'': 'limegreen'` exists |
| AC-2.7 | No sentinel values (XXXX pattern) | **FAIL** | `XXXX: '#222'` exists |
| AC-2.8 | `lavender` key exists (corrected spelling) | **FAIL** | Only `lavendar` exists |
| AC-2.9 | Color names match hue semantics | **FAIL** | matteSeafoam, sunflower, lavendar, flatLime mismatched |
| AC-8.2 | Baseline key count >= 73 | **PASS** | 73 keys present |

**Semantic Hue Expectations** (for AC-2.9):
```typescript
const semanticHueExpectations = [
  { name: 'crimson',       minHue: 345, maxHue: 15  },
  { name: 'applegreen',    minHue: 100, maxHue: 150 },
  { name: 'lemon',         minHue: 45,  maxHue: 70  },
  { name: 'burntorange',   minHue: 20,  maxHue: 45  },
  { name: 'treegreen',     minHue: 100, maxHue: 160 },
  { name: 'sage',          minHue: 75,  maxHue: 160 },
  { name: 'periwinkle',    minHue: 210, maxHue: 260 },
  { name: 'matteSeafoam',  minHue: 140, maxHue: 185 },
  { name: 'sunflower',     minHue: 35,  maxHue: 65  },
  { name: 'lavender',      minHue: 250, maxHue: 290 },
  { name: 'flatLime',      minHue: 55,  maxHue: 100 },
  { name: 'deepgreen',     minHue: 100, maxHue: 160 },
];
```

---

### 4.3 `__tests__/typography-completeness.test.ts`

**Imports**:
```typescript
import { describe, it, expect } from 'vitest';
import typography from '../typography';
import { pxToRem } from '../typography';
```

**Tests**:

| ID | Test | Baseline | Blocking Defect |
|----|------|----------|-----------------|
| AC-3.1 | 13 standard variants present (h1-h6, subtitle1-2, body1-2, button, caption, overline) | **PASS** | MUI generates defaults |
| AC-3.2 | `poster` has fontFamily, fontSize, lineHeight | **FAIL** | `poster: {}` is empty |
| AC-3.3 | `banner` has fontFamily, fontSize, lineHeight | **FAIL** | `banner: {}` is empty |
| AC-3.4 | fontSize === 14, htmlFontSize === 16 | **FAIL** | Values are swapped (16/14) |
| AC-3.5 | pxToRem(16) === '1rem' | **PASS** | Function uses correct constants |
| AC-3.6 | button.color is not a hardcoded hex | **FAIL** | `color: '#000000'` |

---

### 4.4 `__tests__/component-overrides.test.ts`

**Imports**:
```typescript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTheme } from '@mui/material/styles';
import allOverrides from '../componentOverrides';
```

**Constants**:
```typescript
const OVERRIDE_MODULES = [
  'alert', 'autocomplete', 'avatar', 'badge', 'breadcrumbs',
  'button', 'card', 'checkbox', 'chip', 'cssBaseLine',
  'dataGrid', 'dialog', 'divider', 'drawer', 'accordion',
  'form', 'input', 'link', 'list', 'menu',
  'pagination', 'paper', 'popover', 'progress', 'radio',
  'select', 'skeleton', 'slider', 'snackbar', 'stepper',
  'switch', 'table', 'tabs', 'toolbar', 'tooltip', 'svg-icon',
];

// 61 keys currently exported (62 after MuiInputAdornment fix)
const EXPECTED_KEYS = [
  'MuiAlert', 'MuiAlertTitle', 'MuiAutocomplete', 'MuiAvatar',
  'MuiBadge', 'MuiBreadcrumbs', 'MuiButton', 'MuiButtonBase',
  'MuiCard', 'MuiCardHeader', 'MuiCardContent', 'MuiCardActions',
  'MuiCheckbox', 'MuiChip', 'MuiCssBaseline', 'MuiDataGrid',
  'MuiDialog', 'MuiDialogTitle', 'MuiDialogContent',
  'MuiDialogContentText', 'MuiDialogActions',
  'MuiDivider', 'MuiDrawer',
  'MuiAccordion', 'MuiAccordionSummary', 'MuiAccordionDetails', 'MuiAccordionActions',
  'MuiFormControl', 'MuiFormLabel', 'MuiFormControlLabel', 'MuiFormHelperText',
  'MuiInput', 'MuiFilledInput', 'MuiOutlinedInput', 'MuiInputLabel',
  'MuiLink',
  'MuiList', 'MuiListItem', 'MuiListItemButton', 'MuiListItemIcon',
  'MuiListItemText', 'MuiListSubheader',
  'MuiMenu', 'MuiMenuItem', 'MuiPagination', 'MuiPaper', 'MuiPopover',
  'MuiCircularProgress', 'MuiLinearProgress',
  'MuiRadio', 'MuiSelect', 'MuiSkeleton', 'MuiSlider',
  'MuiSnackbar', 'MuiSnackbarContent',
  'MuiStepper', 'MuiStepIcon', 'MuiStepLabel',
  'MuiSwitch',
  'MuiTableRow', 'MuiTableCell', 'MuiTableSortLabel', 'MuiTablePagination',
  'MuiTabs', 'MuiTab', 'MuiToolbar', 'MuiTooltip', 'MuiSvgIcon',
];
```

**Tests**:

| ID | Test | Baseline | Blocking Defect |
|----|------|----------|-----------------|
| AC-4.1 | All 36 modules import without error | **PASS** | -- |
| AC-4.2 | Merged object has 61+ expected keys | **PASS** (61) | After fix: 62 |
| AC-4.3 | MuiInputAdornment present in merged overrides | **FAIL** | Not in input.ts export |
| AC-4.4 | No hardcoded hex in override files (static scan) | **PASS** | -- |
| AC-4.5 | Callback overrides callable with mock theme | **PASS** | -- |
| AC-8.3 | All override files export non-empty objects | **PASS** | -- |

**Static analysis approach** (AC-4.4):
```typescript
function stripComments(source: string): string {
  return source
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
}
// Scan for hex patterns in non-comment code
```

---

### 4.5 `__tests__/build-output.test.ts`

Requires `pnpm build` in `beforeAll`:
```typescript
import { execSync } from 'node:child_process';
beforeAll(() => {
  execSync('pnpm build', { cwd: ROOT, stdio: 'pipe' });
}, 60_000);
```

| ID | Test | Baseline |
|----|------|----------|
| AC-6.1 | Build completes (implicit via beforeAll) | UNKNOWN |
| AC-6.2 | dist/index.js exists, contains `export` | UNKNOWN |
| AC-6.3 | dist/index.cjs exists, contains CJS patterns | UNKNOWN |
| AC-6.4 | dist/index.d.ts exists, contains `declare module` | UNKNOWN |
| AC-6.5 | pnpm pack dry-run lists expected files | UNKNOWN |

---

### 4.6 `__tests__/publishing-infra.test.ts`

All file-system checks using `fs.existsSync` and `fs.readFileSync`:

| ID | Test | Baseline |
|----|------|----------|
| AC-7.1 | LICENSE exists, contains "MIT" | **FAIL** |
| AC-7.2 | README.md exists, contains install instructions | **FAIL** |
| AC-7.3 | package.json has license, description, keywords, author | **FAIL** |
| AC-7.4 | package.json has prepublishOnly script | **FAIL** |
| AC-7.5 | .changeset/config.json has access: "public" | **FAIL** |
| AC-7.6 | release.yml targets registry.npmjs.org | **FAIL** |
| AC-7.7 | Font peer deps declared as optional | **FAIL** |

---

### 4.7 `__tests__/preservation.test.ts`

| ID | Test | Baseline |
|----|------|----------|
| AC-8.1 | All exports defined, default === finalTheme | **PASS** |
| AC-8.2 | colorGuide >= 73 keys, critical keys present | **PASS** |
| AC-8.3 | All 36 override files export non-empty objects | **PASS** |
| AC-8.4 | Demo builds (CI gate) | SKIP |
| AC-8.5 | Demo tests pass (CI gate) | SKIP |
| AC-8.8 | docs/ has >= 25 files, critical docs present | **PASS** |

---

## 5. Iterative Debugging Workflow

### Phase 1 Repairs -> Expected Test Flips

| ROADMAP Fix | Tests that flip from FAIL to PASS |
|-------------|----------------------------------|
| 1.1 Fix merge() in index.ts | (Strengthens AC-1.3 but was already passing) |
| 1.2 Export MuiInputAdornment | AC-4.3, AC-4.2 count increases to 62 |
| 1.4 Fix colorGuide sentinels | AC-2.6, AC-2.7 |
| 1.5 Fix TypographyOptions type | (No direct test, strengthens type safety) |
| 1.6 Fix swapped font sizes | AC-3.4 |
| 1.7 Fix changeset access | AC-7.5 |
| 1.8 Fix release.yml registry | AC-7.6 |
| 1.9 Fix button color | AC-3.6 |

### Phase 2 Additions -> Expected Test Flips

| ROADMAP Addition | Tests that flip from FAIL to PASS |
|------------------|----------------------------------|
| 2.1 Populate palette channels | (AC-2.1 already passes, but explicit values improve AC-2.2) |
| 2.2 Populate bk2-bk4 | AC-2.3 |
| 2.3 Fix color hex values | AC-2.9 |
| 2.3 Add lavender key | AC-2.8 |
| 2.5 Differentiate darkBeige scale | (No direct test) |

### Phase 3 Additions -> Expected Test Flips

| ROADMAP Addition | Tests that flip from FAIL to PASS |
|------------------|----------------------------------|
| 3.1 Implement poster variant | AC-3.2 |
| 3.2 Implement banner variant | AC-3.3 |

### Phase 4 Additions -> Expected Test Flips

| ROADMAP Addition | Tests that flip from FAIL to PASS |
|------------------|----------------------------------|
| 4.1 Add LICENSE | AC-7.1 |
| 4.2 Add README.md | AC-7.2 |
| 4.3 Add prepublishOnly | AC-7.4 |
| 4.4 Add package.json metadata | AC-7.3 |
| 4.5 Add font peer deps | AC-7.7 |

### Accessibility Repairs (may need Phase 2)

| Fix | Tests that flip |
|-----|-----------------|
| Adjust warning main or contrastText | AC-2.2 (warning pair) |
| Adjust success main or contrastText | AC-2.2 (success pair) |

---

## 6. Graduation Gate

The test harness is COMPLETE when:

1. All 55 test assertions are implemented in the 7 test files
2. `pnpm test` executes all tests in < 30 seconds (excluding build time)
3. Baseline PASS/FAIL counts match this document's predictions
4. At least 3 mutation tests verify regression detection:
   - Revert `merge()` fix -> AC-1.3 behavior should be documented
   - Remove MuiInputAdornment -> AC-4.3 fails
   - Swap font sizes back -> AC-3.4 fails
