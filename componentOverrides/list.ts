/**
 * Theme-Agnostic List Overrides
 *
 * Pattern Reference: MUI v7 List.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/List/List.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiList: Components<Theme>['MuiList'] = {
  styleOverrides: {
    padding: ({ theme }) => ({
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    }),
  },
};

const MuiListItem: Components<Theme>['MuiListItem'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      transition: theme.transitions.create('background-color', { duration: 150 }),
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    }),
    gutters: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
      },
    }),
  },
};

const MuiListItemButton: Components<Theme>['MuiListItemButton'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      transition: theme.transitions.create('background-color', { duration: 150 }),
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
      paddingTop: theme.spacing(0.75),
      paddingBottom: theme.spacing(0.75),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
      },
    }),
  },
};

const MuiListItemText: Components<Theme>['MuiListItemText'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingRight: 0,
      paddingLeft: theme.spacing(1.5),
      '&:first-of-type': { 
        paddingLeft: 0,
        paddingRight: 0,
        ...theme.typography.body2,
      },
    }),
    primary: ({ theme }) => ({
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.text.primary,
    }),
    secondary: ({ theme }) => ({
      ...theme.typography.caption,
    })
  }
};

const MuiListItemIcon: Components<Theme>['MuiListItemIcon'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginRight: 0,
      color: (theme.vars || theme).palette.action.active,
      height: 15,
      width: 15,
      '&:first-of-type': {
        paddingRight: 0,
      },
    }),
  }
};

const MuiListSubheader: Components<Theme>['MuiListSubheader'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
      }
    }),
  }
}

export default {
  MuiList,
  MuiListItem,
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemText,
  MuiListSubheader,
} as Components<Theme>;
