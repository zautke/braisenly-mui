# Theme Token Scanner - Tooling Design Document

## Purpose

This document provides designs and procedures for:
1. Automated scanning of theme token consumption across componentOverrides
2. Dead code detection for unused palette/colorGuide values
3. Theme variant completeness validation
4. Agentic instruction format for automated validation (Phase 0b enhancement)

---

## 1. Token Consumption Scanner

### 1.1 Overview

A TypeScript/Node.js scanner that parses all componentOverrides files and generates a bidirectional token usage map.

### 1.2 Scanner Design (TypeScript)

```typescript
/**
 * Theme Token Scanner
 *
 * Scans componentOverrides/*.{ts,js} for palette and colorGuide token usage.
 * Generates a bidirectional map: Token -> Components and Component -> Tokens.
 */

import * as fs from 'fs';
import * as path from 'path';

// Token patterns to detect
const PALETTE_PATTERNS = [
  // Standard MUI palette access
  /\(theme\.vars\s*\|\|\s*theme\)\.palette\.([a-zA-Z.[\]'"\d]+)/g,
  /theme\.palette\.([a-zA-Z.[\]'"\d]+)/g,

  // Direct palette reference
  /palette\.([a-zA-Z.[\]'"\d]+)/g,
];

const COLORGUIDE_PATTERNS = [
  // ColorGuide access patterns
  /theme\.palette\.colorGuide\[['"]([^'"]+)['"]\]/g,
  /colorGuide\[['"]([^'"]+)['"]\]/g,
  /palette\.colorGuide\[['"]([^'"]+)['"]\]/g,
  /color\.([a-zA-Z_\d]+)/g,
];

const SHAPE_PATTERNS = [
  /\(theme\.vars\s*\|\|\s*theme\)\.shape\.([a-zA-Z]+)/g,
  /theme\.shape\.([a-zA-Z]+)/g,
];

const SHADOW_PATTERNS = [
  /\(theme\.vars\s*\|\|\s*theme\)\.shadows\[(\d+)\]/g,
  /theme\.shadows\[(\d+)\]/g,
];

const TYPOGRAPHY_PATTERNS = [
  /theme\.typography\.([a-zA-Z]+)/g,
  /\.\.\.theme\.typography\.([a-zA-Z\d]+)/g,
];

const TRANSITION_PATTERNS = [
  /theme\.transitions\.([a-zA-Z.]+)/g,
];

const SPACING_PATTERNS = [
  /theme\.spacing\(([^)]+)\)/g,
];

interface TokenUsage {
  token: string;
  category: 'palette' | 'colorGuide' | 'shape' | 'shadows' | 'typography' | 'transitions' | 'spacing';
  components: string[];
  files: string[];
  lineNumbers: { file: string; line: number }[];
}

interface ComponentUsage {
  component: string;
  file: string;
  tokens: {
    palette: string[];
    colorGuide: string[];
    shape: string[];
    shadows: string[];
    typography: string[];
    transitions: string[];
    spacing: string[];
  };
}

interface ScanResult {
  tokenToComponents: Map<string, TokenUsage>;
  componentToTokens: Map<string, ComponentUsage>;
  unusedTokens: {
    palette: string[];
    colorGuide: string[];
  };
  hardcodedViolations: {
    file: string;
    line: number;
    violation: string;
    suggestion: string;
  }[];
}

function scanFile(filePath: string, content: string): ComponentUsage {
  const componentName = path.basename(filePath, path.extname(filePath));
  const lines = content.split('\n');

  const usage: ComponentUsage = {
    component: componentName,
    file: filePath,
    tokens: {
      palette: [],
      colorGuide: [],
      shape: [],
      shadows: [],
      typography: [],
      transitions: [],
      spacing: [],
    },
  };

  // Extract palette tokens
  PALETTE_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(new RegExp(pattern));
    for (const match of matches) {
      const token = `palette.${match[1]}`;
      if (!usage.tokens.palette.includes(token)) {
        usage.tokens.palette.push(token);
      }
    }
  });

  // Extract colorGuide tokens
  COLORGUIDE_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(new RegExp(pattern));
    for (const match of matches) {
      const token = match[1];
      if (!usage.tokens.colorGuide.includes(token)) {
        usage.tokens.colorGuide.push(token);
      }
    }
  });

  // Extract shape tokens
  SHAPE_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(new RegExp(pattern));
    for (const match of matches) {
      const token = `shape.${match[1]}`;
      if (!usage.tokens.shape.includes(token)) {
        usage.tokens.shape.push(token);
      }
    }
  });

  // Extract shadow tokens
  SHADOW_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(new RegExp(pattern));
    for (const match of matches) {
      const token = `shadows[${match[1]}]`;
      if (!usage.tokens.shadows.includes(token)) {
        usage.tokens.shadows.push(token);
      }
    }
  });

  // Extract typography tokens
  TYPOGRAPHY_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(new RegExp(pattern));
    for (const match of matches) {
      const token = `typography.${match[1]}`;
      if (!usage.tokens.typography.includes(token)) {
        usage.tokens.typography.push(token);
      }
    }
  });

  // Extract transition tokens
  TRANSITION_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(new RegExp(pattern));
    for (const match of matches) {
      const token = `transitions.${match[1]}`;
      if (!usage.tokens.transitions.includes(token)) {
        usage.tokens.transitions.push(token);
      }
    }
  });

  // Extract spacing usage
  SPACING_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(new RegExp(pattern));
    for (const match of matches) {
      const token = `spacing(${match[1]})`;
      if (!usage.tokens.spacing.includes(token)) {
        usage.tokens.spacing.push(token);
      }
    }
  });

  return usage;
}

function detectHardcodedViolations(filePath: string, content: string) {
  const violations: { line: number; violation: string; suggestion: string }[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Detect hardcoded hex colors (except transparent, inherit, currentColor)
    const hexMatch = line.match(/#[0-9A-Fa-f]{3,8}(?!.*\/\/.*#)/);
    if (hexMatch && !line.includes('// Exception:')) {
      violations.push({
        line: lineNum,
        violation: `Hardcoded hex color: ${hexMatch[0]}`,
        suggestion: 'Use (theme.vars || theme).palette.* token',
      });
    }

    // Detect hardcoded rgba values (except those in action palette)
    const rgbaMatch = line.match(/rgba?\([^)]+\)(?!.*palette\.action)/);
    if (rgbaMatch && !line.includes('theme.palette.action') && !line.includes('alpha(')) {
      violations.push({
        line: lineNum,
        violation: `Hardcoded rgba color: ${rgbaMatch[0]}`,
        suggestion: 'Use alpha() utility with theme palette token',
      });
    }

    // Detect hardcoded pixel values for spacing/padding/margin
    const pxMatch = line.match(/(?:padding|margin|gap):\s*['"]?\d+px/i);
    if (pxMatch) {
      violations.push({
        line: lineNum,
        violation: `Hardcoded pixel spacing: ${pxMatch[0]}`,
        suggestion: 'Use theme.spacing(n) instead',
      });
    }

    // Detect hardcoded borderRadius
    const borderRadiusMatch = line.match(/borderRadius:\s*\d+(?!.*theme)/);
    if (borderRadiusMatch) {
      violations.push({
        line: lineNum,
        violation: `Hardcoded borderRadius: ${borderRadiusMatch[0]}`,
        suggestion: 'Use (theme.vars || theme).shape.borderRadius',
      });
    }
  });

  return violations.map(v => ({ file: filePath, ...v }));
}

async function scanComponentOverrides(baseDir: string): Promise<ScanResult> {
  const overridesDir = path.join(baseDir, 'componentOverrides');
  const files = fs.readdirSync(overridesDir)
    .filter(f => f.endsWith('.ts') || f.endsWith('.js'))
    .filter(f => f !== 'index.ts');

  const tokenToComponents = new Map<string, TokenUsage>();
  const componentToTokens = new Map<string, ComponentUsage>();
  const hardcodedViolations: ScanResult['hardcodedViolations'] = [];

  for (const file of files) {
    const filePath = path.join(overridesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const usage = scanFile(filePath, content);
    componentToTokens.set(usage.component, usage);

    // Build reverse map
    const allTokens = [
      ...usage.tokens.palette,
      ...usage.tokens.colorGuide.map(t => `colorGuide.${t}`),
      ...usage.tokens.shape,
      ...usage.tokens.shadows,
      ...usage.tokens.typography,
      ...usage.tokens.transitions,
    ];

    allTokens.forEach(token => {
      if (!tokenToComponents.has(token)) {
        const category = token.startsWith('palette') ? 'palette' :
                        token.startsWith('colorGuide') ? 'colorGuide' :
                        token.startsWith('shape') ? 'shape' :
                        token.startsWith('shadows') ? 'shadows' :
                        token.startsWith('typography') ? 'typography' :
                        'transitions';
        tokenToComponents.set(token, {
          token,
          category: category as TokenUsage['category'],
          components: [],
          files: [],
          lineNumbers: [],
        });
      }
      const tokenUsage = tokenToComponents.get(token)!;
      tokenUsage.components.push(usage.component);
      tokenUsage.files.push(filePath);
    });

    // Detect violations
    const violations = detectHardcodedViolations(filePath, content);
    hardcodedViolations.push(...violations);
  }

  return {
    tokenToComponents,
    componentToTokens,
    unusedTokens: { palette: [], colorGuide: [] }, // Computed separately
    hardcodedViolations,
  };
}

// Export for CLI usage
export { scanComponentOverrides, ScanResult };
```

