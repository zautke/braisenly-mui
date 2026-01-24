/**
 * Theme-Agnostic Divider Overrides
 *
 * Pattern Reference: MUI v7 Divider.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Divider/Divider.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiDivider: Components<Theme>['MuiDivider'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderColor: (theme.vars || theme).palette.divider,
      margin: theme.spacing(2, 0),
    }),
    vertical: ({ theme }: { theme: Theme }) => ({
      margin: theme.spacing(0, 1),
    }),
    light: ({ theme }: { theme: Theme }) => ({
      borderColor: (theme.vars || theme).palette.action.hover,
    }),
  },
};

export default {
  MuiDivider
};