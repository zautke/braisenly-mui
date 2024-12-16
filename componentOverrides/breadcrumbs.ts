import theme from '../themeStub';

const MuiBreadcrumbs = {
  styleOverrides: {
    root: {
      ...theme.typography.regular,
      color: theme.palette.text.secondary,
    },
    separator: {
      marginLeft: 8,
      marginRight: 8,
      color: theme.palette.text.disabled,
    },
    li: {
        '& a': {
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
                textDecoration: 'underline',
            }
        }
    }
  }
};

export default {
  MuiBreadcrumbs
};
