/**
 * Theme-Agnostic Dialog Overrides
 *
 * Pattern Reference: MUI v7 Dialog.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Dialog/Dialog.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiDialog: Components<Theme>['MuiDialog'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: (theme.vars || theme).shadows[24],
      borderRadius: (theme.vars || theme).shape.borderRadius,
    }),
  },
};

const MuiDialogTitle: Components<Theme>['MuiDialogTitle'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1.5, 2),
      ...theme.typography.h6,
      lineHeight: 'normal',
      backgroundColor: (theme.vars || theme).palette.primary.main,
      color: (theme.vars || theme).palette.primary.contrastText,
    }),
  },
};

const MuiDialogContent: Components<Theme>['MuiDialogContent'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3, 2, 2.5, 2),
      '&:first-of-type': {
        paddingTop: theme.spacing(3),
      },
    }),
  },
};

const MuiDialogContentText: Components<Theme>['MuiDialogContentText'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body1,
      color: (theme.vars || theme).palette.text.secondary,
    }),
  },
};

const MuiDialogActions: Components<Theme>['MuiDialogActions'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      margin: 0,
      padding: theme.spacing(0, 2, 2, 2),
      gap: theme.spacing(1),
    }),
  },
};

export default {
  MuiDialog,
  MuiDialogTitle,
  MuiDialogContent,
  MuiDialogContentText,
  MuiDialogActions,
} as Components<Theme>;
