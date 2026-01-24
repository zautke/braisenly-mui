# Theme Token Usage Map

## Purpose
This document serves as a "Reverse Map" for the MUI Theme Object. It answers the question: **"If I change this theme token, what components will be affected?"**

Use this reference when designing broad "Theme Variants" (Glass, Neuromancer) to ensure you are hitting all the necessary touchpoints for a consistent look-and-feel.

---

## 🎨 Palette Colors

### `palette.primary`
Used for the main brand color, typically the most prominent actions and active states.

| Component | Usage Context | Notes |
|-----------|---------------|-------|
| **Button** | `contained`, `outlined`, `text` variants | When `color="primary"` (default). Background for contained; text/border for others. |
| **IconButton** | `color="primary"` | Icon color. |
| **Fab** | Background color | When `color="primary"`. |
| **Checkbox** | Checked state | Icon color. |
| **Radio** | Checked state | Icon color. |
| **Switch** | Track (checked), Thumb (focus) | Track background when checked. |
| **TextField** | Focused border, Label (focused) | `primary.main` used for focus ring and label color. |
| **Input** | Underline (focused) | `primary.main` for the active underline. |
| **CircularProgress** | Stroke color | Default color. |
| **LinearProgress** | Bar color | Default color. |
| **Tabs** | Indicator, Selected Tab text | `primary.main` is standard for active tab. |
| **Badge** | Badge background | When `color="primary"`. |
| **Chip** | Background/Border | When `color="primary"`. |
| **AppBar** | Background | When `color="primary"` (default). |
| **Link** | Text color | When `color="primary"`. |
| **ListItem** | Selected state text | Often inherits or uses primary for selected text. |

### `palette.secondary`
Used for secondary actions, accents, or alternative states.

| Component | Usage Context | Notes |
|-----------|---------------|-------|
| **Button** | All variants | When `color="secondary"`. |
| **Fab** | Background color | When `color="secondary"`. |
| **Checkbox** | Checked state | When `color="secondary"`. |
| **Radio** | Checked state | When `color="secondary"`. |
| **Switch** | Track (checked) | When `color="secondary"`. |
| **Slider** | Thumb, Track | When `color="secondary"`. |
| **Badge** | Badge background | When `color="secondary"`. |

### `palette.error`
Used for error states, destructive actions, and alerts.

| Component | Usage Context | Notes |
|-----------|---------------|-------|
| **Button** | All variants | When `color="error"`. |
| **TextField** | Error state | Border color, Label color, Helper text color. |
| **Input** | Error state | Underline color. |
| **FormHelperText**| Error state | Text color. |
| **Alert** | Standard/Outlined/Filled | Background and icon color for `severity="error"`. |
| **Snackbar** | Error variant | Background color. |
| **Chip** | Delete icon (hover) | Often mapped to error.main on hover. |

### `palette.warning` / `palette.info` / `palette.success`
Used for semantic feedback states.

| Component | Usage Context | Notes |
|-----------|---------------|-------|
| **Alert** | All variants | Background/Icon for respective severity. |
| **Snackbar** | All variants | Background for respective severity. |
| **Button** | All variants | When `color="..."`. |
| **Badge** | Badge background | When `color="..."`. |
| **Chip** | Background | When `color="..."`. |

---

## 🌫️ Neutrals & Surfaces

### `palette.text`
The foundation of readability.

| Token | Component Usage | Notes |
|-------|-----------------|-------|
| `text.primary` | **Typography** (body1, h1-h6), **Input** (value), **CardHeader** (title), **List** (primary text), **Menu** (item text) | Default text color. |
| `text.secondary` | **Typography** (body2, caption), **CardHeader** (subheader), **List** (secondary text), **Input** (placeholder, adornment), **Icon** (default) | Muted text color. |
| `text.disabled` | **Button** (disabled), **Input** (disabled), **SelectionControls** (disabled label) | Inactive text. |

### `palette.background`
Defines the layers of the interface.

| Token | Component Usage | Notes |
|-------|-----------------|-------|
| `background.default` | **CssBaseline** | The `<body>` background color. |
| `background.paper` | **Paper**, **Card**, **Accordion**, **Dialog**, **Drawer**, **Menu**, **Popover**, **Autocomplete** (listbox) | The standard surface color. Critical for "Dark Mode" layers. |

