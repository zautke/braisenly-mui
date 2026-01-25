/**
 * Theme-Agnostic Checkbox Overrides
 *
 * Converted from themeStub anti-pattern to MUI v7 callback pattern.
 * Uses (theme.vars || theme) for CSS variables support.
 */
import { Theme, Components } from '@mui/material/styles';

const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: (theme.vars || theme).palette.text.secondary,
      backgroundColor: 'transparent',
      transition: theme.transitions.create(['color', 'transform'], {
        duration: theme.transitions.duration.shortest,
      }),

      '&:hover': {
        color: (theme.vars || theme).palette.primary.light,
        backgroundColor: 'transparent',
      },

      '&:active': {
        color: (theme.vars || theme).palette.primary.dark,
        transform: 'scale(0.95)',
      },

      '& svg': {
        fontSize: 16,
      },

      '&.Mui-checked': {
        color: (theme.vars || theme).palette.primary.main,
        backgroundColor: 'transparent',

        '&:hover': {
          color: (theme.vars || theme).palette.primary.light,
        },
        '&:active': {
          color: (theme.vars || theme).palette.primary.dark,
        },
      },

      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
        backgroundColor: 'transparent',
      },
    }),
  },
};

export default {
  MuiCheckbox,
} as Components<Theme>;
