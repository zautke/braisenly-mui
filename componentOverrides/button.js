/**
 * Theme-Agnostic Button Overrides
 *
 * This file uses ONLY standard MUI palette tokens, ensuring buttons adapt
 * automatically to any theme (Solarized, Terracotta, or custom).
 *
 * Pattern Reference: MUI v7 Button.js
 * @see https://github.com/mui/material-ui/blob/v7.1.0/packages/mui-material/src/Button/Button.js
 *
 * Key Principles:
 * 1. Use (theme.vars || theme) pattern for CSS variables support
 * 2. Use theme.palette.action.* for all interactive states
 * 3. Use alpha() for transparent hover/focus backgrounds
 * 4. Use theme.shape.borderRadius instead of hardcoded values
 */
import { alpha } from "@mui/material/styles";

const MuiButton = {
  styleOverrides: {
    /**
     * Root styles applied to all button variants.
     * Uses theme.typography.button for consistent typography across themes.
     */
    root: ({ theme }) => ({
      // Typography: Inherit from theme's button typography preset
      ...theme.typography.button,

      // Layout: Custom padding for compact button appearance
      padding: "4px 12px 6px 12px",
      minHeight: 0, // Override MUI default of 36px
      minWidth: 0, // Allow narrow buttons
      textAlign: "center",
      textTransform: "uppercase",

      // Shape: Use theme's border radius for consistency
      // Multiplied by custom factor for slightly rounded corners
      borderRadius: (theme.vars || theme).shape.borderRadius,
      border: 0,
    }),

    /**
     * Text variant: Primary-colored text on transparent background.
     * Uses palette.primary.* tokens that adapt to any theme.
     */
    text: ({ theme }) => ({
      // Text uses primary.main for the link-like appearance
      color: (theme.vars || theme).palette.primary.main,
      backgroundColor: "transparent",

      // Hover: Darker shade + subtle background tint
      "&:hover": {
        color: (theme.vars || theme).palette.primary.dark,
        // Use alpha with hoverOpacity for theme-consistent transparency
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
      },

      // Active/Pressed: Even darker for pressed feedback
      "&:active": {
        color: (theme.vars || theme).palette.primary.dark,
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },

      // Focus: Similar to hover for keyboard navigation visibility
      "&.Mui-focusVisible": {
        color: (theme.vars || theme).palette.primary.dark,
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.focusOpacity
        ),
      },

      // Disabled: Uses action.disabled for muted appearance
      "&.Mui-disabled": {
        color: (theme.vars || theme).palette.action.disabled,
      },
    }),

    /**
     * Contained variant: Solid background with contrasting text.
     * Most prominent button style, uses primary palette.
     */
    contained: ({ theme }) => ({
      // Primary colors: main for bg, contrastText for readable text
      backgroundColor: (theme.vars || theme).palette.primary.main,
      color: (theme.vars || theme).palette.primary.contrastText,

      // Subtle shadow for elevation; uses theme's shadow tokens
      boxShadow: (theme.vars || theme).shadows[1],

      // Hover: Use primary.dark for natural darkening effect
      "&:hover": {
        backgroundColor: (theme.vars || theme).palette.primary.dark,
        boxShadow: (theme.vars || theme).shadows[2],
      },

      // Active/Pressed: Darker still, no shadow for pressed-in effect
      "&:active": {
        boxShadow: "none",
        backgroundColor: (theme.vars || theme).palette.primary.dark,
      },

      // Focus: Slight ring effect using darker shade
      "&.Mui-focusVisible": {
        backgroundColor: (theme.vars || theme).palette.primary.dark,
        // Outline for accessibility, uses primary color
        outline: `2px solid ${(theme.vars || theme).palette.primary.light}`,
        outlineOffset: 2,
      },

      // Disabled: Uses action palette for consistent disabled appearance
      "&.Mui-disabled": {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
        color: (theme.vars || theme).palette.action.disabled,
        boxShadow: "none",
      },
    }),

    /**
     * Outlined variant: Bordered button with transparent background.
     * Uses text.primary for content, divider for border color.
     */
    outlined: ({ theme }) => ({
      // Text styling
      fontWeight: theme.typography.fontWeightBold,
      color: (theme.vars || theme).palette.text.primary,
      backgroundColor: "transparent",

      // Border: Uses divider color for subtle, theme-aware borders
      border: `1px solid ${(theme.vars || theme).palette.divider}`,

      // Hover: Slightly visible background, keep border
      "&:hover": {
        border: `1px solid ${(theme.vars || theme).palette.text.secondary}`,
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },

      // Focus: Enhanced border visibility
      "&.Mui-focusVisible": {
        border: `1px solid ${(theme.vars || theme).palette.primary.main}`,
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.focusOpacity
        ),
      },

      // Active/Pressed: Visible pressed state
      "&:active": {
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundColor: (theme.vars || theme).palette.action.selected,
      },

      // Disabled: Muted border and text
      "&.Mui-disabled": {
        border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
        color: (theme.vars || theme).palette.action.disabled,
        backgroundColor: "transparent",
      },
    }),
  },
};

/**
 * ButtonBase overrides for consistent disabled state across all button-like components.
 * ButtonBase is the foundation for Button, IconButton, Fab, etc.
 */
const MuiButtonBase = {
  styleOverrides: {
    root: ({ theme }) => ({
      // Disabled: Consistent disabled text color across all button variants
      "&.Mui-disabled": {
        color: (theme.vars || theme).palette.action.disabled,
      },
    }),
  },
};

export default {
  MuiButton,
  MuiButtonBase,
};
