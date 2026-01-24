/**
 * Terracotta Theme Component Overrides
 * Award-winning, comprehensive styling for all MUI components
 * Warm earth tones with rich, organic feel
 */
import { alpha, Components, Theme } from '@mui/material/styles';

// Terracotta palette references for use in overrides
const terra = {
  // Base tones
  cream: '#fdfcf8',
  warmWhite: '#ffffff',
  sandLight: '#f7f3ec',
  sandMedium: '#e2ddd7',
  sandDark: '#c9c1b8',
  
  // Text tones
  textDark: '#17100b',
  textMuted: '#645c55',
  textLight: '#948e89',
  
  // Primary palette
  terracotta: '#d14129',     // Main terracotta
  terracottaLight: '#e0654e',
  terracottaDark: '#a8331f',
  
  // Accent colors
  rust: '#b85c38',
  copper: '#c67c4e',
  clay: '#9a7b6d',
  sage: '#8ba07c',
  olive: '#6b7c4f',
  
  // Semantic accents
  error: '#d40924',
  warning: '#ed990e',
  info: '#3bacda',
  success: '#0fad5b',
};

export const terracottaOverrides: Components<Theme> = {
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
        backgroundColor: alpha(terra.terracotta, 0.2),
        color: terra.textDark,
      },
    },
  },
  
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
      rounded: ({ theme }) => ({ borderRadius: (theme.shape.borderRadius as number) * 1.5 }),
      outlined: ({ theme }) => ({ 
        border: `1px solid ${alpha(terra.textMuted, 0.15)}`,
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
          outline: `2px solid ${terra.copper}`,
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
        '&:hover': { backgroundColor: alpha(terra.textMuted, 0.08) },
        '&:active': { transform: 'scale(0.92)' },
        '&.Mui-focusVisible': {
          outline: `2px solid ${terra.copper}`,
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
        border: `1px solid ${alpha(terra.sandMedium, 0.6)}`,
        boxShadow: `0 2px 12px ${alpha(terra.textMuted, 0.1)}`,
        transition: theme.transitions.create(['box-shadow', 'transform'], { duration: 250 }),
        '&:hover': {
          boxShadow: `0 8px 30px ${alpha(terra.textMuted, 0.18)}`,
          transform: 'translateY(-2px)',
        },
      }),
    },
  },
  
  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({ padding: theme.spacing(2.5, 3, 1.5) }),
      title: { fontWeight: 600, letterSpacing: '0.01em' },
      subheader: { color: terra.textMuted },
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
        borderTop: `1px solid ${alpha(terra.sandMedium, 0.5)}`,
      }),
    },
  },

  // =========================================================================
  // CHIPS - Warm colorful accents
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
          background: `linear-gradient(135deg, ${terra.terracotta} 0%, ${terra.rust} 100%)`,
        },
        '&.MuiChip-colorSecondary': {
          background: `linear-gradient(135deg, ${terra.clay} 0%, ${terra.copper} 100%)`,
        },
        '&.MuiChip-colorSuccess': {
          background: `linear-gradient(135deg, ${terra.success} 0%, ${terra.sage} 100%)`,
        },
        '&.MuiChip-colorWarning': {
          background: `linear-gradient(135deg, ${terra.warning} 0%, ${terra.copper} 100%)`,
        },
        '&.MuiChip-colorError': {
          background: `linear-gradient(135deg, ${terra.error} 0%, ${terra.terracotta} 100%)`,
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: '1.5px',
        '&:hover': { backgroundColor: alpha(terra.textMuted, 0.04) },
      }),
      clickable: {
        '&:active': { transform: 'scale(0.96)' },
      },
      deleteIcon: {
        color: 'inherit',
        opacity: 0.7,
        '&:hover': { opacity: 1, color: terra.error },
      },
    },
  },

  // =========================================================================
  // INPUTS - Clean with terracotta focus
  // =========================================================================
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: terra.warmWhite,
        transition: theme.transitions.create(['border-color', 'box-shadow'], { duration: 200 }),
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: terra.clay,
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: terra.terracotta,
            borderWidth: 2,
            boxShadow: `0 0 0 3px ${alpha(terra.terracotta, 0.12)}`,
          },
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: terra.error,
        },
      }),
      notchedOutline: {
        borderColor: alpha(terra.textMuted, 0.25),
        transition: 'border-color 200ms, box-shadow 200ms',
      },
    },
  },

  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(terra.sandLight, 0.5),
        borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
        '&:hover': { backgroundColor: alpha(terra.sandLight, 0.8) },
        '&.Mui-focused': { backgroundColor: terra.sandLight },
        '&::after': { borderBottomColor: terra.terracotta },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: terra.textMuted,
        '&.Mui-focused': { color: terra.terracotta },
        '&.Mui-error': { color: terra.error },
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
          color: terra.warmWhite,
          '& + .MuiSwitch-track': {
            backgroundColor: terra.terracotta,
            opacity: 1,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          boxShadow: `0 0 0 3px ${alpha(terra.terracotta, 0.3)}`,
        },
      }),
      thumb: ({ theme }) => ({
        width: 24,
        height: 24,
        boxShadow: theme.shadows[2],
      }),
      track: ({ theme }) => ({
        borderRadius: 16,
        backgroundColor: alpha(terra.textMuted, 0.25),
        opacity: 1,
        transition: theme.transitions.create(['background-color'], { duration: 300 }),
      }),
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(terra.textMuted, 0.5),
        '&.Mui-checked': { color: terra.terracotta },
        '&.Mui-focusVisible': {
          outline: `2px solid ${terra.copper}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(terra.textMuted, 0.5),
        '&.Mui-checked': { color: terra.terracotta },
        '&.Mui-focusVisible': {
          outline: `2px solid ${terra.copper}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: terra.terracotta,
        height: 6,
      }),
      thumb: ({ theme }) => ({
        width: 18,
        height: 18,
        backgroundColor: terra.warmWhite,
        border: `2px solid ${terra.terracotta}`,
        boxShadow: theme.shadows[2],
        '&:hover, &.Mui-focusVisible': {
          boxShadow: `0 0 0 6px ${alpha(terra.terracotta, 0.15)}`,
        },
        '&.Mui-active': {
          boxShadow: `0 0 0 10px ${alpha(terra.terracotta, 0.2)}`,
        },
      }),
      track: {
        background: `linear-gradient(90deg, ${terra.terracottaDark} 0%, ${terra.terracotta} 100%)`,
        border: 'none',
      },
      rail: {
        backgroundColor: alpha(terra.textMuted, 0.2),
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
        background: `linear-gradient(90deg, ${terra.terracottaDark} 0%, ${terra.terracotta} 100%)`,
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
        '&:hover': { backgroundColor: alpha(terra.textMuted, 0.04) },
        '&.Mui-selected': { color: terra.terracotta, fontWeight: 600 },
      }),
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      separator: { color: terra.textMuted },
      li: {
        '& a': {
          color: terra.terracotta,
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'color 150ms',
          '&:hover': { color: terra.terracottaDark, textDecoration: 'underline' },
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
          backgroundColor: terra.terracotta,
          color: terra.warmWhite,
          fontWeight: 600,
          '&:hover': { backgroundColor: alpha(terra.terracotta, 0.85) },
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
        backgroundColor: alpha(terra.success, 0.08),
        borderColor: alpha(terra.success, 0.3),
        color: terra.success,
        '& .MuiAlert-icon': { color: terra.success },
      },
      standardError: {
        backgroundColor: alpha(terra.error, 0.08),
        borderColor: alpha(terra.error, 0.3),
        color: terra.error,
        '& .MuiAlert-icon': { color: terra.error },
      },
      standardWarning: {
        backgroundColor: alpha(terra.warning, 0.08),
        borderColor: alpha(terra.warning, 0.3),
        color: terra.warning,
        '& .MuiAlert-icon': { color: terra.warning },
      },
      standardInfo: {
        backgroundColor: alpha(terra.info, 0.08),
        borderColor: alpha(terra.info, 0.3),
        color: terra.info,
        '& .MuiAlert-icon': { color: terra.info },
      },
      outlinedSuccess: { borderColor: terra.success, color: terra.success },
      outlinedError: { borderColor: terra.error, color: terra.error },
      outlinedWarning: { borderColor: terra.warning, color: terra.warning },
      outlinedInfo: { borderColor: terra.info, color: terra.info },
    },
  },

  // =========================================================================
  // TABLES
  // =========================================================================
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${alpha(terra.textMuted, 0.12)}`,
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(terra.sandLight, 0.6),
        '& .MuiTableCell-head': {
          fontWeight: 600,
          color: terra.textDark,
          letterSpacing: '0.02em',
          borderBottom: `2px solid ${alpha(terra.textMuted, 0.15)}`,
        },
      },
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['background-color'], { duration: 150 }),
        '&:nth-of-type(even)': { backgroundColor: alpha(terra.sandLight, 0.3) },
        '&:hover': { backgroundColor: alpha(terra.terracotta, 0.04) },
        '&.Mui-selected': { backgroundColor: alpha(terra.terracotta, 0.08) },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${alpha(terra.textMuted, 0.08)}`,
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
        '&:hover': { backgroundColor: alpha(terra.textMuted, 0.06) },
        '&.Mui-selected': {
          backgroundColor: alpha(terra.terracotta, 0.1),
          '&:hover': { backgroundColor: alpha(terra.terracotta, 0.15) },
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
        boxShadow: `0 24px 80px ${alpha(terra.textMuted, 0.3)}`,
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
        backgroundColor: terra.cream,
        borderRight: `1px solid ${alpha(terra.textMuted, 0.1)}`,
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
        backgroundColor: alpha(terra.textMuted, 0.12),
      }),
      bar: {
        borderRadius: 3,
        background: `linear-gradient(90deg, ${terra.terracottaDark} 0%, ${terra.terracotta} 100%)`,
      },
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      root: { color: terra.terracotta },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(terra.textMuted, 0.1),
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
        border: `1px solid ${alpha(terra.textMuted, 0.12)}`,
        boxShadow: 'none',
        marginBottom: theme.spacing(1),
        '&::before': { display: 'none' },
        '&.Mui-expanded': {
          margin: `0 0 ${theme.spacing(1)} 0`,
          boxShadow: `0 4px 16px ${alpha(terra.textMuted, 0.1)}`,
        },
      }),
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 56,
        fontWeight: 500,
        '&:hover': { backgroundColor: alpha(terra.textMuted, 0.03) },
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
      colorPrimary: { backgroundColor: terra.terracotta },
      colorSecondary: { backgroundColor: terra.copper },
      colorError: { backgroundColor: terra.error },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 600,
        fontSize: '0.875rem',
      }),
      colorDefault: {
        backgroundColor: alpha(terra.clay, 0.2),
        color: terra.clay,
      },
    },
  },

  MuiAvatarGroup: {
    styleOverrides: {
      avatar: ({ theme }) => ({
        border: `2px solid ${terra.cream}`,
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
        backgroundColor: terra.textDark,
        color: terra.cream,
        fontSize: '0.75rem',
        fontWeight: 500,
        padding: '8px 12px',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
      }),
      arrow: { color: terra.textDark },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        boxShadow: `0 8px 32px ${alpha(terra.textMuted, 0.22)}`,
        border: `1px solid ${alpha(terra.textMuted, 0.08)}`,
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
        '&:hover': { backgroundColor: alpha(terra.terracotta, 0.06) },
        '&.Mui-selected': {
          backgroundColor: alpha(terra.terracotta, 0.12),
          '&:hover': { backgroundColor: alpha(terra.terracotta, 0.18) },
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
        color: alpha(terra.textMuted, 0.3),
        '&.Mui-active': { color: terra.terracotta },
        '&.Mui-completed': { color: terra.success },
      },
    },
  },

  MuiStepLabel: {
    styleOverrides: {
      label: {
        fontWeight: 500,
        '&.Mui-active': { color: terra.terracotta, fontWeight: 600 },
        '&.Mui-completed': { color: terra.success },
      },
    },
  },

  // =========================================================================
  // APP BAR
  // =========================================================================
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: `0 1px 3px ${alpha(terra.textMuted, 0.1)}`,
      }),
      colorPrimary: {
        background: `linear-gradient(135deg, ${terra.terracotta} 0%, ${terra.rust} 100%)`,
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
      icon: { color: terra.textMuted, transition: 'transform 200ms' },
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
        boxShadow: `0 8px 32px ${alpha(terra.textMuted, 0.22)}`,
        border: `1px solid ${alpha(terra.textMuted, 0.08)}`,
        marginTop: 4,
      }),
      option: ({ theme }) => ({
        borderRadius: (theme.shape.borderRadius as number) / 2,
        margin: '2px 6px',
        padding: '10px 14px',
        '&:hover': { backgroundColor: alpha(terra.terracotta, 0.06) },
        '&[aria-selected="true"]': {
          backgroundColor: alpha(terra.terracotta, 0.12),
        },
      }),
    },
  },

  // =========================================================================
  // DIVIDER
  // =========================================================================
  MuiDivider: {
    styleOverrides: {
      root: { borderColor: alpha(terra.textMuted, 0.1) },
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
        backgroundColor: terra.textDark,
        color: terra.cream,
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        fontWeight: 500,
        boxShadow: `0 8px 32px ${alpha(terra.textMuted, 0.35)}`,
      }),
    },
  },
};

