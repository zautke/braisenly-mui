import theme from '../themeStub';

const MuiSnackbar = {
  styleOverrides: {
    root: {
      [theme.breakpoints.up('sm')]: {
        borderRadius: '3px',
      },
    },
  },
};

const MuiSnackbarContent = {
  styleOverrides: {
    root: {
      [theme.breakpoints.up('sm')]: {
        borderRadius: '3px',
      },
      color: theme.palette.common.white,
      backgroundColor: theme.palette.colorGuide['brand-deep-space'],
      padding: `0 0 0 ${theme.spacing.unit * 4}px`,
      boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)', // Elevation
    },
    message: {
      ...theme.typography.regular,
      color: theme.palette.common.white,
      padding: `${theme.spacing.unit * 3}px 0px`,
    },
    action: {
      ...theme.typography.regular,
      color: theme.palette.common.white,
      height: '100%',
      marginRight: 0,
      borderLeft: '1px solid',
      borderColor: '#354969',
      paddingLeft: `${theme.spacing.unit * 3}px`,
      padding: `11px ${theme.spacing.unit * 3}px`,
    }
  },
};

export default {
  MuiSnackbar,
  MuiSnackbarContent,
};