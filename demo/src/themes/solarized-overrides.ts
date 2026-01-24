/**
 * Solarized Theme Component Overrides
 * Award-winning, comprehensive styling for all MUI components
 */
import { alpha, Components, Theme } from '@mui/material/styles';

// Solarized palette references for use in overrides
const sol = {
  base01: '#586e75',
  base00: '#657b83',
  base1: '#93a1a1',
  base2: '#eee8d5',
  base3: '#fdf6e3',
  yellow: '#b58900',
  orange: '#cb4b16',
  red: '#dc322f',
  magenta: '#d33682',
  violet: '#6c71c4',
  blue: '#268bd2',
  cyan: '#2aa198',
  green: '#859900',
};

export const solarizedOverrides: Components<Theme> = {
  // =========================================================================
  // BASELINE & PAPER
  // =========================================================================
  MuiCssBaseline: {
    styleOverrides: {
      '*, *::before, *::after': { boxSizing: 'border-box' },
      body: { 
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '::selection': {
        backgroundColor: alpha(sol.cyan, 0.25),
        color: sol.base01,
      },
    },
  },
  
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
      rounded: ({ theme }) => ({ borderRadius: (theme.shape.borderRadius as number) * 1.5 }),
      outlined: ({ theme }) => ({ 
        border: `1px solid ${alpha(sol.base01, 0.15)}`,
      }),
    },
  },

  // =========================================================================
  // BUTTONS - Refined with micro-interactions
  // =========================================================================
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        fontWeight: 600,
        letterSpacing: '0.02em',
        padding: '8px 20px',
        transition: theme.transitions.create(
          ['background-color', 'box-shadow', 'transform', 'border-color'],
          { duration: 200 }
        ),
        '&:active': { transform: 'scale(0.98)' },
      }),
      contained: ({ theme }) => ({
        boxShadow: 'none',
        '&:hover': {
          boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
        },
        '&.Mui-focusVisible': {
          outline: `2px solid ${sol.cyan}`,
          outlineOffset: 2,
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: '1.5px',
        '&:hover': {
          borderWidth: '1.5px',
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      }),
      text: ({ theme }) => ({
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['background-color', 'transform'], { duration: 150 }),
        '&:hover': { backgroundColor: alpha(sol.base01, 0.08) },
        '&:active': { transform: 'scale(0.92)' },
        '&.Mui-focusVisible': {
          outline: `2px solid ${sol.cyan}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  // =========================================================================
  // CARDS - Elegant with warm shadows
  // =========================================================================
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        border: `1px solid ${alpha(sol.base01, 0.1)}`,
        boxShadow: `0 2px 12px ${alpha(sol.base01, 0.08)}`,
        transition: theme.transitions.create(['box-shadow', 'transform'], { duration: 250 }),
        '&:hover': {
          boxShadow: `0 8px 30px ${alpha(sol.base01, 0.15)}`,
          transform: 'translateY(-2px)',
        },
      }),
    },
  },
  
  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({ padding: theme.spacing(2.5, 3, 1.5) }),
      title: { fontWeight: 600, letterSpacing: '0.01em' },
      subheader: { color: sol.base1 },
    },
  },
  
  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2, 3),
        '&:last-child': { paddingBottom: theme.spacing(3) },
      }),
    },
  },
  
  MuiCardActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1.5, 2),
        borderTop: `1px solid ${alpha(sol.base01, 0.08)}`,
      }),
    },
  },

  // =========================================================================
  // CHIPS - Colorful accents
  // =========================================================================
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        fontWeight: 500,
        transition: theme.transitions.create(['background-color', 'box-shadow'], { duration: 150 }),
      }),
      filled: ({ theme }) => ({
        '&.MuiChip-colorPrimary': {
          background: `linear-gradient(135deg, ${sol.blue} 0%, ${alpha(sol.cyan, 0.9)} 100%)`,
        },
        '&.MuiChip-colorSecondary': {
          background: `linear-gradient(135deg, ${sol.cyan} 0%, ${sol.green} 100%)`,
        },
        '&.MuiChip-colorSuccess': {
          background: `linear-gradient(135deg, ${sol.green} 0%, ${alpha(sol.cyan, 0.8)} 100%)`,
        },
        '&.MuiChip-colorWarning': {
          background: `linear-gradient(135deg, ${sol.orange} 0%, ${sol.yellow} 100%)`,
        },
        '&.MuiChip-colorError': {
          background: `linear-gradient(135deg, ${sol.red} 0%, ${sol.magenta} 100%)`,
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: '1.5px',
        '&:hover': { backgroundColor: alpha(sol.base01, 0.04) },
      }),
      clickable: {
        '&:active': { transform: 'scale(0.96)' },
      },
      deleteIcon: {
        color: 'inherit',
        opacity: 0.7,
        '&:hover': { opacity: 1, color: sol.red },
      },
    },
  },

  // =========================================================================
  // INPUTS - Clean with cyan focus
  // =========================================================================
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: sol.base3,
        transition: theme.transitions.create(['border-color', 'box-shadow'], { duration: 200 }),
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: sol.base1,
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: sol.cyan,
            borderWidth: 2,
            boxShadow: `0 0 0 3px ${alpha(sol.cyan, 0.12)}`,
          },
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: sol.red,
        },
      }),
      notchedOutline: {
        borderColor: alpha(sol.base01, 0.2),
        transition: 'border-color 200ms, box-shadow 200ms',
      },
    },
  },

  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(sol.base2, 0.5),
        borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
        '&:hover': { backgroundColor: alpha(sol.base2, 0.8) },
        '&.Mui-focused': { backgroundColor: sol.base2 },
        '&::after': { borderBottomColor: sol.cyan },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: sol.base1,
        '&.Mui-focused': { color: sol.cyan },
        '&.Mui-error': { color: sol.red },
      },
    },
  },

  // =========================================================================
  // SELECTION CONTROLS
  // =========================================================================
  MuiSwitch: {
    styleOverrides: {
      root: { width: 52, height: 32, padding: 0, margin: 8 },
      switchBase: ({ theme }) => ({
        padding: 4,
        '&.Mui-checked': {
          transform: 'translateX(20px)',
          color: sol.base3,
          '& + .MuiSwitch-track': {
            backgroundColor: sol.cyan,
            opacity: 1,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          boxShadow: `0 0 0 3px ${alpha(sol.cyan, 0.3)}`,
        },
      }),
      thumb: ({ theme }) => ({
        width: 24,
        height: 24,
        boxShadow: theme.shadows[2],
      }),
      track: ({ theme }) => ({
        borderRadius: 16,
        backgroundColor: alpha(sol.base01, 0.25),
        opacity: 1,
        transition: theme.transitions.create(['background-color'], { duration: 300 }),
      }),
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(sol.base01, 0.5),
        '&.Mui-checked': { color: sol.blue },
        '&.Mui-focusVisible': {
          outline: `2px solid ${sol.cyan}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(sol.base01, 0.5),
        '&.Mui-checked': { color: sol.blue },
        '&.Mui-focusVisible': {
          outline: `2px solid ${sol.cyan}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: sol.cyan,
        height: 6,
      }),
      thumb: ({ theme }) => ({
        width: 18,
        height: 18,
        backgroundColor: sol.base3,
        border: `2px solid ${sol.cyan}`,
        boxShadow: theme.shadows[2],
        '&:hover, &.Mui-focusVisible': {
          boxShadow: `0 0 0 6px ${alpha(sol.cyan, 0.15)}`,
        },
        '&.Mui-active': {
          boxShadow: `0 0 0 10px ${alpha(sol.cyan, 0.2)}`,
        },
      }),
      track: {
        background: `linear-gradient(90deg, ${sol.blue} 0%, ${sol.cyan} 100%)`,
        border: 'none',
      },
      rail: {
        backgroundColor: alpha(sol.base01, 0.2),
      },
    },
  },

  // =========================================================================
  // TABS & NAVIGATION
  // =========================================================================
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 3,
        borderRadius: '3px 3px 0 0',
        background: `linear-gradient(90deg, ${sol.blue} 0%, ${sol.cyan} 100%)`,
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.02em',
        minHeight: 48,
        transition: theme.transitions.create(['color', 'background-color'], { duration: 200 }),
        '&:hover': { backgroundColor: alpha(sol.base01, 0.04) },
        '&.Mui-selected': { color: sol.blue, fontWeight: 600 },
      }),
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      separator: { color: sol.base1 },
      li: {
        '& a': {
          color: sol.cyan,
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'color 150ms',
          '&:hover': { color: sol.blue, textDecoration: 'underline' },
        },
      },
    },
  },

  MuiPagination: {
    styleOverrides: {
      root: ({ theme }) => ({}),
    },
  },

  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['background-color', 'color'], { duration: 150 }),
        '&.Mui-selected': {
          backgroundColor: sol.blue,
          color: sol.base3,
          fontWeight: 600,
          '&:hover': { backgroundColor: alpha(sol.blue, 0.85) },
        },
      }),
    },
  },

  // =========================================================================
  // ALERTS
  // =========================================================================
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        border: '1px solid',
        fontWeight: 500,
      }),
      standardSuccess: {
        backgroundColor: alpha(sol.green, 0.08),
        borderColor: alpha(sol.green, 0.3),
        color: sol.green,
        '& .MuiAlert-icon': { color: sol.green },
      },
      standardError: {
        backgroundColor: alpha(sol.red, 0.08),
        borderColor: alpha(sol.red, 0.3),
        color: sol.red,
        '& .MuiAlert-icon': { color: sol.red },
      },
      standardWarning: {
        backgroundColor: alpha(sol.orange, 0.08),
        borderColor: alpha(sol.orange, 0.3),
        color: sol.orange,
        '& .MuiAlert-icon': { color: sol.orange },
      },
      standardInfo: {
        backgroundColor: alpha(sol.violet, 0.08),
        borderColor: alpha(sol.violet, 0.3),
        color: sol.violet,
        '& .MuiAlert-icon': { color: sol.violet },
      },
      outlinedSuccess: { borderColor: sol.green, color: sol.green },
      outlinedError: { borderColor: sol.red, color: sol.red },
      outlinedWarning: { borderColor: sol.orange, color: sol.orange },
      outlinedInfo: { borderColor: sol.violet, color: sol.violet },
    },
  },

  // =========================================================================
  // TABLES
  // =========================================================================
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${alpha(sol.base01, 0.12)}`,
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(sol.base2, 0.6),
        '& .MuiTableCell-head': {
          fontWeight: 600,
          color: sol.base01,
          letterSpacing: '0.02em',
          borderBottom: `2px solid ${alpha(sol.base01, 0.15)}`,
        },
      },
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['background-color'], { duration: 150 }),
        '&:nth-of-type(even)': { backgroundColor: alpha(sol.base2, 0.3) },
        '&:hover': { backgroundColor: alpha(sol.cyan, 0.06) },
        '&.Mui-selected': { backgroundColor: alpha(sol.blue, 0.08) },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${alpha(sol.base01, 0.08)}`,
        padding: '14px 16px',
      },
    },
  },

  // =========================================================================
  // LISTS
  // =========================================================================
  MuiList: {
    styleOverrides: {
      root: ({ theme }) => ({ padding: theme.spacing(1) }),
    },
  },

  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        marginBottom: 2,
      }),
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['background-color'], { duration: 150 }),
        '&:hover': { backgroundColor: alpha(sol.base01, 0.06) },
        '&.Mui-selected': {
          backgroundColor: alpha(sol.blue, 0.1),
          '&:hover': { backgroundColor: alpha(sol.blue, 0.15) },
        },
      }),
    },
  },

  // =========================================================================
  // DIALOGS & DRAWERS
  // =========================================================================
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) * 2,
        boxShadow: `0 24px 80px ${alpha(sol.base01, 0.25)}`,
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: '1.25rem',
        fontWeight: 600,
        padding: theme.spacing(3),
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: sol.base3,
        borderRight: `1px solid ${alpha(sol.base01, 0.1)}`,
      }),
    },
  },

  // =========================================================================
  // PROGRESS & LOADING
  // =========================================================================
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 6,
        borderRadius: 3,
        backgroundColor: alpha(sol.base01, 0.12),
      }),
      bar: {
        borderRadius: 3,
        background: `linear-gradient(90deg, ${sol.blue} 0%, ${sol.cyan} 100%)`,
      },
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      root: { color: sol.cyan },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(sol.base01, 0.1),
      },
    },
  },

  // =========================================================================
  // ACCORDION
  // =========================================================================
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: `${theme.shape.borderRadius}px !important`,
        border: `1px solid ${alpha(sol.base01, 0.12)}`,
        boxShadow: 'none',
        marginBottom: theme.spacing(1),
        '&::before': { display: 'none' },
        '&.Mui-expanded': {
          margin: `0 0 ${theme.spacing(1)} 0`,
          boxShadow: `0 4px 16px ${alpha(sol.base01, 0.1)}`,
        },
      }),
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 56,
        fontWeight: 500,
        '&:hover': { backgroundColor: alpha(sol.base01, 0.03) },
      }),
    },
  },

  // =========================================================================
  // BADGES & AVATARS
  // =========================================================================
  MuiBadge: {
    styleOverrides: {
      badge: ({ theme }) => ({
        fontWeight: 600,
        fontSize: '0.7rem',
      }),
      colorPrimary: { backgroundColor: sol.blue },
      colorSecondary: { backgroundColor: sol.magenta },
      colorError: { backgroundColor: sol.red },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 600,
        fontSize: '0.875rem',
      }),
      colorDefault: {
        backgroundColor: alpha(sol.violet, 0.15),
        color: sol.violet,
      },
    },
  },

  MuiAvatarGroup: {
    styleOverrides: {
      avatar: ({ theme }) => ({
        border: `2px solid ${sol.base3}`,
        fontSize: '0.8rem',
      }),
    },
  },

  // =========================================================================
  // TOOLTIPS & MENUS
  // =========================================================================
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: sol.base01,
        color: sol.base3,
        fontSize: '0.75rem',
        fontWeight: 500,
        padding: '8px 12px',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
      }),
      arrow: { color: sol.base01 },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        boxShadow: `0 8px 32px ${alpha(sol.base01, 0.18)}`,
        border: `1px solid ${alpha(sol.base01, 0.08)}`,
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) / 2,
        margin: '2px 6px',
        padding: '10px 14px',
        transition: theme.transitions.create(['background-color'], { duration: 150 }),
        '&:hover': { backgroundColor: alpha(sol.cyan, 0.08) },
        '&.Mui-selected': {
          backgroundColor: alpha(sol.blue, 0.12),
          '&:hover': { backgroundColor: alpha(sol.blue, 0.18) },
        },
      }),
    },
  },

  // =========================================================================
  // STEPPER
  // =========================================================================
  MuiStepper: {
    styleOverrides: {
      root: ({ theme }) => ({}),
    },
  },

  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: alpha(sol.base01, 0.3),
        '&.Mui-active': { color: sol.blue },
        '&.Mui-completed': { color: sol.green },
      },
    },
  },

  MuiStepLabel: {
    styleOverrides: {
      label: {
        fontWeight: 500,
        '&.Mui-active': { color: sol.blue, fontWeight: 600 },
        '&.Mui-completed': { color: sol.green },
      },
    },
  },

  // =========================================================================
  // APP BAR
  // =========================================================================
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: `0 1px 3px ${alpha(sol.base01, 0.1)}`,
      }),
      colorPrimary: {
        background: `linear-gradient(135deg, ${sol.blue} 0%, ${alpha(sol.violet, 0.9)} 100%)`,
      },
    },
  },

  MuiToolbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: '64px !important',
      }),
    },
  },

  // =========================================================================
  // SELECTS
  // =========================================================================
  MuiSelect: {
    styleOverrides: {
      select: ({ theme }) => ({
        '&:focus': { backgroundColor: 'transparent' },
      }),
      icon: { color: sol.base1, transition: 'transform 200ms' },
      iconOpen: { transform: 'rotate(180deg)' },
    },
  },

  // =========================================================================
  // AUTOCOMPLETE
  // =========================================================================
  MuiAutocomplete: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        boxShadow: `0 8px 32px ${alpha(sol.base01, 0.18)}`,
        border: `1px solid ${alpha(sol.base01, 0.08)}`,
        marginTop: 4,
      }),
      option: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) / 2,
        margin: '2px 6px',
        padding: '10px 14px',
        '&:hover': { backgroundColor: alpha(sol.cyan, 0.08) },
        '&[aria-selected="true"]': {
          backgroundColor: alpha(sol.blue, 0.12),
        },
      }),
    },
  },

  // =========================================================================
  // DIVIDER
  // =========================================================================
  MuiDivider: {
    styleOverrides: {
      root: { borderColor: alpha(sol.base01, 0.1) },
    },
  },

  // =========================================================================
  // SNACKBAR
  // =========================================================================
  MuiSnackbar: {
    styleOverrides: {
      root: ({ theme }) => ({}),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: sol.base01,
        color: sol.base3,
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        fontWeight: 500,
        boxShadow: `0 8px 32px ${alpha(sol.base01, 0.3)}`,
      }),
    },
  },
};

