/**
 * Theme-Agnostic Checkbox Overrides
 *
 * Converted from themeStub anti-pattern to MUI v7 callback pattern.
 * Uses (theme.vars || theme) for CSS variables support.
 */

const MuiCheckbox = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: (theme.vars || theme).palette.text.secondary,
      backgroundColor: 'transparent',
      transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',

      '&:hover': {
        color: (theme.vars || theme).palette.primary.light,
        backgroundColor: 'transparent',
      },

      '&:active': {
        color: (theme.vars || theme).palette.primary.dark,
        transform: 'scale(0.95)', // Subtle press effect
      },

      '& svg': {
        fontSize: 16,
      },

      // Animate the check when checked
      '&.Mui-checked': {
        color: (theme.vars || theme).palette.primary.main,
        backgroundColor: 'transparent',

        '&:hover': {
          color: (theme.vars || theme).palette.primary.light,
        },
        '&:active': {
          color: (theme.vars || theme).palette.primary.dark,
        },

        // Animate the internal SVG path
        '& svg path': {
          animation: 'MuiCheckbox-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }
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
};
