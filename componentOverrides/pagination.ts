import theme from '../themeStub';

const MuiPagination = {
  styleOverrides: {
    root: {
      '& .MuiPaginationItem-root': {
        borderRadius: 3,
        margin: '0 2px',
        ...theme.typography.regular,
        
        '&:hover': {
            backgroundColor: theme.palette.colorGuide['grey-02'],
        },
        
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontWeight: theme.typography.fontWeightBold,
            
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            }
        }
      }
    }
  }
};

export default {
  MuiPagination
};
