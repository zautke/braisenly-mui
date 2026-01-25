/**
 * Theme-Agnostic Chip Overrides
 *
 * This file uses ONLY standard MUI palette tokens, ensuring chips adapt
 * automatically to any theme (Solarized, Terracotta, or custom).
 *
 * Pattern Reference: MUI v7 Chip.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Chip/Chip.js
 */
import { Theme, Components, alpha } from '@mui/material/styles';
import { chipClasses } from '@mui/material/Chip';

const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      ...theme.typography.body2,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundColor: (theme.vars || theme).palette.background.paper,
      height: 'auto',
      padding: 0,
      transition: 'background-color 0.2s, box-shadow 0.2s, border-color 0.2s, transform 0.1s',

      '&:active': {
        transform: 'scale(0.98)',
      },

      [`&.${chipClasses.filled}.${chipClasses.colorPrimary}`]: {
        backgroundColor: (theme.vars || theme).palette.primary.main,
        color: (theme.vars || theme).palette.primary.contrastText,
        border: 'none',
      },

      [`&.${chipClasses.filled}.${chipClasses.colorSecondary}`]: {
        backgroundColor: (theme.vars || theme).palette.secondary.main,
        color: (theme.vars || theme).palette.secondary.contrastText,
        border: 'none',
      },

      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary}`]: {
        borderColor: (theme.vars || theme).palette.primary.main,
        color: (theme.vars || theme).palette.primary.main,
      },

      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary}`]: {
        borderColor: (theme.vars || theme).palette.secondary.main,
        color: (theme.vars || theme).palette.secondary.main,
      },

      '&.Mui-disabled': {
        opacity: (theme.vars || theme).palette.action.disabledOpacity,
        color: (theme.vars || theme).palette.action.disabled,
        borderColor: (theme.vars || theme).palette.action.disabled,
      },
    }),

    label: ({ theme }) => ({
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(0.25),
      paddingBottom: theme.spacing(0.75),

      '&:not(:first-of-type)': {
        paddingLeft: theme.spacing(1.5),
      },
    }),

    clickable: ({ theme }) => ({
      cursor: 'pointer',
      '&:hover': {
        borderColor: (theme.vars || theme).palette.text.secondary,
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
      '&:focus': {
        backgroundColor: (theme.vars || theme).palette.primary.main,
        borderColor: (theme.vars || theme).palette.primary.main,
        [`.${chipClasses.label}`]: {
          color: (theme.vars || theme).palette.primary.contrastText,
        },
      },
      [`&.${chipClasses.colorPrimary}:hover`]: {
        backgroundColor: alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.hoverOpacity + 0.1
        ),
      },
      [`&.${chipClasses.colorSecondary}:hover`]: {
        backgroundColor: alpha(
          (theme.vars || theme).palette.secondary.main,
          (theme.vars || theme).palette.action.hoverOpacity + 0.1
        ),
      },
    }),

    deletable: ({ theme }) => ({
      '&:focus': {
        border: `1px solid ${(theme.vars || theme).palette.primary.main}`,
        backgroundColor: (theme.vars || theme).palette.primary.main,
        [`.${chipClasses.deleteIcon}`]: {
          color: (theme.vars || theme).palette.primary.contrastText,
        },
      },
    }),

    avatar: ({ theme }) => ({
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(-1),
    }),

    deleteIcon: ({ theme }) => ({
      color: (theme.vars || theme).palette.action.active,
      margin: 0,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      height: 24,
      width: 24,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
      transition: 'color 0.2s',
      '&:hover': {
        color: (theme.vars || theme).palette.error.main,
      },
    }),

    icon: ({ theme }) => ({
      color: 'inherit',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(-0.5),
    }),
  },
};

export default {
  MuiChip,
} as Components<Theme>;
