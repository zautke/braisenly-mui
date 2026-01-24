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

#### Consumed Tokens
`palette.divider`, `palette.action.disabled`, `palette.action.disabledBackground`, `shape.borderRadius`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`

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

#### Consumed Tokens
`palette.mode`, `palette.getContrastText`, `typography.fontWeightMedium`, `lighten`

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

#### Consumed Tokens
`palette.primary.main`, `palette.text.secondary`, `palette.background.paper`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.selected`, `palette.action.selectedOpacity`, `palette.action.disabled`, `palette.action.disabledOpacity`, `palette.action.focus`, `palette.action.focusOpacity`, `zIndex.modal`, `alpha`

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

#### Consumed Tokens
`palette.mode`, `palette.grey.300`, `palette.grey.700`, `palette.grey.800`, `palette.grey.A100`, `palette.text.primary`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.disabled`, `palette.action.disabledBackground`, `shape.borderRadius`, `shadows`, `typography.pxToRem`, `transitions.create`, `transitions.duration.short`, `alpha`

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

#### Consumed Tokens
`palette.text.secondary`, `palette.action.active`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.disabled`, `alpha`

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

#### Consumed Tokens
`palette.mode`, `palette.primary.dark`, `palette.primary.contrastText`, `palette.secondary.dark`, `palette.secondary.contrastText`, `palette.grey.300`, `palette.grey.400`, `palette.grey.700`, `palette.text.primary`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.selected`, `palette.action.selectedOpacity`, `palette.action.disabled`, `palette.action.disabledOpacity`, `palette.action.focus`, `palette.action.focusOpacity`, `shadows`, `typography.pxToRem`, `typography.fontFamily`, `transitions.create`, `alpha`

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

#### Consumed Tokens
`palette.mode`, `palette.common.black`, `palette.common.white`, `palette.grey.100`, `palette.grey.300`, `palette.grey.600`, `palette.action.active`, `palette.action.hover`, `palette.action.hoverOpacity`, `shadows`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`, `alpha`, `lighten`

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

### CssBaseline
**Status**: Research Complete

#### Consumed Tokens
`palette.mode`, `palette.common.white`, `palette.text.primary`, `palette.background.default`, `typography.fontWeightBold`

