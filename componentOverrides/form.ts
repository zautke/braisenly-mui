/**
 * Theme-Agnostic Form Control Overrides
 *
 * Converted from themeStub anti-pattern to MUI v7 callback pattern.
 * Uses (theme.vars || theme) for CSS variables support.
 */
import { Theme, Components } from '@mui/material/styles';

const MuiFormControl: Components<Theme>['MuiFormControl'] = {};

const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-focused': {
        color: (theme.vars || theme).palette.text.secondary,
      },
      '&.Mui-error': {
        color: (theme.vars || theme).palette.error.main,
      },
    }),
  },
};

const MuiFormControlLabel: Components<Theme>['MuiFormControlLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    label: ({ theme }) => ({
      ...theme.typography.body2,
      marginTop: -1,
    }),
  },
};

const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginTop: 5,
      ...theme.typography.caption,
    }),
  },
};

export default {
  MuiFormControl,
  MuiFormLabel,
  MuiFormControlLabel,
  MuiFormHelperText,
} as Components<Theme>;
