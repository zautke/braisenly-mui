import theme from '../themeStub';

const MuiCircularProgress = {
  styleOverrides: {
    root: {
      color: theme.palette.primary.main,
    },
    circle: {
      // Custom animation tuning if needed
    }
  }
};

const MuiLinearProgress = {
  styleOverrides: {
    root: {
      borderRadius: 4,
      height: 6,
      backgroundColor: theme.palette.colorGuide['grey-02'],
    },
    bar: {
      borderRadius: 4,
      backgroundColor: theme.palette.primary.main,
    }
  }
};

export default {
  MuiCircularProgress,
  MuiLinearProgress
};
