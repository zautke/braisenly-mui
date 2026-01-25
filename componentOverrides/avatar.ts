/**
 * Theme-Agnostic Avatar Overrides
 *
 * Converted from themeStub anti-pattern to MUI v7 callback pattern.
 * Uses (theme.vars || theme) for CSS variables support.
 */
import { Theme, Components } from '@mui/material/styles';

const MuiAvatar: Components<Theme>['MuiAvatar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.button,
      lineHeight: 'normal',
      transition: theme.transitions.create(['transform', 'box-shadow'], {
        duration: 200,
      }),

      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: `0 0 0 2px ${(theme.vars || theme).palette.background.paper}`,
        zIndex: 1,
      },
    }),
    colorDefault: ({ theme }) => ({
      color: (theme.vars || theme).palette.primary.contrastText,
      backgroundColor: (theme.vars || theme).palette.grey[500],
    }),
  },
};

export default {
  MuiAvatar,
} as Components<Theme>;
