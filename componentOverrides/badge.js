import theme from '../themeStub';

const RADIUS = 8; 

const MuiBadge = {
  styleOverrides: {
    badge: {
      top: -RADIUS + 2, 
      right: -RADIUS , 
      width: RADIUS * 2,
      height: RADIUS * 2,

      ...theme.typography.smallSemibold,
      fontSize: 10.4,
      ...theme.palette.common.white,
      lineHeight: 'normal',
      textAlign: 'center',
      
      // Bleeding edge: Pulse animation for attention
      animation: 'mui-badge-pulse 2s infinite',
      
      // Note: keyframes need to be defined globally. 
      // Ideally, we'd inject GlobalStyles, but assuming app-level CSS handles 'mui-badge-pulse'
      // Example keyframe:
      // @keyframes mui-badge-pulse {
      //   0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4); }
      //   70% { box-shadow: 0 0 0 6px rgba(255, 0, 0, 0); }
      //   100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
      // }
    },
  },
};

export default {
  MuiBadge,
};