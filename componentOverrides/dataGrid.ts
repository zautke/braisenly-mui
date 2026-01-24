/**
 * Theme-Agnostic DataGrid Overrides
 *
 * Pattern Reference: MUI X DataGrid Source
 * @see https://github.com/mui/mui-x/tree/master/packages/grid/x-data-grid/src
 */
import { Theme, Components } from '@mui/material/styles';

const MuiDataGrid = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderRadius: (theme.vars || theme).shape.borderRadius,
      ...theme.typography.body2,
      
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: theme.typography.fontWeightBold,
        color: (theme.vars || theme).palette.text.primary,
      },
      '& .MuiDataGrid-row': {
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        '&.Mui-selected': {
          backgroundColor: (theme.vars || theme).palette.action.selected,
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.selected,
          },
        },
      },
      '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
      '& .MuiDataGrid-footerContainer': {
        borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
      },
    }),
  },
};

const overrides: any = {
  MuiDataGrid
};

export default overrides;