/**
 * Theme-Agnostic Badge Overrides
 *
 * Pattern Reference: MUI v7 Badge.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Badge/Badge.js
 */
import { Theme, Components } from '@mui/material/styles';

const MuiBadge: Components<Theme>['MuiBadge'] = {
  styleOverrides: {
    badge: ({ theme }) => ({
      // Default positioning overrides
      // top: 0,
      // right: 0,
      
      // Use standard typography
      ...theme.typography.caption,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '0.65rem', // ~10.4px if root is 16px
      lineHeight: 1,
      height: 20,
      minWidth: 20,
      padding: theme.spacing(0, 0.5),
      
      // Colors from theme
      color: (theme.vars || theme).palette.common.white,
      
      // Ensure border matches background for cutout effect
      border: `2px solid ${(theme.vars || theme).palette.background.paper}`,
    }),
  },
};

export default {
  MuiBadge,
} as Components<Theme>;
