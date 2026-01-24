import { createTheme, alpha } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';
import { solarizedOverrides } from './solarized-overrides';

/**
 * Solarized Light Theme - Award-Winning Design System
 *
 * A comprehensive theme leveraging the full Solarized palette with
 * sophisticated component styling, refined interactions, and warm aesthetics.
 *
 * Palette: Ethan Schoonover's Solarized (all 16 colors)
 * Design: SOTA 2026 award-winning patterns
 */

// =============================================================================
// SOLARIZED PALETTE - Full 16-color canonical palette
// =============================================================================
const sol = {
  // Base tones (background/foreground scale)
  base03: '#002b36',  // Darkest - dark mode background
  base02: '#073642',  // Dark background accent
  base01: '#586e75',  // Emphasized content (light mode)
  base00: '#657b83',  // Body text (light mode)
  base0: '#839496',   // Body text (dark mode)
  base1: '#93a1a1',   // Secondary/comments
  base2: '#eee8d5',   // Background highlights (light mode)
  base3: '#fdf6e3',   // Background (light mode)

  // Accent colors
  yellow: '#b58900',
  orange: '#cb4b16',
  red: '#dc322f',
  magenta: '#d33682',
  violet: '#6c71c4',
  blue: '#268bd2',
  cyan: '#2aa198',
  green: '#859900',
};

// Solarized-tinted warm shadow color
const shadowColor = 'rgba(88, 110, 117, 0.12)';
const shadowColorStrong = 'rgba(88, 110, 117, 0.20)';

// =============================================================================
// CUSTOM SHADOWS - Warm Solarized-tinted elevation system
// =============================================================================
const solarizedShadows = [
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

export const solarizedTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#5aa3dc',
      main: sol.blue,
      dark: '#1a6ca8',
      contrastText: sol.base3,
    },
    secondary: {
      light: '#4fb8b0',
      main: sol.cyan,
      dark: '#1f7a73',
      contrastText: sol.base3,
    },
    error: {
      light: '#e45a58',
      main: sol.red,
      dark: '#a82523',
      contrastText: sol.base3,
    },
    warning: {
      light: '#d97040',
      main: sol.orange,
      dark: '#9a3810',
      contrastText: sol.base3,
    },
    info: {
      light: '#8b8fd3',
      main: sol.violet,
      dark: '#4a4e96',
      contrastText: sol.base3,
    },
    success: {
      light: '#a3b82e',
      main: sol.green,
      dark: '#637300',
      contrastText: sol.base3,
    },
    background: {
      default: sol.base3,
      paper: sol.base2,
    },
    text: {
      primary: sol.base00,
      secondary: sol.base1,
      disabled: alpha(sol.base00, 0.38),
    },
    divider: alpha(sol.base01, 0.12),
    action: {
      active: sol.base00,
      hover: alpha(sol.base01, 0.06),
      selected: alpha(sol.blue, 0.08),
      disabled: alpha(sol.base00, 0.26),
      disabledBackground: alpha(sol.base01, 0.08),
      focus: alpha(sol.cyan, 0.12),
    },
  },

  shape: { borderRadius: 8 },

  shadows: solarizedShadows as any,

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
    ...solarizedOverrides,
  },
});
