import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';
import { applyThemeVariant } from '@root/mui/themeVariants';

// Base Cardboard Definition
// Tactile, earthy, rough textures
const baseCardboardTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8b4513', // Saddle Brown
    },
    secondary: {
      main: '#5d4037', // Darker Brown
    },
    background: {
      default: '#e1c699', // Light cardboard
      paper: '#d2b48c',   // Tan
    },
    text: {
      primary: '#3e2723', // Ink/Dark Brown
      secondary: '#5d4037',
    },
    divider: '#a1887f',
  },
  typography: {
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontWeightBold: 700,
  },
  components: styleOverrides,
});

// Apply Variant
export const cardboardTheme = applyThemeVariant(baseCardboardTheme, 'cardboard');
