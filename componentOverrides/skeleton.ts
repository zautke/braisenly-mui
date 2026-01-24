/**
 * Theme-Agnostic Skeleton Overrides
 *
 * Pattern Reference: MUI v7 Skeleton.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Skeleton/Skeleton.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiSkeleton: Components<Theme>['MuiSkeleton'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Shimmer enhancement
      '&::after': {
        background: `linear-gradient(90deg, transparent, ${(theme.vars || theme).palette.action.hover}, transparent)`,
      },
    }),
  },
};

export default {
  MuiSkeleton
} as Components<Theme>;