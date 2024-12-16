import { convertCompilerOptionsFromJson } from 'typescript'
import theme from '../themeStub'
import { ClassNameMap } from '@mui/material'

const MuiInput = {
  styleOverrides: {
    root: {
      //...theme.typography.inputTypedText,
      border: '1px solid ' + theme.palette.colorGuide['grey-04'],
      borderRadius: 3,

      '&.Mui-focused:not(.Mui-disabled):not(.Mui-error)': {
        border: '1px solid ' + theme.palette.colorGuide['grey-05'],
      },
      '&:hover:not(.Mui-disabled):not(.Mui-error)': {
        border: '1px solid ' + theme.palette.colorGuide['grey-05'],
      },
      '&.MuiTablePagination-input:hover:not(.Mui-disabled):not(.Mui-error)': {
        border: 'none',
      },
      '&.Mui-focused.MuiTablePagination-input:not(.Mui-disabled):not(.Mui-error)': {
        border: 'none',
      },
    },
    '&.Mui-disabled': {
      'backgroundColor': theme.palette.colorGuide['grey-02'],
      'border': '1px solid ' + theme.palette.colorGuide['grey-03'],
      '& svg': {
        color: theme.palette.colorGuide['grey-04'],
      }
    },
    '&.Mui-error': {
      'border': '1px solid ' + theme.palette.error.main,

      '&.Mui-focused': {
        backgroundColor: theme.palette.colorGuide['grey-01'],
      },
    },
    input: {
      padding: '5px 8px',

      '&::placeholder': {
        //...theme.typography.inputPlaceholder,
      },
    },
    inputType: {
      height: 'auto',
    },
    inputTypeSearch: {
      '&::-webkit-search-cancel-button': {
        fontSize: 16,
      },

      // when an adjacent sibling to a MuiInputAdornment-positionStart class, assume a like background
      'div[class*="MuiInputAdornment-positionStart"] + &': {
        backgroundColor: theme.palette.colorGuide['grey-02'],
      },
    },
  },
}

const MuiInputAdornment = {
  styleOverrides: {
    root: {
      maxHeight: 'auto'
    },
    positionStart: {
      marginRight: 0,
      padding: '2px 8px 2px 8px',
      backgroundColor: theme.palette.colorGuide['grey-02'],
      '& > svg': {
        //color: theme.palette.colorGuide['grey-05'],
      },
    },
  },
}

const MuiInputLabel = {
  styleOverrides: {
    formControl: {
      // retaining the native relative-absolute parent/child scheme, mimic left-padding
      left: 8,
      //transform: 'translate(0, 0px) scale(1)', // reset from default: 'translate(0, 24px) scale(1)',
      //...theme.typography.inputLabel,
    },
    shrink: {
      //transform: 'translate(-8px, -4px) ', // default: 'translate(0, 1.5px) scale(0.75)'
      //...theme.typography.inputLabel,
    },
  },
}

export default {
  MuiInput,
  MuiInputAdornment,
  MuiInputLabel,
}