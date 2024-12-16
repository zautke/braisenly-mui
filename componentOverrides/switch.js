import theme from '../themeStub';

// Bleeding Edge: iOS-style animated switch
const MuiSwitch = {
  styleOverrides: {
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: 8,
    },
    switchBase: {
      padding: 1,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.success.main, // iOS Green or theme primary
          opacity: 1,
          border: 'none',
        },
      },
      '&.Mui-focusVisible': {
        '& .MuiSwitch-thumb': {
          color: '#52d869',
          border: '6px solid #fff',
        },
      },
    },
    thumb: {
      width: 24,
      height: 24,
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.colorGuide['grey-04']}`,
      backgroundColor: theme.palette.colorGuide['grey-05'], // iOS Grey
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'], {
        duration: 500,
      }),
    },
  },
};

export default {
  MuiSwitch,
};