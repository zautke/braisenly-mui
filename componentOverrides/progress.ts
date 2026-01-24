/**
 * Theme-Agnostic Progress Overrides
 *
 * Pattern Reference: MUI v7 Progress.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/CircularProgress/CircularProgress.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiCircularProgress: Components<Theme>['MuiCircularProgress'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
    }),
  },
};

const MuiLinearProgress: Components<Theme>['MuiLinearProgress'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      height: 6,
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
    }),
    bar: ({ theme }: { theme: Theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      backgroundColor: (theme.vars || theme).palette.primary.main,
    }),
  },
};

export default {
  MuiCircularProgress,
  MuiLinearProgress
} as Components<Theme>;