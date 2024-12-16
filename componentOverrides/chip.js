import theme from '../themeStub';

const MuiChip = {
  styleOverrides: {
    root: {
      borderRadius: 3,
      ...theme.typography.regular,
      border: 'solid 1px ' + theme.palette.colorGuide['grey-03'],
      backgroundColor: theme.palette.common.white,
      height: 'auto', 
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      // Re-enabling transitions for hover effects
      transition: 'background-color 0.2s, box-shadow 0.2s, border-color 0.2s, transform 0.1s', 

      '&:active': {
          transform: 'scale(0.98)',
      }
    },
    label: {
      paddingLeft: `${theme.spacing.unit * 2}px`,
      paddingRight: `${theme.spacing.unit * 2}px`,
      paddingTop: `${theme.spacing.unit * .25}px`,
      paddingBottom: `${theme.spacing.unit * .75}px`,
      '&:not(:first-of-type)': {
        paddingLeft: `${theme.spacing.unit * 1.5}px `, 
      },
    },
    clickable: {
      '&:hover': {
        borderColor: theme.palette.colorGuide['grey-04'],
        backgroundColor: theme.palette.common.white,
      },
      '&:focus': {
        '& .MuiChip-label': {
          color: theme.palette.common.white,
        },
        backgroundColor: theme.palette.colorGuide['blue-base'],
        borderColor: theme.palette.colorGuide['blue-base'],
      },
    },
    deletable: {
      '&:focus': {
        border: '1px solid ' + theme.palette.colorGuide['blue-base'],
        backgroundColor: theme.palette.colorGuide['blue-base'],
        '& .MuiChip-deleteIcon': {
          color: theme.palette.common.white,
        },
      },
    },
    avatar: {
      marginLeft: `${theme.spacing.unit}px`,
      marginRight: -`${theme.spacing.unit}px`,
    },
    deleteIcon: {
      color: theme.palette.action.active,
      margin: '0 0 0 0',
      paddingTop: `${theme.spacing.unit}px`,
      paddingBottom: `${theme.spacing.unit}px`,
      paddingLeft: `${theme.spacing.unit / 2}px`,
      paddingRight: `${theme.spacing.unit / 2}px`,
      height: 24,
      width: 24,
      borderLeft: 'solid 1px ' + theme.palette.colorGuide['grey-03'],
      transition: 'color 0.2s',
      '&:hover': {
        color: theme.palette.error.main, // Feedback on delete hover
      }
    }
  },
};

export default {
  MuiChip,
};