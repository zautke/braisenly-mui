import theme from '../themeStub';

const MuiDivider = {
  styleOverrides: {
    root: {
      borderColor: theme.palette.colorGuide['grey-03'], // Standard divider color
      margin: `${theme.spacing.unit * 2}px 0`, // Default vertical spacing
    },
    vertical: {
        margin: `0 ${theme.spacing.unit}px`,
    },
    light: {
        borderColor: theme.palette.colorGuide['grey-02'],
    }
  }
};

export default {
  MuiDivider
};
