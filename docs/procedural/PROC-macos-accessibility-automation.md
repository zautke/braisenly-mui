---
title: PROC-macos-accessibility-automation
tags: [procedural, macos, applescript, cliclick, automation, browser-testing]
type: procedural
last_executed: 2026-01-19
success_rate: HIGH (when following all steps)
---

# Procedural: macOS Accessibility Automation

## AGENT QUICK-REFERENCE
```bash
# Reliable click pattern
osascript -e 'tell app "Google Chrome" to activate'
sleep 0.5
cliclick c:X,Y
screencapture -x /tmp/shot.png
```
**Preconditions**: Close Preview, Terminal has Accessibility permissions
**Common Failure**: Clicks hit wrong app -> Close competing apps first

---

## Prerequisites

- [ ] Terminal has Accessibility permissions (System Settings > Privacy > Accessibility)
- [ ] cliclick installed: `brew install cliclick`
- [ ] Close competing apps (Preview, image viewers)

---

## Procedure

### Step 1: Close Competing Apps
```bash
osascript -e 'tell application "Preview" to quit'
```
**Why**: Other apps can steal focus and receive clicks

### Step 2: Focus Target Application
```bash
osascript -e 'tell application "Google Chrome" to activate'
```
**Wait**: Add `sleep 0.5` after to ensure focus completes

### Step 3: Click Using cliclick
```bash
cliclick c:X,Y
```
**Note**: Use screen coordinates (not window-relative)

### Step 4: Capture Screenshot
```bash
screencapture -x /tmp/screenshot.png
```
**Flag**: `-x` prevents shutter sound

### Step 5: Keyboard Navigation (Alternative)
```applescript
tell application "System Events"
    key code 125  -- down arrow
    key code 126  -- up arrow
    key code 36   -- Enter
    key code 53   -- Escape
end tell
```
**Tip**: Keyboard navigation is more reliable than mouse clicks

---

## Common Failures

### Failure: Clicks Hit Wrong Application
- **Symptoms**: Screenshot shows different app
- **Root Cause**: Another app (Preview) stole focus
- **Solution**: Close all unnecessary apps before automation
- **Prevention**: Start with clean desktop, close image viewers

### Failure: Coordinates Are Wrong
- **Symptoms**: Clicks miss target element
- **Root Cause**: Window position changed
- **Solution**: Get fresh coordinates after focus
- **Prevention**: Position window consistently, use full-screen

### Failure: Focus Not Maintained
- **Symptoms**: Commands execute but on wrong app
- **Root Cause**: AppleScript focus unreliable
- **Solution**: Add explicit sleep after focus commands
- **Prevention**: Use combined osascript + cliclick pattern

---

## Verified Commands Reference

### Mouse Actions
```bash
cliclick c:X,Y          # Click at coordinates
cliclick dc:X,Y         # Double-click
cliclick rc:X,Y         # Right-click
cliclick m:X,Y          # Move mouse
cliclick dd:X,Y dp:X2,Y2 du:X2,Y2  # Drag
```

### Keyboard Codes
| Key | Code |
|-----|------|
| Down Arrow | 125 |
| Up Arrow | 126 |
| Left Arrow | 123 |
| Right Arrow | 124 |
| Enter/Return | 36 |
| Escape | 53 |
| Tab | 48 |
| Space | 49 |

---

## Relations

- alternative_to [[MCP browser tools]]
- used_in [[SESSION-2026-01-19-mui-theme-demo]]
- solves [[EP-blockers-resolved#Blocker 3]]
