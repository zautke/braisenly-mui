import theme from '../themeStub';

const MuiAutocomplete = {
  styleOverrides: {
    paper: {
      ...theme.zDepth.for('select'), // reuse select depth
      borderRadius: 3,
      marginTop: 4,
    },
    listbox: {
      padding: 0,
      '& .MuiAutocomplete-option': {
        ...theme.typography.regular,
        padding: '8px 12px',
        '&[aria-selected="true"]': {
          backgroundColor: theme.palette.action.selected,
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&.Mui-focused': {
            backgroundColor: theme.palette.action.hover,
        }
      }
    },
    tag: {
      margin: 3,
      maxWidth: 'calc(100% - 6px)',
    }
  }
};

export default {
  MuiAutocomplete
};