### 1.3 CLI Runner Script

```typescript
#!/usr/bin/env ts-node
/**
 * token-scanner.ts - CLI for theme token analysis
 *
 * Usage:
 *   npx ts-node scripts/token-scanner.ts [command]
 *
 * Commands:
 *   scan          - Full token scan with report
 *   unused        - List unused tokens only
 *   violations    - List hardcoded value violations
 *   component X   - Show tokens used by component X
 *   token X       - Show components using token X
 */

import { scanComponentOverrides } from './scanner';
import { loadColorGuide, loadPaletteDefinitions } from './palette-loader';

async function main() {
  const command = process.argv[2] || 'scan';
  const arg = process.argv[3];

  console.log('Theme Token Scanner v1.0');
  console.log('========================\n');

  const result = await scanComponentOverrides(process.cwd());

  switch (command) {
    case 'scan':
      generateFullReport(result);
      break;
    case 'unused':
      reportUnusedTokens(result);
      break;
    case 'violations':
      reportViolations(result);
      break;
    case 'component':
      reportComponentTokens(result, arg);
      break;
    case 'token':
      reportTokenUsage(result, arg);
      break;
    default:
      console.log('Unknown command:', command);
  }
}

function generateFullReport(result: ScanResult) {
  console.log('## Token Usage Summary\n');
  console.log(`Total unique tokens detected: ${result.tokenToComponents.size}`);
  console.log(`Total components scanned: ${result.componentToTokens.size}`);
  console.log(`Hardcoded violations found: ${result.hardcodedViolations.length}\n`);

  console.log('### Tokens by Category\n');
  const categories = ['palette', 'colorGuide', 'shape', 'shadows', 'typography', 'transitions'];
  categories.forEach(cat => {
    const tokens = Array.from(result.tokenToComponents.values())
      .filter(t => t.category === cat);
    console.log(`- ${cat}: ${tokens.length} tokens`);
  });

  console.log('\n### Most Used Tokens\n');
  const sorted = Array.from(result.tokenToComponents.values())
    .sort((a, b) => b.components.length - a.components.length)
    .slice(0, 15);
  sorted.forEach(t => {
    console.log(`- ${t.token}: ${t.components.length} components`);
  });
}

main().catch(console.error);
```

