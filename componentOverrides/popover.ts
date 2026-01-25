/**
 * Theme-Agnostic Popover Overrides
 *
 * Pattern Reference: MUI v7 Popover.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Popover/Popover.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiPopover: Components<Theme>['MuiPopover'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      boxShadow: (theme.vars || theme).shadows[8],
      margin: 0,
      padding: theme.spacing(1.5),
    }),
  },
};

export default {
  MuiPopover,
} as Components<Theme>;
