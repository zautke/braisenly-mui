# Session History

## [2026-01-18 10:30 UTC] FEAT: Browser Automation Setup & Theme Rescue

**Context:** The user requested agentic browser automation for the MUI Custom Theme demo. During setup, a critical circular dependency was discovered that prevented the app from rendering.

**Actions Taken:**
- Initialized Playwright in the `demo` directory.
- Created `themeStub.ts` to break the circular dependency between `buildBaseTheme.ts` and `componentOverrides`.
- Refactored all ~35 component overrides to import from `themeStub.ts`.
- Updated `typography.ts` to include missing `regular` and `label` properties.
- Fixed `z-depth.ts` kebab-case property naming.
- Fixed `MuiTableSortLabel` specificity in `table.js`.
- Configured Playwright with trace and screenshot capture.
- Established `browser-automation` knowledge base in basic-memory.

**Files Changed:**
- `demo/playwright.config.ts` - Configured Vite server and baseURL.
- `demo/tests/example.spec.ts` - Added automated tests with console logging.
- `themeStub.ts` - New file for safe theme part imports.
- `componentOverrides/*` - Updated imports in 30+ files.
- `typography.ts` - Added placeholder properties.
- `z-depth.ts` - Fixed property naming.
- `componentOverrides/table.js` - Fixed specificity warning.

**Commands:**
```bash
cd demo && npm init playwright@latest
npx playwright test --trace on
```

**Impact:** 
- The demo application is now functional and renderable.
- Automated verification is in place for theme migrations.
- Knowledge base is seeded with patterns for avoiding TDZ errors in MUI themes.

**Lessons Learned:** 
- Circular dependencies in MUI themes often manifest as hidden bodies or TDZ errors.
- `page.on('console')` is essential for debugging headless browser failures.

**Follow-up:**
- [ ] Fix font loading 403 error in Vite.
- [ ] Implement more deep-UI tests for complex components like DataGrid.

---

## [2026-01-19 21:00 UTC] FEAT: 5-Theme Demo Enhancement & MUI 7 Compliance

**Context:** Enhanced the MUI theme demo with 5 switchable themes, fixed MUI 7 compliance issues, and established critical browser testing policies after discovering MCP browser tools were unavailable.

**Actions Taken:**
- Created `muiDefault.ts` - Pure MUI defaults theme for baseline comparison.
- Created `solarized.ts` - Solarized Light theme using colorGuide palette.
- Updated `ThemeContext.tsx` and `App.tsx` for 5-theme support.
- Fixed `switch.js` deprecated `$` selectors → `.Mui-checked`, `.MuiSwitch-track`.
- Fixed `card.js` deprecated `theme.spacing.unit` → `theme.spacing()`.
- Established CRITICAL policy: **NEVER use local Playwright - MCP browser tools ONLY**.
- Discovered workarounds: AppleScript + cliclick for macOS automation, localtunnel for ngrok fallback.
- Visually verified all 5 themes using accessibility-based browser automation.
- Created comprehensive documentation in `docs/` using three-memory-type taxonomy.

**Files Created:**
- `demo/src/themes/muiDefault.ts` - Pure MUI defaults
- `demo/src/themes/solarized.ts` - Solarized Light theme
- `docs/sessions/SESSION-2026-01-19-mui-theme-demo.md` - Master session chronicle
- `docs/episodic/EP-blockers-resolved.md` - Pain points and solutions
- `docs/semantic/SEM-mui7-compliance.md` - MUI 7 migration facts
- `docs/procedural/PROC-macos-accessibility-automation.md` - AppleScript patterns
- `docs/procedural/PROC-tunnel-alternatives.md` - ngrok alternatives
- `docs/reasoning/REASON-successes.md` - What worked and why
- `docs/reasoning/REASON-failures.md` - What failed and lessons
- `docs/quickref/QUICKREF-agent-consumption.md` - HIGH-SIGNAL agent reference

**Files Modified:**
- `demo/src/ThemeContext.tsx` - Added 5-theme support
- `demo/src/App.tsx` - Added 5 MenuItems
- `componentOverrides/switch.js` - MUI 7 selector fixes
- `componentOverrides/card.js` - spacing() fix
- `CLAUDE.md` - Added critical browser testing policy

