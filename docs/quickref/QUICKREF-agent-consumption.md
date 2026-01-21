---
title: QUICKREF-agent-consumption
tags: [quickref, high-signal, critical, agent-consumption, mui, browser-automation]
type: quickref
priority: critical
---

# AGENT QUICK REFERENCE: MUI Theme Development

<!--
PURPOSE: Extremely condensed, high-signal document for rapid agent consumption.
TARGET: < 50 lines of critical content. Every line must be actionable.
RETRIEVAL: Search for `quickref`, `agent-consumption`, `mui`, `browser-testing`
-->

## CRITICAL POLICY
**NEVER use local Playwright. MCP browser tools ONLY.**

---

## 5-SECOND CONTEXT
- **Project**: MUI v5 custom theme at `/Volumes/FLOUNDER/dev/customTheme`
- **Demo**: 5 switchable themes at `demo/` using `@braisenly/mui` workspace package
- **Stack**: MUI 5/6, React 18, Vite, TypeScript
- **Status**: COMPLETE - all themes working
- **Key Files**: `themeStub.ts`, `componentOverrides/`, `demo/src/themes/`

---

## INSTANT FIXES

| Problem | Solution |
|---------|----------|
| `$checked` not working | Use `.Mui-checked` |
| `$track` not working | Use `.MuiSwitch-track` |
| `spacing.unit` undefined | Use `theme.spacing(n)` |
| Chrome MCP disconnected | AppleScript + cliclick |
| ngrok down | `npx localtunnel --port PORT` |
| Clicks hit wrong app | Close Preview first |
| TDZ error in theme | Use themeStub.ts imports |

---

## KEY COMMANDS

```bash
# Start demo
cd demo && pnpm dev

# External URL (when ngrok fails)
npx localtunnel --port 5173

# Reliable mouse click (macOS)
cliclick c:X,Y

# Screenshot
screencapture -x /tmp/shot.png

# Find deprecated MUI selectors
grep -r '\$checked\|\$track' componentOverrides/

# Find deprecated spacing
grep -r 'spacing\.unit' componentOverrides/
```

---

## MUI 7 SELECTOR MIGRATION

```javascript
// OLD (broken)
'&$checked': { ... }
'& + $track': { ... }

// NEW (working)
'&.Mui-checked': { ... }
'& + .MuiSwitch-track': { ... }
```

---

## AUTOMATION FALLBACK CHAIN

1. **Primary**: MCP browser tools (`tabs_context_mcp`, `navigate`, `computer`)
2. **Fallback**: AppleScript + cliclick
3. **Emergency**: Keyboard navigation (arrow keys + Enter)

---

## TUNNEL FALLBACK CHAIN

1. **Primary**: ngrok (if account active)
2. **Fallback**: `npx localtunnel --port PORT`
3. **Emergency**: `ssh -R 80:localhost:PORT serveo.net`

---

## FILE LOCATIONS

| Purpose | Path |
|---------|------|
| Theme stub (circular dep fix) | `themeStub.ts` |
| Component overrides | `componentOverrides/` |
| Demo themes | `demo/src/themes/` |
| Theme context | `demo/src/ThemeContext.tsx` |
| Browser policy | `docs/critical-browser-testing-policy.md` |
| Session docs | `docs/sessions/` |

---

## SEARCH HINTS

To find relevant notes, search for:
- `mui7` - MUI 7 migration facts
- `mcp-browser` - Browser testing procedures
- `cliclick` - macOS automation
- `localtunnel` - Tunnel alternatives
- `blockers` - Known issues and solutions
- `reasoning` - Success/failure analysis

---

## RELATED NOTES

- [[SEM-mui7-compliance]] - MUI migration facts
- [[PROC-macos-accessibility-automation]] - Automation procedures
- [[PROC-tunnel-alternatives]] - Tunnel options
- [[EP-blockers-resolved]] - Known issues
- [[REASON-successes]] - What works
- [[REASON-failures]] - What to avoid
