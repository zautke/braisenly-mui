# CLAUDE_NOTES.md

## Session: Live Theme Editor — State Engine + JSON Editor
### Date: 2026-02-08
### Status: COMPLETED

---

## Blackboard: Shared Knowledge Base

### Design Decisions (Confirmed)
- [DECISION] Scope: ThemeOverrides expanded with fontFamily, fontFamilyHeading, fontWeightBold, dividerColor, mode. Future: extend toward component overrides (phase c)
- [DECISION] Sync: Bidirectional — JSON editor and control tabs are views of same ThemeOverrides state
- [DECISION] Tab: Third tab "JSON" alongside Quick and Full Theme
- [DECISION] Validation: Two-tier — red for broken JSON syntax, amber for valid JSON but invalid schema values
- [DECISION] Persistence: localStorage with key pattern `mui-theme-demo:overrides:{themeName}`
- [DECISION] Editor: CodeMirror 6 via @uiw/react-codemirror + codemirror-json-schema
- [DECISION] Color validation: hex-strict for palette colors (`^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$`), permissive strings for colorGuide entries
- [DECISION] No XState — useReducer with typed discriminated unions for 4-state FSM
- [DECISION] EDITOR_WIDTH unified to 380px across App.tsx and ThemeEditor.tsx

### Contracts (TypeScript Interfaces)

#### ThemeOverrides (expanded)
```
ThemeOverrides {
  primary, secondary, success, warning, error, info: PaletteColorOverride
  background: BackgroundOverride
  text: TextOverride
  colorGuide: Record<string, string>
  ext: Record<string, unknown>
  borderRadius: number
  spacingUnit: number
  fontSize: number
  fontWeightRegular: number
  fontFamily: string           // NEW
  fontFamilyHeading: string    // NEW
  fontWeightBold: number       // NEW
  dividerColor: string         // NEW
  mode: 'light' | 'dark'      // NEW
}
```

#### FSM States
```
EditorValidationStatus = 'valid' | 'validating' | 'invalid_json' | 'invalid_schema'
```

#### FSM Actions
```
USER_EDIT_JSON     — from JSON editor, triggers debounced validation
USER_EDIT_CONTROL  — from Quick/Full tab controls, immediate VALID
VALIDATION_PASS    — debounce complete, JSON+schema valid → apply overrides
JSON_PARSE_FAIL    — debounce complete, JSON syntax error → red dot
SCHEMA_CHECK_FAIL  — debounce complete, schema error → amber dot
THEME_SWITCH       — user changed base theme dropdown → reset
RESET              — user clicked Reset button → reset to base
LOAD_PERSISTED     — localStorage data loaded on init
SET_OPEN           — drawer open/close toggle
```

#### Source Tracking (prevents sync loops)
```
source: 'json' | 'control' | 'reset' | 'switch' | 'persist'
```

### File Manifest
| File | Owner Agent | Status |
|------|-------------|--------|
| `demo/package.json` | Foundation | COMPLETED |
| `demo/src/ThemeEditorContext.tsx` | State Engine | COMPLETED |
| `demo/src/themeSerializer.ts` | Serializer | COMPLETED |
| `demo/src/components/ThemeJsonEditor.tsx` | Editor | COMPLETED |
| `demo/src/components/ThemeEditor.tsx` | Integration | COMPLETED |
| `demo/src/App.tsx` | Integration | COMPLETED |
| `demo/src/themeSerializer.test.ts` | Testing | COMPLETED |
| `CLAUDE_NOTES.md` | Scribe | COMPLETED |

### Dependencies Added
- @uiw/react-codemirror 4.25.4 — React wrapper for CodeMirror 6
- @codemirror/lang-json 6.0.2 — JSON language mode + jsonParseLinter
- @codemirror/lint 6.9.3 — linter() + lintGutter() infrastructure
- codemirror-json-schema 0.8.1 — jsonSchemaLinter + jsonSchemaHover + jsonCompletion

---

## Phase Progress

### Phase 1: Foundation
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: Install deps, expand ThemeOverrides interface, update extractOverridesFromTheme
- **Notes**: Installed @uiw/react-codemirror 4.25.4, @codemirror/lang-json 6.0.2, @codemirror/lint 6.9.3, codemirror-json-schema 0.8.1. Expanded ThemeOverrides with fontFamily, fontFamilyHeading, fontWeightBold, dividerColor, mode. Updated extractOverridesFromTheme() to populate new fields from MUI Theme.