### `palette.action`
Interactive state modifiers. Often used with `alpha()` or `opacity`.

| Token | Component Usage | Notes |
|-------|-----------------|-------|
| `action.active` | **Icon**, **InputAdornment**, **ListItem** (icon) | Default color for active icons. |
| `action.hover` | **Button**, **ListItem**, **TableRow**, **IconButton**, **Chip** | Background color on hover. |
| `action.selected` | **ListItem**, **TableRow**, **MenuItem**, **Autocomplete** (option) | Background color for selected items. |
| `action.disabled` | **Button**, **Input**, **SelectionControls** | Color for disabled elements (text/icon). |
| `action.disabledBackground` | **Button** (contained), **Switch** (track), **Fab** | Background for disabled surfaces. |
| `action.focus` | **Button**, **IconButton** | Keyboard focus overlay opacity/color. |

### `palette.divider`
Structural separation.

| Component | Usage Context | Notes |
|-----------|---------------|-------|
| **Divider** | Line color | The primary usage. |
| **Button** | Outlined border | Default border color for outlined variants. |
| **Card** | Border | Default border color (if outlined). |
| **Table** | Cell border | Bottom border of table cells. |
| **List** | Divider | Separator lines. |
| **Accordion** | Separator | Line between expanded accordions. |

---

## 📐 Shape & Structure

### `shape.borderRadius`
Global roundness factor.

| Component | Usage |
|-----------|-------|
| **Button** | Corner radius. |
| **Card** | Corner radius. |
| **Paper** | Corner radius (unless square). |
| **Dialog** | Corner radius. |
| **TextField** | Corner radius of `fieldset` (OutlinedInput). |
| **Chip** | Corner radius (usually fully rounded or matched). |
| **Alert** | Corner radius. |
| **Skeleton** | Corner radius (rect/rounded variants). |
| **Tooltip** | Corner radius. |

### `shadows` (Array 0-24)
Elevation and depth.

| Component | Usage |
|-----------|-------|
| **Paper** | `elevation={1}` through `elevation={24}`. |
| **Card** | Inherits Paper elevation (usually 1). |
| **AppBar** | Usually `shadows[4]`. |
| **Dialog** | High elevation (`shadows[24]`). |
| **Drawer** | High elevation (`shadows[16]`). |
| **Menu** | `shadows[8]`. |
| **Popover** | `shadows[8]`. |
| **Fab** | `shadows[6]` (default), `shadows[12]` (active). |
| **Button** | Contained buttons use `shadows[2]` -> `shadows[4]` (hover). |

### `typography`
Font definitions.

| Token | Component Usage |
|-------|-----------------|
| `typography.fontFamily` | **CssBaseline** (global), **Typography**, **Input**. |
| `typography.button` | **Button**, **Tab**, **PaginationItem**. |
| `typography.body1` | **Typography** (default), **ListItemText** (primary), **Input**. |
| `typography.body2` | **Typography**, **ListItemText** (secondary), **Tooltip**, **Toast**. |
| `typography.caption` | **HelperText**, **Badge**. |
| `typography.h1` - `h6` | **Typography**, **DialogTitle**, **CardTitle**. |

### `spacing`
Layout scale (usually 4px or 8px base).

| Component | Usage |
|-----------|-------|
| **Grid** | Gutter spacing. |
| **Stack** | Gap spacing. |
| **Container** | Padding. |
| **Toolbar** | Height and padding. |
| **Dialog** | Content padding. |
| **Card** | Content padding. |
| **List** | Item padding. |
| **Button** | Padding (often calc based on spacing). |

### `zIndex`
Layering order.

| Token | Component Usage |
|-------|-----------------|
| `zIndex.mobileStepper` | 1000 |
| `zIndex.fab` | 1050 |
| `zIndex.speedDial` | 1050 |
| `zIndex.appBar` | 1100 |
| `zIndex.drawer` | 1200 |
| `zIndex.modal` | 1300 |
| `zIndex.snackbar` | 1400 |
| `zIndex.tooltip` | 1500 |
