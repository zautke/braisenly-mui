# MUI Theme Object Consumption Map

This document provides a bidirectional map between the MUI Theme object properties and the components that consume them. It serves as the authoritative reference for color and style propagation throughout the library.

## Theme Section: Palette

| Theme Property | Consumed By (Components) |
|----------------|--------------------------|
| `palette.mode` | `Alert`, `Breadcrumbs`, `Button`, `ButtonGroup`, `Chip`, `CssBaseline`, `FilledInput`, `Input`, `InputBase`, `LinearProgress`, `OutlinedInput`, `PaginationItem`, `Paper`, `ScopedCssBaseline`, `Skeleton`, `SnackbarContent`, `StepConnector`, `StepContent`, `Switch`, `TableCell` |
| `palette.common.black` | `Switch` |
| `palette.common.white` | `CssBaseline`, `ImageListItemBar`, `Slider`, `Switch`, `Tooltip` |
| `palette.primary.main` | `Autocomplete`, `BottomNavigationAction`, `ListItemButton`, `ListSubheader`, `MenuItem`, `MobileStepper`, `StepIcon`, `Tab`, `TableRow`, `Tabs` |
| `palette.primary.dark` | `Chip` |
| `palette.primary.contrastText` | `Chip`, `StepIcon` |
| `palette.secondary.main` | `Tab`, `Tabs` |
| `palette.secondary.dark` | `Chip` |
| `palette.secondary.contrastText` | `Chip` |
| `palette.error.main` | `FilledInput`, `FormControlLabel`, `FormHelperText`, `FormLabel`, `Input`, `OutlinedInput`, `StepIcon`, `StepLabel` |
| `palette.text.primary` | `AppBar`, `Button`, `Chip`, `CssBaseline`, `FilledInput`, `Input`, `InputBase`, `Link`, `OutlinedInput`, `PaginationItem`, `Paper`, `Skeleton`, `Slider`, `StepLabel`, `TableCell`, `TablePagination`, `TableSortLabel`, `ToggleButton` |
| `palette.text.secondary` | `Autocomplete`, `BottomNavigationAction`, `Checkbox`, `FormHelperText`, `FormLabel`, `Link`, `ListSubheader`, `Radio`, `Slider`, `SpeedDialAction`, `StepLabel`, `Tab`, `Table`, `TableCell`, `TableSortLabel` |
| `palette.text.disabled` | `FormControlLabel`, `FormHelperText`, `FormLabel`, `InputBase`, `Link`, `StepIcon`, `Tab` |
| `palette.divider` | `Accordion`, `DialogContent`, `Divider`, `Drawer`, `ListItem`, `ListItemButton`, `MenuItem`, `Paper`, `TableCell`, `ToggleButton` |
| `palette.background.paper` | `Autocomplete`, `BottomNavigation`, `ListSubheader`, `NativeSelect`, `Paper`, `Slider`, `SpeedDialAction` |
| `palette.background.default` | `Avatar`, `AvatarGroup`, `CssBaseline`, `MobileStepper`, `SnackbarContent`, `TableCell` |
| `palette.action.active` | `AccordionSummary`, `Checkbox`, `Icon`, `IconButton`, `InputAdornment`, `ListItemIcon`, `NativeSelect`, `Radio`, `Switch`, `ToggleButton` |
| `palette.action.hover` | `Autocomplete`, `Button`, `CardActionArea`, `Checkbox`, `Chip`, `IconButton`, `ListItem`, `ListItemButton`, `MenuItem`, `PaginationItem`, `Radio`, `Skeleton`, `Switch`, `TableRow`, `ToggleButton` |
| `palette.action.selected` | `Autocomplete`, `Chip`, `ListItemButton`, `MenuItem`, `PaginationItem`, `TableRow`, `ToggleButton` |
| `palette.action.disabled` | `Accordion`, `AccordionSummary`, `Autocomplete`, `Button`, `ButtonGroup`, `Checkbox`, `Chip`, `Fab`, `Icon`, `IconButton`, `ListItemButton`, `MenuItem`, `MobileStepper`, `NativeSelect`, `OutlinedInput`, `PaginationItem`, `Radio`, `Rating`, `Tab`, `ToggleButton` |
| `palette.action.disabledBackground` | `Accordion`, `Button`, `Fab`, `PaginationItem`, `ToggleButton` |
| `palette.grey[100]` | `AppBar`, `Breadcrumbs`, `Switch` |
| `palette.grey[300]` | `Button`, `Chip`, `Fab`, `Switch` |
| `palette.grey[400]` | `Avatar`, `ButtonGroup`, `Chip`, `Slider`, `StepConnector`, `StepContent` |
| `palette.grey[600]` | `Avatar`, `Breadcrumbs`, `Slider`, `StepConnector`, `StepContent`, `Switch` |
| `palette.grey[700]` | `Breadcrumbs`, `Button`, `Chip`, `Tooltip` |

## Theme Section: Typography

