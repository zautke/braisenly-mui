import theme from '../themeStub';

// theme.spacing = 8

const MuiDrawer = {
  styleOverrides: {
    paper: {
      // Fixed incomplete gradient from original file. Assuming a dark blue/slate theme based on context.
      // Falls back to a solid color if gradient fails.
      backgroundColor: '#1b406c', 
      backgroundImage: `linear-gradient(154deg, #1b406c, ${theme.palette.primary.main})`, 
      ...theme.typography.regular,
      color: theme.palette.common.white,

      // Modernized selectors for ListItems within Drawer
      '& .MuiListItemButton-root:hover': {
        backgroundColor: 'rgba(10, 113, 208, 0.15)',
        transition: 'background-color 0.2s ease',
      },
      '& .MuiListSubheader-sticky': {
        paddingLeft: theme.spacing(2),
      },
      '& .MuiListItem-gutters': {
        paddingLeft: theme.spacing(2),
      },
      '& .MuiListItemButton-root': {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(0.6), // 10
      },
      '& .MuiListItemIcon-root': {
        color: 'inherit',
      },
    },
  },
};

export default {
  MuiDrawer,
};