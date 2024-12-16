import theme from '../themeStub';

const MuiAccordion = {
  styleOverrides: {
    root: {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.colorGuide['white'],
        }
    },
  }
};

const MuiAccordionSummary = {
  styleOverrides: {
    root: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 10}px`,
      minHeight: 12,
      '&.Mui-disabled': {
        opacity: 1,
      },
      '&.Mui-expanded': {
        minHeight: 24,
        borderBottom: '1px solid ' + theme.palette.colorGuide['grey-03'],
      },
      '&:hover:not(.Mui-expanded)': {
        backgroundColor: theme.palette.colorGuide['grey-01'],
      },
    },
    content: {
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
    expandIconWrapper: {
      left: 0,
      color: theme.palette.colorGuide['blue-base'],
      '&.Mui-expanded': {
        transform: 'translateY(-50%) rotate(90deg)',
      }
    },
  },
};

const MuiAccordionDetails = {
  styleOverrides: {
    root: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
};

const MuiAccordionActions = {
  styleOverrides: {
    root: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
};

export default {
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails,
  MuiAccordionActions
};