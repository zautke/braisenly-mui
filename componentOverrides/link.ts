import theme from '../themeStub';

const MuiLink = {
  styleOverrides: {
    root: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      transition: 'color 0.2s ease, text-decoration-color 0.2s ease',
      cursor: 'pointer',
      
      '&:hover': {
        color: theme.palette.primary.dark,
        textDecoration: 'underline',
      },
      
      '&.Mui-focusVisible': {
        outline: '2px solid ' + theme.palette.primary.light,
        outlineOffset: '2px',
        borderRadius: '2px',
      }
    },
    button: {
      verticalAlign: 'middle',
    }
  }
};

export default {
  MuiLink
};
