/**
 * Theme-Agnostic Pagination Overrides
 *
 * Pattern Reference: MUI v7 Pagination.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Pagination/Pagination.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiPagination: Components<Theme>['MuiPagination'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      '& .MuiPaginationItem-root': {
        borderRadius: (theme.vars || theme).shape.borderRadius,
        margin: theme.spacing(0, 0.25),
        ...theme.typography.body2,
        
        '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        
        '&.Mui-selected': {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
            
            '&:hover': {
                backgroundColor: (theme.vars || theme).palette.primary.dark,
            }
        }
      }
    }),
  },
};

export default {
  MuiPagination
};