### Phase 2: State Engine
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: Refactor ThemeEditorContext to useReducer FSM, add localStorage, debounce, validationStatus
- **Notes**: Complete rewrite of ThemeEditorContext.tsx from useState to useReducer. 4-state FSM (VALID, VALIDATING, INVALID_JSON, INVALID_SCHEMA). 8 action types with source tracking to prevent sync loops. Debounced validation (300ms) for JSON editor input. localStorage persistence per-theme. Last-valid theme preservation — invalid edits don't crash the UI. ThemeEditorProvider now takes `themeName` prop.

### Phase 3: Serializer
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: Create themeSerializer.ts with JSON Schema, serialize/deserialize, validate
- **Notes**: Created themeSerializer.ts (527 lines). JSON Schema (draft-07) with descriptions for CodeMirror hover tooltips. Hex-strict validation for palette/background/text/dividerColor. Permissive strings for colorGuide entries. Number range validation with multipleOf for font weights. serializeOverrides/deserializeOverrides round-trip functions. validateOverrides never throws — returns ValidationError[].

### Phase 4: CodeMirror Editor
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: Build ThemeJsonEditor.tsx with CM6, schema linting, theme-aware styling
- **Notes**: Created ThemeJsonEditor.tsx (385 lines). Full CodeMirror 6 integration: json(), jsonParseLinter, jsonSchemaLinter, autocomplete, hover tooltips, lintGutter. MUI-aware theme extension adapts editor colors to current MUI theme. Controlled value with lastSource tracking (prevents clobbering user input). Error summary bar: green "Valid", red "JSON Error", amber "Schema" with error details.

### Phase 5: Integration
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: Third tab, validity indicator, bidirectional sync, new controls, width fix
- **Notes**: Third "JSON" tab with validity indicator dot (green/red/amber). Header validity indicator dot (10px circle, transitions on status change). display:none tab switching (CodeMirror never unmounts). New Quick tab controls: fontFamily TextField, Mode light/dark Switch, dividerColor swatch. New Full Theme tab controls: fontWeightBold slider, fontFamily/fontFamilyHeading TextFields, Mode accordion, dividerColor swatch. Drawer paper uses flex layout for CodeMirror fill.

### Phase 6: Tests
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: Unit tests for serializer and state machine
- **Notes**: 28 tests in themeSerializer.test.ts — all pass. Covers: isValidHexColor, round-trip serialization, JSON parse errors, schema validation errors, validateOverrides edge cases (null, array, string, valid, colorGuide, ext, fontFamily, fontFamilyHeading).

### Phase 7: Polish
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: Transition smoothness, tab switching, layout verification
- **Notes**: EDITOR_WIDTH unified to 380px in both App.tsx and ThemeEditor.tsx. CodeMirror theme set to "none" (custom EditorView.theme extension handles all styling). Drawer paper display:flex for proper layout.

### Phase 8: Verification
- **Status**: COMPLETED
- **Started**: 2026-02-08
- **Completed**: 2026-02-08
- **Tasks**: pnpm build, pnpm test, final review
- **Notes**: `pnpm build` succeeds (tsc + vite build). 28 new tests pass, 1 existing test passes. 3 pre-existing failures in theme.test.ts are unrelated to our changes (pre-existing issues).

---

## Anti-Patterns Identified
- [AVOID] Never call createTheme() on every keystroke — debounce JSON edits (300ms)
- [AVOID] Never let invalid JSON crash the ThemeProvider — preserve last-valid theme
- [AVOID] Never create sync loops between JSON editor and control tabs — use source tracking
- [AVOID] Never conditionally render CodeMirror — use display:none to preserve editor state across tab switches
- [AVOID] `as Record<string, unknown>` casts on interfaces with no index signature — TypeScript rejects this. Use `as unknown as Record<string, unknown>` instead.
- [AVOID] `Parameters<typeof createTheme>[0]['palette']` — ThemeOptions palette can be undefined, causing TS error. Use `as any` cast on the palette object instead.
- [AVOID] Hardcoding CodeMirror `theme="dark"` — use `theme="none"` when providing a custom EditorView.theme extension.

