import theme from '../themeStub';

const MuiFormControl = {};

const MuiFormLabel = {
  root: {
    '&$focused': {
      color: theme.typography.inputLabel, // leave the label color alone
    },

    '&$error': {
      color: theme.typography.inputLabel, // leave the label color alone
    },
  },
}

const MuiFormControlLabel = {
  root: {
    ...theme.typography.inputLabel,
  },
  label: {
    ...theme.typography.inputLabel,
    marginTop: -1,
  },
};

const MuiFormHelperText = {
  root: {
    marginTop: 5,
    ...theme.typography.inputHelperText,
  },
};

export default {
  MuiFormControl,
  MuiFormLabel,
  MuiFormControlLabel,
  MuiFormHelperText,
}
