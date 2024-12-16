import theme from '../themeStub';

const MuiPopover = {
  styleOverrides: {
    paper: {
      borderRadius: '3px',
      border: 'solid 1px ' + theme.palette.colorGuide['grey-04'],
      boxShadow: '0 5px 10px 0 rgba(13, 35, 69, 0.15)',
      margin: 0,
      padding: 12,
      // Entrance animation
      animation: 'mui-popover-enter 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      transformOrigin: 'top left', // Dynamic origin usually handled by Popper.js, but this sets default
    },
  },
};

export default {
  MuiPopover,
};