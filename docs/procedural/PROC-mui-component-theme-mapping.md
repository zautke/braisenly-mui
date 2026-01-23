# MUI v7 Component Theme Mapping - Master Document

## Phase 0a: Research Process Discovery

**Goal**: Discover and document the repeatable research process for styling any MUI component.

### Research Sources (Priority Order)
1. **MUI v7 GitHub Repository**: Search for component theme override examples.
   - *Requirement*: Include specific line numbers in URLs.
2. **MUI API Documentation**: Official documentation for the component.
   - *Requirement*: Link to exact sections (CSS API, Slots).
3. **MUI Component Demo Page**: Interactive examples.
4. **Context7 Library Search**: For usage patterns.
5. **Web Search**: For community examples and edge cases.

### Evidence Collection Requirements
- All findings must be annotated with source attribution.
- GitHub code URLs must be precise.
- "Before" and "After" screenshots are mandatory for validation.

---

## Phase 0b: Agentic Instruction Prompt

[PLACEHOLDER - Write this ONLY after validating the research process works across multiple components]

### Required Elements for Phase 0b Prompt
- **Mandatory Blackboard Reading**: Start every session by reading the Blackboard.
- **Research Methodology**: Web search, Context7, GitHub code search, MUI docs.
- **Screenshot-based Validation**: Navigate -> Screenshot -> Override -> Screenshot -> Compare -> Iterate.
- **Mandatory Blackboard Contribution**: End every session by adding insights.
- **Success Criteria**: Component matches Solarized theme's level of comprehensive color application.

---

## Blackboard: Shared Agent Learning

### Purpose
Every agent working on a component iteration MUST:
1. **READ** this entire section before starting.
2. **WRITE** all useful discoveries here after completing their component.
3. Include specific gotchas, patterns, and insights.

### Entries
[Agents append here chronologically]

**[2026-01-22] Initial Setup**:
- `themeStub.ts` is commonly used for imports in override files.
- `theme.spacing.unit` vs `theme.spacing()`: Be consistent. `theme.spacing()` is preferred in v5+.
- Class names like `.Mui-disabled`, `.Mui-focused` are standard.
- Solarized theme uses `theme.palette.colorGuide[...]` in some places, but standard palette colors in others. Terracotta should map to its own tokens.

**[2026-01-23] MUI v7 GitHub Source Analysis**:
- **CRITICAL**: MUI v7 uses `(theme.vars || theme)` pattern everywhere for CSS variables support. This is mandatory.
- **CRITICAL**: All styled components use `memoTheme(({ theme }) => ({ ... }))` wrapper for performance.
- Button uses CSS custom properties (`--variant-textColor`, `--variant-containedBg`, etc.) to separate color definition from usage - enables easier theme switching.
- `createSimplePaletteValueFilter()` from `@mui/material/utils` dynamically iterates all valid palette colors.
- NO hardcoded colors in MUI source - all reference palette tokens, even grey uses `theme.palette.grey[N]`.
- Action palette (`palette.action.*`) is used for ALL interactive states: disabled, hover, focus, selected.
- Channel-based alpha: Uses `palette[color].mainChannel` with CSS `rgba()` for transparent colors.
- MUI is deprecating combined classes like `containedPrimary` - use composable `contained` + `colorPrimary` instead.
- Card has only ONE slot (`root`) - it extends Paper which has the actual styling.
- TextField is a wrapper - actual styling is in OutlinedInput/FilledInput/Input components.
- Select is also a wrapper - uses styled variants of input components internally.

**[2026-01-23] Hardcoded Value Migration**:
- **Spacing**: Replace `px` strings with `theme.spacing(n)`.
  - `margin: 8` -> `margin: theme.spacing(1)`
  - `padding: '7px 0'` -> `padding: theme.spacing(0.875, 0)`
- **Shape**: Replace `borderRadius: 3` or `4` with `theme.shape.borderRadius`.
- **Transitions**: Replace `transition: 'all 0.2s'` with `theme.transitions.create(...)`.
- **Theme Variants Architecture**:
  - `mui/themeVariants.ts` created to handle 'Glass', 'Neuromancer', 'Cardboard'.
  - Uses module augmentation to add `themeVariant` to `Theme` interface.
  - Implements a factory `applyThemeVariant(theme, variant)` to inject overrides.

---

## Component Mapping Sections

### Accordion
**Status**: Not Started

#### References
[Annotated links with descriptions]

