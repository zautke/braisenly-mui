/**
 * Theme-Agnostic Drawer Overrides
 *
 * Pattern Reference: MUI v7 Drawer.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Drawer/Drawer.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      // Gradient background override - mapped to primary colors
      backgroundColor: (theme.vars || theme).palette.primary.dark,
      backgroundImage: `linear-gradient(154deg, ${(theme.vars || theme).palette.primary.dark}, ${(theme.vars || theme).palette.primary.main})`,
      
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.primary.contrastText,

      // Nested List Styling
      '& .MuiListItemButton-root:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
        transition: theme.transitions.create('background-color', { duration: 200 }),
      },
      '& .MuiListSubheader-sticky': {
        paddingLeft: theme.spacing(2),
      },
      '& .MuiListItem-gutters': {
        paddingLeft: theme.spacing(2),
      },
      '& .MuiListItemButton-root': {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(0.75),
      },
      '& .MuiListItemIcon-root': {
        color: 'inherit',
      },
    }),
  },
};

export default {
  MuiDrawer,
} as Components<Theme>;