#### References
- **MUI API**: [CssBaseline API](https://mui.com/material-ui/api/css-baseline/)
- **MUI Source**: [CssBaseline.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/CssBaseline/CssBaseline.js)
- **Local Implementation**: `componentOverrides/cssBaseLine.ts`

#### Override Object
```typescript
const MuiCssBaseline = {
  styleOverrides: `
    @font-face {
      font-family: 'PalmBeach';
      src: url('cormorant-regular.ttf') format('truetype');
    }
  `,
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### DataGrid
**Status**: Research Complete

#### References
- **MUI X API**: [DataGrid API](https://mui.com/x/api/data-grid/data-grid/)
- **Source**: [DataGrid Source](https://github.com/mui/mui-x/tree/master/packages/grid/x-data-grid/src)
- **Local Implementation**: `componentOverrides/dataGrid.ts`

#### Override Object
```typescript
const MuiDataGrid = {
  styleOverrides: {
    root: ({ theme }) => ({
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderRadius: (theme.vars || theme).shape.borderRadius,
      ...theme.typography.body2,
      
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: (theme.vars || theme).palette.action.hover, // Was grey-01
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: theme.typography.fontWeightBold,
        color: (theme.vars || theme).palette.text.primary,
      },
      '& .MuiDataGrid-row': {
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        '&.Mui-selected': {
          backgroundColor: (theme.vars || theme).palette.action.selected,
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.selected,
          },
        },
      },
      '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`, // Was grey-02
      },
      '& .MuiDataGrid-footerContainer': {
        borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Dialog
**Status**: Research Complete

#### Consumed Tokens
`transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`

#### References
- **MUI API**: [Dialog API](https://mui.com/material-ui/api/dialog/)
- **MUI Source**: [Dialog.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Dialog/Dialog.js)
- **Local Implementation**: `componentOverrides/dialog.js`

#### Override Object
```typescript
const MuiDialog = {
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: (theme.vars || theme).shadows[24], // Modal elevation
      borderRadius: (theme.vars || theme).shape.borderRadius,
      
      // Entrance animation
      animation: 'mui-dialog-enter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  },
};

const MuiDialogTitle = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1.5, 2),
      ...theme.typography.h6,
      lineHeight: 'normal',
      backgroundColor: (theme.vars || theme).palette.primary.main,
      color: (theme.vars || theme).palette.primary.contrastText,
    }),
  },
};

const MuiDialogContent = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3, 2, 2.5, 2),
      '&:first-of-type': {
        paddingTop: theme.spacing(3),
      },
    }),
  },
};

const MuiDialogContentText = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body1,
      color: (theme.vars || theme).palette.text.secondary,
    }),
  },
};

const MuiDialogActions = {
  styleOverrides: {
    root: ({ theme }) => ({
      margin: 0,
      padding: theme.spacing(0, 2, 2, 2),
      gap: theme.spacing(1),
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Divider
**Status**: Research Complete

#### Consumed Tokens
`palette.divider`, `spacing`, `alpha`

#### References
- **MUI API**: [Divider API](https://mui.com/material-ui/api/divider/)
- **MUI Source**: [Divider.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Divider/Divider.js)
- **Local Implementation**: `componentOverrides/divider.ts`

#### Override Object
```typescript
const MuiDivider = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderColor: (theme.vars || theme).palette.divider,
      margin: theme.spacing(2, 0), // Was theme.spacing.unit * 2
    }),
    vertical: ({ theme }) => ({
      margin: theme.spacing(0, 1),
    }),
    light: ({ theme }) => ({
      borderColor: (theme.vars || theme).palette.action.hover, // Mapped from grey-02
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Drawer
**Status**: Research Complete

#### Consumed Tokens
`direction`, `palette.divider`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`, `zIndex.drawer`

#### References
- **MUI API**: [Drawer API](https://mui.com/material-ui/api/drawer/)
- **MUI Source**: [Drawer.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Drawer/Drawer.js)
- **Local Implementation**: `componentOverrides/drawer.js`

#### Override Object
```typescript
const MuiDrawer = {
  styleOverrides: {
    paper: ({ theme }) => ({
      // Gradient background override - consider if this should be 'primary.main' dependent
      backgroundColor: (theme.vars || theme).palette.primary.dark, // fallback
      backgroundImage: `linear-gradient(154deg, ${(theme.vars || theme).palette.primary.dark}, ${(theme.vars || theme).palette.primary.main})`,
      
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.primary.contrastText,

      // Nested List Styling
      '& .MuiListItemButton-root:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
        transition: theme.transitions.create('background-color', { duration: 200 }),
      },
      '& .MuiListSubheader-sticky': {
        paddingLeft: theme.spacing(2),
      },
      '& .MuiListItem-gutters': {
        paddingLeft: theme.spacing(2),
      },
      '& .MuiListItemButton-root': {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(0.75), // ~6px (was 0.6*8?)
      },
      '& .MuiListItemIcon-root': {
        color: 'inherit',
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Input
**Status**: Research Complete

#### Consumed Tokens
`palette.mode`, `palette.error.main`, `palette.text.primary`, `spacing`, `transitions.create`, `transitions.easing.easeOut`, `transitions.duration.shorter`, `transitions.duration.short`, `alpha`

#### References
- **MUI API**: [Input API](https://mui.com/material-ui/api/input/)
- **MUI Source**: [Input.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Input/Input.js)
- **Local Implementation**: `componentOverrides/input.ts`

#### Override Object
```typescript
const MuiInput = {
  styleOverrides: {
    root: ({ theme }) => ({
      border: `1px solid ${(theme.vars || theme).palette.divider}`, // grey-04
      borderRadius: (theme.vars || theme).shape.borderRadius,

      '&.Mui-focused:not(.Mui-disabled):not(.Mui-error)': {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`, // grey-05
      },
      '&:hover:not(.Mui-disabled):not(.Mui-error)': {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`,
      },
      '&.MuiTablePagination-input:hover:not(.Mui-disabled):not(.Mui-error)': {
        border: 'none',
      },
      '&.Mui-focused.MuiTablePagination-input:not(.Mui-disabled):not(.Mui-error)': {
        border: 'none',
      },
    }),
    // ... Input adornment logic
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Link
**Status**: Research Complete

#### Consumed Tokens
`palette.text.primary`, `palette.text.secondary`, `palette.text.disabled`, `alpha`

#### References
- **MUI API**: [Link API](https://mui.com/material-ui/api/link/)
- **MUI Source**: [Link.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Link/Link.js)
- **Local Implementation**: `componentOverrides/link.ts`

#### Override Object
```typescript
const MuiLink = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
      textDecoration: 'none',
      transition: theme.transitions.create(['color', 'text-decoration-color'], {
        duration: 200,
      }),
      cursor: 'pointer',
      
      '&:hover': {
        color: (theme.vars || theme).palette.primary.dark,
        textDecoration: 'underline',
      },
      
      '&.Mui-focusVisible': {
        outline: `2px solid ${(theme.vars || theme).palette.primary.light}`,
        outlineOffset: '2px',
        borderRadius: '2px',
      }
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### List
**Status**: Research Complete

#### References
- **MUI API**: [List API](https://mui.com/material-ui/api/list/)
- **MUI Source**: [List.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/List/List.js)
- **Local Implementation**: `componentOverrides/list.js`

#### Override Object
```typescript
const MuiList = {
  styleOverrides: {
    padding: ({ theme }) => ({
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    }),
  },
};

const MuiListItem = {
  styleOverrides: {
    root: ({ theme }) => ({
      transition: theme.transitions.create('background-color', { duration: 150 }),
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    }),
    gutters: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
      },
    }),
  },
};

const MuiListItemButton = {
  styleOverrides: {
    root: ({ theme }) => ({
      transition: theme.transitions.create('background-color', { duration: 150 }),
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
      paddingTop: theme.spacing(0.75),
      paddingBottom: theme.spacing(0.75),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Menu
**Status**: Research Complete

#### Consumed Tokens
`direction`

#### References
- **MUI API**: [Menu API](https://mui.com/material-ui/api/menu/)
- **MUI Source**: [Menu.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Menu/Menu.js)
- **Local Implementation**: `componentOverrides/menu.js`

#### Override Object
```typescript
const MuiMenu = {
  styleOverrides: {
    paper: ({ theme }) => ({
      padding: 0,
      animation: 'mui-menu-enter 0.2s ease-out',
      transformOrigin: 'top left',
    }),
  },
};

const MuiMenuItem = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
      paddingRight: theme.spacing(1.5),
      paddingLeft: theme.spacing(1.5),
      transition: theme.transitions.create(['background-color', 'color'], { duration: 150 }),
      
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },

      '&.Mui-selected': {
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: (theme.vars || theme).palette.action.selected,
        color: (theme.vars || theme).palette.primary.main,
        
        '&:hover': {
             backgroundColor: (theme.vars || theme).palette.action.selected, // Stay selected
        }
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Pagination
**Status**: Research Complete

#### References
- **MUI API**: [Pagination API](https://mui.com/material-ui/api/pagination/)
- **MUI Source**: [Pagination.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Pagination/Pagination.js)
- **Local Implementation**: `componentOverrides/pagination.ts`

#### Override Object
```typescript
const MuiPagination = {
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiPaginationItem-root': {
        borderRadius: (theme.vars || theme).shape.borderRadius,
        margin: theme.spacing(0, 0.25),
        ...theme.typography.body2,
        
        '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        
        '&.Mui-selected': {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
            
            '&:hover': {
                backgroundColor: (theme.vars || theme).palette.primary.dark,
            }
        }
      }
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Paper
**Status**: Research Complete

#### Consumed Tokens
`palette.mode`, `palette.text.primary`, `palette.divider`, `palette.background.paper`, `shape.borderRadius`, `shadows`, `transitions.create`, `alpha`

#### References
- **MUI API**: [Paper API](https://mui.com/material-ui/api/paper/)
- **MUI Source**: [Paper.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Paper/Paper.js)
- **Local Implementation**: `componentOverrides/paper.js`

#### Override Object
```typescript
const MuiPaper = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
    }),
    rounded: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Popover
**Status**: Research Complete

#### References
- **MUI API**: [Popover API](https://mui.com/material-ui/api/popover/)
- **MUI Source**: [Popover.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Popover/Popover.js)
- **Local Implementation**: `componentOverrides/popover.js`

#### Override Object
```typescript
const MuiPopover = {
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      boxShadow: (theme.vars || theme).shadows[8],
      margin: 0,
      padding: theme.spacing(1.5),
      animation: 'mui-popover-enter 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Progress
**Status**: Research Complete

#### References
- **MUI API**: [CircularProgress API](https://mui.com/material-ui/api/circular-progress/)
- **MUI Source**: [CircularProgress.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/CircularProgress/CircularProgress.js)
- **Local Implementation**: `componentOverrides/progress.ts`

#### Override Object
```typescript
const MuiCircularProgress = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
    }),
  },
};

const MuiLinearProgress = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      height: 6,
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
    }),
    bar: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      backgroundColor: (theme.vars || theme).palette.primary.main,
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Radio
**Status**: Research Complete

#### Consumed Tokens
`palette.text.secondary`, `palette.action.active`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.disabled`, `transitions.create`, `transitions.easing.easeOut`, `transitions.easing.easeIn`, `transitions.duration.shortest`, `transitions.duration.short`, `alpha`

#### References
- **MUI API**: [Radio API](https://mui.com/material-ui/api/radio/)
- **MUI Source**: [Radio.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Radio/Radio.js)
- **Local Implementation**: `componentOverrides/radio.js`

#### Override Object
```typescript
const MuiRadio = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: (theme.vars || theme).palette.text.secondary,
      backgroundColor: 'transparent',
      padding: 9,

      '&:hover': {
        color: (theme.vars || theme).palette.action.hover,
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },

      '&:active': {
        color: (theme.vars || theme).palette.action.selected,
      },

      '& .MuiSvgIcon-root': {
        fontSize: 16,
        transition: theme.transitions.create('transform', { duration: 300 }),
        transform: 'scale(1)',
      },

      '&.Mui-checked': {
        color: (theme.vars || theme).palette.primary.main,
        backgroundColor: 'transparent',

        '& .MuiSvgIcon-root': {
            transform: 'scale(1.2)', 
        },

        '&:hover': {
          color: (theme.vars || theme).palette.primary.dark,
        },
      },

      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Select
**Status**: Research Complete

#### References
- **MUI API**: [Select API](https://mui.com/material-ui/api/select/)
- **MUI Source**: [Select.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Select/Select.js)
- **Local Implementation**: `componentOverrides/select.js`

#### Override Object
```typescript
const MuiSelect = {
  styleOverrides: {
    select: ({ theme }) => ({
      border: 'none',
      backgroundColor: (theme.vars || theme).palette.action.selected, // Was grey-02
      '&:focus': {
        backgroundColor: (theme.vars || theme).palette.action.selected,
      },
      
      '&.Mui-disabled': {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
        color: (theme.vars || theme).palette.text.disabled,
      },
    }),
    icon: ({ theme }) => ({
      color: (theme.vars || theme).palette.text.secondary,
      width: 22,
      height: 'auto',
      right: 7,
      position: 'absolute',
      pointerEvents: 'none',
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Skeleton
**Status**: Research Complete

#### Consumed Tokens
`palette.mode`, `palette.text.primary`, `palette.action.hover`, `shape.borderRadius`, `alpha`

#### References
- **MUI API**: [Skeleton API](https://mui.com/material-ui/api/skeleton/)
- **MUI Source**: [Skeleton.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Skeleton/Skeleton.js)
- **Local Implementation**: `componentOverrides/skeleton.ts`

#### Override Object
```typescript
const MuiSkeleton = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Shimmer enhancement
      '&::after': {
        background: `linear-gradient(90deg, transparent, ${(theme.vars || theme).palette.action.hover}, transparent)`,
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Slider
**Status**: Research Complete

#### Consumed Tokens
`direction`, `transitions.create`, `transitions.easing.easeOut`, `transitions.easing.sharp`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`

#### Consumed Tokens
`direction`, `palette.common.white`, `palette.grey.400`, `palette.grey.600`, `palette.text.primary`, `palette.text.secondary`, `palette.background.paper`, `applyStyles`, `shadows`, `typography.pxToRem`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`, `alpha`, `lighten`

#### References
- **MUI API**: [Slider API](https://mui.com/material-ui/api/slider/)
- **MUI Source**: [Slider.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Slider/Slider.js)
- **Local Implementation**: `componentOverrides/slider.ts`

#### Override Object
```typescript
const MuiSlider = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
      height: 4,
    }),
    thumb: ({ theme }) => ({
      width: 16,
      height: 16,
      backgroundColor: (theme.vars || theme).palette.common.white,
      border: '2px solid currentColor',
      transition: theme.transitions.create(['box-shadow', 'width', 'height'], { duration: 200 }),
      
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${(theme.vars || theme).palette.primary.light}`, // Uses alpha in implementation
        width: 20,
        height: 20,
      },
      '&.Mui-active': {
        boxShadow: `0px 0px 0px 14px ${(theme.vars || theme).palette.primary.light}`,
        width: 22,
        height: 22,
      },
    }),
    rail: ({ theme }) => ({
      color: (theme.vars || theme).palette.action.disabled,
      opacity: 1,
      borderRadius: 2,
    }),
    track: {
      borderRadius: 2,
      border: 'none',
    },
    mark: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.text.disabled,
      height: 8,
      width: 1,
      marginTop: -3,
    }),
    markActive: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.common.white,
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Snackbar
**Status**: Research Complete

#### Consumed Tokens
`direction`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`, `zIndex.snackbar`

#### References
- **MUI API**: [Snackbar API](https://mui.com/material-ui/api/snackbar/)
- **MUI Source**: [Snackbar.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Snackbar/Snackbar.js)
- **Local Implementation**: `componentOverrides/snackbar.js`

#### Override Object
```typescript
const MuiSnackbar = {
  styleOverrides: {
    root: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        borderRadius: (theme.vars || theme).shape.borderRadius,
      },
    }),
  },
};

