import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '../../../componentOverrides/index';

// Solarized Light Theme
// Based on Ethan Schoonover's Solarized color scheme
// Warm cream backgrounds, monospace typography, subtle warm shadows
export const solarizedTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#268bd2', // Solarized Blue
    },
    secondary: {
      main: '#2aa198', // Solarized Cyan
    },
    error: {
      main: '#dc322f', // Solarized Red
    },
    warning: {
      main: '#cb4b16', // Solarized Orange
    },
    info: {
      main: '#6c71c4', // Solarized Violet
    },
    success: {
      main: '#859900', // Solarized Green
    },
    background: {
      default: '#fdf6e3', // Solarized Base3
      paper: '#eee8d5',   // Solarized Base2
    },
    text: {
      primary: '#657b83',   // Solarized Base00
      secondary: '#93a1a1', // Solarized Base1
    },
    divider: '#edead9',
  },
  shape: {
    borderRadius: 6, // Medium border-radius
  },
  typography: {
    fontFamily: '"Victor Mono Variable", "Fira Code", "Consolas", monospace',
    h1: { fontWeight: 300 },
    h2: { fontWeight: 300 },
    h3: { fontWeight: 400 },
    h4: { fontWeight: 400 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: {
      fontWeight: 500,
      textTransform: 'none', // More readable button text
    },
  },
  components: {
    ...styleOverrides,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default gradient
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(101, 123, 131, 0.12), 0 1px 2px rgba(101, 123, 131, 0.08)',
        },
        elevation2: {
          boxShadow: '0 3px 6px rgba(101, 123, 131, 0.12), 0 2px 4px rgba(101, 123, 131, 0.08)',
        },
        elevation3: {
          boxShadow: '0 10px 20px rgba(101, 123, 131, 0.12), 0 3px 6px rgba(101, 123, 131, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          border: '1px solid #edead9',
          boxShadow: '0 2px 8px rgba(101, 123, 131, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(101, 123, 131, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(101, 123, 131, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fdf6e3',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#93a1a1',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});
