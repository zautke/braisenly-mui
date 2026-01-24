/**
 * MuiSwitch Theme Override
 *
 * iOS-style switch with custom dimensions (42x26).
 * Uses ONLY theme tokens for colors - no hardcoded values.
 *
 * Theme tokens used:
 * - palette.common.white: Thumb color
 * - palette.success.main: Checked track and focus visible thumb
 * - palette.grey[400]: Unchecked track background
 * - palette.divider: Track border color
 * - palette.action.disabled: Disabled thumb color
 * - palette.action.disabledBackground: Disabled track background
 * - shadows[1]: Thumb shadow
 * - transitions.create(): Smooth state transitions
 */

const MuiSwitch = {
  styleOverrides: {
    /**
     * Root container: Sets iOS-style dimensions (42x26).
     * Removes default padding for precise sizing.
     */
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: 8,
    },

    /**
     * SwitchBase: Contains the toggle button behavior.
     * Handles checked, disabled, and focus-visible states.
     */
    switchBase: ({ theme }) => ({
      padding: 1,

      // Checked state: slide thumb right, show success color on track
      '&.Mui-checked': {
        // Slide the thumb to the right (16px accounts for thumb width)
        transform: 'translateX(16px)',
        // Thumb color when checked - white contrasts against success track
        color: (theme.vars || theme).palette.common.white,

        // Checked track styling
        '& + .MuiSwitch-track': {
          // Use success.main for the "on" state (green in most themes)
          backgroundColor: (theme.vars || theme).palette.success.main,
          // Full opacity - no transparency
          opacity: 1,
          // Remove border when checked for clean appearance
          border: 'none',
        },
      },

      // Focus visible state: accessibility indicator for keyboard navigation
      '&.Mui-focusVisible': {
        '& .MuiSwitch-thumb': {
          // Match the success color for visual consistency
          color: (theme.vars || theme).palette.success.main,
          // White ring around thumb for high-contrast focus indicator
          border: `6px solid ${(theme.vars || theme).palette.common.white}`,
        },
      },

      // Disabled state styling
      '&.Mui-disabled': {
        // Muted thumb color using action palette
        color: (theme.vars || theme).palette.action.disabled,

        '& + .MuiSwitch-track': {
          // Reduced opacity for disabled appearance
          opacity: 0.5,
        },
      },
    }),

    /**
     * Thumb: The circular toggle indicator.
     * Uses theme shadow for elevation effect.
     */
    thumb: ({ theme }) => ({
      width: 24,
      height: 24,
      // Use theme shadow system for consistent elevation
      boxShadow: (theme.vars || theme).shadows[1],
    }),

    /**
     * Track: The pill-shaped background behind the thumb.
     * Uses theme tokens for colors and transitions.
     */
    track: ({ theme }) => ({
      // Fully rounded ends (half of height)
      borderRadius: 26 / 2,
      // Subtle border using divider color
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      // Grey background for unchecked state
      backgroundColor: (theme.vars || theme).palette.grey[400],
      // Full opacity - no transparency
      opacity: 1,
      // Smooth transition for state changes
      transition: theme.transitions.create(['background-color', 'border'], {
        duration: 500,
      }),
    }),
  },
};

export default {
  MuiSwitch,
};