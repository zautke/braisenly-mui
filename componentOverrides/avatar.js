import theme from '../themeStub';

const MuiAvatar = {
  styleOverrides: {
    root: {
      ...theme.typography.barlowFont,
      lineHeight: 'normal',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      
      '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 0 0 2px ' + theme.palette.background.paper, // pseudo-border
          zIndex: 1, // Ensure it pops over siblings in a stack
      }
    },
    colorDefault: {
      color: '#ffffff',
      backgroundColor: theme.palette.colorGuide['grey-05'],
    }
  },
};

export default {
  MuiAvatar,
};