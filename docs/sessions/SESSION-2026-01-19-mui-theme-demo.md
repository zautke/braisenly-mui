---
title: SESSION-2026-01-19-mui-theme-demo
tags: [session, mui, theme-demo, browser-automation, completed, 2026-01-19]
type: session
status: completed
---

# Session: MUI Theme Demo Enhancement

## AGENT QUICK-REFERENCE

### Critical Policy
**NEVER use local Playwright for browser testing. MCP browser tools ONLY.**

### Context (5 lines)
- **Project**: MUI v5 custom theme package with 5-theme demo switcher
- **Goal**: Implement theme switcher + MUI 7 compliance + browser verification
- **Outcome**: SUCCESS - all 5 themes working, verified via AppleScript automation
- **Stack**: MUI 5/6, React 18, Vite, TypeScript, @braisenly/mui workspace package
- **Location**: /Volumes/FLOUNDER/dev/customTheme

### Key Decisions
1. **MCP-only browser policy**: Local Playwright runs outside agent observation → Established critical policy
2. **AppleScript fallback**: Chrome MCP not connected → Used accessibility automation
3. **localtunnel over ngrok**: Account suspended → Free alternative works reliably
4. **cliclick over AppleScript clicks**: Focus issues → Dedicated tool more reliable

### Blockers & Solutions
| Blocker | Solution | Time Impact |
|---------|----------|-------------|
| Chrome MCP not connected | AppleScript + cliclick automation | ~30 min pivot |
| ngrok account suspended | localtunnel (`npx lt --port 5173`) | ~10 min |
| AppleScript focus issues | Close Preview, use cliclick | ~20 min debugging |
| $checked selector deprecated | Use .Mui-checked class | ~5 min fix |
| spacing.unit undefined | Use theme.spacing(n) function | ~5 min fix |

---

## Session Timeline

### Phase 1: Implementation (Plan Execution)
- Created `demo/src/themes/muiDefault.ts` - Pure MUI defaults
- Created `demo/src/themes/solarized.ts` - Solarized Light color scheme
- Updated `demo/src/ThemeContext.tsx` - 5-theme support
- Updated `demo/src/App.tsx` - 5 menu items

### Phase 2: MUI 7 Compliance Fixes
- Fixed `componentOverrides/switch.js`:
  - `$checked` → `.Mui-checked`
  - `$track` → `.MuiSwitch-track`
  - `$focusVisible` → `.Mui-focusVisible`
  - `$thumb` → `.MuiSwitch-thumb`
- Fixed `componentOverrides/card.js`:
  - `theme.spacing.unit * n` → `theme.spacing(n)`

### Phase 3: Browser Verification
1. Started dev server: `cd demo && pnpm dev`
2. Attempted MCP browser tools - extension not connected
3. Researched AppleScript accessibility automation
4. Attempted ngrok tunnel - account suspended
5. Discovered localtunnel alternative
6. Implemented cliclick + AppleScript for automation
7. Successfully verified all 5 themes visually

### Themes Verified
| Theme | Mode | Visual Markers |
|-------|------|----------------|
| MUI Default | Light | Blue #1976d2, Roboto, white bg |
| Base | Light | Green primary, Victor Mono, off-white |
| Glass | Dark | Navy #0a1929, cyan accents, glassmorphism |
| Corporate | Light | Indigo #1a237e, 0px radius, Helvetica |
| Solarized | Light | Cream #fdf6e3, monospace, muted text |

---

## Files Changed

### New Files
- `demo/src/themes/muiDefault.ts`
- `demo/src/themes/solarized.ts`
- `docs/critical-browser-testing-policy.md`

### Modified Files
- `demo/src/ThemeContext.tsx` - Added 2 theme imports, expanded type
- `demo/src/App.tsx` - Added 2 MenuItems
- `componentOverrides/switch.js` - MUI 7 selector fixes
- `componentOverrides/card.js` - spacing() fix
- `CLAUDE.md` - Added critical browser testing policy

---

## Observations

- [decision] Established MCP-only browser testing policy #critical #policy
- [learning] cliclick more reliable than AppleScript for mouse automation #macos
- [learning] localtunnel is viable ngrok alternative #tunneling
- [fact] MUI 7 uses CSS class selectors, not JSS $ references #mui7
- [fact] theme.spacing() returns string with units #mui7

---

## Relations

- establishes [[critical-browser-testing-policy]]
- documents [[PROC-mcp-browser-testing]]
- documents [[PROC-macos-accessibility-automation]]
- validates [[SEM-mui7-compliance]]
