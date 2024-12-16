import theme from '../themeStub';

const MuiAlert = {
  styleOverrides: {
    root: {
      borderRadius: 4,
      ...theme.typography.regular,
      alignItems: 'center',
    },
    standardInfo: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.info.dark,
    },
    standardSuccess: {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.dark,
    },
    standardWarning: {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.warning.dark,
    },
    standardError: {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.dark,
    },
    icon: {
      opacity: 0.9,
      padding: '7px 0',
    },
    message: {
      padding: '8px 0',
    }
  }
};

const MuiAlertTitle = {
  styleOverrides: {
    root: {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: 4,
    }
  }
};

export default {
  MuiAlert,
  MuiAlertTitle
};
