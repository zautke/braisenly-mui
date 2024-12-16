import theme from '../themeStub';

const MuiCard = {
  styleOverrides: {
    root: {
      borderRadius: 3,
      ...theme.zDepth.for('card'),
      transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      
      '&:hover': {
        ...theme.zDepth.for('card:hover'),
        transform: 'translateY(-2px)', // Subtle lift effect
      },
    },
  },
};

const MuiCardHeader = {
  styleOverrides: {
    root: {
      paddingBottom: 0,
      paddingTop: 24,
    },
    title: {
      ...theme.typography.title3,
    }
  },
};

const MuiCardContent = {
  styleOverrides: {
    root: {
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      '&:last-child': {
        paddingBottom: theme.spacing(7),
      },
    },
  },
};

export default {
  MuiCard,
  MuiCardHeader,
  MuiCardContent,
};