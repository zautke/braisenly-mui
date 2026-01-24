/**
 * Theme-Agnostic Tabs Overrides
 *
 * Pattern Reference: MUI v7 Tabs.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Tabs/Tabs.js
 */

const MuiTabs = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.paper,
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
    indicator: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.primary.main,
      height: 2,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
  },
};

const MuiTab = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: 0,
      },
      minWidth: 0,
      [theme.breakpoints.up('md')]: {
        minWidth: 0,
      },
      
      transition: theme.transitions.create(['color', 'font-weight'], { duration: 200 }),

      '&:hover': {
        color: (theme.vars || theme).palette.primary.main,
      },
      
      '&.Mui-selected': {
        ...theme.typography.body2,
        lineHeight: 'normal',
        fontWeight: theme.typography.fontWeightBold,
        color: (theme.vars || theme).palette.primary.main,
      },
      
      '&:active': {
        color: (theme.vars || theme).palette.action.active,
        fontWeight: 'normal',
      },
      
      '&.Mui-disabled': {
        color: (theme.vars || theme).palette.text.disabled,
        fontWeight: 'normal',
      },
    }),
  },
};

export default {
  MuiTabs,
  MuiTab,
};