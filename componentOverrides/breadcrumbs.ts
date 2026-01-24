/**
 * Theme-Agnostic Breadcrumbs Overrides
 *
 * Pattern Reference: MUI v7 Breadcrumbs.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Breadcrumbs/Breadcrumbs.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiBreadcrumbs: Components<Theme>['MuiBreadcrumbs'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      ...theme.typography.body2,
      color: (theme.vars || theme).palette.text.secondary,
    }),
    separator: ({ theme }: { theme: Theme }) => ({
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      color: (theme.vars || theme).palette.text.disabled,
    }),
    li: {
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
};

export default {
  MuiBreadcrumbs
};