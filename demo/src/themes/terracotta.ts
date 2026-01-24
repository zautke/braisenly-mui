import { createTheme, alpha } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';
import { terracottaOverrides } from './terracotta-overrides';

/**
 * Terracotta Light Theme - Award-Winning Design System
 *
 * A comprehensive theme leveraging warm earth tones with sophisticated
 * component styling, refined interactions, and organic aesthetics.
 *
 * Palette: Warm terracotta, clay, copper, and sage accents
 * Design: SOTA 2026 award-winning patterns
 */

// =============================================================================
// TERRACOTTA PALETTE - Full warm earth-tone palette
// =============================================================================
const terra = {
  // Base tones (background/foreground scale)
  cream: '#fdfcf8',
  warmWhite: '#ffffff',
  sandLight: '#f7f3ec',
  sandMedium: '#e2ddd7',
  sandDark: '#c9c1b8',
  sand: '#b0a79c',

  // Text tones
  textDark: '#17100b',
  textMuted: '#645c55',
  textLight: '#948e89',

  // Primary terracotta spectrum
  terracottaLight: '#e0654e',
  terracotta: '#d14129',
  terracottaDark: '#a8331f',

  // Accent earth tones
  rust: '#b85c38',
  copper: '#c67c4e',
  clay: '#9a7b6d',
  sage: '#8ba07c',
  olive: '#6b7c4f',

  // Semantic colors
  error: '#d40924',
  warning: '#ed990e',
  info: '#3bacda',
  success: '#0fad5b',
};

// Terracotta-tinted warm shadow color
const shadowColor = 'rgba(100, 92, 85, 0.12)';
const shadowColorStrong = 'rgba(100, 92, 85, 0.22)';

// =============================================================================
// CUSTOM SHADOWS - Warm terracotta-tinted elevation system
// =============================================================================
const terracottaShadows = [
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

export const terracottaTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: terra.terracottaLight,
      main: terra.terracotta,
      dark: terra.terracottaDark,
      contrastText: terra.cream,
    },
    secondary: {
      light: terra.copper,
      main: terra.clay,
      dark: '#7a5f52',
      contrastText: terra.cream,
    },
    error: {
      light: '#e04048',
      main: terra.error,
      dark: '#a80720',
      contrastText: terra.cream,
    },
    warning: {
      light: '#f5b340',
      main: terra.warning,
      dark: '#c07a08',
      contrastText: terra.textDark,
    },
    info: {
      light: '#68c4e8',
      main: terra.info,
      dark: '#2a8ab0',
      contrastText: terra.cream,
    },
    success: {
      light: '#45c580',
      main: terra.success,
      dark: '#0a8544',
      contrastText: terra.cream,
    },
    background: {
      default: terra.cream,
      paper: terra.warmWhite,
    },
    text: {
      primary: terra.textDark,
      secondary: terra.textMuted,
      disabled: alpha(terra.textDark, 0.38),
    },
    divider: alpha(terra.textMuted, 0.12),
    action: {
      active: terra.textDark,
      hover: alpha(terra.textMuted, 0.06),
      selected: alpha(terra.terracotta, 0.08),
      disabled: alpha(terra.textDark, 0.26),
      disabledBackground: alpha(terra.textMuted, 0.08),
      focus: alpha(terra.terracotta, 0.12),
    },
  },

  shape: { borderRadius: 8 },

  shadows: terracottaShadows as any,

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
    ...terracottaOverrides,
  },
});