**Themes Verified:**
| Theme | Mode | Key Visual |
|-------|------|------------|
| MUI Default | Light | Blue #1976d2, Roboto |
| Base | Light | Green, Victor Mono |
| Glass | Dark | Navy #0a1929, cyan accents |
| Corporate | Light | Indigo #1a237e, 0px radius |
| Solarized | Light | Cream #fdf6e3, monospace |

**Blockers Resolved:**
1. Chrome MCP not connected → AppleScript + cliclick automation
2. ngrok suspended → localtunnel (`npx lt --port 5173`)
3. AppleScript focus issues → Close Preview, use cliclick
4. MUI 7 $selectors → .Mui-checked class pattern

**Impact:**
- Demo now has 5 fully functional, visually verified themes.
- MUI 7 compliant component overrides (no deprecated syntax).
- Comprehensive documentation for self-evolving agent memory.
- Critical policy established preventing local Playwright usage.

**Lessons Learned:**
- MCP browser tools require extension connection; have AppleScript fallback ready.
- cliclick is more reliable than AppleScript for mouse automation.
- localtunnel is a viable free alternative to ngrok.
- Keyboard navigation more reliable than mouse clicks for UI automation.
- ReasoningBank pattern: Document both successes AND failures as actionable principles.

**Documentation Created (Three-Memory-Type Taxonomy):**
- **Episodic**: Event sequences and blocker resolutions
- **Semantic**: MUI 7 facts and tool knowledge
- **Procedural**: How-to guides for automation and tunneling
- **Reasoning**: Success/failure analysis with actionable principles
- **QuickRef**: HIGH-SIGNAL condensed reference for agent consumption

---

## [2026-01-23 16:45 UTC] FEAT: Theme Mapping Master Doc & Variant Architecture

**Context:** Initiated Phase 0 of the comprehensive theming overhaul. Segregated work into `feat/theme-mapping-master-doc` branch within a git worktree.

**Actions Taken:**
- Created `docs/procedural/PROC-mui-component-theme-mapping.md`: The authoritative "Master Map" for component slot research and implementation.
- Created `docs/semantic/SEM-theme-token-usage.md`: A comprehensive "Reverse Map" detailing theme token usage across the MUI library (Palette, Neutrals, Structure).
- Implemented `mui/themeVariants.ts`: Module augmentation and factory pattern for "Glass", "Neuromancer", and "Cardboard" theme variants.
- Researched and Documented Mappings for 34 Components:
  - Validated research process using `codebase_investigator` to check `node_modules/@mui/material` and local overrides.
  - Documented slot usage, deprecated patterns, and recommended mappings for every component.
- Refactored `componentOverrides/*.ts|js`:
  - Migrated from `themeStub` to `({ theme }) =>` callback pattern.
  - Implemented `(theme.vars || theme)` pattern for CSS variable support (MUI v6/v7).
  - Replaced hardcoded values with `theme.spacing()`, `theme.shape.borderRadius`, and palette tokens.
  - Added strict TypeScript types (`Components<Theme>['MuiComponent']`).
- Fixed TypeScript Errors:
  - Resolved `themeVariant` missing property via module augmentation.
  - Fixed implicit `any` errors in override callbacks.
  - Fixed export type inference errors.

**Files Created:**
- `docs/procedural/PROC-mui-component-theme-mapping.md`
- `docs/semantic/SEM-theme-token-usage.md`
- `mui/themeVariants.ts`

**Files Modified:**
- All files in `componentOverrides/`
- `mui5.d.ts`

**Impact:**
- The codebase is now architecturally ready for "Theme Variants".
- Component overrides are fully theme-agnostic and support CSS variables.
- Comprehensive documentation exists to guide future styling decisions.

**Lessons Learned:**
- `node_modules` is a reliable source of truth for installed package versions and source code patterns when GitHub access is restricted or version-specific.
- Multi-agent delegation (simulated) is effective for batch processing large sets of components.
- Strict TypeScript typing in overrides prevents regression and ensures API compliance.

---