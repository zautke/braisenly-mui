/**
 * Theme-Agnostic Accordion Overrides
 *
 * Pattern Reference: MUI v7 Accordion.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Accordion/Accordion.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiAccordion: Components<Theme>['MuiAccordion'] = {
  defaultProps: {
    disableGutters: true,
    elevation: 0,
    square: false,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: 'transparent', // Default is often paper, but transparency allows nesting
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderRadius: (theme.vars || theme).shape.borderRadius,
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none', // Hide default divider line
      },
      '&.Mui-disabled': {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
      },
      '&.Mui-expanded': {
        margin: 0, // Reset default expansion margin
      },
    }),
  },
};

const MuiAccordionSummary: Components<Theme>['MuiAccordionSummary'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1.5, 2),
      minHeight: 48,
      backgroundColor: (theme.vars || theme).palette.background.paper,
      borderRadius: (theme.vars || theme).shape.borderRadius, // Inherit or explicit?
      transition: theme.transitions.create(['background-color', 'margin', 'min-height'], {
        duration: theme.transitions.duration.shortest,
      }),
      
      '&.Mui-disabled': {
        opacity: 1,
        color: (theme.vars || theme).palette.text.disabled,
      },
      '&.Mui-expanded': {
        minHeight: 48, // Keep compact
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
      '&:hover:not(.Mui-disabled):not(.Mui-expanded)': {
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
      color: (theme.vars || theme).palette.text.secondary,
      '&.Mui-expanded': {
        transform: 'rotate(180deg)',
        color: (theme.vars || theme).palette.primary.main,
      },
    }),
  },
};

const MuiAccordionDetails: Components<Theme>['MuiAccordionDetails'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2),
      backgroundColor: (theme.vars || theme).palette.background.paper,
      borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
    }),
  },
};

const MuiAccordionActions: Components<Theme>['MuiAccordionActions'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(1, 2),
      justifyContent: 'flex-end',
      borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
  },
};

export default {
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails,
  MuiAccordionActions
} as Components<Theme>;
