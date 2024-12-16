import theme from '../themeStub';

const MuiTooltip = {
  styleOverrides: {
    tooltip: {
      ...theme.typography.small,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.colorGuide['ink-dark'],
      padding: `7px ${theme.spacing.unit * 3}px 9px ${theme.spacing.unit * 3}px`,
      borderRadius: `${theme.spacing.unit}px`,
      border: '1px solid ' + theme.palette.colorGuide['grey-04'],
      ...theme.zDepth.for('tooltip'),
      
      // Bleeding edge: Enhance the entrance
      // Tooltip entrance is usually controlled by the TransitionComponent prop on the instance,
      // but we can refine the final state here or add a subtle pulse?
      // Better to rely on standard transitions for tooltips to avoid jank.
    },
    arrow: {
        color: theme.palette.common.white,
        '&:before': {
            border: '1px solid ' + theme.palette.colorGuide['grey-04'],
            boxSizing: 'border-box',
        }
    }
  },
};

export default {
  MuiTooltip,
};