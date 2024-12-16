import theme from '../themeStub';

const MuiPaper = {
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.common.paper_bk,
      color: theme.palette.text.primary, // Ensure text readability
    },
    rounded: {
      borderRadius: 3,
    },
  },
};

export default {
  MuiPaper,
};