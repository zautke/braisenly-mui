/**
 * Theme-Agnostic Tooltip Overrides
 *
 * Pattern Reference: MUI v7 Tooltip.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Tooltip/Tooltip.js
 */

const MuiTooltip = {
  styleOverrides: {
    tooltip: ({ theme }) => ({
      ...theme.typography.caption,
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      padding: theme.spacing(0.875, 1.5, 1.125, 1.5),
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      boxShadow: (theme.vars || theme).shadows[4],
    }),
    arrow: ({ theme }) => ({
      color: (theme.vars || theme).palette.background.paper,
      '&:before': {
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        boxSizing: 'border-box',
      },
    }),
  },
};

export default {
  MuiTooltip,
};
