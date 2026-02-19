# Acceptance Criteria & Definition of Done

> **Package**: `@braisenly/mui`
> **Created**: 2026-02-15
> **Companion**: See `ROADMAP.md` for phased implementation plan.

---

## 1. Acceptance Criteria by Domain

### AC-1: Theme Creation

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-1.1 | `finalTheme` creates without runtime errors | Unit test: `createTheme()` completes, returns object with expected shape |
| AC-1.2 | `customBaseTheme` creates without runtime errors | Unit test: base theme creation does not throw |
| AC-1.3 | Component overrides are deep-merged into the final theme (not shallow spread) | Unit test: verify a nested property from component overrides exists on `finalTheme.components.MuiButton.styleOverrides` |
| AC-1.4 | Default props are merged into the final theme alongside style overrides | Unit test: verify `finalTheme.components` contains both `styleOverrides` and `defaultProps` for components that define both |
| AC-1.5 | `finalTheme.name` equals `"Custom"` | Unit test: assert `finalTheme.name === "Custom"` |

### AC-2: Palette Completeness

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-2.1 | All 6 palette intents (primary, secondary, error, warning, info, success) have `main`, `light`, `dark`, `contrastText` defined as non-empty strings | Unit test: iterate intents, assert each channel is `typeof string` and `.length > 0` |
| AC-2.2 | All `contrastText` values pass WCAG 2.1 AA contrast ratio (>= 4.5:1) against their `main` color | Unit test: use MUI `getContrastRatio()` to validate each pair |
| AC-2.3 | `background.bk1`, `bk2`, `bk3`, `bk4` are all non-empty hex strings | Unit test: regex match `^#[0-9a-fA-F]{3,8}$` |
| AC-2.4 | `text.primary`, `text.secondary`, `text.disabled` are non-empty strings | Unit test: assert presence and non-empty |
| AC-2.5 | `divider` is a non-empty string | Unit test: assert presence and non-empty |
| AC-2.6 | `colorGuide` contains no empty-string keys | Unit test: `Object.keys(colorGuide).every(k => k.length > 0)` |
| AC-2.7 | `colorGuide` contains no sentinel/placeholder values (no keys named `XXXX` or similar) | Unit test: assert no key matches `/^X{2,}$/` |
| AC-2.8 | `colorGuide.lavender` exists (corrected spelling) | Unit test: assert key exists with valid hex value |
| AC-2.9 | Color names match their semantic meaning (matteSeafoam is a seafoam color, sunflower is yellow, etc.) | Manual review + hue-range validation test |

### AC-3: Typography Completeness

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-3.1 | All 13 standard MUI variants are present: h1-h6, subtitle1, subtitle2, body1, body2, caption, button, overline | Unit test: iterate variants, assert each exists on resolved typography |
| AC-3.2 | `poster` variant has non-empty `fontFamily`, `fontSize`, and `lineHeight` | Unit test: assert properties exist and are non-nullish |
| AC-3.3 | `banner` variant has non-empty `fontFamily`, `fontSize`, and `lineHeight` | Unit test: assert properties exist and are non-nullish |
| AC-3.4 | `fontSize` is 14 (MUI default) and `htmlFontSize` is 16 (browser default) | Unit test: assert exact values |
| AC-3.5 | `pxToRem(16)` returns `'1rem'` (given htmlFontSize=16, fontSize=14) | Unit test: assert `pxToRem(16) === '1rem'` |
| AC-3.6 | `button` typography does not contain hardcoded hex color values | Unit test: assert `button.color` is not a literal hex string, or is undefined (letting MUI handle it) |

### AC-4: Component Overrides

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-4.1 | All 37 component override modules import without error | Unit test: dynamic import each file, assert no throw |
| AC-4.2 | The merged overrides object contains all expected component keys | Unit test: assert key count >= 37, verify specific keys like `MuiButton`, `MuiCard`, `MuiAlert`, etc. |
| AC-4.3 | `MuiInputAdornment` is present in the merged overrides | Unit test: assert `overrides.MuiInputAdornment` is defined |
| AC-4.4 | No component override contains hardcoded hex colors (except `transparent`, `inherit`, `currentColor`) | Static analysis test: regex scan all override files for hex patterns outside of comments |
| AC-4.5 | All callback-style overrides accept `{ theme }` and return an object | Unit test: for each override with callback-style `root`, call it with a mock theme and assert it returns an object |

### AC-5: Type Augmentations

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-5.1 | `theme.palette.colorGuide` resolves to `ColorGuide` type (not `any` or `unknown`) | Compile-time test: TypeScript file that accesses `theme.palette.colorGuide.treegreen` compiles without error |
| AC-5.2 | `theme.palette.background.bk1` through `bk4` are accessible as `string \| undefined` | Compile-time test: TypeScript file accessing these properties compiles |
| AC-5.3 | `theme.name` is accessible as `string \| undefined` | Compile-time test |
| AC-5.4 | `theme.typography.poster` is accessible | Compile-time test |
| AC-5.5 | `tsc --noEmit` succeeds on the package source | CI gate: `pnpm lint` passes |

