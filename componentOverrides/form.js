/**
 * Theme-Agnostic Form Control Overrides
 *
 * Converted from themeStub anti-pattern to MUI v7 callback pattern.
 * Uses (theme.vars || theme) for CSS variables support.
 */

const MuiFormControl = {};

const MuiFormLabel = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-focused': {
        color: (theme.vars || theme).palette.text.secondary, // Leave label color alone
      },

      '&.Mui-error': {
        color: (theme.vars || theme).palette.error.main, // Error state uses error color
      },
    }),
  },
};

const MuiFormControlLabel = {
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

const MuiFormHelperText = {
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
};
