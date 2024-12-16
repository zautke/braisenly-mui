import theme from '../themeStub';

const MuiSkeleton = {
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.colorGuide['grey-02'],
      // Bleeding Edge: Shimmer effect enhancement
      '&::after': {
        background: `linear-gradient(90deg, transparent, ${theme.palette.colorGuide['grey-01']}, transparent)`,
      }
    }
  }
};

export default {
  MuiSkeleton
};