---

## 2. Dead Code Detection Approach

### 2.1 Methodology

Dead code in the theme context consists of:
1. **Unused colorGuide tokens**: Defined in `colorGuide.ts` but never referenced
2. **Unused palette values**: Defined in `palette.ts` but never consumed
3. **Placeholder values**: Values using `color.XXXX` (known placeholder)

### 2.2 Detection Algorithm

```typescript
interface DeadCodeReport {
  unusedColorGuideTokens: {
    token: string;
    definedAt: string; // File:line
  }[];
  unusedPaletteTokens: {
    token: string;
    definedAt: string;
  }[];
  placeholderValues: {
    location: string;
    value: string;
    suggestion: string;
  }[];
}

async function detectDeadCode(baseDir: string): Promise<DeadCodeReport> {
  // 1. Parse colorGuide.ts to extract all defined tokens
  const colorGuideContent = fs.readFileSync(
    path.join(baseDir, 'colorGuide.ts'),
    'utf-8'
  );
  const definedColorTokens = extractColorGuideDefinitions(colorGuideContent);

  // 2. Parse palette.ts to extract all palette keys
  const paletteContent = fs.readFileSync(
    path.join(baseDir, 'palette.ts'),
    'utf-8'
  );
  const definedPaletteTokens = extractPaletteDefinitions(paletteContent);

  // 3. Scan all override files for usage
  const scanResult = await scanComponentOverrides(baseDir);

  // 4. Also scan palette.ts itself (colorGuide usage)
  const paletteUsage = scanFile(path.join(baseDir, 'palette.ts'), paletteContent);

  // 5. Compute unused tokens
  const usedColorTokens = new Set<string>();
  scanResult.componentToTokens.forEach(comp => {
    comp.tokens.colorGuide.forEach(t => usedColorTokens.add(t));
  });
  paletteUsage.tokens.colorGuide.forEach(t => usedColorTokens.add(t));

  const unusedColorGuideTokens = definedColorTokens
    .filter(t => !usedColorTokens.has(t.token))
    .map(t => ({ token: t.token, definedAt: `colorGuide.ts:${t.line}` }));

  // 6. Find placeholder values
  const placeholderMatches = paletteContent.matchAll(/color\.XXXX/g);
  const placeholderValues: DeadCodeReport['placeholderValues'] = [];
  // ... extract line context

  return {
    unusedColorGuideTokens,
    unusedPaletteTokens: [], // Similar logic for palette
    placeholderValues,
  };
}

function extractColorGuideDefinitions(content: string) {
  const definitions: { token: string; line: number }[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Match: tokenName: '#...'
    const match = line.match(/^\s*['"]?([a-zA-Z_][\w-]*)['"]?\s*:\s*['"]#/);
    if (match) {
      definitions.push({ token: match[1], line: index + 1 });
    }
  });

  return definitions;
}
```

