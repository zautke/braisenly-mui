/**
 * MuiSwitch Theme Override
 *
 * iOS-style switch with custom dimensions (42x26).
 * Uses ONLY theme tokens for colors - no hardcoded values.
 *
 * Theme tokens used:
 * - palette.common.white: Thumb color
 * - palette.success.main: Checked track and focus visible thumb
 * - palette.grey[400]: Unchecked track background
 * - palette.divider: Track border color
 * - palette.action.disabled: Disabled thumb color
 * - palette.action.disabledBackground: Disabled track background
 * - shadows[1]: Thumb shadow
 * - transitions.create(): Smooth state transitions
 */
import { Theme, Components } from '@mui/material/styles';

const MuiSwitch: Components<Theme>['MuiSwitch'] = {
  styleOverrides: {
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: 8,
    },

    switchBase: ({ theme }) => ({
      padding: 1,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: (theme.vars || theme).palette.common.white,
        '& + .MuiSwitch-track': {
          backgroundColor: (theme.vars || theme).palette.success.main,
          opacity: 1,
          border: 'none',
        },
      },
      '&.Mui-focusVisible': {
        '& .MuiSwitch-thumb': {
          color: (theme.vars || theme).palette.success.main,
          border: `6px solid ${(theme.vars || theme).palette.common.white}`,
        },
      },
      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.action.disabled,
        '& + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
    }),

    thumb: ({ theme }) => ({
      width: 24,
      height: 24,
      boxShadow: (theme.vars || theme).shadows[1],
    }),

    track: ({ theme }) => ({
      borderRadius: 26 / 2,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundColor: (theme.vars || theme).palette.grey[400],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border'], {
        duration: 500,
      }),
    }),
  },
};

export default {
  MuiSwitch,
} as Components<Theme>;
