/**
 * Theme-Agnostic Input Overrides
 *
 * Pattern Reference: MUI v7 Input.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Input/Input.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiInput: Components<Theme>['MuiInput'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderRadius: (theme.vars || theme).shape.borderRadius,

      '&.Mui-focused:not(.Mui-disabled):not(.Mui-error)': {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`,
      },
      '&:hover:not(.Mui-disabled):not(.Mui-error)': {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`,
      },
      '&.MuiTablePagination-input:hover:not(.Mui-disabled):not(.Mui-error)': {
        border: 'none',
      },
      '&.Mui-focused.MuiTablePagination-input:not(.Mui-disabled):not(.Mui-error)': {
        border: 'none',
      },
      '&.Mui-disabled': {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
        border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
        '& svg': {
          color: (theme.vars || theme).palette.action.disabled,
        }
      },
      '&.Mui-error': {
        border: `1px solid ${(theme.vars || theme).palette.error.main}`,
        '&.Mui-focused': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
      },
    }),
    input: {
      padding: '5px 8px',
    },
    inputTypeSearch: ({ theme }: { theme: Theme }) => ({
      '&::-webkit-search-cancel-button': {
        fontSize: 16,
      },
      'div[class*="MuiInputAdornment-positionStart"] + &': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    }),
  },
}

const MuiFilledInput: Components<Theme>['MuiFilledInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.action.hover,
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.selected,
      },
      '&.Mui-focused': {
        backgroundColor: (theme.vars || theme).palette.action.selected,
      },
    }),
  },
};

const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
    }),
    notchedOutline: ({ theme }) => ({
      borderColor: (theme.vars || theme).palette.divider,
    }),
  },
};

const MuiInputAdornment: Components<Theme>['MuiInputAdornment'] = {
  styleOverrides: {
    root: {
      maxHeight: 'auto'
    },
    positionStart: ({ theme }: { theme: Theme }) => ({
      marginRight: 0,
      padding: theme.spacing(0.25, 1),
      backgroundColor: (theme.vars || theme).palette.action.hover,
    }),
  },
}

const MuiInputLabel: Components<Theme>['MuiInputLabel'] = {
  styleOverrides: {
    formControl: {
      left: 8,
    },
  },
}

export default {
  MuiInput,
  MuiFilledInput,
  MuiOutlinedInput,
  MuiInputLabel,
} as Components<Theme>;