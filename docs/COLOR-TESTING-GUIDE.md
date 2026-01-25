# Color System Testing Guide
**Verification checklist for color fixes**

---

## Quick Visual Test

After implementing color fixes, run these tests to verify everything works.

---

## Test 1: Semantic Colors Visual Check

### Expected Result

When you view components with semantic colors, you should see:

```
ERROR    ████ RED     (crimson #bf140a)
WARNING  ████ ORANGE  (burntorange #ff9800)
INFO     ████ BLUE    (blue-base #0a71d0)
SUCCESS  ████ GREEN   (applegreen #41bf60)
```

**All four colors must be visually distinct!**

### Test Components

Run the demo app and check these components:

#### Alert Component
```tsx
<Alert severity="error">Error Alert - Should be RED</Alert>
<Alert severity="warning">Warning Alert - Should be ORANGE</Alert>
<Alert severity="info">Info Alert - Should be BLUE</Alert>
<Alert severity="success">Success Alert - Should be GREEN</Alert>
```

**Pass Criteria**: Each alert has a different background color

#### Snackbar Component
```tsx
<Snackbar>
  <Alert severity="error">Error Snackbar</Alert>
</Snackbar>
// Repeat for warning, info, success
```

**Pass Criteria**: Each snackbar variant is a different color

#### Button Component
```tsx
<Button color="error">Error Button</Button>
<Button color="warning">Warning Button</Button>
<Button color="info">Info Button</Button>
<Button color="success">Success Button</Button>
```

**Pass Criteria**: Each button has distinct coloring

#### Chip Component
```tsx
<Chip label="Error" color="error" />
<Chip label="Warning" color="warning" />
<Chip label="Info" color="info" />
<Chip label="Success" color="success" />
```

**Pass Criteria**: Each chip is a different color

---

## Test 2: Text Color Verification

### Expected Result

Text should use different shades of gray/black, not the placeholder #222:

```
Primary Text:    ████ #252d39 (ink-base) - Dark charcoal
Secondary Text:  ████ #647492 (ink-light) - Medium gray
Disabled Text:   ████ #8698ba (grey-05) - Light gray
```

### Test Components

```tsx
<Typography variant="h1">Primary Text (ink-base)</Typography>
<Typography variant="body2" color="text.secondary">
  Secondary Text (ink-light)
</Typography>
<Typography variant="body1" color="text.disabled">
  Disabled Text (grey-05)
</Typography>
```

### Visual Check

1. Open browser DevTools
2. Inspect each text element
3. Check computed color values:
   - Primary: `#252d39` or `rgb(37, 45, 57)`
   - Secondary: `#647492` or `rgb(100, 116, 146)`
   - Disabled: `#8698ba` or `rgb(134, 152, 186)`

**Fail Criteria**: If any text shows `#222222` or `rgb(34, 34, 34)`, the XXXX placeholders weren't replaced

---

## Test 3: Common Colors Verification

### Expected Result

```
Black: ████ #000000 (pure black)
White: ████ #ffffff (pure white)
```

### Test Method

```tsx
<Box sx={{ bgcolor: 'common.black', color: 'common.white', p: 2 }}>
  White text on black background
</Box>
<Box sx={{ bgcolor: 'common.white', color: 'common.black', p: 2 }}>
  Black text on white background
</Box>
```

### DevTools Check

Inspect and verify:
- `common.black` = `#000000` (not `#222222`)
- `common.white` = `#ffffff` (not `#222222`)

---

## Test 4: Divider Color Verification

### Expected Result

