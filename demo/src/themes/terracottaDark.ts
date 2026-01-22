import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';

const terracottaDarkTokens = {
  background: 'oklch(0.14 0.008 55)', // --background
  surface: 'oklch(0.18 0.01 55)', // --card
  textPrimary: 'oklch(0.95 0.008 75)', // --foreground
  textSecondary: 'oklch(0.65 0.01 65)', // --muted-foreground
  border: 'oklch(0.28 0.012 55)', // --border
  primary: 'oklch(0.65 0.18 33)', // --primary
  primaryForeground: 'oklch(0.12 0.02 35)', // --primary-foreground
  secondary: 'oklch(0.26 0.012 55)', // --secondary
  secondaryForeground: 'oklch(0.95 0.008 75)', // --secondary-foreground
  error: 'oklch(0.62 0.20 25)', // --destructive
  warning: 'oklch(0.78 0.16 75)', // --warning
  info: 'oklch(0.72 0.12 230)', // --info
  success: 'oklch(0.70 0.18 155)', // --success
};

// Terracotta Dark Theme
// Sourced from ../design-system/design-tokens (Terracotta dark semantics)
export const terracottaDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: terracottaDarkTokens.primary,
      contrastText: terracottaDarkTokens.primaryForeground,
    },
    secondary: {
      main: terracottaDarkTokens.secondary,
      contrastText: terracottaDarkTokens.secondaryForeground,
    },
    error: {
      main: terracottaDarkTokens.error,
      contrastText: 'oklch(0.95 0.01 25)',
    },
    warning: {
      main: terracottaDarkTokens.warning,
      contrastText: 'oklch(0.15 0.02 75)',
    },
    info: {
      main: terracottaDarkTokens.info,
      contrastText: 'oklch(0.12 0.02 230)',
    },
    success: {
      main: terracottaDarkTokens.success,
      contrastText: 'oklch(0.12 0.02 155)',
    },
    background: {
      default: terracottaDarkTokens.background,
      paper: terracottaDarkTokens.surface,
    },
    text: {
      primary: terracottaDarkTokens.textPrimary,
      secondary: terracottaDarkTokens.textSecondary,
    },
    divider: terracottaDarkTokens.border,
  },
  typography: {
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    ...styleOverrides,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${terracottaDarkTokens.border}`,
          boxShadow: '0 18px 40px color-mix(in oklab, black 45%, transparent)',
        },
      },
    },
  },
});
