import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';
import { applyThemeVariant } from '@root/mui/themeVariants';

// Base Glass Definition
const baseGlassTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff', // Neon Cyan
    },
    background: {
      default: '#0a1929',
      paper: 'rgba(10, 25, 41, 0.7)', // Translucent
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    }
  },
  typography: {
    fontFamily: '"Barlow", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: styleOverrides,
});

// Apply Variant
export const glassTheme = applyThemeVariant(baseGlassTheme, 'glass');