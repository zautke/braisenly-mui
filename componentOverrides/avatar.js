/**
 * Theme-Agnostic Avatar Overrides
 *
 * Converted from themeStub anti-pattern to MUI v7 callback pattern.
 * Uses (theme.vars || theme) for CSS variables support.
 */

const MuiAvatar = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.button, // Use theme typography instead of custom font reference
      lineHeight: 'normal',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',

      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: `0 0 0 2px ${(theme.vars || theme).palette.background.paper}`,
        zIndex: 1, // Ensure it pops over siblings in a stack
      }
    }),
    colorDefault: ({ theme }) => ({
      color: (theme.vars || theme).palette.primary.contrastText,
      backgroundColor: (theme.vars || theme).palette.grey[500],
    }),
  },
};

export default {
  MuiAvatar,
};