const MuiSnackbarContent = {
  styleOverrides: {
    root: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        borderRadius: (theme.vars || theme).shape.borderRadius,
      },
      color: (theme.vars || theme).palette.common.white,
      backgroundColor: (theme.vars || theme).palette.text.primary, // Dark/Deep space mapping
      padding: theme.spacing(0, 0, 0, 2),
      boxShadow: (theme.vars || theme).shadows[6],
    }),
    message: ({ theme }) => ({
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.common.white,
      padding: theme.spacing(1.5, 0),
    }),
    action: ({ theme }) => ({
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.common.white,
      height: '100%',
      marginRight: 0,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
      paddingLeft: theme.spacing(1.5),
      padding: theme.spacing(1.375, 1.5),
    })
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Stepper
**Status**: Research Complete

#### Consumed Tokens
`direction`

#### References
- **MUI API**: [Stepper API](https://mui.com/material-ui/api/stepper/)
- **MUI Source**: [Stepper.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Stepper/Stepper.js)
- **Local Implementation**: `componentOverrides/stepper.js`

#### Override Object
```typescript
const MuiStepper = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: '100%',
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      padding: theme.spacing(1.75),
    }),
  },
};

const MuiStepIcon = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontSize: 18,
      transition: theme.transitions.create(['color', 'transform'], { duration: 300 }),
      
      '&.Mui-active': {
        color: (theme.vars || theme).palette.primary.main,
        transform: 'scale(1.2)',
      },
      '&.Mui-completed': {
        color: (theme.vars || theme).palette.primary.main,
      },
    }),
    text: ({ theme }) => ({
      // Font family from theme
      fontFamily: theme.typography.fontFamily,
    }),
  },
};

const MuiStepLabel = {
  styleOverrides: {
    label: ({ theme }) => ({
      ...theme.typography.body2,
      transition: theme.transitions.create(['font-weight', 'color'], { duration: 200 }),

      '&.Mui-completed': {
        fontWeight: theme.typography.fontWeightMedium,
        color: (theme.vars || theme).palette.text.primary,
      },
      '&.Mui-active': {
        fontWeight: theme.typography.fontWeightMedium,
        color: (theme.vars || theme).palette.primary.main,
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### SvgIcon
**Status**: Research Complete

#### References
- **MUI API**: [SvgIcon API](https://mui.com/material-ui/api/svg-icon/)
- **MUI Source**: [SvgIcon.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/SvgIcon/SvgIcon.js)
- **Local Implementation**: `componentOverrides/svg-icon.js`

#### Override Object
```typescript
const MuiSvgIcon = {
  styleOverrides: {
    root: ({ theme }) => ({
      fill: 'currentColor', // Default behavior usually better than action.active globally
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Table
**Status**: Research Complete

#### Consumed Tokens
`palette.primary.main`, `palette.secondary.main`, `palette.text.secondary`, `palette.text.disabled`, `palette.action.disabled`, `palette.action.disabledOpacity`, `spacing`, `typography.pxToRem`

#### Consumed Tokens
`palette.text.secondary`, `spacing`

#### References
- **MUI API**: [Table API](https://mui.com/material-ui/api/table/)
- **MUI Source**: [Table.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Table/Table.js)
- **Local Implementation**: `componentOverrides/table.js`

#### Override Object
```typescript
const MuiTableRow = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.paper,
      transition: theme.transitions.create(['transform', 'background-color'], { duration: 150 }),
      
      '&.Mui-selected': {
        backgroundColor: (theme.vars || theme).palette.action.selected,
        '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.selected,
        }
      },
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
        transform: 'scale(1.002)',
        position: 'relative',
        zIndex: 1,
        boxShadow: (theme.vars || theme).shadows[1],
      },
    }),
    head: {
        '&:hover': {
            backgroundColor: 'inherit',
            transform: 'none',
            boxShadow: 'none',
        }
    }
  }
};

const MuiTableCell = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2, 3), 
      '&:last-child': {
        paddingRight: theme.spacing(3),
      },
    }),
    body: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    head: ({ theme }) => ({
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightBold,
    }),
  }
};

const MuiTableSortLabel = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-active': {
        color: (theme.vars || theme).palette.primary.main,
      },
    }),
  }
};

const MuiTablePagination = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    selectLabel: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    displayedRows: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    select: ({ theme }) => ({
      minWidth: 0,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(3) + '!important', 
    }),
    selectIcon: ({ theme }) => ({
      top: 'calc(50% - 12px)',
      color: (theme.vars || theme).palette.action.active,
      width: 24,
      height: 24,
    }),
    actions: {
      '& .MuiIconButton-root': {
          padding: 8,
          '& svg': {
            width: 20,
            height: 20,
            color: 'inherit',
          }
      }
    },
  }
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Tabs
**Status**: Research Complete

#### Consumed Tokens
`direction`, `palette.primary.main`, `palette.secondary.main`, `transitions.create`, `transitions.duration.standard`

#### Consumed Tokens
`palette.primary.main`, `palette.secondary.main`, `palette.text.secondary`, `palette.text.disabled`, `palette.action.disabled`, `palette.action.disabledOpacity`, `spacing`, `typography.pxToRem`

#### References
- **MUI API**: [Tabs API](https://mui.com/material-ui/api/tabs/)
- **MUI Source**: [Tabs.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Tabs/Tabs.js)
- **Local Implementation**: `componentOverrides/tabs.js`

#### Override Object
```typescript
const MuiTabs = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.paper,
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
    indicator: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.primary.main,
      height: 2,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  },
};

const MuiTab = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: 0,
      },
      minWidth: 0,
      [theme.breakpoints.up('md')]: {
        minWidth: 0,
      },
      
      transition: theme.transitions.create(['color', 'font-weight'], { duration: 200 }),

      '&:hover': {
        color: (theme.vars || theme).palette.primary.main,
      },
      
      '&.Mui-selected': {
        ...theme.typography.body2,
        lineHeight: 'normal',
        fontWeight: theme.typography.fontWeightBold,
        color: (theme.vars || theme).palette.primary.main,
      },
      
      '&:active': {
        color: (theme.vars || theme).palette.action.active,
        fontWeight: 'normal',
      },
      
      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.text.disabled,
        fontWeight: 'normal',
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Toolbar
**Status**: Research Complete

#### Consumed Tokens
`spacing`

#### References
- **MUI API**: [Toolbar API](https://mui.com/material-ui/api/toolbar/)
- **MUI Source**: [Toolbar.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Toolbar/Toolbar.js)
- **Local Implementation**: `componentOverrides/toolbar.js`

#### Override Object
```typescript
const MuiToolbar = {
  styleOverrides: {
    root: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        minHeight: theme.spacing(12),
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Tooltip
**Status**: Research Complete

#### Consumed Tokens
`palette.common.white`, `palette.grey.700`, `shape.borderRadius`, `typography.pxToRem`, `typography.fontFamily`, `typography.fontWeightRegular`, `typography.fontWeightMedium`, `transitions.duration.shortest`, `transitions.duration.shorter`, `transitions.duration.short`, `zIndex.tooltip`, `alpha`

#### References
- **MUI API**: [Tooltip API](https://mui.com/material-ui/api/tooltip/)
- **MUI Source**: [Tooltip.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Tooltip/Tooltip.js)
- **Local Implementation**: `componentOverrides/tooltip.js`

#### Override Object
```typescript
const MuiTooltip = {
  styleOverrides: {
    tooltip: ({ theme }) => ({
      ...theme.typography.caption,
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      padding: theme.spacing(0.875, 1.5, 1.125, 1.5),
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      boxShadow: (theme.vars || theme).shadows[4],
    }),
    arrow: ({ theme }) => ({
      color: (theme.vars || theme).palette.background.paper,
      '&:before': {
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        boxSizing: 'border-box',
      },
    }),
  },
};
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

[... Note: Other components will be added as agents iterate ...]

- **[2026-01-24] Completion**:
  - Implemented `Neuromancer` and `Cardboard` themes.
  - Resolved all TypeScript errors in `demo` and `componentOverrides`.
  - Refactored `Showcase.tsx` to support MUI v7 Grid syntax.
  - Verified compilation with `pnpm tsc --noEmit`.
  - Updated documentation to reflect "Code-First" verification strategy.

---

### ButtonGroup
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `palette.mode`, `palette.grey.400`, `palette.action.disabled`, `shape.borderRadius`, `shadows`, `alpha`

#### References
- **MUI API**: [ButtonGroup API](https://mui.com/material-ui/api/buttongroup/)
- **MUI Source**: [ButtonGroup.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ButtonGroup/ButtonGroup.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Grid
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `spacing`

#### References
- **MUI API**: [Grid API](https://mui.com/material-ui/api/grid/)
- **MUI Source**: [Grid.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Grid/Grid.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### GridLegacy
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `spacing`

#### References
- **MUI API**: [GridLegacy API](https://mui.com/material-ui/api/gridlegacy/)
- **MUI Source**: [GridLegacy.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/GridLegacy/GridLegacy.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### MenuList
**Status**: Generated Stub

#### Consumed Tokens
`direction`

#### References
- **MUI API**: [MenuList API](https://mui.com/material-ui/api/menulist/)
- **MUI Source**: [MenuList.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/MenuList/MenuList.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### PigmentGrid
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `spacing`

#### References
- **MUI API**: [PigmentGrid API](https://mui.com/material-ui/api/pigmentgrid/)
- **MUI Source**: [PigmentGrid.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/PigmentGrid/PigmentGrid.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### PigmentStack
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `spacing`

#### References
- **MUI API**: [PigmentStack API](https://mui.com/material-ui/api/pigmentstack/)
- **MUI Source**: [PigmentStack.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/PigmentStack/PigmentStack.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Popper
**Status**: Generated Stub

#### Consumed Tokens
`direction`

#### References
- **MUI API**: [Popper API](https://mui.com/material-ui/api/popper/)
- **MUI Source**: [Popper.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Popper/Popper.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### SpeedDial
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `spacing`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`, `zIndex.speedDial`

#### References
- **MUI API**: [SpeedDial API](https://mui.com/material-ui/api/speeddial/)
- **MUI Source**: [SpeedDial.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/SpeedDial/SpeedDial.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Stack
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `spacing`

#### References
- **MUI API**: [Stack API](https://mui.com/material-ui/api/stack/)
- **MUI Source**: [Stack.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Stack/Stack.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### styles
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `palette.mode`, `palette.common.white`, `palette.primary.main`, `palette.secondary.main`, `palette.error.main`, `palette.error.light`, `palette.error.dark`, `palette.warning.main`, `palette.warning.light`, `palette.warning.dark`, `palette.info.main`, `palette.info.light`, `palette.info.dark`, `palette.success.main`, `palette.success.light`, `palette.success.dark`, `palette.grey.100`, `palette.grey.300`, `palette.grey.400`, `palette.grey.600`, `palette.grey.700`, `palette.grey.800`, `palette.grey.900`, `palette.grey.A100`, `palette.getContrastText`, `palette.text.primary`, `palette.divider`, `palette.background.paper`, `palette.background.default`, `spacing`, `unstable_sx`, `shadows`, `typography.htmlFontSize`, `toRuntimeSource`, `alpha`, `lighten`

#### References
- **MUI API**: [styles API](https://mui.com/material-ui/api/styles/)
- **MUI Source**: [styles.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/styles/styles.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### TableCell
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `palette.mode`, `palette.text.primary`, `palette.text.secondary`, `palette.divider`, `palette.background.default`, `typography.pxToRem`, `typography.fontWeightMedium`, `alpha`, `lighten`

#### References
- **MUI API**: [TableCell API](https://mui.com/material-ui/api/tablecell/)
- **MUI Source**: [TableCell.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/TableCell/TableCell.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### TableSortLabel
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `palette.text.primary`, `palette.text.secondary`, `transitions.create`, `transitions.duration.shorter`, `transitions.duration.short`

#### References
- **MUI API**: [TableSortLabel API](https://mui.com/material-ui/api/tablesortlabel/)
- **MUI Source**: [TableSortLabel.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/TableSortLabel/TableSortLabel.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### TabScrollButton
**Status**: Generated Stub

#### Consumed Tokens
`direction`

#### References
- **MUI API**: [TabScrollButton API](https://mui.com/material-ui/api/tabscrollbutton/)
- **MUI Source**: [TabScrollButton.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/TabScrollButton/TabScrollButton.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### ToggleButtonGroup
**Status**: Generated Stub

#### Consumed Tokens
`direction`, `shape.borderRadius`

#### References
- **MUI API**: [ToggleButtonGroup API](https://mui.com/material-ui/api/togglebuttongroup/)
- **MUI Source**: [ToggleButtonGroup.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ToggleButtonGroup/ToggleButtonGroup.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### useAutocomplete
**Status**: Generated Stub

#### Consumed Tokens
`direction`

#### References
- **MUI API**: [useAutocomplete API](https://mui.com/material-ui/api/useautocomplete/)
- **MUI Source**: [useAutocomplete.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/useAutocomplete/useAutocomplete.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Breadcrumbs
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.grey.100`, `palette.grey.200`, `palette.grey.600`, `palette.grey.700`, `spacing`, `shadows`

#### References
- **MUI API**: [Breadcrumbs API](https://mui.com/material-ui/api/breadcrumbs/)
- **MUI Source**: [Breadcrumbs.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Breadcrumbs/Breadcrumbs.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### FilledInput
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.error.main`, `palette.text.primary`, `spacing`, `shape.borderRadius`, `transitions.create`, `transitions.easing.easeOut`, `transitions.duration.shorter`, `transitions.duration.short`, `alpha`

#### References
- **MUI API**: [FilledInput API](https://mui.com/material-ui/api/filledinput/)
- **MUI Source**: [FilledInput.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/FilledInput/FilledInput.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### InputBase
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.text.primary`, `palette.text.disabled`, `spacing`, `transitions.create`, `transitions.duration.shorter`, `transitions.duration.short`

#### References
- **MUI API**: [InputBase API](https://mui.com/material-ui/api/inputbase/)
- **MUI Source**: [InputBase.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/InputBase/InputBase.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### LinearProgress
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `lighten`

#### References
- **MUI API**: [LinearProgress API](https://mui.com/material-ui/api/linearprogress/)
- **MUI Source**: [LinearProgress.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/LinearProgress/LinearProgress.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### OutlinedInput
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.error.main`, `palette.text.primary`, `palette.action.disabled`, `spacing`, `shape.borderRadius`, `transitions.create`, `transitions.easing.easeOut`, `alpha`

#### References
- **MUI API**: [OutlinedInput API](https://mui.com/material-ui/api/outlinedinput/)
- **MUI Source**: [OutlinedInput.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/OutlinedInput/OutlinedInput.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### PaginationItem
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.text.primary`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.selected`, `palette.action.selectedOpacity`, `palette.action.disabled`, `palette.action.disabledBackground`, `palette.action.disabledOpacity`, `palette.action.focus`, `palette.action.focusOpacity`, `palette.action.activatedOpacity`, `shape.borderRadius`, `typography.pxToRem`, `transitions.create`, `transitions.duration.short`, `alpha`

#### References
- **MUI API**: [PaginationItem API](https://mui.com/material-ui/api/paginationitem/)
- **MUI Source**: [PaginationItem.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/PaginationItem/PaginationItem.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### ScopedCssBaseline
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `typography.fontWeightBold`

#### References
- **MUI API**: [ScopedCssBaseline API](https://mui.com/material-ui/api/scopedcssbaseline/)
- **MUI Source**: [ScopedCssBaseline.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ScopedCssBaseline/ScopedCssBaseline.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### SnackbarContent
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.getContrastText`, `palette.background.default`

#### References
- **MUI API**: [SnackbarContent API](https://mui.com/material-ui/api/snackbarcontent/)
- **MUI Source**: [SnackbarContent.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/SnackbarContent/SnackbarContent.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### StepConnector
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.grey.400`, `palette.grey.600`

#### References
- **MUI API**: [StepConnector API](https://mui.com/material-ui/api/stepconnector/)
- **MUI Source**: [StepConnector.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/StepConnector/StepConnector.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### StepContent
**Status**: Generated Stub

#### Consumed Tokens
`palette.mode`, `palette.grey.400`, `palette.grey.600`

#### References
- **MUI API**: [StepContent API](https://mui.com/material-ui/api/stepcontent/)
- **MUI Source**: [StepContent.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/StepContent/StepContent.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### ImageListItemBar
**Status**: Generated Stub

#### Consumed Tokens
`palette.common.white`, `typography.pxToRem`, `typography.fontFamily`

#### References
- **MUI API**: [ImageListItemBar API](https://mui.com/material-ui/api/imagelistitembar/)
- **MUI Source**: [ImageListItemBar.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ImageListItemBar/ImageListItemBar.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### BottomNavigationAction
**Status**: Generated Stub

#### Consumed Tokens
`palette.primary.main`, `palette.text.secondary`, `typography.pxToRem`, `typography.fontFamily`, `transitions.create`, `transitions.duration.short`

#### References
- **MUI API**: [BottomNavigationAction API](https://mui.com/material-ui/api/bottomnavigationaction/)
- **MUI Source**: [BottomNavigationAction.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/BottomNavigationAction/BottomNavigationAction.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### ListItemButton
**Status**: Generated Stub

#### Consumed Tokens
`palette.primary.main`, `palette.divider`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.selected`, `palette.action.selectedOpacity`, `palette.action.disabled`, `palette.action.disabledOpacity`, `palette.action.focus`, `palette.action.focusOpacity`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`, `alpha`

#### References
- **MUI API**: [ListItemButton API](https://mui.com/material-ui/api/listitembutton/)
- **MUI Source**: [ListItemButton.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ListItemButton/ListItemButton.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### ListSubheader
**Status**: Generated Stub

#### Consumed Tokens
`palette.primary.main`, `palette.text.secondary`, `palette.background.paper`, `typography.pxToRem`, `typography.fontFamily`, `typography.fontWeightMedium`

#### References
- **MUI API**: [ListSubheader API](https://mui.com/material-ui/api/listsubheader/)
- **MUI Source**: [ListSubheader.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ListSubheader/ListSubheader.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### MenuItem
**Status**: Generated Stub

#### Consumed Tokens
`palette.primary.main`, `palette.divider`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.selected`, `palette.action.selectedOpacity`, `palette.action.disabled`, `palette.action.disabledOpacity`, `palette.action.focus`, `palette.action.focusOpacity`, `spacing`, `alpha`

#### References
- **MUI API**: [MenuItem API](https://mui.com/material-ui/api/menuitem/)
- **MUI Source**: [MenuItem.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/MenuItem/MenuItem.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### MobileStepper
**Status**: Generated Stub

#### Consumed Tokens
`palette.primary.main`, `palette.background.default`, `palette.action.disabled`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`, `zIndex.mobileStepper`

#### References
- **MUI API**: [MobileStepper API](https://mui.com/material-ui/api/mobilestepper/)
- **MUI Source**: [MobileStepper.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/MobileStepper/MobileStepper.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### StepIcon
**Status**: Generated Stub

#### Consumed Tokens
`palette.primary.main`, `palette.primary.contrastText`, `palette.error.main`, `palette.text.disabled`, `typography.fontFamily`, `typography.caption.fontSize`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`

#### References
- **MUI API**: [StepIcon API](https://mui.com/material-ui/api/stepicon/)
- **MUI Source**: [StepIcon.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/StepIcon/StepIcon.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### TableRow
**Status**: Generated Stub

#### Consumed Tokens
`palette.primary.main`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.selected`, `palette.action.selectedOpacity`, `alpha`

#### References
- **MUI API**: [TableRow API](https://mui.com/material-ui/api/tablerow/)
- **MUI Source**: [TableRow.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/TableRow/TableRow.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### FormControlLabel
**Status**: Generated Stub

#### Consumed Tokens
`palette.error.main`, `palette.text.disabled`

#### References
- **MUI API**: [FormControlLabel API](https://mui.com/material-ui/api/formcontrollabel/)
- **MUI Source**: [FormControlLabel.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/FormControlLabel/FormControlLabel.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### FormHelperText
**Status**: Generated Stub

#### Consumed Tokens
`palette.error.main`, `palette.text.secondary`, `palette.text.disabled`, `spacing`

#### References
- **MUI API**: [FormHelperText API](https://mui.com/material-ui/api/formhelpertext/)
- **MUI Source**: [FormHelperText.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/FormHelperText/FormHelperText.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### FormLabel
**Status**: Generated Stub

#### Consumed Tokens
`palette.error.main`, `palette.text.secondary`, `palette.text.disabled`

#### References
- **MUI API**: [FormLabel API](https://mui.com/material-ui/api/formlabel/)
- **MUI Source**: [FormLabel.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/FormLabel/FormLabel.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### StepLabel
**Status**: Generated Stub

#### Consumed Tokens
`palette.error.main`, `palette.text.primary`, `palette.text.secondary`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`

#### References
- **MUI API**: [StepLabel API](https://mui.com/material-ui/api/steplabel/)
- **MUI Source**: [StepLabel.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/StepLabel/StepLabel.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### AppBar
**Status**: Generated Stub

#### Consumed Tokens
`palette.grey.100`, `palette.grey.900`, `palette.getContrastText`, `palette.text.primary`, `applyStyles`, `zIndex.appBar`

#### References
- **MUI API**: [AppBar API](https://mui.com/material-ui/api/appbar/)
- **MUI Source**: [AppBar.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/AppBar/AppBar.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Fab
**Status**: Generated Stub

#### Consumed Tokens
`palette.grey.300`, `palette.grey.900`, `palette.grey.A100`, `palette.getContrastText`, `palette.action.disabled`, `palette.action.disabledBackground`, `shadows`, `transitions.create`, `transitions.duration.short`, `zIndex.fab`

#### References
- **MUI API**: [Fab API](https://mui.com/material-ui/api/fab/)
- **MUI Source**: [Fab.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Fab/Fab.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Avatar
**Status**: Generated Stub

#### Consumed Tokens
`palette.grey.400`, `palette.grey.600`, `palette.background.default`, `shape.borderRadius`, `applyStyles`, `typography.pxToRem`, `typography.fontFamily`

#### References
- **MUI API**: [Avatar API](https://mui.com/material-ui/api/avatar/)
- **MUI Source**: [Avatar.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Avatar/Avatar.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### TablePagination
**Status**: Generated Stub

#### Consumed Tokens
`palette.text.primary`, `typography.pxToRem`

#### References
- **MUI API**: [TablePagination API](https://mui.com/material-ui/api/tablepagination/)
- **MUI Source**: [TablePagination.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/TablePagination/TablePagination.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### SpeedDialAction
**Status**: Generated Stub

#### Consumed Tokens
`palette.text.secondary`, `palette.background.paper`, `shape.borderRadius`, `shadows`, `transitions.create`, `transitions.duration.shorter`, `transitions.duration.short`

#### References
- **MUI API**: [SpeedDialAction API](https://mui.com/material-ui/api/speeddialaction/)
- **MUI Source**: [SpeedDialAction.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/SpeedDialAction/SpeedDialAction.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### DialogContent
**Status**: Generated Stub

#### Consumed Tokens
`palette.divider`

#### References
- **MUI API**: [DialogContent API](https://mui.com/material-ui/api/dialogcontent/)
- **MUI Source**: [DialogContent.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/DialogContent/DialogContent.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### NativeSelect
**Status**: Generated Stub

#### Consumed Tokens
`palette.background.paper`, `palette.action.active`, `palette.action.disabled`, `shape.borderRadius`

#### References
- **MUI API**: [NativeSelect API](https://mui.com/material-ui/api/nativeselect/)
- **MUI Source**: [NativeSelect.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/NativeSelect/NativeSelect.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### AvatarGroup
**Status**: Generated Stub

#### Consumed Tokens
`palette.background.default`, `spacing`

#### References
- **MUI API**: [AvatarGroup API](https://mui.com/material-ui/api/avatargroup/)
- **MUI Source**: [AvatarGroup.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/AvatarGroup/AvatarGroup.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### AccordionSummary
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.active`, `palette.action.disabled`, `palette.action.disabledOpacity`, `palette.action.focus`, `spacing`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`

#### References
- **MUI API**: [AccordionSummary API](https://mui.com/material-ui/api/accordionsummary/)
- **MUI Source**: [AccordionSummary.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/AccordionSummary/AccordionSummary.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Icon
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.active`, `palette.action.disabled`, `typography.pxToRem`

#### References
- **MUI API**: [Icon API](https://mui.com/material-ui/api/icon/)
- **MUI Source**: [Icon.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Icon/Icon.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### IconButton
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.active`, `palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.disabled`, `typography.pxToRem`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`, `alpha`

#### References
- **MUI API**: [IconButton API](https://mui.com/material-ui/api/iconbutton/)
- **MUI Source**: [IconButton.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/IconButton/IconButton.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### InputAdornment
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.active`

#### References
- **MUI API**: [InputAdornment API](https://mui.com/material-ui/api/inputadornment/)
- **MUI Source**: [InputAdornment.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/InputAdornment/InputAdornment.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### ListItemIcon
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.active`

#### References
- **MUI API**: [ListItemIcon API](https://mui.com/material-ui/api/listitemicon/)
- **MUI Source**: [ListItemIcon.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ListItemIcon/ListItemIcon.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### CardActionArea
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.hover`, `palette.action.hoverOpacity`, `palette.action.focus`, `palette.action.focusOpacity`, `transitions.create`, `transitions.duration.short`

#### References
- **MUI API**: [CardActionArea API](https://mui.com/material-ui/api/cardactionarea/)
- **MUI Source**: [CardActionArea.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/CardActionArea/CardActionArea.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Rating
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.disabled`, `palette.action.disabledOpacity`, `typography.pxToRem`, `transitions.create`, `transitions.duration.shortest`, `transitions.duration.short`

#### References
- **MUI API**: [Rating API](https://mui.com/material-ui/api/rating/)
- **MUI Source**: [Rating.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Rating/Rating.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### CircularProgress
**Status**: Generated Stub

#### Consumed Tokens
`palette.action.activatedOpacity`, `transitions.create`

#### References
- **MUI API**: [CircularProgress API](https://mui.com/material-ui/api/circularprogress/)
- **MUI Source**: [CircularProgress.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/CircularProgress/CircularProgress.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### AccordionActions
**Status**: Generated Stub

#### Consumed Tokens
`spacing`

#### References
- **MUI API**: [AccordionActions API](https://mui.com/material-ui/api/accordionactions/)
- **MUI Source**: [AccordionActions.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/AccordionActions/AccordionActions.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### AccordionDetails
**Status**: Generated Stub

#### Consumed Tokens
`spacing`

#### References
- **MUI API**: [AccordionDetails API](https://mui.com/material-ui/api/accordiondetails/)
- **MUI Source**: [AccordionDetails.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/AccordionDetails/AccordionDetails.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### CardActions
**Status**: Generated Stub

#### Consumed Tokens
`spacing`

#### References
- **MUI API**: [CardActions API](https://mui.com/material-ui/api/cardactions/)
- **MUI Source**: [CardActions.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/CardActions/CardActions.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### DialogActions
**Status**: Generated Stub

#### Consumed Tokens
`spacing`

#### References
- **MUI API**: [DialogActions API](https://mui.com/material-ui/api/dialogactions/)
- **MUI Source**: [DialogActions.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/DialogActions/DialogActions.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### InputLabel
**Status**: Generated Stub

#### Consumed Tokens
`spacing`, `transitions.create`, `transitions.easing.easeOut`, `transitions.duration.shorter`, `transitions.duration.short`

#### References
- **MUI API**: [InputLabel API](https://mui.com/material-ui/api/inputlabel/)
- **MUI Source**: [InputLabel.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/InputLabel/InputLabel.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### TextField
**Status**: Generated Stub

#### Consumed Tokens
`spacing`

#### References
- **MUI API**: [TextField API](https://mui.com/material-ui/api/textfield/)
- **MUI Source**: [TextField.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/TextField/TextField.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Badge
**Status**: Generated Stub

#### Consumed Tokens
`typography.pxToRem`, `typography.fontFamily`, `typography.fontWeightMedium`, `transitions.create`, `transitions.easing.easeInOut`, `transitions.easing.easeIn`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`

#### References
- **MUI API**: [Badge API](https://mui.com/material-ui/api/badge/)
- **MUI Source**: [Badge.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Badge/Badge.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### AlertTitle
**Status**: Generated Stub

#### Consumed Tokens
`typography.fontWeightMedium`

#### References
- **MUI API**: [AlertTitle API](https://mui.com/material-ui/api/alerttitle/)
- **MUI Source**: [AlertTitle.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/AlertTitle/AlertTitle.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Collapse
**Status**: Generated Stub

#### Consumed Tokens
`transitions.getAutoHeightDuration`, `transitions.create`

#### References
- **MUI API**: [Collapse API](https://mui.com/material-ui/api/collapse/)
- **MUI Source**: [Collapse.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Collapse/Collapse.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Grow
**Status**: Generated Stub

#### Consumed Tokens
`transitions.getAutoHeightDuration`, `transitions.create`

#### References
- **MUI API**: [Grow API](https://mui.com/material-ui/api/grow/)
- **MUI Source**: [Grow.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Grow/Grow.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Fade
**Status**: Generated Stub

#### Consumed Tokens
`transitions.create`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`

#### References
- **MUI API**: [Fade API](https://mui.com/material-ui/api/fade/)
- **MUI Source**: [Fade.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Fade/Fade.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### SpeedDialIcon
**Status**: Generated Stub

#### Consumed Tokens
`transitions.create`, `transitions.duration.short`

#### References
- **MUI API**: [SpeedDialIcon API](https://mui.com/material-ui/api/speeddialicon/)
- **MUI Source**: [SpeedDialIcon.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/SpeedDialIcon/SpeedDialIcon.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### SwipeableDrawer
**Status**: Generated Stub

#### Consumed Tokens
`transitions.create`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`, `zIndex.drawer`

#### References
- **MUI API**: [SwipeableDrawer API](https://mui.com/material-ui/api/swipeabledrawer/)
- **MUI Source**: [SwipeableDrawer.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/SwipeableDrawer/SwipeableDrawer.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Zoom
**Status**: Generated Stub

#### Consumed Tokens
`transitions.create`, `transitions.duration.enteringScreen`, `transitions.duration.leavingScreen`

#### References
- **MUI API**: [Zoom API](https://mui.com/material-ui/api/zoom/)
- **MUI Source**: [Zoom.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Zoom/Zoom.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### ButtonBase
**Status**: Generated Stub

#### Consumed Tokens
`transitions.easing.easeInOut`, `transitions.easing.easeIn`, `transitions.duration.shorter`, `transitions.duration.short`

#### References
- **MUI API**: [ButtonBase API](https://mui.com/material-ui/api/buttonbase/)
- **MUI Source**: [ButtonBase.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/ButtonBase/ButtonBase.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]

---

### Modal
**Status**: Generated Stub

#### Consumed Tokens
`zIndex.modal`

#### References
- **MUI API**: [Modal API](https://mui.com/material-ui/api/modal/)
- **MUI Source**: [Modal.js](https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Modal/Modal.js)

#### Override Object
```typescript
// TODO: Implement theme-agnostic overrides
```

#### Screenshots
- Before: [Pending]
- After: [Pending]
