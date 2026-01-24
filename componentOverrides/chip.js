/**
 * Theme-Agnostic Chip Overrides
 *
 * This file uses ONLY standard MUI palette tokens, ensuring chips adapt
 * automatically to any theme (Solarized, Terracotta, or custom).
 *
 * Pattern Reference: MUI v7 Chip.js
 * @see https://github.com/mui/material-ui/blob/v7.1.0/packages/mui-material/src/Chip/Chip.js
 *
 * MUI v7 Class Name Changes:
 * - Combined class names like `clickableColorPrimary` are DEPRECATED
 * - Use composable selectors: `${chipClasses.clickable}.${chipClasses.colorPrimary}`
 * - Same applies to: outlinedPrimary → outlined.colorPrimary, etc.
 *
 * Key Principles:
 * 1. Use (theme.vars || theme) pattern for CSS variables support
 * 2. Use theme.palette.action.* for all interactive states
 * 3. Use alpha() for transparent hover/focus backgrounds
 * 4. Use theme.spacing() function (not theme.spacing.unit which is deprecated)
 */
import { chipClasses } from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";

const MuiChip = {
  styleOverrides: {
    /**
     * Root styles applied to all chip variants.
     * Uses standard palette tokens for theme-agnostic behavior.
     */
    root: ({ theme }) => ({
      // Shape: Use theme's border radius for consistency
      borderRadius: (theme.vars || theme).shape.borderRadius,

      // Typography: Inherit from theme's body2 preset for chips
      ...theme.typography.body2,

      // Border: Uses divider color for subtle, theme-aware borders
      border: `1px solid ${(theme.vars || theme).palette.divider}`,

      // Background: Uses paper background for neutral chip appearance
      backgroundColor: (theme.vars || theme).palette.background.paper,

      // Layout: Compact chip with flexible height
      height: "auto",
      padding: 0,

      // Transitions for smooth interactive feedback
      transition:
        "background-color 0.2s, box-shadow 0.2s, border-color 0.2s, transform 0.1s",

      // Active state: Subtle press feedback
      "&:active": {
        transform: "scale(0.98)",
      },

      /**
       * MUI v7 Composable Class Pattern for Filled Variant
       * ❌ DEPRECATED: `&.${chipClasses.filledPrimary}`
       * ✅ CORRECT v7: `&.${chipClasses.filled}.${chipClasses.colorPrimary}`
       */
      [`&.${chipClasses.filled}.${chipClasses.colorPrimary}`]: {
        backgroundColor: (theme.vars || theme).palette.primary.main,
        color: (theme.vars || theme).palette.primary.contrastText,
        border: "none",
      },

      [`&.${chipClasses.filled}.${chipClasses.colorSecondary}`]: {
        backgroundColor: (theme.vars || theme).palette.secondary.main,
        color: (theme.vars || theme).palette.secondary.contrastText,
        border: "none",
      },

      /**
       * MUI v7 Composable Class Pattern for Outlined Variant
       * ❌ DEPRECATED: `&.${chipClasses.outlinedPrimary}`
       * ✅ CORRECT v7: `&.${chipClasses.outlined}.${chipClasses.colorPrimary}`
       */
      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary}`]: {
        borderColor: (theme.vars || theme).palette.primary.main,
        color: (theme.vars || theme).palette.primary.main,
      },

      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary}`]: {
        borderColor: (theme.vars || theme).palette.secondary.main,
        color: (theme.vars || theme).palette.secondary.main,
      },

      // Disabled state: Consistent disabled appearance
      "&.Mui-disabled": {
        opacity: (theme.vars || theme).palette.action.disabledOpacity,
        color: (theme.vars || theme).palette.action.disabled,
        borderColor: (theme.vars || theme).palette.action.disabled,
      },
    }),

    /**
     * Label styles with theme-aware spacing.
     * Uses theme.spacing() function (MUI v5+ standard).
     */
    label: ({ theme }) => ({
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(0.25),
      paddingBottom: theme.spacing(0.75),

      // Reduce left padding when preceded by an icon or avatar
      "&:not(:first-of-type)": {
        paddingLeft: theme.spacing(1.5),
      },
    }),

    /**
     * Clickable chip interactive states.
     * Uses action palette tokens for consistent hover/focus behavior.
     */
    clickable: ({ theme }) => ({
      cursor: "pointer",

      // Hover: Subtle border darkening and background tint
      "&:hover": {
        borderColor: (theme.vars || theme).palette.text.secondary,
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },

      // Focus: Primary color highlight for keyboard navigation
      "&:focus": {
        backgroundColor: (theme.vars || theme).palette.primary.main,
        borderColor: (theme.vars || theme).palette.primary.main,

        // Label text changes to contrast text for visibility
        [`.${chipClasses.label}`]: {
          color: (theme.vars || theme).palette.primary.contrastText,
        },
      },

      /**
       * MUI v7 Composable Class Pattern for Clickable + Color variants
       * Hover states for colored chips
       */
      [`&.${chipClasses.colorPrimary}:hover`]: {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity + 0.1
        ),
      },

      [`&.${chipClasses.colorSecondary}:hover`]: {
        backgroundColor: alpha(
          theme.palette.secondary.main,
          theme.palette.action.hoverOpacity + 0.1
        ),
      },
    }),

    /**
     * Deletable chip with delete icon styles.
     * Uses primary palette for focus state consistency.
     */
    deletable: ({ theme }) => ({
      // Focus: Highlight entire chip when focused
      "&:focus": {
        border: `1px solid ${(theme.vars || theme).palette.primary.main}`,
        backgroundColor: (theme.vars || theme).palette.primary.main,

        // Delete icon changes to contrast text
        [`.${chipClasses.deleteIcon}`]: {
          color: (theme.vars || theme).palette.primary.contrastText,
        },
      },
    }),

    /**
     * Avatar positioning within chip.
     * Uses theme.spacing() for consistent margins.
     */
    avatar: ({ theme }) => ({
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(-1),
    }),

    /**
     * Delete icon styles.
     * Uses action.active for default state, error.main for hover feedback.
     */
    deleteIcon: ({ theme }) => ({
      // Default: Standard action icon color
      color: (theme.vars || theme).palette.action.active,

      // Layout: Compact icon with consistent sizing
      margin: 0,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      height: 24,
      width: 24,

      // Separator: Divider color for subtle left border
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,

      // Smooth color transition for hover feedback
      transition: "color 0.2s",

      // Hover: Error color provides clear "delete" feedback
      "&:hover": {
        color: (theme.vars || theme).palette.error.main,
      },
    }),

    /**
     * Icon slot (leading icon) styles.
     * Inherits from the chip's current text color.
     */
    icon: ({ theme }) => ({
      color: "inherit",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(-0.5),
    }),
  },
};

export default {
  MuiChip,
};