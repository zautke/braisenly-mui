---
title: REASON-failures
tags: [reasoning, failure, lessons-learned, anti-patterns, 2026-01-19]
type: reasoning
---

# Reasoning Bank: Failures - 2026-01-19

## AGENT QUICK-REFERENCE
1. **DON'T**: Use local Playwright (runs outside agent observation)
2. **DON'T**: Use AppleScript for mouse clicks (focus issues)
3. **DON'T**: Rely on ngrok without backup (account can be suspended)
4. **DON'T**: Automate without closing competing apps (Preview steals clicks)

---

## Failure 1: Local Playwright for Browser Testing

### Context
Attempted to run E2E tests using local Playwright installation.

### Approach Taken
```bash
npx playwright test
```

### Outcome
FAILURE - Tests ran but outside agent observation

### Analysis
- **What went wrong**: Playwright executes in separate process
- **Root cause**: Agent cannot observe or interact with external processes
- **Key insight**: MCP tools provide agent-observable automation

### Actionable Principle
> NEVER use local Playwright for browser testing. MCP browser tools provide observable automation within agent context.

### Applicability
- **This lesson applies**: Always for agent-driven testing
- **Exception**: None - this is a critical policy

### Evidence
- Policy established in CLAUDE.md
- Documented in critical-browser-testing-policy.md

---

## Failure 2: Direct AppleScript Mouse Clicks

### Context
Needed to click theme dropdown in Chrome.

### Approach Taken
```applescript
tell application "System Events"
    tell process "Google Chrome"
        click at {740, 141}
    end tell
end tell
```

### Outcome
FAILURE - Clicks hit wrong application (Preview)

### Analysis
- **What went wrong**: AppleScript focus unreliable with multiple apps
- **Root cause**: Window focus can change between commands
- **Key insight**: System Events clicks depend on current focus state

### Actionable Principle
> Don't use AppleScript for mouse clicks. Use cliclick for reliable coordinate-based clicking.

### Applicability
- **This lesson applies**: macOS UI automation
- **Exception**: AppleScript is fine for keyboard input

### Workaround Discovered
```bash
cliclick c:X,Y  # Direct click, no focus dependency
```

---

## Failure 3: Relying on ngrok Without Backup

### Context
Needed external URL to expose localhost for Browserbase.

### Approach Taken
Assumed ngrok would be available:
```bash
ngrok http 5173
```

### Outcome
FAILURE - Account suspended due to payment issues

### Analysis
- **What went wrong**: Single point of failure for critical service
- **Root cause**: Paid services can become unavailable unexpectedly
- **Key insight**: Always have free alternatives for paid services

### Actionable Principle
> Never rely on a single tunnel service. Have at least one free fallback (localtunnel, serveo.net).

### Applicability
- **This lesson applies**: Any external service dependency
- **Exception**: Enterprise services with SLAs

### Workaround Discovered
```bash
npx localtunnel --port 5173
```

---

## Failure 4: Mouse Automation Without Closing Apps

### Context
Running browser automation with other apps open.

### Approach Taken
Started clicking without checking what apps were running.

### Outcome
FAILURE - Clicks landed on Preview.app showing an image

### Analysis
- **What went wrong**: Preview was open and stole focus
- **Root cause**: Multiple apps competing for system focus
- **Key insight**: macOS focus management is unpredictable

### Actionable Principle
> Before UI automation, close all unnecessary apps, especially image viewers (Preview) that might be in the foreground.

### Applicability
- **This lesson applies**: Any macOS UI automation
- **Exception**: When using MCP browser tools (isolated context)

### Prevention
```bash
osascript -e 'tell application "Preview" to quit'
```

---

## Failure 5: Playwright/Vitest Conflict

### Context
Running `pnpm test` which uses Vitest.

### Approach Taken
Had Playwright test file in tests/ directory alongside Vitest.

### Outcome
FAILURE - Vitest tried to run Playwright test, causing errors

### Analysis
- **What went wrong**: Test runners conflicted on same test file
- **Root cause**: Mixed test frameworks in same directory
- **Key insight**: Keep different test frameworks separate

### Actionable Principle
> Keep Playwright and Vitest tests in separate directories with separate configs. Don't mix test frameworks.

### Applicability
- **This lesson applies**: Projects with multiple test frameworks
- **Exception**: When using unified test runner

---

## Anti-Pattern Summary

| Anti-Pattern | Why It Fails | Alternative |
|--------------|--------------|-------------|
| Local Playwright | Outside agent observation | MCP browser tools |
| AppleScript clicks | Focus issues | cliclick |
| Single tunnel service | Can become unavailable | Multiple alternatives |
| Open apps during automation | Focus stealing | Close unnecessary apps |
| Mixed test frameworks | Runner conflicts | Separate directories |

---

## Self-Healing Updates

Based on these failures, these notes should be created/updated:
- [x] Created PROC-macos-accessibility-automation with cliclick pattern
- [x] Created PROC-tunnel-alternatives with fallback options
- [x] Updated CLAUDE.md with browser testing policy
- [x] Created critical-browser-testing-policy.md

---

## Relations

- part_of [[SESSION-2026-01-19-mui-theme-demo]]
- contrasts_with [[REASON-successes]]
- establishes [[critical-browser-testing-policy]]