### AC-6: Build Output

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-6.1 | `pnpm build` completes without error | CI gate: build script exits 0 |
| AC-6.2 | `dist/index.js` exists and is valid ESM (contains `export`) | Unit test: file exists, content includes `export` keyword |
| AC-6.3 | `dist/index.cjs` exists and is valid CJS (contains `module.exports` or `exports.`) | Unit test: file exists, content includes CJS pattern |
| AC-6.4 | `dist/index.d.ts` exists and contains module augmentation for `@mui/material/styles` | Unit test: file exists, content includes `declare module` |
| AC-6.5 | `pnpm pack --dry-run` includes exactly the files listed in `package.json` `files` array plus package.json | Integration test: parse dry-run output, compare to expected file list |

### AC-7: Publishing Infrastructure

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-7.1 | `LICENSE` file exists at repo root with MIT license text | File existence check |
| AC-7.2 | `README.md` exists at repo root with installation instructions | File existence check + content assertion |
| AC-7.3 | `package.json` has `license`, `description`, `keywords`, `author` fields | JSON field assertion |
| AC-7.4 | `package.json` has `prepublishOnly` script that runs build | JSON script assertion |
| AC-7.5 | `.changeset/config.json` has `access: "public"` | JSON field assertion |
| AC-7.6 | `release.yml` targets `registry.npmjs.org` | File content assertion |
| AC-7.7 | Font peer dependencies are declared with optional metadata | JSON field assertion in `peerDependencies` and `peerDependenciesMeta` |

### AC-8: Existing Functionality Preservation

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| AC-8.1 | All existing exports from `index.ts` remain available: `default`, `finalTheme`, `defaultTheme`, `palette`, `customBaseTheme`, `styleOverrides`, type re-exports | Unit test: import each export, assert defined |
| AC-8.2 | `colorGuide` retains all existing color entries (no removals) | Unit test: snapshot or count of colorGuide keys is >= baseline count |
| AC-8.3 | All existing component override files still exist and export non-empty objects | Unit test: import each, assert `Object.keys(result).length > 0` |
| AC-8.4 | Demo app builds and renders with the theme | Integration test: `cd demo && pnpm build` exits 0 |
| AC-8.5 | Existing tests in demo continue to pass | Integration test: `cd demo && pnpm test` exits 0 |
| AC-8.6 | `themeVariants` module remains functional | Unit test: `applyThemeVariant` is importable and callable |
| AC-8.7 | `zDepth` module remains functional | Unit test: `zDepth.for('card')` returns an object with `boxShadow` |
| AC-8.8 | All 30+ documentation files remain in `docs/` | File count assertion |

---

## 2. Definition of Done (DoD)

### 2.1 Per-Phase DoD Gate

Every phase in `ROADMAP.md` is considered DONE when ALL of the following are satisfied:

#### Code Quality Gate
- [ ] All changes compile: `pnpm lint` (tsc --noEmit) exits 0
- [ ] All changes build: `pnpm build` exits 0
- [ ] All package-level tests pass: `pnpm test` exits 0
- [ ] All demo tests continue to pass: `cd demo && pnpm test` exits 0
- [ ] No new `any` types introduced (existing `any` types may be supplemented with proper types but not removed until verified)
- [ ] No new `@ts-ignore` directives introduced

#### Preservation Gate
- [ ] No existing exports removed or renamed
- [ ] No existing files deleted
- [ ] No existing test cases removed or disabled
- [ ] No existing documentation files deleted
- [ ] No dependencies removed from `package.json`
- [ ] No component override files removed or emptied
- [ ] Baseline colorGuide key count is maintained or increased (never decreased)

#### Documentation Gate
- [ ] `KNOWN-ISSUES.md` updated if any known issue is resolved (resolution appended, not removed)
- [ ] `CLAUDE_NOTES.md` updated with session decisions and findings
- [ ] `ROADMAP.md` phase status updated

#### Verification Gate
- [ ] Relevant acceptance criteria (from Section 1) are covered by automated tests
- [ ] Tests execute and pass in CI-equivalent environment (`pnpm test`)
- [ ] Any repaired defect has a regression test proving it no longer fails

### 2.2 Package-Level DoD (Pre-Publish)

The package is considered DONE and ready for npm publish when ALL of the following are true:

#### Completeness
- [ ] ALL Phase 1 repairs are verified by regression tests
- [ ] ALL Phase 2 color system gaps are filled and pass AC-2.* tests
- [ ] ALL Phase 3 typography gaps are filled and pass AC-3.* tests
- [ ] ALL Phase 4 publishing infrastructure items are in place and pass AC-7.* tests
- [ ] ALL Phase 5 type safety additions are verified by AC-5.* tests
- [ ] ALL Phase 6 component override audit findings are addressed
- [ ] ALL Phase 7 test harness tests pass
- [ ] ALL Phase 8 documentation updates are completed

