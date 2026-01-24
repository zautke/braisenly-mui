/**
 * Theme-Agnostic Badge Overrides
 *
 * Pattern Reference: MUI v7 Badge.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Badge/Badge.js
 */

const MuiBadge = {
  styleOverrides: {
    badge: ({ theme }) => ({
      top: 0,
      right: 0,
      
      // Use standard typography
      ...theme.typography.caption,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 10.4,
      lineHeight: 'normal',
      textAlign: 'center',
      
      // Colors from theme
      color: (theme.vars || theme).palette.common.white,
      
      // Note: background color usually set by 'color' prop (primary/secondary),
      // but if we need a custom default:
      // backgroundColor: (theme.vars || theme).palette.primary.main,
      
      // Pulse animation if defined globally
      animation: 'mui-badge-pulse 2s infinite',
    }),
  },
};

export default {
  MuiBadge,
};
