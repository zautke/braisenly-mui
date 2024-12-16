import theme from '../themeStub';

const MuiRadio = {
  styleOverrides: {
    root: {
      color: theme.palette.colorGuide['grey-04'],
      backgroundColor: 'transparent',
      padding: 9, // Standardize touch target

      '&:hover': {
        color: theme.palette.colorGuide['blue-hover'],
        backgroundColor: 'transparent',
      },

      '&:active': {
        color: theme.palette.colorGuide['blue-pressed'],
      },

      '& .MuiSvgIcon-root': {
        fontSize: 16,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy transition
        transform: 'scale(1)',
        
        // Target the inner circle if possible, or just scale the whole icon
        '& circle': {
            transition: 'r 0.3s ease-in-out',
        }
      },

      '&.Mui-checked': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',

        '& .MuiSvgIcon-root': {
            transform: 'scale(1.2)', // "Bleeding edge" scale effect
        },

        '&:hover': {
          color: theme.palette.colorGuide['blue-hover'],
        },
        '&:active': {
          color: theme.palette.colorGuide['blue-pressed'],
        },
      },

      '&.Mui-disabled': {
        color: theme.palette.colorGuide['grey-04'],
        backgroundColor: 'transparent',
      },
    },
  },
};

export default {
  MuiRadio,
};