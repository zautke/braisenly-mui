import theme from '../themeStub';

const MuiMenu = {
  styleOverrides: {
    paper: {
      padding: 0,
      // Add a subtle entrance animation for the menu paper
      animation: 'mui-menu-enter 0.2s ease-out',
      transformOrigin: 'top left',
    },
  },
};

const MuiMenuItem = {
  styleOverrides: {
    root: {
      ...theme.typography.regular,
      paddingRight: 12,
      paddingLeft: 12,
      transition: 'background-color 0.15s ease, color 0.15s ease',
      
      '&:hover': {
        backgroundColor: theme.palette.action.hover, 
      },

      '&.Mui-selected': {
        ...theme.typography.regularSemibold,
        backgroundColor: 'transparent', // As per original design, keeps transparent on select?
        // Usually you'd want some visual indication, but adhering to legacy override:
        color: theme.palette.primary.main, 
        
        '&:hover': {
             backgroundColor: theme.palette.action.hover,
        }
      },
    },
  },
};

export default {
  MuiMenu,
  MuiMenuItem,
};