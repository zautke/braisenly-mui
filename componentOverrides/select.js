/**
 * Theme-Agnostic Select Overrides
 *
 * Pattern Reference: MUI v7 Select.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Select/Select.js
 */

const MuiSelect = {
  styleOverrides: {
    select: ({ theme }) => ({
      border: 'none',
      backgroundColor: (theme.vars || theme).palette.action.selected,
      '&:focus': {
        backgroundColor: (theme.vars || theme).palette.action.selected,
      },
      
      '&.Mui-disabled': {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
        color: (theme.vars || theme).palette.text.disabled,
      },
    }),
    icon: ({ theme }) => ({
      color: (theme.vars || theme).palette.text.secondary,
      width: 22,
      height: 'auto',
      right: 7,
      position: 'absolute',
      pointerEvents: 'none',
    }),
  },
};

export default {
  MuiSelect,
};
