import theme from '../themeStub';

const MuiSelect = {
  styleOverrides: {
    root: {
      // Base Select styles often applied to the InputBase-root or similar.
      // In MUI 7, we target specific slots or use variants.
    },
    select: {
      border: 'none',
      backgroundColor: theme.palette.colorGuide['grey-02'],
      '&:focus': {
        backgroundColor: theme.palette.colorGuide['grey-02'], // Prevent default grey background on focus
      },
      
      '&.Mui-disabled': {
        backgroundColor: theme.palette.colorGuide['grey-02'],
        color: theme.palette.common.white, // Assuming text color change on disabled
      },
    },
    icon: {
      color: theme.palette.colorGuide['grey-03'],
      width: 22,
      height: 'auto',
      right: 7, // Adjust position
      position: 'absolute',
      pointerEvents: 'none', // Ensure click passes through
    },
  },
};

export default {
  MuiSelect,
};