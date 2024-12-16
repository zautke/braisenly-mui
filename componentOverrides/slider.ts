import theme from '../themeStub';

const MuiSlider = {
  styleOverrides: {
    root: {
      color: theme.palette.primary.main,
      height: 4,
    },
    thumb: {
      width: 16,
      height: 16,
      backgroundColor: theme.palette.common.white,
      border: '2px solid currentColor',
      transition: 'box-shadow 0.2s ease, width 0.2s ease, height 0.2s ease',
      
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${theme.palette.primary.light}33`, // 33 = ~20% opacity
        width: 20, // Grow effect
        height: 20,
      },
      '&.Mui-active': {
        boxShadow: `0px 0px 0px 14px ${theme.palette.primary.light}66`,
        width: 22,
        height: 22,
      },
    },
    rail: {
      color: theme.palette.colorGuide['grey-03'],
      opacity: 1,
      borderRadius: 2,
    },
    track: {
      borderRadius: 2,
      border: 'none',
    },
    mark: {
        backgroundColor: theme.palette.colorGuide['grey-04'],
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        backgroundColor: theme.palette.common.white,
    }
  }
};

export default {
  MuiSlider
};
