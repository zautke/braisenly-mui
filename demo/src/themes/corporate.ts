import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '../../../componentOverrides/index';

// Corporate/Minimal Theme
export const corporateTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a237e', // Deep Blue
    },
    secondary: {
      main: '#c62828',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    }
  },
  shape: {
      borderRadius: 0, // Sharp edges
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    button: {
        fontWeight: 600,
    }
  },
  components: {
    // Inherit base logic
    ...styleOverrides,
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 0, // Enforce sharp
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                }
            },
            contained: {
                boxShadow: 'none',
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 0,
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
            }
        }
    }
  }
});
