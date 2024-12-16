import theme from '../themeStub';

const MuiList = {
  styleOverrides: {
    padding: {
      paddingTop: 4,
      paddingBottom: 4,
    },
  },
};

const MuiListItem = {
  styleOverrides: {
    root: {
      // Add subtle transition for hover effects
      transition: 'background-color 0.15s ease',
      '&:hover': {
        backgroundColor: theme.palette.colorGuide['grey-01'], // Fallback if '' was empty
      },
    },
    // 'button' prop maps to MuiListItemButton usually, or .MuiListItem-button class in older versions.
    // In v7, <ListItem button> is deprecated in favor of <ListItemButton>.
    // We should style MuiListItemButton if that's what is being used, but for MuiListItem:
    gutters: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 12,
        paddingRight: 12,
      }
    },
  },
};

// Also overriding ListItemButton for compatibility with newer patterns
const MuiListItemButton = {
  styleOverrides: {
    root: {
      transition: 'background-color 0.15s ease',
      '&:hover': {
        backgroundColor: theme.palette.colorGuide['grey-01'],
      },
      paddingTop: 6,
      paddingBottom: 6,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 12,
        paddingRight: 12,
      }
    }
  }
};

const MuiListItemText = {
  styleOverrides: {
    root: {
      paddingRight: 0,
      paddingLeft: 12,
      // Target first-child logic if needed, but flexbox usually handles this better.
      // '&:first-of-type' might be safer than ':first-child' if purely structural.
      '&:first-of-type': { 
        paddingLeft: 0,
        paddingRight: 0,
        ...theme.typography.regular,
      },
    },
    primary: {
      ...theme.typography.regular,
      color: theme.palette.text.primary, // 'interface' was empty
    },
    secondary: {
      ...theme.typography.small,
    }
  }
};

const MuiListItemIcon = {
  styleOverrides: {
    root: {
      marginRight: 0,
      color: theme.palette.action.active,
      height: 15,
      width: 15,
      '&:first-of-type': {
        paddingRight: 0,
      },
    }
  }
};

const MuiListSubheader = {
  styleOverrides: {
    root: {
      [theme.breakpoints.up('sm')]: {
        paddingTop: `${theme.spacing.unit * 3}px`,
        paddingBottom: `${theme.spacing.unit * 2}px`,
        paddingLeft: 12,
        paddingRight: 12,
      }
    }
  }
}

export default {
  MuiList,
  MuiListItem,
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemText,
  MuiListSubheader,
};