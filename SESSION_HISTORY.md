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
