import theme from '../themeStub';

const MuiCheckbox = {
  styleOverrides: {
    root: {
      color: theme.palette.colorGuide['grey-04'],
      backgroundColor: 'transparent',
      transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',

      '&:hover': {
        color: theme.palette.colorGuide['blue-hover'],
        backgroundColor: 'transparent',
      },
      
      '&:active': {
        color: theme.palette.colorGuide['blue-pressed'],
        transform: 'scale(0.95)', // Subtle press effect
      },

      '& svg': {
        fontSize: 16,
      },

      // Bleeding-edge: Animate the check path if using the default icon
      '&.Mui-checked': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        
        '&:hover': {
          color: theme.palette.colorGuide['blue-hover'],
        },
        '&:active': {
          color: theme.palette.colorGuide['blue-pressed'],
        },

        // Animate the internal SVG path
        '& svg path': {
           // Note: This requires the SVG to have a set stroke-dasharray. 
           // Since we can't easily control the default icon's attributes here without replacing it,
           // we focus on the scale/bounce effect of the root.
           animation: 'MuiCheckbox-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }
      },

      '&.Mui-disabled': {
        color: theme.palette.colorGuide['grey-04'],
        backgroundColor: 'transparent',
      },
    },
  },
};

export default {
  MuiCheckbox,
};