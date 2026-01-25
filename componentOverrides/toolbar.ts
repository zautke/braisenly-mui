/**
 * Theme-Agnostic Toolbar Overrides
 *
 * Pattern Reference: MUI v7 Toolbar.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Toolbar/Toolbar.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiToolbar: Components<Theme>['MuiToolbar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        minHeight: theme.spacing(12),
      },
    }),
  },
};

export default {
  MuiToolbar,
} as Components<Theme>;