### 2.3 Known Dead Code in Current Codebase

Based on analysis:

| Token | Status | Recommendation |
|-------|--------|----------------|
| `color.XXXX` | Placeholder | Replace with actual colors |
| `SolarizedDark.*` | Unused object | Consider removing or implementing |
| `SolarizedLight.*` | Unused object | Consider removing or implementing |
| `dsgn-*` tokens | Legacy | Audit for removal |
| `brand-*` tokens | Potentially unused | Verify with design team |

---

## 3. Theme Variant Completeness Checklist

### 3.1 Per-Component Validation Template

```markdown
## Component: [ComponentName]
**File**: componentOverrides/[component].ts

### Token Coverage Checklist

#### Palette Tokens
- [ ] `palette.primary.main` - Primary actions/states
- [ ] `palette.primary.light` - Hover/light states
- [ ] `palette.primary.dark` - Active/dark states
- [ ] `palette.primary.contrastText` - Text on primary bg
- [ ] `palette.secondary.*` - Secondary variant (if applicable)
- [ ] `palette.error.main` - Error states
- [ ] `palette.warning.main` - Warning states
- [ ] `palette.success.main` - Success states
- [ ] `palette.info.main` - Info states
- [ ] `palette.text.primary` - Primary text
- [ ] `palette.text.secondary` - Secondary text
- [ ] `palette.text.disabled` - Disabled text
- [ ] `palette.action.hover` - Hover background
- [ ] `palette.action.selected` - Selected background
- [ ] `palette.action.disabled` - Disabled state
- [ ] `palette.action.disabledBackground` - Disabled bg
- [ ] `palette.divider` - Borders/separators
- [ ] `palette.background.paper` - Surface background
- [ ] `palette.background.default` - Page background

#### Shape Tokens
- [ ] `shape.borderRadius` - Component corners

#### Shadow Tokens
- [ ] `shadows[N]` - Elevation appropriate for component

#### Typography Tokens
- [ ] Typography variant applied (body2, button, etc.)
- [ ] `typography.fontWeightBold/Medium` - Weight variations

#### State Coverage
- [ ] Default state styled
- [ ] Hover state (`:hover`)
- [ ] Focus state (`.Mui-focusVisible`)
- [ ] Active state (`:active`)
- [ ] Disabled state (`.Mui-disabled`)
- [ ] Selected state (`.Mui-selected`) if applicable
- [ ] Error state (`.Mui-error`) if applicable

#### MUI v7 Compliance
- [ ] Uses `(theme.vars || theme)` pattern
- [ ] Uses callback pattern `root: ({ theme }) => ({...})`
- [ ] No hardcoded hex colors
- [ ] No hardcoded pixel spacing
- [ ] Uses `theme.spacing()` for all spacing
- [ ] Uses `theme.transitions.create()` for transitions

### Validation Commands
```bash
# Run scanner on this component
npx ts-node scripts/token-scanner.ts component [componentName]

