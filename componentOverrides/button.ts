/**
 * Theme-Agnostic Button Overrides
 *
 * This file uses ONLY standard MUI palette tokens, ensuring buttons adapt
 * automatically to any theme (Solarized, Terracotta, or custom).
 *
 * Pattern Reference: MUI v7 Button.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Button/Button.js
 */
import { Theme, Components, alpha } from '@mui/material/styles';

const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.button,
      padding: theme.spacing(0.5, 1.5, 0.75, 1.5), // Was "4px 12px 6px 12px"
      minHeight: 0,
      minWidth: 0,
      textAlign: 'center',
      textTransform: 'uppercase',
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: 0,
    }),

    text: ({ theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
      backgroundColor: 'transparent',
      '&:hover': {
        color: (theme.vars || theme).palette.primary.dark,
        backgroundColor: alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.hoverOpacity
        ),
      },
      '&:active': {
        color: (theme.vars || theme).palette.primary.dark,
        backgroundColor: alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity
        ),
      },
      '&.Mui-focusVisible': {
        color: (theme.vars || theme).palette.primary.dark,
        backgroundColor: alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.focusOpacity
        ),
      },
      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
      },
    }),

    contained: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.primary.main,
      color: (theme.vars || theme).palette.primary.contrastText,
      boxShadow: (theme.vars || theme).shadows[1],
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primary.dark,
        boxShadow: (theme.vars || theme).shadows[2],
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: (theme.vars || theme).palette.primary.dark,
      },
      '&.Mui-focusVisible': {
        backgroundColor: (theme.vars || theme).palette.primary.dark,
        outline: `2px solid ${(theme.vars || theme).palette.primary.light}`,
        outlineOffset: 2,
      },
      '&.Mui-disabled': {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
        color: (theme.vars || theme).palette.action.disabled,
        boxShadow: 'none',
      },
    }),

    outlined: ({ theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
      color: (theme.vars || theme).palette.text.primary,
      backgroundColor: 'transparent',
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      '&:hover': {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`,
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
      '&.Mui-focusVisible': {
        border: `1px solid ${(theme.vars || theme).palette.primary.main}`,
        backgroundColor: alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.focusOpacity
        ),
      },
      '&:active': {
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundColor: (theme.vars || theme).palette.action.selected,
      },
      '&.Mui-disabled': {
        border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
        color: (theme.vars || theme).palette.action.disabled,
        backgroundColor: 'transparent',
      },
    }),
  },
};

const MuiButtonBase: Components<Theme>['MuiButtonBase'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
      },
    }),
  },
};

export default {
  MuiButton,
  MuiButtonBase,
} as Components<Theme>;
