/**
 * Card Component Overrides
 *
 * Theme-agnostic overrides for MUI Card components.
 * Card extends Paper, so we focus on Card-specific styling.
 *
 * Uses MUI v7 callback pattern with (theme.vars || theme) for CSS variables support.
 * All values derived from theme tokens - no hardcoded colors or magic numbers.
 *
 * Components covered:
 * - MuiCard: Main card container with elevation and border
 * - MuiCardHeader: Header section with title styling
 * - MuiCardContent: Content area with responsive padding
 * - MuiCardActions: Action buttons area with proper alignment
 */

const MuiCard = {
  styleOverrides: {
    /**
     * Card root element
     * - Uses theme's border radius (doubled for softer appearance)
     * - Subtle border using divider color for definition
     * - Elevation via theme shadows
     * - Smooth hover transition with lift effect
     */
    root: ({ theme }) => {
      const t = theme.vars || theme;
      return {
        // Use doubled border radius for softer card appearance
        borderRadius: t.shape.borderRadius * 2,

        // Subtle border provides definition without harsh edges
        border: `1px solid ${t.palette.divider}`,

        // Paper background ensures proper theming in light/dark modes
        backgroundColor: t.palette.background.paper,

        // Moderate elevation for cards (level 2 in shadow scale)
        boxShadow: t.shadows[2],

        // Smooth transitions for interactive states
        transition: [
          'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ].join(', '),

        // Hover state: elevated appearance with subtle lift
        '&:hover': {
          // Increased elevation on hover (level 6 in shadow scale)
          boxShadow: t.shadows[6],
          // Subtle lift effect enhances interactivity
          transform: 'translateY(-2px)',
        },
      };
    },
  },
};

const MuiCardHeader = {
  styleOverrides: {
    /**
     * CardHeader root
     * - Reduced bottom padding when followed by content
     * - Generous top padding for visual breathing room
     */
    root: ({ theme }) => ({
      paddingBottom: 0,
      paddingTop: theme.spacing(3),
    }),

    /**
     * CardHeader title
     * - Uses h6 typography for semantic heading hierarchy
     * - Primary text color for prominence
     */
    title: ({ theme }) => {
      const t = theme.vars || theme;
      return {
        ...theme.typography.h6,
        color: t.palette.text.primary,
      };
    },

    /**
     * CardHeader subheader
     * - Secondary text color for visual hierarchy
     */
    subheader: ({ theme }) => {
      const t = theme.vars || theme;
      return {
        color: t.palette.text.secondary,
      };
    },
  },
};

const MuiCardContent = {
  styleOverrides: {
    /**
     * CardContent root
     * - Responsive padding: larger on tablet/desktop
     * - Consistent last-child padding for visual balance
     */
    root: ({ theme }) => ({
      // Base padding for mobile
      padding: theme.spacing(2),

      // Increased padding on larger screens
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },

      // Ensure consistent bottom padding when content is last child
      '&:last-child': {
        paddingBottom: theme.spacing(3),
      },
    }),
  },
};

const MuiCardActions = {
  styleOverrides: {
    /**
     * CardActions root
     * - Consistent padding aligned with content
     * - Gap between action buttons using theme spacing
     */
    root: ({ theme }) => ({
      padding: theme.spacing(2),
      // Gap between action buttons
      gap: theme.spacing(1),
    }),
  },
};

export default {
  MuiCard,
  MuiCardHeader,
  MuiCardContent,
  MuiCardActions,
};