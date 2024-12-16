import theme from '../themeStub';

const MuiTableRow = {
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.common.white,
      // Bleeding edge: Scale and highlight on hover
      transition: 'transform 0.15s ease, background-color 0.15s ease',
      
      '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        }
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover, // gray1 replacement
        transform: 'scale(1.002)', // Very subtle scale to avoid layout shift issues
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      },
    },
    head: {
        '&:hover': {
            backgroundColor: 'inherit', // Disable hover on header
            transform: 'none',
            boxShadow: 'none',
        }
    }
  }
};

const MuiTableCell = {
  styleOverrides: {
    root: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`, 
      '&:last-child': {
        paddingRight: theme.spacing(3),
      },
    },
    body: {
      ...theme.typography.regular,
    },
    head: {
      ...theme.typography.label,
      fontWeight: theme.typography.fontWeightBold,
    },
  }
};

const MuiTableSortLabel = {
  styleOverrides: {
    root: {
      '&.Mui-active': {
        color: theme.palette.primary.main,
      },
    },
  }
};

const MuiTablePagination = {
  styleOverrides: {
    root: {
      ...theme.typography.regular,
    },
    // 'caption' and 'input' etc are often inside classes key or targeted via slots in v7
    selectLabel: {
        ...theme.typography.regular,
    },
    displayedRows: {
        ...theme.typography.regular,
    },
    select: {
      minWidth: 0,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(3) + '!important', 
    },
    selectIcon: {
      top: 'calc(50% - 12px)', // center vertically
      color: theme.palette.action.active,
      width: 24,
      height: 24,
    },
    actions: {
      '& .MuiIconButton-root': {
          padding: 8,
          '& svg': {
            width: 20,
            height: 20,
            color: theme.palette.action.active,
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
};