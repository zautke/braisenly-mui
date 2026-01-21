---
title: EP-blockers-resolved
tags: [episodic, blockers, troubleshooting, browser-automation, macos, 2026-01-19]
type: episodic
---

# Episodic: Blockers Resolved - 2026-01-19

## AGENT QUICK-REFERENCE
1. Chrome MCP not connected -> AppleScript + cliclick fallback
2. ngrok suspended -> localtunnel alternative
3. AppleScript focus issues -> Close competing apps + cliclick
4. MUI 7 selectors -> Replace $ prefix with .Mui- classes

---

## Blocker 1: Chrome MCP Extension Not Connected

### Context
Attempting to verify 5-theme demo implementation using MCP browser tools.

### Blocker
`tabs_context_mcp` returned "Browser extension is not connected" error.

### Attempts
1. Tried reconnecting extension - still failed
2. Checked if extension was installed - yes
3. Researched alternative approaches

### Solution
Pivoted to AppleScript accessibility automation:
```bash
osascript -e 'tell application "Google Chrome" to activate'
cliclick c:X,Y
screencapture -x /tmp/screenshot.png
```

### Time Lost
~30 minutes pivoting and researching

### Prevention
- Have AppleScript fallback ready
- Document MCP browser prerequisites
- Keep cliclick installed (`brew install cliclick`)

---

## Blocker 2: ngrok Account Suspended

### Context
Needed external URL for Browserbase cloud browser access.

### Blocker
```
ERR_NGROK_102: authentication failed
The last payment for the account failed.
Account has been suspended.
```

### Solution
Used localtunnel as free alternative:
```bash
npx localtunnel --port 5173
# Returns: https://[random].loca.lt
```

### Time Lost
~10 minutes discovering and testing alternative

### Prevention
- Always have tunnel alternatives ready
- Consider: localtunnel, Cloudflare Tunnel, serveo.net

---

## Blocker 3: AppleScript Focus Issues

### Context
Using AppleScript to click on theme dropdown in Chrome.

### Blocker
Clicks were hitting wrong application (Preview.app with an image).

### Solution
1. Close competing apps first (especially Preview)
2. Use cliclick instead of AppleScript clicks
3. Combine with explicit Chrome activation:
```bash
osascript -e 'tell application "Google Chrome" to activate'
sleep 0.5
cliclick c:735,130
```

### Time Lost
~20 minutes debugging focus and coordinate issues

### Prevention
- Close all unnecessary apps before automation
- Use cliclick for mouse, AppleScript for keyboard only

---

## Blocker 4: MUI 7 Deprecated Selectors

### Context
Theme was built but Switch component styling broken.

### Blocker
`$checked`, `$track`, `$thumb` selectors not working in MUI 7.

### Solution
Replace with standard CSS class selectors:
- `$checked` -> `.Mui-checked`
- `$track` -> `.MuiSwitch-track`
- `$thumb` -> `.MuiSwitch-thumb`

### Time Lost
~5 minutes identifying and fixing

### Prevention
- Audit component overrides for `$` syntax before MUI upgrades
- Use grep: `grep -r '\$' componentOverrides/`

---

## Relations

- part_of [[SESSION-2026-01-19-mui-theme-demo]]
- informs [[PROC-macos-accessibility-automation]]
- informs [[PROC-tunnel-alternatives]]
