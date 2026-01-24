/**
 * Theme-Agnostic Accordion Overrides
 *
 * Pattern Reference: MUI v7 Accordion.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Accordion/Accordion.js
 */

const MuiAccordion = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-disabled': {
        backgroundColor: (theme.vars || theme).palette.background.paper,
      },
      '&:before': {
        backgroundColor: (theme.vars || theme).palette.divider,
      },
    }),
  },
};

const MuiAccordionSummary = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1.5, 2, 1.5, 3),
      minHeight: 48,
      
      '&.Mui-disabled': {
        opacity: 1,
      },
      '&.Mui-expanded': {
        minHeight: 64,
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
      '&:hover:not(.Mui-expanded)': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    }),
    content: {
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
    expandIconWrapper: ({ theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
      '&.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
    }),
  },
};

const MuiAccordionDetails = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2, 3),
    }),
  },
};

const MuiAccordionActions = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2),
    }),
  },
};

export default {
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails,
  MuiAccordionActions
};
