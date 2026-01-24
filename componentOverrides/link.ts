/**
 * Theme-Agnostic Link Overrides
 *
 * Pattern Reference: MUI v7 Link.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Link/Link.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiLink: Components<Theme>['MuiLink'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
      textDecoration: 'none',
      transition: theme.transitions.create(['color', 'text-decoration-color'], {
        duration: 200,
      }),
      cursor: 'pointer',
      
      '&:hover': {
        color: (theme.vars || theme).palette.primary.dark,
        textDecoration: 'underline',
      },
      
      '&.Mui-focusVisible': {
        outline: `2px solid ${(theme.vars || theme).palette.primary.light}`,
        outlineOffset: '2px',
        borderRadius: '2px',
      }
    }),
    button: {
      verticalAlign: 'middle',
    }
  }
};

export default {
  MuiLink
};