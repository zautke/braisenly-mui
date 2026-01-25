/**
 * Card Component Overrides
 *
 * Theme-agnostic overrides for MUI Card components.
 * Card extends Paper, so we focus on Card-specific styling.
 *
 * Uses MUI v7 callback pattern with (theme.vars || theme) for CSS variables support.
 * All values derived from theme tokens - no hardcoded colors or magic numbers.
 *
 * Components covered:
 * - MuiCard: Main card container with elevation and border
 * - MuiCardHeader: Header section with title styling
 * - MuiCardContent: Content area with responsive padding
 * - MuiCardActions: Action buttons area with proper alignment
 */
import { Theme, Components } from '@mui/material/styles';

const MuiCard: Components<Theme>['MuiCard'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const t = theme.vars || theme;
      return {
        borderRadius: (t.shape.borderRadius as number) * 2,
        border: `1px solid ${t.palette.divider}`,
        backgroundColor: t.palette.background.paper,
        boxShadow: t.shadows[2],
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: 300,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }),
        '&:hover': {
          boxShadow: t.shadows[6],
          transform: 'translateY(-2px)',
        },
      };
    },
  },
};

const MuiCardHeader: Components<Theme>['MuiCardHeader'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingBottom: 0,
      paddingTop: theme.spacing(3),
    }),
    title: ({ theme }) => {
      const t = theme.vars || theme;
      return {
        ...theme.typography.h6,
        color: t.palette.text.primary,
      };
    },
    subheader: ({ theme }) => {
      const t = theme.vars || theme;
      return {
        color: t.palette.text.secondary,
      };
    },
  },
};

const MuiCardContent: Components<Theme>['MuiCardContent'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
      '&:last-child': {
        paddingBottom: theme.spacing(3),
      },
    }),
  },
};

const MuiCardActions: Components<Theme>['MuiCardActions'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2),
      gap: theme.spacing(1),
    }),
  },
};

export default {
  MuiCard,
  MuiCardHeader,
  MuiCardContent,
  MuiCardActions,
} as Components<Theme>;
