# @braisenly/mui -- Deployment Roadmap

> **Created**: 2026-02-15
> **Scope**: Additive and reparative work ONLY. No code removal or deletion unless user-approved proven blocker.
> **Target**: Published npm module -- pluggable MUI theme with curated component overrides.
> **Registry**: npmjs.org (public, `@braisenly` scope)
> **License**: MIT

---

## Guiding Principles

1. **Additive Development**: All changes ADD to or REPAIR existing code. Nothing is removed, gutted, or simplified.
2. **Evidence-Based**: Every repair cites the specific failure it addresses. Every addition cites the gap it fills.
3. **Iterative Verification**: Each phase has explicit acceptance criteria tested by automated harness before advancing.
4. **Existing Architecture Respected**: The two-phase theme creation, colorGuide system, module augmentation strategy, component override patterns, and variant system are treated as foundational -- not candidates for replacement.

---

## Current State Summary (2026-02-15)

### Strengths (Preserve)
- 37 component override files, all using MUI v7 `({ theme }) => ({...})` callback pattern
- CSS variables readiness via `(theme.vars || theme)` pattern throughout
- Clean TypeScript augmentation chain: `augments.ts` -> `types.ts` -> `index.ts`
- Changeset-based release infrastructure scaffolded
- 30+ documentation files including 5 ADRs, install guide, color audit, known issues
- Demo app with live theme editor, JSON schema validation, FSM state management
- Proper `package.json` exports map with ESM/CJS dual output via tsup

### Gaps (Fill)
- Palette intents only define `main` -- missing `light`, `dark`, `contrastText` for all 6 intents
- `bk2`, `bk3`, `bk4` background tokens declared in types but unassigned
- `poster` and `banner` typography variants declared but empty `{}`
- `ext` palette property declared but empty `{}`
- 4 color names in colorGuide have hex values mismatched to their semantic names
- No LICENSE file, no root README.md
- No `prepublishOnly` build hook
- No package-level tests (tests only exist in demo/)
- `dist/` is stale (last built Jan 24, source changed since)

### Defects (Repair)
- `index.ts:31`: `merge()` called with single argument -- is a no-op
- `componentOverrides/input.ts`: `MuiInputAdornment` defined but not included in export
- `componentOverrides/cssBaseLine.ts:11-12`: Font-face declares `PalmBeach` but loads `cormorant-regular.ttf`
- `colorGuide.ts:81-82`: Sentinel values `XXXX: '#222'` and `'': 'limegreen'` are debug artifacts
- `typography.ts:116`: `type TypographyOptions = any` bypasses all type checking
- `typography.ts:55-56`: `fontSize` and `htmlFontSize` values are swapped vs constants on lines 9-10
- `.changeset/config.json:8`: `access: "restricted"` conflicts with `publishConfig.access: "public"`
- `release.yml`: Publishes to GitHub Packages instead of npmjs.org
- `button` typography in `typography.ts:73`: hardcoded `color: '#000000'`

---

## Phase 1: Repair Critical Defects

> **Scope**: Fix things that are actively broken. Zero removals.

### 1.1 Repair theme assembly merge (`index.ts`)
- **Defect**: `merge({...customBaseTheme, ...componentOverrides, name: "Custom"})` -- `lodash.merge()` with a single argument returns that argument unchanged. The deep merge is not happening.
- **Repair**: Change to `merge({}, customBaseTheme, componentOverrides, { name: "Custom" })` to properly deep-merge base theme with component overrides.
- **Evidence**: `lodash.merge` docs specify `merge(object, [sources])` -- first arg is target, subsequent args are sources.

### 1.2 Repair MuiInputAdornment export (`componentOverrides/input.ts`)
- **Defect**: `MuiInputAdornment` is defined (line 80) but not included in the export block (lines 101-106).
- **Repair**: Add `MuiInputAdornment` to the export object.

### 1.3 Repair font-face declaration (`componentOverrides/cssBaseLine.ts`)
- **Defect**: `font-family: 'PalmBeach'` loads `src: url('cormorant-regular.ttf')` -- wrong source file.
- **Repair**: Correct the `src` to reference the actual PalmBeach font file, or correct the `font-family` to match the actual font being loaded (`Cormorant`). Needs user input on which font is intended.

### 1.4 Repair colorGuide sentinel values (`colorGuide.ts`)
- **Defect**: `XXXX: '#222'` (line 81) and `'': 'limegreen'` (line 82) are debug/placeholder entries.
- **Repair**: Replace `XXXX` with a properly named color entry. Replace the empty-string key with a properly named entry. If these were placeholders for specific design tokens, assign correct names and values.

