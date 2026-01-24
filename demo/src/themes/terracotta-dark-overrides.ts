/**
 * Terracotta Dark Theme Component Overrides
 * Award-winning, comprehensive styling for all MUI components
 * Warm earth tones adapted for dark mode with rich, organic feel
 */
import { alpha, Components, Theme } from '@mui/material/styles';

// Terracotta dark palette references for use in overrides
const terraDark = {
  // Base tones
  bgDeep: '#0c0806',
  bgSurface: '#15100d',
  bgElevated: '#1e1814',
  bgHighlight: '#29231f',
  bgAccent: '#352d28',
  
  // Text tones
  textLight: '#f2eee9',
  textMuted: '#948e89',
  textSubtle: '#6e6862',
  
  // Primary palette (brighter for dark mode)
  terracotta: '#e85b40',
  terracottaLight: '#f08070',
  terracottaDark: '#c44530',
  
  // Accent colors
  rust: '#d07050',
  copper: '#d89468',
  clay: '#b08878',
  sage: '#9ab08a',
  olive: '#859060',
  
  // Semantic accents
  error: '#e64343',
  warning: '#f2a618',
  info: '#43b2e1',
  success: '#02be6a',
};

export const terracottaDarkOverrides: Components<Theme> = {
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
        backgroundColor: alpha(terraDark.terracotta, 0.35),
        color: terraDark.textLight,
      },
    },
  },
  
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
      rounded: ({ theme }) => ({ borderRadius: theme.shape.borderRadius * 1.5 }),
      outlined: ({ theme }) => ({ 
        border: `1px solid ${alpha(terraDark.textMuted, 0.2)}`,
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
          boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
        },
        '&.Mui-focusVisible': {
          outline: `2px solid ${terraDark.copper}`,
          outlineOffset: 2,
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: '1.5px',
        '&:hover': {
          borderWidth: '1.5px',
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),
      text: ({ theme }) => ({
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['background-color', 'transform'], { duration: 150 }),
        '&:hover': { backgroundColor: alpha(terraDark.textMuted, 0.12) },
        '&:active': { transform: 'scale(0.92)' },
        '&.Mui-focusVisible': {
          outline: `2px solid ${terraDark.copper}`,
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
        borderRadius: theme.shape.borderRadius * 1.5,
        border: `1px solid ${alpha(terraDark.textMuted, 0.15)}`,
        backgroundColor: terraDark.bgSurface,
        boxShadow: `0 2px 12px ${alpha('#000', 0.3)}`,
        transition: theme.transitions.create(['box-shadow', 'transform'], { duration: 250 }),
        '&:hover': {
          boxShadow: `0 8px 30px ${alpha('#000', 0.45)}`,
          transform: 'translateY(-2px)',
        },
      }),
    },
  },
  
  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({ padding: theme.spacing(2.5, 3, 1.5) }),
      title: { fontWeight: 600, letterSpacing: '0.01em' },
      subheader: { color: terraDark.textMuted },
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
        borderTop: `1px solid ${alpha(terraDark.textMuted, 0.12)}`,
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
          background: `linear-gradient(135deg, ${terraDark.terracotta} 0%, ${terraDark.rust} 100%)`,
        },
        '&.MuiChip-colorSecondary': {
          background: `linear-gradient(135deg, ${terraDark.clay} 0%, ${terraDark.copper} 100%)`,
        },
        '&.MuiChip-colorSuccess': {
          background: `linear-gradient(135deg, ${terraDark.success} 0%, ${terraDark.sage} 100%)`,
        },
        '&.MuiChip-colorWarning': {
          background: `linear-gradient(135deg, ${terraDark.warning} 0%, ${terraDark.copper} 100%)`,
        },
        '&.MuiChip-colorError': {
          background: `linear-gradient(135deg, ${terraDark.error} 0%, ${terraDark.terracotta} 100%)`,
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: '1.5px',
        '&:hover': { backgroundColor: alpha(terraDark.textMuted, 0.08) },
      }),
      clickable: {
        '&:active': { transform: 'scale(0.96)' },
      },
      deleteIcon: {
        color: 'inherit',
        opacity: 0.7,
        '&:hover': { opacity: 1, color: terraDark.error },
      },
    },
  },

  // =========================================================================
  // INPUTS - Clean with terracotta focus (dark mode)
  // =========================================================================
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: terraDark.bgSurface,
        transition: theme.transitions.create(['border-color', 'box-shadow'], { duration: 200 }),
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: terraDark.clay,
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: terraDark.terracotta,
            borderWidth: 2,
            boxShadow: `0 0 0 3px ${alpha(terraDark.terracotta, 0.2)}`,
          },
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: terraDark.error,
        },
      }),
      notchedOutline: {
        borderColor: alpha(terraDark.textMuted, 0.3),
        transition: 'border-color 200ms, box-shadow 200ms',
      },
    },
  },

  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(terraDark.bgHighlight, 0.5),
        borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
        '&:hover': { backgroundColor: alpha(terraDark.bgHighlight, 0.8) },
        '&.Mui-focused': { backgroundColor: terraDark.bgHighlight },
        '&::after': { borderBottomColor: terraDark.terracotta },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: terraDark.textMuted,
        '&.Mui-focused': { color: terraDark.terracotta },
        '&.Mui-error': { color: terraDark.error },
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
          color: terraDark.bgDeep,
          '& + .MuiSwitch-track': {
            backgroundColor: terraDark.terracotta,
            opacity: 1,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          boxShadow: `0 0 0 3px ${alpha(terraDark.terracotta, 0.4)}`,
        },
      }),
      thumb: ({ theme }) => ({
        width: 24,
        height: 24,
        boxShadow: theme.shadows[2],
      }),
      track: ({ theme }) => ({
        borderRadius: 16,
        backgroundColor: alpha(terraDark.textMuted, 0.35),
        opacity: 1,
        transition: theme.transitions.create(['background-color'], { duration: 300 }),
      }),
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(terraDark.textMuted, 0.5),
        '&.Mui-checked': { color: terraDark.terracotta },
        '&.Mui-focusVisible': {
          outline: `2px solid ${terraDark.copper}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(terraDark.textMuted, 0.5),
        '&.Mui-checked': { color: terraDark.terracotta },
        '&.Mui-focusVisible': {
          outline: `2px solid ${terraDark.copper}`,
          outlineOffset: 2,
        },
      }),
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: terraDark.terracotta,
        height: 6,
      }),
      thumb: ({ theme }) => ({
        width: 18,
        height: 18,
        backgroundColor: terraDark.bgDeep,
        border: `2px solid ${terraDark.terracotta}`,
        boxShadow: theme.shadows[2],
        '&:hover, &.Mui-focusVisible': {
          boxShadow: `0 0 0 6px ${alpha(terraDark.terracotta, 0.2)}`,
        },
        '&.Mui-active': {
          boxShadow: `0 0 0 10px ${alpha(terraDark.terracotta, 0.25)}`,
        },
      }),
      track: {
        background: `linear-gradient(90deg, ${terraDark.terracottaDark} 0%, ${terraDark.terracotta} 100%)`,
        border: 'none',
      },
      rail: {
        backgroundColor: alpha(terraDark.textMuted, 0.25),
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
        background: `linear-gradient(90deg, ${terraDark.terracottaDark} 0%, ${terraDark.terracotta} 100%)`,
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
        '&:hover': { backgroundColor: alpha(terraDark.textMuted, 0.08) },
        '&.Mui-selected': { color: terraDark.terracotta, fontWeight: 600 },
      }),
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      separator: { color: terraDark.textMuted },
      li: {
        '& a': {
          color: terraDark.terracotta,
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'color 150ms',
          '&:hover': { color: terraDark.terracottaLight, textDecoration: 'underline' },
        },
      },
    },
  },

  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['background-color', 'color'], { duration: 150 }),
        '&.Mui-selected': {
          backgroundColor: terraDark.terracotta,
          color: terraDark.bgDeep,
          fontWeight: 600,
          '&:hover': { backgroundColor: alpha(terraDark.terracotta, 0.85) },
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
        borderRadius: theme.shape.borderRadius * 1.5,
        border: '1px solid',
        fontWeight: 500,
      }),
      standardSuccess: {
        backgroundColor: alpha(terraDark.success, 0.12),
        borderColor: alpha(terraDark.success, 0.35),
        color: terraDark.success,
        '& .MuiAlert-icon': { color: terraDark.success },
      },
      standardError: {
        backgroundColor: alpha(terraDark.error, 0.12),
        borderColor: alpha(terraDark.error, 0.35),
        color: terraDark.error,
        '& .MuiAlert-icon': { color: terraDark.error },
      },
      standardWarning: {
        backgroundColor: alpha(terraDark.warning, 0.12),
        borderColor: alpha(terraDark.warning, 0.35),
        color: terraDark.warning,
        '& .MuiAlert-icon': { color: terraDark.warning },
      },
      standardInfo: {
        backgroundColor: alpha(terraDark.info, 0.12),
        borderColor: alpha(terraDark.info, 0.35),
        color: terraDark.info,
        '& .MuiAlert-icon': { color: terraDark.info },
      },
      outlinedSuccess: { borderColor: terraDark.success, color: terraDark.success },
      outlinedError: { borderColor: terraDark.error, color: terraDark.error },
      outlinedWarning: { borderColor: terraDark.warning, color: terraDark.warning },
      outlinedInfo: { borderColor: terraDark.info, color: terraDark.info },
    },
  },

  // =========================================================================
  // TABLES
  // =========================================================================
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${alpha(terraDark.textMuted, 0.15)}`,
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(terraDark.bgHighlight, 0.6),
        '& .MuiTableCell-head': {
          fontWeight: 600,
          color: terraDark.textLight,
          letterSpacing: '0.02em',
          borderBottom: `2px solid ${alpha(terraDark.textMuted, 0.2)}`,
        },
      },
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(['background-color'], { duration: 150 }),
        '&:nth-of-type(even)': { backgroundColor: alpha(terraDark.bgHighlight, 0.3) },
        '&:hover': { backgroundColor: alpha(terraDark.terracotta, 0.08) },
        '&.Mui-selected': { backgroundColor: alpha(terraDark.terracotta, 0.12) },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${alpha(terraDark.textMuted, 0.1)}`,
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
        '&:hover': { backgroundColor: alpha(terraDark.textMuted, 0.1) },
        '&.Mui-selected': {
          backgroundColor: alpha(terraDark.terracotta, 0.15),
          '&:hover': { backgroundColor: alpha(terraDark.terracotta, 0.2) },
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
        borderRadius: theme.shape.borderRadius * 2,
        backgroundColor: terraDark.bgSurface,
        boxShadow: `0 24px 80px ${alpha('#000', 0.55)}`,
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
        backgroundColor: terraDark.bgSurface,
        borderRight: `1px solid ${alpha(terraDark.textMuted, 0.15)}`,
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
        backgroundColor: alpha(terraDark.textMuted, 0.15),
      }),
      bar: {
        borderRadius: 3,
        background: `linear-gradient(90deg, ${terraDark.terracottaDark} 0%, ${terraDark.terracotta} 100%)`,
      },
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      root: { color: terraDark.terracotta },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(terraDark.textMuted, 0.12),
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
        border: `1px solid ${alpha(terraDark.textMuted, 0.15)}`,
        backgroundColor: terraDark.bgSurface,
        boxShadow: 'none',
        marginBottom: theme.spacing(1),
        '&::before': { display: 'none' },
        '&.Mui-expanded': {
          margin: `0 0 ${theme.spacing(1)} 0`,
          boxShadow: `0 4px 16px ${alpha('#000', 0.3)}`,
        },
      }),
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 56,
        fontWeight: 500,
        '&:hover': { backgroundColor: alpha(terraDark.textMuted, 0.06) },
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
      colorPrimary: { backgroundColor: terraDark.terracotta },
      colorSecondary: { backgroundColor: terraDark.copper },
      colorError: { backgroundColor: terraDark.error },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 600,
        fontSize: '0.875rem',
      }),
      colorDefault: {
        backgroundColor: alpha(terraDark.clay, 0.25),
        color: terraDark.clay,
      },
    },
  },

  MuiAvatarGroup: {
    styleOverrides: {
      avatar: ({ theme }) => ({
        border: `2px solid ${terraDark.bgDeep}`,
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
        backgroundColor: terraDark.textLight,
        color: terraDark.bgDeep,
        fontSize: '0.75rem',
        fontWeight: 500,
        padding: '8px 12px',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
      }),
      arrow: { color: terraDark.textLight },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 1.5,
        backgroundColor: terraDark.bgElevated,
        boxShadow: `0 8px 32px ${alpha('#000', 0.4)}`,
        border: `1px solid ${alpha(terraDark.textMuted, 0.12)}`,
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius / 2,
        margin: '2px 6px',
        padding: '10px 14px',
        transition: theme.transitions.create(['background-color'], { duration: 150 }),
        '&:hover': { backgroundColor: alpha(terraDark.terracotta, 0.1) },
        '&.Mui-selected': {
          backgroundColor: alpha(terraDark.terracotta, 0.18),
          '&:hover': { backgroundColor: alpha(terraDark.terracotta, 0.25) },
        },
      }),
    },
  },

  // =========================================================================
  // STEPPER
  // =========================================================================
  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: alpha(terraDark.textMuted, 0.35),
        '&.Mui-active': { color: terraDark.terracotta },
        '&.Mui-completed': { color: terraDark.success },
      },
    },
  },

  MuiStepLabel: {
    styleOverrides: {
      label: {
        fontWeight: 500,
        '&.Mui-active': { color: terraDark.terracotta, fontWeight: 600 },
        '&.Mui-completed': { color: terraDark.success },
      },
    },
  },

  // =========================================================================
  // APP BAR
  // =========================================================================
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: `0 1px 3px ${alpha('#000', 0.25)}`,
      }),
      colorPrimary: {
        background: `linear-gradient(135deg, ${terraDark.terracotta} 0%, ${terraDark.rust} 100%)`,
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
      icon: { color: terraDark.textMuted, transition: 'transform 200ms' },
      iconOpen: { transform: 'rotate(180deg)' },
    },
  },

  // =========================================================================
  // AUTOCOMPLETE
  // =========================================================================
  MuiAutocomplete: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius * 1.5,
        backgroundColor: terraDark.bgElevated,
        boxShadow: `0 8px 32px ${alpha('#000', 0.4)}`,
        border: `1px solid ${alpha(terraDark.textMuted, 0.12)}`,
        marginTop: 4,
      }),
      option: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius / 2,
        margin: '2px 6px',
        padding: '10px 14px',
        '&:hover': { backgroundColor: alpha(terraDark.terracotta, 0.1) },
        '&[aria-selected="true"]': {
          backgroundColor: alpha(terraDark.terracotta, 0.18),
        },
      }),
    },
  },

  // =========================================================================
  // DIVIDER
  // =========================================================================
  MuiDivider: {
    styleOverrides: {
      root: { borderColor: alpha(terraDark.textMuted, 0.12) },
    },
  },

  // =========================================================================
  // SNACKBAR
  // =========================================================================
  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: terraDark.textLight,
        color: terraDark.bgDeep,
        borderRadius: theme.shape.borderRadius * 1.5,
        fontWeight: 500,
        boxShadow: `0 8px 32px ${alpha('#000', 0.45)}`,
      }),
    },
  },
};

