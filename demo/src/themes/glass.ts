import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '../../../componentOverrides/index'; // Import the overrides object directly
import palette from '../../../palette';

// Glass/Dark Theme
export const glassTheme = createTheme({
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
  components: {
    // Merge existing functionality overrides
    ...Object.keys(styleOverrides).reduce((acc, key) => {
        // We might want to adjust specific overrides for dark mode here
        // For now, we inherit the structural overrides (like animations)
        acc[key] = styleOverrides[key];
        return acc;
    }, {}),
    // Glassmorphism specifics
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }
      }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '20px', // More rounded for "modern" feel
                textTransform: 'none',
            },
            contained: {
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }
        }
    }
  }
});
