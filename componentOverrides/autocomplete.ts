/**
 * Theme-Agnostic Autocomplete Overrides
 *
 * Pattern Reference: MUI v7 Autocomplete.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Autocomplete/Autocomplete.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  styleOverrides: {
    paper: ({ theme }: { theme: Theme }) => ({
      boxShadow: (theme.vars || theme).shadows[8],
      borderRadius: (theme.vars || theme).shape.borderRadius,
      marginTop: theme.spacing(0.5),
    }),
    
    listbox: ({ theme }: { theme: Theme }) => ({
      padding: 0,
      '& .MuiAutocomplete-option': {
        ...theme.typography.body2,
        padding: theme.spacing(1, 1.5),
        
        '&[aria-selected="true"]': {
          backgroundColor: (theme.vars || theme).palette.action.selected,
          fontWeight: theme.typography.fontWeightMedium,
        },
        
        '&.Mui-focused': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
      },
    }),
    
    tag: ({ theme }: { theme: Theme }) => ({
      margin: theme.spacing(0.375),
      maxWidth: 'calc(100% - 6px)',
    }),
  },
};

export default {
  MuiAutocomplete
} as Components<Theme>;