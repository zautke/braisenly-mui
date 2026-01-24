/**
 * Theme-Agnostic Radio Overrides
 *
 * Pattern Reference: MUI v7 Radio.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Radio/Radio.js
 */

const MuiRadio = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: (theme.vars || theme).palette.text.secondary,
      backgroundColor: 'transparent',
      padding: 9,

      '&:hover': {
        color: (theme.vars || theme).palette.action.hover,
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },

      '&:active': {
        color: (theme.vars || theme).palette.action.selected,
      },

      '& .MuiSvgIcon-root': {
        fontSize: 16,
        transition: theme.transitions.create('transform', { duration: 300 }),
        transform: 'scale(1)',
      },

      '&.Mui-checked': {
        color: (theme.vars || theme).palette.primary.main,
        backgroundColor: 'transparent',

        '& .MuiSvgIcon-root': {
            transform: 'scale(1.2)', 
        },

        '&:hover': {
          color: (theme.vars || theme).palette.primary.dark,
        },
      },

      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
      },
    }),
  },
};

export default {
  MuiRadio,
};
