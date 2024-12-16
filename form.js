import theme from '../global';

const MuiFormControl = {};

const MuiFormLabel = {
    root: {
        padding: 0,

        '&$focused': {
            color: theme.typography.inputLabel, // leave the label color alone
        },
        '&$disabled': {
            color: theme.palette.text.disabled,
        },
        '&$error': {
            color: theme.typography.inputLabel, // leave the label color alone
        },
    },
}

const MuiFormControlLabel = {};

const MuiFormHelperText = {
    root: {
        marginTop: 5, // 8
        minHeight: 0, // 1em
        ...theme.typography.inputHelperText,

        '&$error': {
            color: theme.palette.error.main,
        },
        '&$disabled': {
            color: theme.palette.text.disabled,
        },
    },
};

export default {
    MuiFormControl,
    MuiFormLabel,
    MuiFormControlLabel,
    MuiFormHelperText,
}