### 1.5 Repair TypographyOptions type (`typography.ts`)
- **Defect**: `type TypographyOptions = any` (line 116) shadows the real MUI type.
- **Repair**: Import the real `TypographyOptions` from MUI: `import type { TypographyOptions } from '@mui/material/styles/createTypography'`.

### 1.6 Repair swapped font sizes (`typography.ts`)
- **Defect**: Line 55 `fontSize: 16` and line 56 `htmlFontSize: 14` are backwards compared to the constants on lines 9-10 (`fontSize = 14`, `htmlFontSize = 16`).
- **Repair**: Swap to `fontSize: 14, htmlFontSize: 16` to match the declared constants and MUI conventions.

### 1.7 Repair changeset access config (`.changeset/config.json`)
- **Defect**: `"access": "restricted"` conflicts with `package.json` `publishConfig.access: "public"`.
- **Repair**: Change to `"access": "public"`.

### 1.8 Repair release workflow (`.github/workflows/release.yml`)
- **Defect**: `registry-url: 'https://npm.pkg.github.com'` targets GitHub Packages instead of npmjs.org.
- **Repair**: Change to `registry-url: 'https://registry.npmjs.org'` and use `NPM_TOKEN` secret.

### 1.9 Repair button typography color (`typography.ts`)
- **Defect**: Line 73 has `color: '#000000'` with comment "Placeholder for colorGuide".
- **Repair**: Replace with `color: color.ink` using the existing colorGuide import.

---

## Phase 2: Fill Color System Gaps

> **Scope**: Populate all declared-but-empty color tokens. Fix hex values for mismatched color names.

### 2.1 Populate palette light/dark/contrastText

For each of the 6 palette intents (primary, secondary, error, warning, info, success), add `light`, `dark`, and `contrastText` values. Currently only `main` is defined; `light`/`dark`/`contrastText` are commented out.

