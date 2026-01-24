/**
 * Theme-Agnostic SvgIcon Overrides
 *
 * Pattern Reference: MUI v7 SvgIcon.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/SvgIcon/SvgIcon.js
 */

const MuiSvgIcon = {
  styleOverrides: {
    root: ({ theme }) => ({
      fill: 'currentColor', // Default behavior usually better than action.active globally
    }),
  },
};

export default {
  MuiSvgIcon,
};