import theme from '../themeStub';
import {colorGuide as color} from '../colorGuide';

const MuiTabs = {
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.common.white,
      borderBottom: '1px solid ' + color['green-base'],
    },
    indicator: {
      backgroundColor: theme.palette.primary.main,
      height: 2,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth sliding
    },
  },
};

const MuiTab = {
  styleOverrides: {
    root: {
      marginRight: 16,
      '&:last-child': {
        marginRight: 0,
      },
      minWidth: 0,
      [theme.breakpoints.up('md')]: {
        minWidth: 0,
      },
      
      transition: 'color 0.2s ease, font-weight 0.2s ease',

      '&:hover': {
        color: theme.palette.primary.main,
        // fontWeight: 'normal', // Original had 'normal', but usually we want to maintain weight or bold it
      },
      
      '&.Mui-selected': {
        ...theme.typography.arialBase,
        lineHeight: 'normal',
        fontWeight: theme.typography.fontWeightBold, // Enforce bold on selected for A11y/clarity
        color: theme.palette.primary.main,
      },
      
      '&:active': {
        color: color['grey-05'], // Fallback if '' was empty in original
        fontWeight: 'normal',
      },
      
      '&.Mui-disabled': {
        color: theme.palette.text.disabled,
        fontWeight: 'normal',
      },
    },
    
    // Legacy mapping: textColorInherit roughly maps to default behavior, 
    // but usually handled via root styles + overrides.
    // In v7, we stick to 'root'.
    
    // The original 'label' and 'labelContainer' keys are deprecated/removed in newer MUI versions.
    // Styles should be applied to the root or sub-selectors.
  },
};

export default {
  MuiTabs,
  MuiTab,
};
