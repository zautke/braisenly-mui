/**
 * Theme-Agnostic Popover Overrides
 *
 * Pattern Reference: MUI v7 Popover.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Popover/Popover.js
 */

const MuiPopover = {
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      boxShadow: (theme.vars || theme).shadows[8],
      margin: 0,
      padding: theme.spacing(1.5),
      animation: 'mui-popover-enter 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  },
};

export default {
  MuiPopover,
};
