/**
 * Theme-Agnostic Paper Overrides
 *
 * Pattern Reference: MUI v7 Paper.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Paper/Paper.js
 */

const MuiPaper = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
    }),
    rounded: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
    }),
  },
};

export default {
  MuiPaper,
};
