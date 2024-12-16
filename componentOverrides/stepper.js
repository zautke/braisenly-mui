import theme from '../themeStub';

const MuiStepper = {
  styleOverrides: {
    root: {
      width: '100%',
      borderBottom: '1px solid ' + theme.palette.colorGuide['grey-03'],
      padding: 14,
    }
  }
};

const MuiStepIcon = {
  styleOverrides: {
    root: {
      fontSize: 18,
      transition: 'color 0.3s ease, transform 0.3s ease',
      
      '&.Mui-active': {
        color: theme.palette.primary.main,
        transform: 'scale(1.2)', // Pulse effect on active step
      },
      '&.Mui-completed': {
        color: theme.palette.primary.main,
      },
    },
    text: {
        ...theme.typography.barlowFont,
    },
  }
};

const MuiStepLabel = {
  styleOverrides: {
    label: {
      ...theme.typography.regular,
      transition: 'font-weight 0.2s ease, color 0.2s ease',

      '&.Mui-completed': {
        ...theme.typography.regularSemibold,
        color: theme.palette.text.primary,
      },
      '&.Mui-active': {
        ...theme.typography.regularSemibold,
        color: theme.palette.primary.main,
      },
    }
  }
};

export default {
  MuiStepper,
  MuiStepIcon,
  MuiStepLabel,
};