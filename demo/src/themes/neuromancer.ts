import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';
import { applyThemeVariant } from '@root/mui/themeVariants';

// Base Neuromancer Definition
// High contrast, neon accents, dark void background
const baseNeuromancerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0aff00', // Matrix Green
    },
    secondary: {
      main: '#ff00ff', // Cyber Magenta
    },
    background: {
      default: '#050505', // Void Black
      paper: '#0a0a0a',   // Off-black
    },
    text: {
      primary: '#0aff00', // Green text default
      secondary: '#00cc00',
    },
    divider: '#111111',
  },
  typography: {
    fontFamily: '"Courier New", "Consolas", "Roboto Mono", monospace',
    h1: { letterSpacing: '0.1em', textTransform: 'uppercase' },
    h2: { letterSpacing: '0.1em', textTransform: 'uppercase' },
    h3: { letterSpacing: '0.1em', textTransform: 'uppercase' },
    button: { letterSpacing: '0.1em', fontWeight: 700 },
  },
  components: styleOverrides,
});

// Apply Variant
export const neuromancerTheme = applyThemeVariant(baseNeuromancerTheme, 'neuromancer');