Dividers should use `grey-04` (#c8d2e6), a subtle light gray.

### Test Component

```tsx
<Box>
  <Typography>Item 1</Typography>
  <Divider />
  <Typography>Item 2</Typography>
  <Divider />
  <Typography>Item 3</Typography>
</Box>
```

### Visual Check

Divider should be:
- **Color**: `#c8d2e6` or `rgb(200, 210, 230)`
- **Appearance**: Subtle gray line, not dark gray
- **NOT**: `#222222` (old placeholder)

---

## Test 5: Duplicate Color Removal

### Expected Result

These variables should NOT exist in the compiled theme:

```typescript
// These should be removed from colorGuide.ts:
color.darkBeige2   // ❌ Should not exist
color.darkBeige3   // ❌ Should not exist
color.baseblue     // ❌ Should not exist
color.greyscale    // ❌ Should not exist
color['']          // ❌ Should not exist
```

### Test Method

In browser console:
```javascript
import theme from '@braisenly/mui';
console.log(theme.palette.colorGuide.darkBeige2);  // Should be undefined
console.log(theme.palette.colorGuide.darkBeige3);  // Should be undefined
console.log(theme.palette.colorGuide.baseblue);    // Should be undefined
console.log(theme.palette.colorGuide.greyscale);   // Should be undefined
```

**Pass Criteria**: All should return `undefined`

**Kept Versions**:
```javascript
theme.palette.colorGuide.darkBeige   // ✅ Should exist: #9b896c
theme.palette.colorGuide.blue        // ✅ Should exist: #4f78f2
theme.palette.colorGuide['grey-03']  // ✅ Should exist: #dce3f0
```

---

## Test 6: TypeScript Compilation

### Expected Result

No TypeScript errors after color fixes.

### Test Command

```bash
cd /Volumes/FLOUNDER/dev/customTheme
pnpm tsc --noEmit
```

**Pass Criteria**: Exit code 0, no errors (warnings OK)

**Common Issues**:
- If you see `color.XXXX` errors, the placeholders weren't replaced
- If you see `Property 'darkBeige2' does not exist`, duplicates weren't removed

---

## Test 7: Storybook Visual Regression (Optional)

If you have Storybook set up:

### Alert Stories
```tsx
export const AllSeverities = () => (
  <>
    <Alert severity="error">Error - Should be RED</Alert>
    <Alert severity="warning">Warning - Should be ORANGE</Alert>
    <Alert severity="info">Info - Should be BLUE</Alert>
    <Alert severity="success">Success - Should be GREEN</Alert>
  </>
);
```

**Visual Check**: Take screenshot, verify 4 distinct colors

### Color Palette Story
```tsx
export const SemanticColors = () => (
  <Box display="flex" gap={2}>
    <Box bgcolor="error.main" p={2}>Error</Box>
    <Box bgcolor="warning.main" p={2}>Warning</Box>
    <Box bgcolor="info.main" p={2}>Info</Box>
    <Box bgcolor="success.main" p={2}>Success</Box>
  </Box>
);
```

**Visual Check**: Red, Orange, Blue, Green (left to right)

---

## Test 8: Accessibility Contrast Ratios

Use browser DevTools or Lighthouse to verify contrast:

### Minimum Requirements (WCAG AA)

| Foreground | Background | Minimum Ratio | Test Method |
|------------|------------|---------------|-------------|
| Primary text | Default bg | 4.5:1 | Use Lighthouse |
| Secondary text | Default bg | 4.5:1 | Use Lighthouse |
| Error on white | White | 4.5:1 | Chrome DevTools |
| Info on white | White | 4.5:1 | Chrome DevTools |

### Chrome DevTools Method

1. Inspect element
2. Click color swatch in Styles panel
3. Expand "Contrast ratio" section
4. Verify checkmark for AA compliance

### Lighthouse Method

1. Open DevTools → Lighthouse
2. Run accessibility audit
3. Check for "Background and foreground colors do not have sufficient contrast ratio"
4. Should have 0 failures

---

## Test 9: Demo App Full Workflow

### Setup
```bash
cd /Volumes/FLOUNDER/dev/customTheme/demo
pnpm install
pnpm dev
```

### Workflow Test

1. **Homepage**: Check that all semantic colors appear distinct
2. **Alert Page**: View error/warning/info/success alerts
3. **Button Page**: View all color variants
4. **Form Page**: Check text colors (primary/secondary/disabled)
5. **Theme Toggle**: If available, test dark mode

### Screenshot Checklist

Take screenshots of:
- [ ] All 4 alert severities side-by-side
- [ ] All semantic button variants
- [ ] Text hierarchy (h1, body, secondary, disabled)
- [ ] Dividers and borders

Compare to "Before" state (all alerts red) vs "After" (distinct colors)

---

## Test 10: Production Build Verification

### Build Test
```bash
cd /Volumes/FLOUNDER/dev/customTheme
pnpm build
```

**Pass Criteria**:
- Build completes successfully
- No TypeScript errors
- No console warnings about missing colors
- Generated `dist/` contains correct theme

### Bundle Size Check
```bash
ls -lh dist/
```

**Expected**: No significant size increase from color fixes (should be nearly identical)

---

## Automated Test Script

Create `test-colors.js` in demo app:

```javascript
// test-colors.js
import { createTheme } from '@mui/material/styles';
import finalTheme from '@braisenly/mui';

const tests = {
  'Semantic colors are distinct': () => {
    const { error, warning, info, success } = finalTheme.palette;
    const colors = [error.main, warning.main, info.main, success.main];
    const unique = new Set(colors);
    return unique.size === 4; // All 4 must be different
  },

  'No XXXX placeholders remain': () => {
    const { common, text, divider } = finalTheme.palette;
    return (
      common.black !== '#222' &&
      common.white !== '#222' &&
      text.primary !== '#222' &&
      text.secondary !== '#222' &&
      text.disabled !== '#222' &&
      divider !== '#222'
    );
  },

  'Duplicates removed': () => {
    const { colorGuide } = finalTheme.palette;
    return (
      colorGuide.darkBeige2 === undefined &&
      colorGuide.darkBeige3 === undefined &&
      colorGuide.baseblue === undefined &&
      colorGuide.greyscale === undefined
    );
  },

  'Semantic colors match expected': () => {
    const { error, warning, info, success } = finalTheme.palette;
    return (
      error.main === '#bf140a' &&      // crimson
      warning.main === '#ff9800' &&    // burntorange
      info.main === '#0a71d0' &&       // blue-base
      success.main === '#41bf60'       // applegreen
    );
  }
};

// Run tests
console.log('🧪 Running Color System Tests...\n');
let passed = 0;
let failed = 0;

Object.entries(tests).forEach(([name, test]) => {
  const result = test();
  if (result) {
    console.log(`✅ PASS: ${name}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${name}`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
```

Run with:
```bash
node test-colors.js
```

**Pass Criteria**: All tests pass (exit code 0)

---

## Regression Test Checklist

Before merging color fixes:

### Pre-Merge Checklist
- [ ] All semantic colors visually distinct in demo app
- [ ] No XXXX placeholders in compiled theme
- [ ] Text colors use ink-base/ink-light/grey-05 (not #222)
- [ ] Common.black = #000, common.white = #fff
- [ ] Divider color = grey-04 (#c8d2e6)
- [ ] Duplicate colors removed (darkBeige2/3, baseblue, greyscale)
- [ ] TypeScript compiles without errors
- [ ] Demo app runs without console errors
- [ ] Storybook shows correct colors (if applicable)
- [ ] Accessibility audit passes (WCAG AA minimum)
- [ ] Production build succeeds
- [ ] No bundle size regressions

### Post-Merge Checklist
- [ ] Update KNOWN-ISSUES.md (mark Issue #2 resolved)
- [ ] Update README.md with color system changes
- [ ] Create migration notes for consumers
- [ ] Update Storybook documentation
- [ ] Bump package version (patch for bug fix)
- [ ] Tag release in git
- [ ] Publish to npm (if applicable)

---

## Troubleshooting

### Issue: Semantic colors still all red

**Cause**: palette.ts wasn't updated correctly

**Fix**: Double-check lines 55, 61, 67 in palette.ts:
```typescript
warning: { main: color.burntorange },     // Line 55
info:    { main: color['blue-base'] },    // Line 61
success: { main: color.applegreen },      // Line 67
```

### Issue: Text still shows #222

**Cause**: XXXX placeholders not replaced

**Fix**: Check lines 76-85 in palette.ts, ensure no `color.XXXX` remains

### Issue: TypeScript errors about missing colors

**Cause**: Typo in color name or color doesn't exist

**Fix**: Verify color names in colorGuide.ts:
- `color.burntorange` (not `burntOrange`)
- `color['blue-base']` (use bracket notation for hyphenated names)
- `color.applegreen` (not `appleGreen`)

### Issue: Colors work locally but fail in production

**Cause**: Build cache or tree-shaking issue

**Fix**:
```bash
rm -rf dist/ node_modules/.cache
pnpm install
pnpm build
```

---

## Success Criteria Summary

### ✅ All Tests Pass If:

1. **Visual**: 4 distinct semantic colors (red, orange, blue, green)
2. **Code**: No `color.XXXX` in compiled theme
3. **TypeScript**: Compiles without errors
4. **Accessibility**: Meets WCAG AA minimum
5. **Build**: Production build succeeds
6. **Regression**: No existing features broken

### ❌ Tests Fail If:

1. Any semantic colors identical
2. Any text/common colors show #222
3. TypeScript compilation errors
4. Contrast ratios below 4.5:1
5. Build fails
6. Console errors in demo app

---

## Quick Test Command

Run all tests in sequence:

```bash
#!/bin/bash
# quick-color-test.sh

echo "🧪 Color System Quick Test"
echo "=========================="

# Test 1: TypeScript compilation
echo "1️⃣ Testing TypeScript compilation..."
pnpm tsc --noEmit || { echo "❌ TypeScript errors"; exit 1; }
echo "✅ TypeScript OK"

# Test 2: Build
echo "2️⃣ Testing production build..."
pnpm build || { echo "❌ Build failed"; exit 1; }
echo "✅ Build OK"

# Test 3: Demo app
echo "3️⃣ Starting demo app (manual test)..."
cd demo && pnpm dev

echo "✅ All automated tests passed!"
echo "👀 Manually verify semantic colors in browser"
```

---

**Next Steps**: Run these tests after implementing fixes from `COLOR-QUICK-FIX-GUIDE.md`. All tests should pass before committing changes.
