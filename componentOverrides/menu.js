/**
 * Theme-Agnostic Menu Overrides
 *
 * Pattern Reference: MUI v7 Menu.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Menu/Menu.js
 */

const MuiMenu = {
  styleOverrides: {
    paper: ({ theme }) => ({
      padding: 0,
      animation: 'mui-menu-enter 0.2s ease-out',
      transformOrigin: 'top left',
    }),
  },
};

const MuiMenuItem = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
      paddingRight: theme.spacing(1.5),
      paddingLeft: theme.spacing(1.5),
      transition: theme.transitions.create(['background-color', 'color'], { duration: 150 }),
      
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },

      '&.Mui-selected': {
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: (theme.vars || theme).palette.action.selected,
        color: (theme.vars || theme).palette.primary.main,
        
        '&:hover': {
             backgroundColor: (theme.vars || theme).palette.action.selected,
        }
      },
    }),
  },
};

export default {
  MuiMenu,
  MuiMenuItem,
};
