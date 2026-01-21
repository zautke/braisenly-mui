---
title: REASON-successes
tags: [reasoning, success, patterns, lessons-learned, 2026-01-19]
type: reasoning
---

# Reasoning Bank: Successes - 2026-01-19

## AGENT QUICK-REFERENCE
1. **DO**: Use cliclick for mouse automation (bypasses AppleScript focus issues)
2. **DO**: Have tunnel alternatives ready (localtunnel when ngrok fails)
3. **DO**: Prefer keyboard navigation over mouse clicks (more reliable)
4. **DO**: Screenshot after each action (visual confirmation)

---

## Success 1: cliclick for Mouse Automation

### Context
Needed to click UI elements in Chrome for theme verification.

### Approach
Used cliclick instead of AppleScript System Events clicks:
```bash
cliclick c:735,130
```

### Outcome
SUCCESS - Reliable clicks at exact coordinates

### Analysis
- **What worked**: Dedicated tool for single purpose
- **Key insight**: AppleScript is good for keyboard, not mouse

### Actionable Principle
> Use specialized tools (cliclick) over general scripting (AppleScript) for precise UI automation.

### Applicability
- **Applies When**: macOS UI automation needed
- **Does Not Apply When**: MCP browser tools are available
- **Confidence**: HIGH

---

## Success 2: localtunnel as ngrok Fallback

### Context
ngrok account suspended, needed external URL for testing.

### Approach
```bash
npx localtunnel --port 5173
```

### Outcome
SUCCESS - Got working external URL immediately

### Analysis
- **What worked**: Free service, no account required
- **Key insight**: Always have backup services for critical dependencies

### Actionable Principle
> Never rely on a single paid service without a free fallback option.

### Applicability
- **Applies When**: ngrok fails, need quick tunnel
- **Does Not Apply When**: Need persistent custom domains
- **Confidence**: HIGH

---

## Success 3: Keyboard Navigation Over Mouse

### Context
Mouse clicks were unreliable due to focus issues.

### Approach
Used arrow keys and Enter to navigate dropdown:
```applescript
key code 125  -- down arrow
key code 36   -- Enter
```

### Outcome
SUCCESS - More reliable than coordinate-based clicks

### Analysis
- **What worked**: Keyboard navigation doesn't depend on coordinates
- **Key insight**: Focus-based navigation more robust than position-based

### Actionable Principle
> When automating UI, prefer keyboard navigation over mouse clicks.

### Applicability
- **Applies When**: Interacting with focused elements
- **Does Not Apply When**: Need to click specific screen regions
- **Confidence**: HIGH

---

## Success 4: Screenshot Verification Pattern

### Context
Needed to confirm theme changes were applied correctly.

### Approach
```bash
screencapture -x /tmp/theme-name.png
```
Then read the screenshot to verify visually.

### Outcome
SUCCESS - Visual confirmation of all 5 themes

### Analysis
- **What worked**: Images provide undeniable proof of state
- **Key insight**: Screenshots serve as both verification and documentation

### Actionable Principle
> Always capture screenshots after significant UI changes for verification and evidence.

### Applicability
- **Applies When**: UI testing, theme verification, debugging
- **Confidence**: HIGH

---

## Success 5: MUI 7 Selector Migration Pattern

### Context
Component overrides using deprecated $ selectors.

### Approach
Systematic replacement:
```javascript
// Before
'&$checked, &.Mui-checked': {...}

// After
'&.Mui-checked': {...}
```

### Outcome
SUCCESS - All selectors working with MUI 7

### Analysis
- **What worked**: Clean removal of JSS syntax
- **Key insight**: MUI 7 uses standard CSS class selectors

### Actionable Principle
> When migrating MUI versions, grep for `$` prefix and replace with `.Mui-` class selectors.

### Applicability
- **Applies When**: MUI 4->5, 5->6, 6->7 migrations
- **Confidence**: HIGH

---

## Pattern Extractions

### Pattern: Fallback Chain
1. Try primary tool (MCP browser)
2. If unavailable, try secondary (AppleScript + cliclick)
3. If still failing, try tertiary (keyboard navigation)

### Pattern: Service Redundancy
- Primary: ngrok (feature-rich)
- Fallback: localtunnel (free, reliable)
- Emergency: serveo.net (no install)

### Pattern: Verification Loop
1. Take action
2. Screenshot
3. Read screenshot
4. Confirm state
5. If wrong, debug and retry

---

## Relations

- part_of [[SESSION-2026-01-19-mui-theme-demo]]
- contrasts_with [[REASON-failures]]
- informs [[PROC-macos-accessibility-automation]]