#### Build Integrity
- [ ] `pnpm build` produces fresh `dist/` from current source
- [ ] `pnpm pack --dry-run` output contains exactly the expected files
- [ ] Built output matches `package.json` entry points (`main`, `module`, `types`, `exports`)
- [ ] ESM import works: `import { finalTheme } from '@braisenly/mui'`
- [ ] CJS require works: `const { finalTheme } = require('@braisenly/mui')`

#### Type Safety
- [ ] `tsc --noEmit` passes on package source
- [ ] Type augmentations are accessible in a simulated consumer TypeScript project
- [ ] `dist/index.d.ts` contains all module augmentation declarations

#### Runtime Correctness
- [ ] Theme creates without error
- [ ] All palette intents have 4 channels populated
- [ ] All typography variants have non-empty definitions
- [ ] All 37 component overrides merge into theme without error
- [ ] No runtime errors when wrapping a React app with `<ThemeProvider theme={finalTheme}>`

#### Accessibility
- [ ] All `contrastText`/`main` pairs meet WCAG 2.1 AA (>= 4.5:1 contrast ratio)
- [ ] `text.primary` against `background.default` meets WCAG 2.1 AA
- [ ] `text.primary` against `background.paper` meets WCAG 2.1 AA

#### Publishing Readiness
- [ ] `LICENSE` file present (MIT)
- [ ] `README.md` present with installation and usage instructions
- [ ] `package.json` has `license`, `description`, `keywords`, `author`
- [ ] `package.json` has `prepublishOnly` script
- [ ] `.changeset/config.json` has `access: "public"`
- [ ] CI workflow targets npmjs.org registry
- [ ] Feature branch merged to `main`
- [ ] Changeset created describing all changes since v0.0.2
- [ ] Version bumped to `0.1.0`

#### Backwards Compatibility
- [ ] All exports from v0.0.2 remain available
- [ ] No colorGuide keys removed
- [ ] No component override files removed
- [ ] No type augmentations removed
- [ ] Demo app builds and runs with the updated theme

---

## 3. Test Matrix

Maps Acceptance Criteria to test types and files:

| AC ID | Test Type | Test File | Description |
|-------|-----------|-----------|-------------|
| AC-1.* | Unit | `__tests__/theme-creation.test.ts` | Theme assembly and merge verification |
| AC-2.* | Unit | `__tests__/palette-completeness.test.ts` | Palette channels, backgrounds, colorGuide |
| AC-3.* | Unit | `__tests__/typography-completeness.test.ts` | Typography variants, pxToRem, font sizes |
| AC-4.* | Unit + Static | `__tests__/component-overrides.test.ts` | Override imports, keys, callbacks |
| AC-5.* | Compile-time | `__tests__/type-augmentations.test-d.ts` | TypeScript compile checks |
| AC-6.* | Integration | `__tests__/build-output.test.ts` | Dist file existence and content |
| AC-7.* | Integration | `__tests__/publishing-infra.test.ts` | File existence, JSON field checks |
| AC-8.* | Unit + Integration | `__tests__/preservation.test.ts` | Existing functionality regression |

---

## 4. Graduation Criteria

The verification testing harness itself is considered complete when:

1. **Coverage**: Every AC-*.* criterion from Section 1 has at least one corresponding automated test
2. **Pass rate**: All tests pass on current codebase state (establishing baseline)
3. **Regression detection**: Tests correctly FAIL when a defect is reintroduced (verified by at least 3 mutation tests)
4. **Execution time**: Full test suite completes in < 30 seconds
5. **CI integration**: Tests run as part of `pnpm test` script
6. **Documentation**: Each test file has a header comment explaining what AC criteria it covers

---

## 5. Phase Tracking

| Phase | Status | DoD Met | Blocking Issues |
|-------|--------|---------|-----------------|
| Phase 1: Repair Critical Defects | Not Started | -- | -- |
| Phase 2: Fill Color System Gaps | Not Started | -- | Depends on Phase 1 |
| Phase 3: Fill Typography Gaps | Not Started | -- | Depends on Phase 1 |
| Phase 4: Publishing Infrastructure | Not Started | -- | Depends on Phase 2, 3 |
| Phase 5: Type Safety Hardening | Not Started | -- | Depends on Phase 2, 3 |
| Phase 6: Component Override Audit | Not Started | -- | Depends on Phase 5 |
| Phase 7: Verification Testing Harness | Not Started | -- | Depends on Phase 4, 6 |
| Phase 8: Documentation Updates | Not Started | -- | Depends on Phase 7 |
| Phase 9: Release | Not Started | -- | Depends on ALL |