# Check for violations
npx ts-node scripts/token-scanner.ts violations
```
```

### 3.2 Automated Completeness Score

```typescript
interface CompletenessScore {
  component: string;
  score: number; // 0-100
  breakdown: {
    paletteUsage: number;
    statesCovered: number;
    muiCompliance: number;
    noViolations: number;
  };
  missingStates: string[];
  suggestions: string[];
}

function calculateCompleteness(usage: ComponentUsage, violations: any[]): CompletenessScore {
  // Essential palette tokens that most components should use
  const essentialPalette = [
    'palette.action.hover',
    'palette.action.disabled',
    'palette.text.primary',
  ];

  // Essential states
  const essentialStates = [
    '.Mui-disabled',
    ':hover',
    '.Mui-focusVisible',
  ];

  const fileContent = fs.readFileSync(usage.file, 'utf-8');

  // Calculate palette coverage
  const paletteScore = essentialPalette.filter(p =>
    usage.tokens.palette.some(t => t.includes(p.replace('palette.', '')))
  ).length / essentialPalette.length * 100;

  // Calculate state coverage
  const statesScore = essentialStates.filter(s =>
    fileContent.includes(s)
  ).length / essentialStates.length * 100;

  // MUI compliance check
  const hasThemeVarsPattern = fileContent.includes('theme.vars || theme');
  const hasCallbackPattern = fileContent.includes('({ theme })');
  const complianceScore = (hasThemeVarsPattern ? 50 : 0) + (hasCallbackPattern ? 50 : 0);

  // Violations penalty
  const componentViolations = violations.filter(v => v.file === usage.file);
  const violationsScore = Math.max(0, 100 - (componentViolations.length * 10));

  const totalScore = (paletteScore * 0.3) + (statesScore * 0.3) +
                    (complianceScore * 0.25) + (violationsScore * 0.15);

  return {
    component: usage.component,
    score: Math.round(totalScore),
    breakdown: {
      paletteUsage: Math.round(paletteScore),
      statesCovered: Math.round(statesScore),
      muiCompliance: complianceScore,
      noViolations: violationsScore,
    },
    missingStates: essentialStates.filter(s => !fileContent.includes(s)),
    suggestions: generateSuggestions(usage, fileContent),
  };
}
```

---

## 4. Phase 0b Agentic Instruction Format

### 4.1 Enhanced Instruction Template

```markdown
---
type: agentic-task
version: 2.0
component: {ComponentName}
priority: {high|medium|low}
estimated_effort: {small|medium|large}
---

# Task: Theme-Agnostic Override for {ComponentName}

## Pre-flight Checklist

Before starting, verify:
- [ ] Demo app is running (`cd demo && pnpm dev`)
- [ ] Scanner baseline captured: `npx ts-node scripts/token-scanner.ts component {component}`
- [ ] Initial violation count: `npx ts-node scripts/token-scanner.ts violations | grep {component}`

## Research Phase

### Step 1: Read Master Document Section
Read the component section in `docs/procedural/PROC-mui-component-theme-mapping.md`:
- Consumed Tokens list
- MUI Source link
- Existing Override Object (if any)

### Step 2: Analyze MUI v7 Source
Open: {MUI_SOURCE_URL}

Look for:
1. `styled()` calls and their style definitions
2. `ownerState` destructuring patterns
3. Palette token references
4. CSS variable usage patterns

### Step 3: Capture Baseline
```bash
# Take screenshot of component in current state
# Save to: docs/screenshots/theme-comparison/{component}-before.png
```

## Implementation Phase

### Step 4: Edit Override File
File: `componentOverrides/{component}.ts`

Required pattern:
```typescript
const Mui{Component}: Components<Theme>['Mui{Component}'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      // Use (theme.vars || theme) for all palette/shape/shadow access
      backgroundColor: (theme.vars || theme).palette.background.paper,
      borderRadius: (theme.vars || theme).shape.borderRadius,

      // States
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
      },
    }),
  },
};
```

### Step 5: Validate Implementation

```bash
# Run type check
cd demo && pnpm tsc --noEmit

# Run scanner
npx ts-node scripts/token-scanner.ts component {component}

