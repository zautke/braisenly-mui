import theme from '../themeStub';

const MuiToolbar = {
  styleOverrides: {
    root: {
      [theme.breakpoints.up('sm')]: {
        minHeight: `${theme.spacing.unit * 12}px`,
      },
    },
  },
};

export default {
  MuiToolbar,
};