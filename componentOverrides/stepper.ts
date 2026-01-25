/**
 * Theme-Agnostic Stepper Overrides
 *
 * Pattern Reference: MUI v7 Stepper.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Stepper/Stepper.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiStepper: Components<Theme>['MuiStepper'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: '100%',
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      padding: theme.spacing(1.75),
    }),
  },
};

const MuiStepIcon: Components<Theme>['MuiStepIcon'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      fontSize: 18,
      transition: theme.transitions.create(['color', 'transform'], { duration: 300 }),
      
      '&.Mui-active': {
        color: (theme.vars || theme).palette.primary.main,
        transform: 'scale(1.2)',
      },
      '&.Mui-completed': {
        color: (theme.vars || theme).palette.primary.main,
      },
    }),
    text: ({ theme }) => ({
      fontFamily: theme.typography.fontFamily,
    }),
  },
};

const MuiStepLabel: Components<Theme>['MuiStepLabel'] = {
  styleOverrides: {
    label: ({ theme }) => ({
      ...theme.typography.body2,
      transition: theme.transitions.create(['font-weight', 'color'], { duration: 200 }),

      '&.Mui-completed': {
        fontWeight: theme.typography.fontWeightMedium,
        color: (theme.vars || theme).palette.text.primary,
      },
      '&.Mui-active': {
        fontWeight: theme.typography.fontWeightMedium,
        color: (theme.vars || theme).palette.primary.main,
      },
    }),
  },
};

export default {
  MuiStepper,
  MuiStepIcon,
  MuiStepLabel,
} as Components<Theme>;
