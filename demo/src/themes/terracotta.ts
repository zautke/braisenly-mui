import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';

const terracottaTokens = {
  background: 'oklch(0.99 0.005 85)', // --background
  surface: 'oklch(1 0 0)', // --card
  textPrimary: 'oklch(0.18 0.015 55)', // --foreground
  textSecondary: 'oklch(0.48 0.015 65)', // --muted-foreground
  border: 'oklch(0.90 0.01 75)', // --border
  primary: 'oklch(0.58 0.185 32)', // --primary
  primaryForeground: 'oklch(0.98 0.01 35)', // --primary-foreground
  secondary: 'oklch(0.965 0.01 80)', // --secondary
  secondaryForeground: 'oklch(0.25 0.015 60)', // --secondary-foreground
  error: 'oklch(0.55 0.22 25)', // --destructive
  warning: 'oklch(0.75 0.16 70)', // --warning
  info: 'oklch(0.70 0.12 230)', // --info
  success: 'oklch(0.65 0.18 155)', // --success
};

// Terracotta Theme
// Sourced from ../design-system/design-tokens (Terracotta base palette + semantics)
export const terracottaTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: terracottaTokens.primary,
      contrastText: terracottaTokens.primaryForeground,
    },
    secondary: {
      main: terracottaTokens.secondary,
      contrastText: terracottaTokens.secondaryForeground,
    },
    error: {
      main: terracottaTokens.error,
      contrastText: 'oklch(0.98 0.01 25)',
    },
    warning: {
      main: terracottaTokens.warning,
      contrastText: 'oklch(0.22 0.03 70)',
    },
    info: {
      main: terracottaTokens.info,
      contrastText: 'oklch(0.98 0.01 230)',
    },
    success: {
      main: terracottaTokens.success,
      contrastText: 'oklch(0.98 0.01 155)',
    },
    background: {
      default: terracottaTokens.background,
      paper: terracottaTokens.surface,
    },
    text: {
      primary: terracottaTokens.textPrimary,
      secondary: terracottaTokens.textSecondary,
    },
    divider: terracottaTokens.border,
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
          border: `1px solid ${terracottaTokens.border}`,
          boxShadow: '0 12px 30px color-mix(in oklab, black 10%, transparent)',
        },
      },
    },
  },
});