#### Override Object
```typescript
// [Code block with inline comments]
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Alert
**Status**: Research Complete

#### References
- **MUI API**: [Alert API](https://mui.com/material-ui/api/alert/)
- **MUI Source**: [Alert.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Alert/Alert.js)
- **Local Implementation**: `componentOverrides/alert.ts`

#### Override Object
```typescript
const MuiAlert = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius, // Was hardcoded 4
      alignItems: 'center',
      ...theme.typography.body2, // Replaces 'regular'
    }),
    // Standard variants - mapping light/dark palette channels
    standardInfo: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.info.light,
      color: (theme.vars || theme).palette.info.dark,
    }),
    standardSuccess: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.success.light,
      color: (theme.vars || theme).palette.success.dark,
    }),
    standardWarning: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.warning.light,
      color: (theme.vars || theme).palette.warning.dark,
    }),
    standardError: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.error.light,
      color: (theme.vars || theme).palette.error.dark,
    }),
    icon: ({ theme }) => ({
      opacity: 0.9,
      padding: theme.spacing(0.875, 0), // Was '7px 0'
    }),
    message: ({ theme }) => ({
      padding: theme.spacing(1, 0), // Was '8px 0'
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Autocomplete
**Status**: Research Complete

#### References
- **MUI API**: [Autocomplete API](https://mui.com/material-ui/api/autocomplete/)
- **MUI Source**: [Autocomplete.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Autocomplete/Autocomplete.js)
- **Local Implementation**: `componentOverrides/autocomplete.ts`

#### Override Object
```typescript
const MuiAutocomplete = {
  styleOverrides: {
    paper: ({ theme }) => ({
      // ...theme.zDepth.for('select'), // Needs migration to shadows
      boxShadow: (theme.vars || theme).shadows[8],
      borderRadius: (theme.vars || theme).shape.borderRadius, // Was 3
      marginTop: theme.spacing(0.5), // Was 4 (px) -> 0.5 units (4px)
    }),
    listbox: ({ theme }) => ({
      padding: 0,
      '& .MuiAutocomplete-option': {
        ...theme.typography.body2,
        padding: theme.spacing(1, 1.5), // Was '8px 12px'
        '&[aria-selected="true"]': {
          backgroundColor: (theme.vars || theme).palette.action.selected,
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&.Mui-focused': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
      },
    }),
    tag: ({ theme }) => ({
      margin: theme.spacing(0.375), // Was 3
      maxWidth: 'calc(100% - 6px)',
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Button
**Status**: In Progress

#### References
- **MUI API**: [Button API](https://mui.com/material-ui/api/button/) - Detailed props and CSS classes.
- **MUI Source**: [Button.tsx](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Button/Button.tsx) - Source code for slot verification.
- **Local Implementation**: `componentOverrides/button.js`

#### Override Object
```typescript
const MuiButton = {
  styleOverrides: {
    root: {
      // Base styles for all variants
      // ...theme.typography.button,
      padding: "4px 12px 6px 12px",
      minHeight: 0, 
      textAlign: "center",
      textTransform: "uppercase",
      borderRadius: 3,
      border: 0,
      minWidth: 0,

      // Text Variant Specifics (legacy selector)
      "&.MuiButton-text:not(.MuiButton-contained):not(.MuiButton-outlined)": {
        color: theme.palette.colorGuide["blue-base"], // Text color
        backgroundColor: "transparent",
        "&:active": {
          color: theme.palette.colorGuide["blue-pressed"],
          backgroundColor: "transparent",
        },
        "&:hover:not(:active)": {
          color: theme.palette.colorGuide["blue-hover"],
          backgroundColor: "transparent",
        },
        "&.Mui-focusVisible": {
          color: theme.palette.colorGuide["blue-hover"],
          backgroundColor: "transparent",
        },
        "&.Mui-disabled": {
          color: theme.palette.colorGuide["blue-disabled"],
        },
      },
    },

    contained: {
      backgroundColor: theme.palette.colorGuide["blue-base"], // Background
      boxShadow: "0 1px 2px 0 rgba(34, 54, 70, 0.1)",
      "&:active": {
        boxShadow: "none",
        backgroundColor: theme.palette.colorGuide["blue-pressed"] + "!important",
      },
      "&:hover": {
        backgroundColor: theme.palette.colorGuide["blue-hover"],
      },
      "&.Mui-focusVisible": {
        backgroundColor: theme.palette.colorGuide["blue-hover"],
        border: `solid 1px ${theme.palette.colorGuide["blue-pressed"]}`,
      },
      "&.Mui-disabled": {
        backgroundColor: theme.palette.colorGuide["blue-disabled"],
      },
    },

    outlined: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.colorGuide["ink-base"], // Text color
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.colorGuide["grey-04"]}`, // Border
      "&:hover": {
        border: `1px solid ${theme.palette.colorGuide["grey-05"]}`,
        backgroundColor: "limegreen", // Note: Odd color in original
      },
      "&.Mui-focusVisible": {
        border: `1px solid ${theme.palette.colorGuide["grey-05"]}`,
        backgroundColor: "transparent",
      },
      "&:active": {
        border: `1px solid ${theme.palette.colorGuide["grey-04"]}`,
        backgroundColor: theme.palette.colorGuide["grey-03"],
      },
      "&.Mui-disabled": {
        border: `1px solid ${theme.palette.colorGuide["grey-03"]}`,
        color: theme.palette.action.disabled,
        backgroundColor: "transparent",
      },
    },
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Card
**Status**: Research Complete

#### References
- **MUI API**: [Card API](https://mui.com/material-ui/api/card/)
- **MUI Source**: [Card.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Card/Card.js) - Minimal styling, extends Paper.
- **Local Implementation**: `componentOverrides/card.js`

#### Override Object
```typescript
const MuiCard = {
  styleOverrides: {
    root: ({ theme }) => ({
      // Standardize border color using theme tokens
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      
      // Ensure background uses the correct paper channel
      backgroundColor: (theme.vars || theme).palette.background.paper,
      
      // Use standard shadows
      boxShadow: (theme.vars || theme).shadows[2],
      
      // Interactive lift effect on hover
      transition: theme.transitions.create(['box-shadow', 'transform'], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        boxShadow: (theme.vars || theme).shadows[4], // Increased elevation
        transform: 'translateY(-2px)',
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Checkbox
**Status**: Research Complete

#### References
- **MUI API**: [Checkbox API](https://mui.com/material-ui/api/checkbox/)
- **MUI Source**: [Checkbox.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Checkbox/Checkbox.js)
- **Local Implementation**: `componentOverrides/checkbox.js`

#### Override Object
```typescript
const MuiCheckbox = {
  styleOverrides: {
    root: ({ theme }) => ({
      // Default state: text.secondary (standard grey)
      color: (theme.vars || theme).palette.text.secondary,
      
      // Remove custom background overrides unless specific variant requires it
      backgroundColor: 'transparent',
      
      transition: theme.transitions.create(['color', 'transform'], {
        duration: theme.transitions.duration.shortest,
      }),

      // Hover state using action palette
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
        // Reset color to primary on hover if desired, or keep inherited
      },

      // Checked state - mapped to Primary
      '&.Mui-checked': {
        color: (theme.vars || theme).palette.primary.main,
        
        // Internal SVG animation hook
        '& svg': {
           // Animation definitions
        }
      },

      // Disabled state - use action.disabled
      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
      }
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Chip
**Status**: Research Complete

#### References
- **MUI API**: [Chip API](https://mui.com/material-ui/api/chip/)
- **MUI Source**: [Chip.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Chip/Chip.js)
- **Local Implementation**: `componentOverrides/chip.js`

#### Override Object
```typescript
const MuiChip = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius, // Was 3
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundColor: (theme.vars || theme).palette.background.paper, // Was common.white
      height: 'auto',
      padding: 0,
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'border-color', 'transform'],
        { duration: 200 }
      ),
      '&:active': {
        transform: 'scale(0.98)',
      },
    }),
    label: ({ theme }) => ({
      padding: theme.spacing(0.25, 2, 0.75, 2), // Converted from calc/px
    }),
    deleteIcon: ({ theme }) => ({
      color: (theme.vars || theme).palette.action.active,
      transition: theme.transitions.create('color', { duration: 200 }),
      '&:hover': {
        color: (theme.vars || theme).palette.error.main,
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Switch
**Status**: Research Complete

#### References
- **MUI API**: [Switch API](https://mui.com/material-ui/api/switch/)
- **MUI Source**: [Switch.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Switch/Switch.js#L40-L140)
- **Local Implementation**: `componentOverrides/switch.js`

#### Override Object
```typescript
const MuiSwitch = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: 42,
      height: 26,
      padding: 0,
      margin: 8,
    }),
    switchBase: ({ theme }) => ({
      padding: 1,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: (theme.vars || theme).palette.common.white, // Thumb is white
        
        '& + .MuiSwitch-track': {
          // iOS Green or Theme Primary
          backgroundColor: (theme.vars || theme).palette.success.main, 
          opacity: 1,
          border: 'none',
        },
      },
      '&.Mui-focusVisible': {
        '& .MuiSwitch-thumb': {
          color: (theme.vars || theme).palette.success.main,
          border: '6px solid #fff',
        },
      },
    }),
    thumb: ({ theme }) => ({
      width: 24,
      height: 24,
      boxShadow: (theme.vars || theme).shadows[1],
    }),
    track: ({ theme }) => ({
      borderRadius: 26 / 2,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundColor: (theme.vars || theme).palette.grey[400], // Default off
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'], {
        duration: 500,
      }),
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

[... Note: Other components will be added as agents iterate ...]
