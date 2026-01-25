/**
 * Theme-Agnostic Snackbar Overrides
 *
 * Pattern Reference: MUI v7 Snackbar.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Snackbar/Snackbar.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiSnackbar: Components<Theme>['MuiSnackbar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        borderRadius: (theme.vars || theme).shape.borderRadius,
      },
    }),
  },
};

const MuiSnackbarContent: Components<Theme>['MuiSnackbarContent'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        borderRadius: (theme.vars || theme).shape.borderRadius,
      },
      color: (theme.vars || theme).palette.common.white,
      backgroundColor: (theme.vars || theme).palette.text.primary,
      padding: theme.spacing(0, 0, 0, 2),
      boxShadow: (theme.vars || theme).shadows[6],
    }),
    message: ({ theme }) => ({
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.common.white,
      padding: theme.spacing(1.5, 0),
    }),
    action: ({ theme }) => ({
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.common.white,
      height: '100%',
      marginRight: 0,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
      paddingLeft: theme.spacing(1.5),
      padding: theme.spacing(1.375, 1.5),
    })
  },
};

export default {
  MuiSnackbar,
  MuiSnackbarContent,
} as Components<Theme>;
