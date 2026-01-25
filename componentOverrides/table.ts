/**
 * Theme-Agnostic Table Overrides
 *
 * Pattern Reference: MUI v7 Table.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Table/Table.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiTableRow: Components<Theme>['MuiTableRow'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: (theme.vars || theme).palette.background.paper,
      transition: theme.transitions.create(['transform', 'background-color'], { duration: 150 }),
      
      '&.Mui-selected': {
        backgroundColor: (theme.vars || theme).palette.action.selected,
        '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.selected,
        }
      },
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
        transform: 'scale(1.002)',
        position: 'relative',
        zIndex: 1,
        boxShadow: (theme.vars || theme).shadows[1],
      },
    }),
    head: {
        '&:hover': {
            backgroundColor: 'inherit',
            transform: 'none',
            boxShadow: 'none',
        }
    }
  }
};

const MuiTableCell: Components<Theme>['MuiTableCell'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2, 3), 
      '&:last-child': {
        paddingRight: theme.spacing(3),
      },
    }),
    body: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    head: ({ theme }) => ({
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightBold,
    }),
  }
};

const MuiTableSortLabel: Components<Theme>['MuiTableSortLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-active': {
        color: (theme.vars || theme).palette.primary.main,
      },
    }),
  }
};

const MuiTablePagination: Components<Theme>['MuiTablePagination'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    selectLabel: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    displayedRows: ({ theme }) => ({
      ...theme.typography.body2,
    }),
    select: ({ theme }) => ({
      minWidth: 0,
      paddingLeft: theme.spacing(0.5),
      paddingRight: `${theme.spacing(3)} !important`,
    }),
    selectIcon: ({ theme }) => ({
      top: 'calc(50% - 12px)',
      color: (theme.vars || theme).palette.action.active,
      width: 24,
      height: 24,
    }),
    actions: {
      '& .MuiIconButton-root': {
          padding: 8,
          '& svg': {
            width: 20,
            height: 20,
            color: 'inherit',
          }
      }
    },
  }
};

export default {
  MuiTableRow,
  MuiTableCell,
  MuiTableSortLabel,
  MuiTablePagination
} as Components<Theme>;