## Successful Strategies
- [SUCCESS] Two-phase theme creation pattern (buildBaseTheme + component overrides) is stable
- [SUCCESS] ThemeEditorProvider wrapping MuiThemeProvider ensures all MUI components respond to changes
- [SUCCESS] EditableText component pattern is solid for inline hex editing
- [SUCCESS] useReducer FSM pattern works cleanly for 4 states with typed discriminated unions — no need for XState
- [SUCCESS] codemirror-json-schema provides free schema validation, hover tooltips, and autocomplete from a JSON Schema definition
- [SUCCESS] Source tracking on dispatch actions cleanly prevents bidirectional sync infinite loops
- [SUCCESS] display:none tab panel switching preserves CodeMirror editor state and undo history across tab switches
- [SUCCESS] localStorage per-theme persistence allows switching themes without losing customizations

## Architecture Notes
- ThemeEditorContext is now the single source of truth for ALL theme editing state
- Three views (Quick tab, Full Theme tab, JSON tab) are all "projections" of the same ThemeOverrides
- The reducer is pure — all side effects (localStorage, debounce) happen in useEffect/useCallback in the provider
- The JSON editor value is "controlled" for external updates but "uncontrolled" for user typing (prevents cursor jumps)

## User Preferences
- [PREF] pnpm as package manager
- [PREF] unknown over any in TypeScript
- [PREF] Additive development — never simplify existing code outside scope
- [PREF] Solve root cause, not symptoms
- [PREF] No emojis in code/files unless requested
- [PREF] Alpine OS for Docker containers
- [PREF] #!/usr/bin/env bash for shebang
- [PREF] NEVER remove code or functionality unless user-approved proven blocker
- [PREF] Additive/reparative changes only — no deletions, no gutting, no simplification
- [PREF] Full theme flesh-out required before publishing (all tokens, all overrides)
- [PREF] Multi-agent code review approach for deployment readiness

---

## Session: NPM Deployment Roadmap Assessment
### Date: 2026-02-15
### Status: PLANNING COMPLETE

### Design Decisions (Confirmed)
- [DECISION] License: MIT
- [DECISION] Font strategy: Consumer-managed fonts as peer dependencies (optional)
- [DECISION] Registry: npmjs.org only (consolidate from dual GitHub Packages + npm)
- [DECISION] Empty tokens: Full flesh-out before publish (poster, banner, bk2-bk4, ext, all palette channels)
- [DECISION] Color mismatches: Fix HEX values to match semantic names (not rename keys)
- [DECISION] No code removal: All roadmap items are additive or reparative
- [DECISION] lavender spelling: Add `lavender` as new key, keep `lavendar` as backwards-compat alias

### Key Findings
- [FINDING] merge() in index.ts:31 called with single argument — is a no-op. Defect is latent (doesn't cause visible breakage today due to object mutation side effects, but is semantically wrong and fragile)
- [FINDING] MuiInputAdornment defined in input.ts but not exported
- [FINDING] cssBaseLine.ts font-face declares PalmBeach but loads cormorant-regular.ttf
- [FINDING] colorGuide has sentinel values: XXXX:'#222' and '':'limegreen'
- [FINDING] typography.ts:55-56 fontSize/htmlFontSize swapped vs constants
- [FINDING] palette light/dark/contrastText are auto-generated by MUI but warning and success FAIL WCAG AA 4.5:1
- [FINDING] bk2, bk3, bk4 declared in types but undefined in palette
- [FINDING] poster:{} and banner:{} are empty objects
- [FINDING] 4 color names have hex values semantically opposite to their names
- [FINDING] .changeset/config.json access:"restricted" conflicts with publishConfig
- [FINDING] release.yml targets GitHub Packages, not npmjs.org
- [FINDING] No LICENSE, no README.md, no prepublishOnly script

### Artifacts Produced
- `ROADMAP.md` — 9-phase deployment plan, additive/reparative only
- `ACCEPTANCE_CRITERIA.md` — 55 acceptance criteria with DoD per-phase and package-level
- `docs/testing/TEST-HARNESS-PLAN.md` — Evidence-based test implementation plan with baseline PASS/FAIL matrix

### Testing Baseline (52 assertions)
- 24 PASS against current code (regression guards)
- 18 FAIL against current code (known gaps to fill)
- 13 UNKNOWN (require build or CI execution)

### Anti-Patterns Identified
- [AVOID] Proposing removal of existing code/files as part of "cleanup" — user explicitly requires additive-only approach
- [AVOID] Assuming empty tokens should be removed from types — user wants them filled with real values
- [AVOID] Renaming color keys to match hex values — user wants hex values fixed to match names