# Check violations
npx ts-node scripts/token-scanner.ts violations | grep {component}
```

Expected:
- [ ] TypeScript compiles without errors
- [ ] No new violations introduced
- [ ] Token usage covers essential states

### Step 6: Capture After Screenshot
```bash
# Save to: docs/screenshots/theme-comparison/{component}-after.png
```

## Documentation Phase

### Step 7: Update Master Document
Update the component section in `PROC-mui-component-theme-mapping.md`:
- Set Status to "Complete" or "In Progress"
- Update Override Object code block
- Note any discoveries in Blackboard section

### Step 8: Commit Changes
```bash
git add componentOverrides/{component}.ts
git add docs/procedural/PROC-mui-component-theme-mapping.md
git commit -m "refactor({component}): make theme-agnostic with MUI v7 compliance"
```

## Validation Gate

Final checklist:
- [ ] No hardcoded hex colors (except transparent)
- [ ] No hardcoded pixel spacing
- [ ] Uses (theme.vars || theme) pattern
- [ ] All interactive states covered
- [ ] TypeScript clean
- [ ] Scanner shows expected token consumption
- [ ] Visual comparison confirms theme application
```

### 4.2 Batch Processing Template

For automated/batch processing of multiple components:

```yaml
# batch-task.yaml
batch_id: theme-agnostic-migration-001
components:
  - name: accordion
    priority: medium
    dependencies: []
  - name: alert
    priority: high
    dependencies: []
  - name: button
    priority: high
    dependencies: []
  # ... more components

validation_rules:
  required_patterns:
    - "(theme.vars || theme)"
    - "({ theme })"
  forbidden_patterns:
    - "/#[0-9A-Fa-f]{6}/"  # Hardcoded colors
    - "/padding:\\s*\\d+px/"  # Hardcoded px

execution:
  parallel: false
  stop_on_failure: true
  report_path: ./reports/batch-{batch_id}-{timestamp}.json
```

---

## 5. Integration with CI/CD

### 5.1 Pre-commit Hook

```bash
#!/bin/bash
# .husky/pre-commit

# Run token scanner on changed override files
CHANGED_OVERRIDES=$(git diff --cached --name-only | grep "componentOverrides/")

if [ -n "$CHANGED_OVERRIDES" ]; then
  echo "Scanning theme token usage..."
  npx ts-node scripts/token-scanner.ts violations

  if [ $? -ne 0 ]; then
    echo "Theme token violations detected. Please fix before committing."
    exit 1
  fi
fi
```

### 5.2 GitHub Actions Workflow

```yaml
# .github/workflows/theme-validation.yml
name: Theme Token Validation

on:
  pull_request:
    paths:
      - 'componentOverrides/**'
      - 'colorGuide.ts'
      - 'palette.ts'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: pnpm install

      - name: Run Token Scanner
        run: |
          npx ts-node scripts/token-scanner.ts scan > token-report.md
          npx ts-node scripts/token-scanner.ts violations

      - name: Check for violations
        run: |
          VIOLATIONS=$(npx ts-node scripts/token-scanner.ts violations --count)
          if [ "$VIOLATIONS" -gt 0 ]; then
            echo "::error::Found $VIOLATIONS theme token violations"
            exit 1
          fi

      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: token-report
          path: token-report.md
```

---

## 6. Quick Reference

### Scanner Commands

| Command | Description |
|---------|-------------|
| `scan` | Full report with token usage summary |
| `unused` | List unused colorGuide/palette tokens |
| `violations` | List hardcoded value violations |
| `component X` | Show tokens used by component X |
| `token X` | Show components using token X |
| `completeness` | Generate completeness scores |

### Token Categories Tracked

1. **palette** - MUI palette colors
2. **colorGuide** - Custom color tokens
3. **shape** - borderRadius, etc.
4. **shadows** - Elevation system
5. **typography** - Font presets
6. **transitions** - Animation timing
7. **spacing** - Spacing function calls

### Violation Types Detected

1. Hardcoded hex colors
2. Hardcoded rgba values
3. Hardcoded pixel spacing
4. Hardcoded borderRadius
5. Missing `theme.vars ||` pattern

---

## Appendix: File Structure

```
customTheme/
├── scripts/
│   ├── token-scanner.ts        # Main scanner CLI
│   ├── scanner.ts              # Core scanning logic
│   ├── palette-loader.ts       # Palette/colorGuide parsing
│   └── report-generator.ts     # Output formatting
├── docs/
│   ├── tooling/
│   │   └── TOOL-theme-token-scanner.md  # This document
│   └── procedural/
│       └── PROC-mui-component-theme-mapping.md  # Master map
└── componentOverrides/
    └── *.ts/*.js               # Files to scan
```
