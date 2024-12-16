import theme from '../themeStub';

const MuiDataGrid = {
  styleOverrides: {
    root: {
      border: `1px solid ${theme.palette.colorGuide['grey-03']}`,
      borderRadius: 3,
      ...theme.typography.regular,
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme.palette.colorGuide['grey-01'],
        borderBottom: `1px solid ${theme.palette.colorGuide['grey-03']}`,
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.text.primary,
      },
      '& .MuiDataGrid-row': {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
                backgroundColor: theme.palette.action.selected, // maintain selection color on hover
            }
        }
      },
      '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.colorGuide['grey-02']}`,
      },
      '& .MuiDataGrid-footerContainer': {
          borderTop: `1px solid ${theme.palette.colorGuide['grey-03']}`,
      }
    }
  }
};

export default {
  MuiDataGrid
};
