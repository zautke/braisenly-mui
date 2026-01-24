/**
 * Theme-Agnostic Alert Overrides
 *
 * Pattern Reference: MUI v7 Alert.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Alert/Alert.js
 */

import { Theme, Components } from '@mui/material/styles';
import theme from '../themeStub';

const MuiAlert: Components<Theme>['MuiAlert'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      borderRadius: (theme.vars || theme).shape.borderRadius,
      alignItems: 'center',
      ...theme.typography.body2,
    }),
    
    // Standard variants - mapping light/dark palette channels
    standardInfo: ({ theme }: { theme: Theme }) => ({
      backgroundColor: (theme.vars || theme).palette.info.light,
      color: (theme.vars || theme).palette.info.dark,
    }),
    standardSuccess: ({ theme }: { theme: Theme }) => ({
      backgroundColor: (theme.vars || theme).palette.success.light,
      color: (theme.vars || theme).palette.success.dark,
    }),
    standardWarning: ({ theme }: { theme: Theme }) => ({
      backgroundColor: (theme.vars || theme).palette.warning.light,
      color: (theme.vars || theme).palette.warning.dark,
    }),
    standardError: ({ theme }: { theme: Theme }) => ({
      backgroundColor: (theme.vars || theme).palette.error.light,
      color: (theme.vars || theme).palette.error.dark,
    }),
    
    icon: ({ theme }: { theme: Theme }) => ({
      opacity: 0.9,
      padding: theme.spacing(0.875, 0),
    }),
    
    message: ({ theme }: { theme: Theme }) => ({
      padding: theme.spacing(1, 0),
    }),
  },
};

const MuiAlertTitle: Components<Theme>['MuiAlertTitle'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(0.5),
    }),
  },
};

export default {
  MuiAlert,
  MuiAlertTitle
};