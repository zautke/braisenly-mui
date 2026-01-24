import { createTheme, alpha } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';
import { terracottaDarkOverrides } from './terracotta-dark-overrides';

/**
 * Terracotta Dark Theme - Award-Winning Design System
 *
 * A comprehensive dark theme leveraging warm earth tones with sophisticated
 * component styling, refined interactions, and organic aesthetics.
 *
 * Palette: Warm terracotta, clay, copper, and sage accents (dark mode adapted)
 * Design: SOTA 2026 award-winning patterns
 */

// =============================================================================
// TERRACOTTA DARK PALETTE - Full warm earth-tone palette for dark mode
// =============================================================================
const terraDark = {
  // Base tones (background scale - dark to light)
  bgDeep: '#0c0806',
  bgSurface: '#15100d',
  bgElevated: '#1e1814',
  bgHighlight: '#29231f',
  bgAccent: '#352d28',

  // Text tones
  textLight: '#f2eee9',
  textMuted: '#948e89',
  textSubtle: '#6e6862',

  // Primary terracotta spectrum (brighter for dark mode)
  terracottaLight: '#f08070',
  terracotta: '#e85b40',
  terracottaDark: '#c44530',

  // Accent earth tones
  rust: '#d07050',
  copper: '#d89468',
  clay: '#b08878',
  sage: '#9ab08a',
  olive: '#859060',

  // Semantic colors
  error: '#e64343',
  warning: '#f2a618',
  info: '#43b2e1',
  success: '#02be6a',
};

// Dark mode shadow colors (deeper blacks)
const shadowColor = 'rgba(0, 0, 0, 0.35)';
const shadowColorStrong = 'rgba(0, 0, 0, 0.55)';

// =============================================================================
// CUSTOM SHADOWS - Deep terracotta-tinted elevation system for dark mode
// =============================================================================
const terracottaDarkShadows = [
  'none',
  `0 1px 2px ${shadowColor}`,
  `0 2px 4px ${shadowColor}`,
  `0 4px 8px ${shadowColor}`,
  `0 6px 12px ${shadowColor}`,
  `0 8px 16px ${shadowColor}`,
  `0 10px 20px ${shadowColor}`,
  `0 12px 24px ${shadowColor}`,
  `0 14px 28px ${shadowColor}`,
  `0 16px 32px ${shadowColor}`,
  `0 18px 36px ${shadowColor}`,
  `0 20px 40px ${shadowColor}`,
  `0 22px 44px ${shadowColor}`,
  `0 24px 48px ${shadowColor}`,
  `0 26px 52px ${shadowColor}`,
  `0 28px 56px ${shadowColor}`,
  `0 30px 60px ${shadowColorStrong}`,
  `0 32px 64px ${shadowColorStrong}`,
  `0 34px 68px ${shadowColorStrong}`,
  `0 36px 72px ${shadowColorStrong}`,
  `0 38px 76px ${shadowColorStrong}`,
  `0 40px 80px ${shadowColorStrong}`,
  `0 42px 84px ${shadowColorStrong}`,
  `0 44px 88px ${shadowColorStrong}`,
  `0 46px 92px ${shadowColorStrong}`,
] as const;

export const terracottaDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: terraDark.terracottaLight,
      main: terraDark.terracotta,
      dark: terraDark.terracottaDark,
      contrastText: terraDark.bgDeep,
    },
    secondary: {
      light: terraDark.copper,
      main: terraDark.clay,
      dark: '#8a6858',
      contrastText: terraDark.bgDeep,
    },
    error: {
      light: '#f06868',
      main: terraDark.error,
      dark: '#c03030',
      contrastText: terraDark.textLight,
    },
    warning: {
      light: '#f8c050',
      main: terraDark.warning,
      dark: '#d08510',
      contrastText: terraDark.bgDeep,
    },
    info: {
      light: '#70c8f0',
      main: terraDark.info,
      dark: '#3090b8',
      contrastText: terraDark.bgDeep,
    },
    success: {
      light: '#40d888',
      main: terraDark.success,
      dark: '#02954a',
      contrastText: terraDark.bgDeep,
    },
    background: {
      default: terraDark.bgDeep,
      paper: terraDark.bgSurface,
    },
    text: {
      primary: terraDark.textLight,
      secondary: terraDark.textMuted,
      disabled: alpha(terraDark.textLight, 0.38),
    },
    divider: alpha(terraDark.textMuted, 0.15),
    action: {
      active: terraDark.textLight,
      hover: alpha(terraDark.textMuted, 0.1),
      selected: alpha(terraDark.terracotta, 0.12),
      disabled: alpha(terraDark.textLight, 0.26),
      disabledBackground: alpha(terraDark.textMuted, 0.1),
      focus: alpha(terraDark.terracotta, 0.18),
    },
  },

  shape: { borderRadius: 8 },

  shadows: terracottaDarkShadows as any,

  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 300, letterSpacing: '-0.02em' },
    h2: { fontWeight: 300, letterSpacing: '-0.01em' },
    h3: { fontWeight: 400, letterSpacing: '-0.01em' },
    h4: { fontWeight: 500, letterSpacing: '-0.005em' },
    h5: { fontWeight: 500, letterSpacing: 0 },
    h6: { fontWeight: 600, letterSpacing: '0.005em' },
    subtitle1: { fontWeight: 500, letterSpacing: '0.01em' },
    subtitle2: { fontWeight: 500, letterSpacing: '0.02em' },
    body1: { letterSpacing: '0.01em', lineHeight: 1.6 },
    body2: { letterSpacing: '0.01em', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.02em' },
    caption: { letterSpacing: '0.03em' },
    overline: { letterSpacing: '0.1em', fontWeight: 600 },
  },

  components: {
    ...styleOverrides,
    ...terracottaDarkOverrides,
  },
});