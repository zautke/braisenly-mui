---
title: Critical - Browser Testing Policy
tags: [critical, testing, mcp, browser, playwright, policy, requirement]
type: note
priority: critical
---

# Critical - Browser Testing Policy

## Context

This document establishes a MANDATORY policy for all browser-based testing within the customTheme project and its demo application. This policy applies to all agents, developers, and automated processes working with this codebase.

## Policy Statement

**LOCAL PLAYWRIGHT IS STRICTLY FORBIDDEN**

Under no circumstances should local Playwright testing tools be used for browser-based testing, verification, or any browser automation tasks.

## Observations

- [requirement] Local Playwright (npx playwright test, @playwright/test) is FORBIDDEN for all browser testing #critical #testing #playwright
- [requirement] MCP browser tools MUST be used for ALL browser-based testing and verification #mcp #browser #testing
- [requirement] This policy applies to: E2E tests, visual verification, theme testing, component testing in browser #testing #scope
- [requirement] The demo project at /Volumes/FLOUNDER/dev/customTheme/demo requires MCP browser tools exclusively #demo #mcp
- [decision] MCP browser tools provide controlled, observable browser automation that integrates with the agent workflow #mcp #architecture
- [fact] Local Playwright runs outside agent observation and control, creating verification blind spots #playwright #risk

## Prohibited Actions

The following commands and approaches are FORBIDDEN:

```bash
# DO NOT USE
npx playwright test
npm run test:e2e  # if it uses Playwright
pnpm playwright test
yarn playwright test
```

```javascript
// DO NOT IMPORT OR USE
import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');
```

## Required Approach

For all browser-based testing needs, use the MCP browser tools:

1. **Visual Verification**: Use MCP browser screenshot and inspection tools
2. **E2E Testing**: Use MCP browser navigation and interaction tools
3. **Theme Testing**: Use MCP browser tools to load demo app and verify styling
4. **Component Testing**: Use MCP browser tools for interactive component verification

## Scope

This policy applies to:

- End-to-end (E2E) tests
- Visual regression testing
- Theme appearance verification
- Component behavior testing in browser context
- Any task requiring browser automation or inspection
- The demo project at `/Volumes/FLOUNDER/dev/customTheme/demo`

## Relations

- implements [[Testing Standards]]
- applies_to [[Demo Project]]
- applies_to [[Custom Theme Package]]
- supersedes [[Local Testing Approaches]]

## Rationale

MCP browser tools provide:
- Direct integration with agent workflows
- Observable and controllable browser state
- Consistent behavior across sessions
- Proper error handling and reporting within agent context

Local Playwright lacks:
- Agent observability
- Integrated error handling
- Session-aware context
- Controlled execution flow

## Enforcement

This is a CRITICAL policy. Violations should be flagged immediately. Any test infrastructure or scripts that invoke local Playwright must be refactored to use MCP browser tools.

---

*This policy is non-negotiable and applies to all current and future work on this codebase.*