| Intent | `main` (existing) | `light` (add) | `dark` (add) | `contrastText` (add) |
|---|---|---|---|---|
| `primary` | `color.treegreen` (#1C6F26) | TBD | TBD | TBD |
| `secondary` | `color.walnut` (#7b6748) | TBD | TBD | TBD |
| `error` | `color.crimson` (#bf140a) | TBD | TBD | TBD |
| `warning` | `color.burntorange` (#ff9800) | TBD | TBD | TBD |
| `info` | `color['blue-base']` (#0a71d0) | TBD | TBD | TBD |
| `success` | `color.applegreen` (#41bf60) | TBD | TBD | TBD |

**Approach**: Derive programmatically using MUI's `lighten()`, `darken()`, `getContrastRatio()` utilities, then curate the results. Add derived values as new named entries in `colorGuide.ts` where appropriate.

### 2.2 Populate background tokens (bk2, bk3, bk4)

Currently declared in type augmentation (`augments.ts`) but only `bk1` has a value in `palette.ts`.

| Token | Current | Value to Add |
|---|---|---|
| `bk1` | `color.offwhite` (#FEFEFE) | Keep |
| `bk2` | undefined | Add graduated warm tone |
| `bk3` | undefined | Add graduated warm tone |
| `bk4` | undefined | Add graduated warm tone |

Add corresponding color entries in `colorGuide.ts` for the new background values.

### 2.3 Fix mismatched color hex values (`colorGuide.ts`)

Per user decision: fix hex values to match their semantic names.

| Name | Current Hex | Problem | New Hex (TBD) |
|---|---|---|---|
| `matteSeafoam` | `#de9b61` (orange) | Not seafoam | Update to actual muted seafoam |
| `sunflower` | `#3b8386` (teal) | Not sunflower | Update to actual warm yellow |
| `lavendar` | `#de4641` (red) | Not lavender | Update to actual lavender purple |
| `flatLime` | `#981d1a` (dark red) | Not lime | Update to actual muted lime |

Also fix the spelling: `lavendar` -> `lavender` (add `lavender` as new entry, keep `lavendar` as alias for backwards compatibility).

### 2.4 Populate `ext` palette property

Currently `ext: {}` in `palette.ts`. Determine intended structure and populate, or add a documented placeholder structure indicating reserved extension points.

### 2.5 Differentiate darkBeige scale (`colorGuide.ts`)

`darkBeige`, `darkBeige2`, `darkBeige3` are all identical (`#9b896c`). Assign distinct graduated values to create an actual scale.

---

## Phase 3: Fill Typography Gaps

> **Scope**: Implement all declared-but-empty typography variants.

### 3.1 Implement `poster` typography variant

Currently `poster: {}` in `typography.ts:121`. Add full definition:
- `fontFamily` (likely PalmBeach or Cormorant for display use)
- `fontSize` (large -- 48-72px range for poster/hero text)
- `fontWeight`, `lineHeight`, `letterSpacing`
- `textTransform` if applicable

### 3.2 Implement `banner` typography variant

Currently `banner: {}` in `typography.ts:121`. Add full definition:
- `fontFamily` (likely Cormorant or Barlow for section banners)
- `fontSize` (medium-large -- 28-40px range)
- `fontWeight`, `lineHeight`, `letterSpacing`

### 3.3 Add heading font differentiation

Currently all typography inherits Victor Mono (monospace). Evaluate whether headings (h1-h6) should use a different font stack (e.g., Cormorant for serif headings, Barlow for sans-serif headings) while keeping Victor Mono for body text.

---

## Phase 4: Publishing Infrastructure

> **Scope**: Add everything needed for a clean npm publish. All additions.

### 4.1 Add LICENSE file
- MIT license, full text at repo root

### 4.2 Add root README.md
- Package name, description, badges
- Installation instructions (pnpm/npm/yarn)
- Quick start with `ThemeProvider` example
- Available exports table
- Peer dependencies
- Font requirements (consumer-managed, per user decision)
- Link to demo app
- Link to full docs

### 4.3 Add `prepublishOnly` script to `package.json`
```json
"prepublishOnly": "pnpm run build"
```

### 4.4 Add missing `package.json` metadata fields
- `"license": "MIT"`
- `"description"`: Concise package description
- `"keywords"`: `["mui", "material-ui", "theme", "react", "component-overrides", "design-system"]`
- `"author"`: Package author
- `"homepage"`: Link to repo or docs
- `"bugs"`: Issue tracker URL

### 4.5 Add font peer dependencies
Per user decision (consumer-managed fonts as peer deps):
```json
"peerDependencies": {
  "@fontsource-variable/victor-mono": "^5.0.0"
},
"peerDependenciesMeta": {
  "@fontsource-variable/victor-mono": { "optional": true }
}
```

### 4.6 Add `LICENSE` and `README.md` to `files` array
```json
"files": ["dist", "colors.d.ts", "mui5.d.ts", "LICENSE", "README.md"]
```

### 4.7 Consolidate CI/CD to single registry target
- Update `release.yml` to target npmjs.org (repair from Phase 1.8)
- Add build step to the `release` script chain in `package.json`

---

## Phase 5: Type Safety Hardening

> **Scope**: Add proper types alongside existing code. No removal of existing type files.

### 5.1 Add `zDepth` to module augmentation (`augments.ts`)
- Currently causes `@ts-ignore` in `buildBaseTheme.ts` and `baseTheme.ts`
- Add `zDepth` property to `ThemeOptions` and `Theme` interfaces in `augments.ts`

### 5.2 Add proper type to `componentOverrides/index.ts`
- Currently `const allOverrides: any`. Add `Components<Theme>` type annotation.

### 5.3 Add proper type to `componentOverrides/dataGrid.ts`
- Currently `const overrides: any`. Add appropriate type.

### 5.4 Add proper type to `z-depth.ts` internals
- `depthMap: Record<string, any>` -> add `Record<string, number>`
- `style: Record<string, any>` -> add `{ boxShadow: string }`

### 5.5 Fix `typography.ts` React import for type-only use
- Change `import React from 'react'` to `import type React from 'react'` (used only for `React.CSSProperties`)

### 5.6 Add proper type annotation to `shape.js`
- Convert to `shape.ts` with proper typing (additive -- creates new `.ts` file; `.js` file remains until migration is verified)

### 5.7 Supplement `sideEffects` array in `package.json`
- Add dist-relative paths for augmentation side effects so bundlers correctly preserve them

---

## Phase 6: Component Override Completeness Audit

> **Scope**: Audit all 37 override files. Add missing sub-components, states, and variants where gaps exist.

### 6.1 Audit each override file against MUI v7 source

For each of the 37 component override files, verify and supplement:
- [ ] All documented slots/sub-components have overrides (not just `root`)
- [ ] Interactive states: hover, focus, active, disabled, error
- [ ] Size variants: small, medium, large (where applicable)
- [ ] Color variants: primary, secondary, error, warning, info, success (where applicable)
- [ ] CSS variables compatibility: `(theme.vars || theme)` used consistently

### 6.2 Supplement overrides with missing state coverage

Per the `SEM-theme-object-map.md` token consumption map, ensure every token that MUI components consume is accounted for in the corresponding override file.

### 6.3 Add default props for components that benefit from them

Currently `defaultProps/index.ts` is minimal. Evaluate which components should have curated default props (e.g., `MuiButton` `disableElevation`, `MuiTextField` `variant`).

---

## Phase 7: Verification Testing Harness

> **Scope**: Add comprehensive package-level tests.

### 7.1 Theme creation tests
- Theme creates without errors
- Theme has expected `name` property
- All `createTheme` calls complete without throwing

### 7.2 Palette completeness tests
- All 6 intents have `main`, `light`, `dark`, `contrastText`
- All background tokens (`bk1`-`bk4`) resolve to non-empty strings
- `colorGuide` has no empty-string keys
- `colorGuide` has no sentinel values (e.g., keys named `XXXX`)
- All `text.*` tokens resolve to non-empty strings

### 7.3 Typography completeness tests
- All standard variants (h1-h6, body1-2, subtitle1-2, button, caption, overline) are defined
- Custom variants (`poster`, `banner`) are defined with non-empty properties
- `pxToRem` function produces correct rem values

### 7.4 Component override integration tests
- All 37 override modules import without error
- Merged overrides object has expected component keys
- Component overrides merge cleanly into theme via `createTheme()`

### 7.5 Type augmentation compile-time tests
- `theme.palette.colorGuide` is accessible
- `theme.palette.background.bk1` through `bk4` are accessible
- `theme.name` is accessible
- `theme.typography.poster` is accessible

### 7.6 Build output verification tests
- `dist/index.js` exists and is valid ESM
- `dist/index.cjs` exists and is valid CJS
- `dist/index.d.ts` exists and contains augmentations

---

## Phase 8: Documentation Updates

> **Scope**: Update existing docs to reflect current state. Add new docs where gaps exist.

### 8.1 Update KNOWN-ISSUES.md
- Mark resolved issues as resolved (don't remove -- add resolution notes)
- Add any new issues discovered during this process
- Update version references from MUI v5/v6 to v7

### 8.2 Update CLAUDE.md
- Reflect current architecture (37 active component overrides, not "many commented out")
- Update exports list
- Update font information

### 8.3 Update INSTALL.md
- Add font peer dependency instructions
- Update version references

---

## Phase 9: Release

> **Scope**: Execute first real publish from current codebase.

### 9.1 Fresh build
- `pnpm build` from clean state
- Verify `dist/` contents match `package.json` entry points

### 9.2 Create changeset
- Describe all changes since v0.0.2
- Version bump to `0.1.0` (minor -- peer deps changed to MUI v7)

### 9.3 Merge to main
- All code currently on `feat/theme-mapping-master-doc`
- `main` branch needs this code for CI/CD to function

### 9.4 Publish
- Via consolidated release workflow, or manual `pnpm publish:public`
- Verify on npmjs.com

### 9.5 Post-publish smoke test
- `pnpm add @braisenly/mui@0.1.0` in clean project
- Verify `ThemeProvider` wrapping works
- Verify TypeScript autocomplete for custom properties

---

## Dependency Graph

```
Phase 1 (Repair Defects)
    |
    v
Phase 2 (Color System) + Phase 3 (Typography) -- can run in parallel
    |
    v
Phase 5 (Type Safety) -- builds on color/typography additions
    |
    v
Phase 6 (Component Override Audit) -- requires complete color/type foundation
    |
    v
Phase 4 (Publishing Infrastructure) + Phase 7 (Testing Harness) -- can run in parallel
    |
    v
Phase 8 (Documentation)
    |
    v
Phase 9 (Release)
```

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Color values don't produce accessible contrast ratios | Medium | High | Use MUI `getContrastRatio()` to validate all color pairings against WCAG 2.1 AA |
| Type augmentation conflicts between `augments.ts` and legacy `.d.ts` files | High | Medium | Add integration test that validates type resolution in a simulated consumer project |
| Font peer deps cause install friction for consumers | Medium | Medium | Mark all font deps as optional; document fallback behavior |
| Stale dist causes wrong version to publish | High | Critical | `prepublishOnly` script ensures fresh build |
| Branch management: main branch has no code | High | Critical | Merge feature branch to main before first automated release |