| Theme Property | Consumed By (Components) |
|----------------|--------------------------|
| `typography.fontFamily` | `Avatar`, `Badge`, `BottomNavigationAction`, `Chip`, `ImageListItemBar`, `ListSubheader`, `StepIcon`, `Tooltip` |
| `typography.fontWeightRegular` | `Tooltip` |
| `typography.fontWeightMedium` | `Alert`, `AlertTitle`, `Badge`, `ListSubheader`, `TableCell`, `Tooltip` |
| `typography.fontWeightBold` | `CssBaseline`, `ScopedCssBaseline` |
| `typography.pxToRem` | `Avatar`, `Badge`, `BottomNavigationAction`, `Button`, `Chip`, `Icon`, `IconButton`, `ImageListItemBar`, `ListSubheader`, `PaginationItem`, `Rating`, `Slider`, `Tab`, `TableCell`, `TablePagination`, `ToggleButton`, `Tooltip` |

## Theme Section: Layout & Shape

| Theme Property | Consumed By (Components) |
|----------------|--------------------------|
| `spacing` | `AccordionActions`, `AccordionDetails`, `AccordionSummary`, `AvatarGroup`, `Breadcrumbs`, `CardActions`, `DialogActions`, `Divider`, `FilledInput`, `FormControl`, `FormHelperText`, `Grid`, `GridLegacy`, `Input`, `InputBase`, `InputLabel`, `MenuItem`, `OutlinedInput`, `SpeedDial`, `Stack`, `Tab`, `Table`, `TextField`, `Toolbar` |
| `shape.borderRadius` | `Accordion`, `Avatar`, `Button`, `ButtonGroup`, `FilledInput`, `NativeSelect`, `OutlinedInput`, `PaginationItem`, `Paper`, `Skeleton`, `SpeedDialAction`, `ToggleButton`, `ToggleButtonGroup`, `Tooltip` |
| `shadows` | `Breadcrumbs`, `Button`, `ButtonGroup`, `Chip`, `Fab`, `Paper`, `Slider`, `SpeedDialAction`, `Switch` |

## Theme Section: Transitions

| Theme Property | Consumed By (Components) |
|----------------|--------------------------|
| `transitions.create` | `Accordion`, `AccordionSummary`, `Badge`, `BottomNavigationAction`, `Button`, `CardActionArea`, `Chip`, `CircularProgress`, `Collapse`, `Fab`, `Fade`, `FilledInput`, `Grow`, `IconButton`, `Input`, `InputBase`, `InputLabel`, `ListItem`, `ListItemButton`, `MobileStepper`, `OutlinedInput`, `PaginationItem`, `Paper`, `Radio`, `Rating`, `Slide`, `Slider`, `SpeedDialAction`, `SpeedDialIcon`, `StepIcon`, `StepLabel`, `SwipeableDrawer`, `Switch`, `TableSortLabel`, `Tabs`, `Zoom` |
| `transitions.duration.shortest` | `Accordion`, `AccordionSummary`, `IconButton`, `ListItem`, `ListItemButton`, `MobileStepper`, `Radio`, `Rating`, `Slider`, `StepIcon`, `StepLabel`, `Switch`, `Tooltip` |
| `transitions.duration.shorter` | `ButtonBase`, `FilledInput`, `Input`, `InputBase`, `InputLabel`, `SpeedDialAction`, `TableSortLabel`, `Tooltip` |
| `transitions.duration.short` | `Accordion`, `AccordionSummary`, `BottomNavigationAction`, `Button`, `ButtonBase`, `CardActionArea`, `Fab`, `FilledInput`, `IconButton`, `Input`, `InputBase`, `InputLabel`, `ListItem`, `ListItemButton`, `MobileStepper`, `PaginationItem`, `Radio`, `Rating`, `Slider`, `SpeedDialAction`, `SpeedDialIcon`, `StepIcon`, `StepLabel`, `Switch`, `TableSortLabel`, `Tooltip` |
| `transitions.duration.enteringScreen` | `Badge`, `Dialog`, `Drawer`, `Fade`, `Slide`, `Snackbar`, `SpeedDial`, `SwipeableDrawer`, `Zoom` |
| `transitions.duration.leavingScreen` | `Badge`, `Dialog`, `Drawer`, `Fade`, `Slide`, `Snackbar`, `SpeedDial`, `SwipeableDrawer`, `Zoom` |

## Theme Section: zIndex

| Theme Property | Consumed By (Components) |
|----------------|--------------------------|
| `zIndex.mobileStepper` | `MobileStepper` |
| `zIndex.fab` | `Fab` |
| `zIndex.speedDial` | `SpeedDial` |
| `zIndex.appBar` | `AppBar` |
| `zIndex.drawer` | `Drawer`, `SwipeableDrawer` |
| `zIndex.modal` | `Autocomplete`, `Modal` |
| `zIndex.snackbar` | `Snackbar` |
| `zIndex.tooltip` | `Tooltip` |

## Helper Functions

| Utility Function | Consumed By (Components) |
|------------------|--------------------------|
| `alpha` | `Autocomplete`, `Button`, `ButtonGroup`, `Checkbox`, `Chip`, `Divider`, `FilledInput`, `IconButton`, `Input`, `Link`, `ListItemButton`, `MenuItem`, `OutlinedInput`, `PaginationItem`, `Paper`, `Radio`, `Skeleton`, `Slider`, `Switch`, `TableCell`, `TableRow`, `ToggleButton`, `Tooltip` |
| `lighten` | `Alert`, `LinearProgress`, `Slider`, `Switch`, `TableCell` |

---

*Note: Component lists are derived from explicit `theme.vars`, `theme.palette`, `theme.typography`, etc., references in the MUI v7 source code.*