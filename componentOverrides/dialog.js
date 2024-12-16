import theme from '../themeStub';

const MuiDialog = {
  styleOverrides: {
    paper: {
      ...theme.zDepth.for('modal'),
      // Add standard modal entrance animation
      animation: 'mui-dialog-enter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      // Define keyframes in global styles or assume they exist, 
      // or use simple transition on opacity/transform if possible.
      // Since we can't easily inject keyframes here without emotion's `keyframes`,
      // we rely on the transition props usually passed to Dialog.
      // However, we can enforce a scale start if we target the enter phase classes if standard transitions are used.
    }
  }
}

const MuiDialogTitle = {
  styleOverrides: {
    root: {
      padding: '11px 16px',
      ...theme.typography.title3Dkbg,
      lineHeight: 'normal',
      backgroundColor: theme.palette.primary.main,
    }
  }
};

const MuiDialogContent = {
  styleOverrides: {
    root: {
      padding: `24px 16px 20px 16px`,
      '&:first-of-type': { // modernized selector
        paddingTop: 24,
      },
    }
  }
};

const MuiDialogContentText = {
  styleOverrides: {
    root: {
      ...theme.typography.regular,
      opacity: 1,
    }
  }
};

const MuiDialogActions = {
  styleOverrides: {
    root: {
      margin: 0,
      padding: '0px 16px 16px 16px',
    },
    // Action spacing usually handled by spacing prop or children
    // If specific button spacing is needed:
    '& > :not(:first-of-type)': {
      marginLeft: 8,
    }
  }
};

export default {
  MuiDialog,
  MuiDialogTitle,
  MuiDialogContent,
  MuiDialogContentText,
  MuiDialogActions,
};