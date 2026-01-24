/**
 * Theme-Agnostic Slider Overrides
 *
 * Pattern Reference: MUI v7 Slider.js
 * @see https://github.com/mui/material-ui/blob/v7.3.7/packages/mui-material/src/Slider/Slider.js
 */
import { alpha, Theme, Components } from "@mui/material/styles";

const MuiSlider: Components<Theme>['MuiSlider'] = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      color: (theme.vars || theme).palette.primary.main,
      height: 4,
    }),
    thumb: ({ theme }: { theme: Theme }) => ({
      width: 16,
      height: 16,
      backgroundColor: (theme.vars || theme).palette.common.white,
      border: '2px solid currentColor',
      transition: theme.transitions.create(['box-shadow', 'width', 'height'], { duration: 200 }),
      
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${alpha((theme.vars || theme).palette.primary.light, 0.2)}`,
        width: 20,
        height: 20,
      },
      '&.Mui-active': {
        boxShadow: `0px 0px 0px 14px ${alpha((theme.vars || theme).palette.primary.light, 0.4)}`,
        width: 22,
        height: 22,
      },
    }),
    rail: ({ theme }: { theme: Theme }) => ({
      color: (theme.vars || theme).palette.action.disabled,
      opacity: 1,
      borderRadius: 2,
    }),
    track: {
      borderRadius: 2,
      border: 'none',
    },
    mark: ({ theme }: { theme: Theme }) => ({
      backgroundColor: (theme.vars || theme).palette.text.disabled,
      height: 8,
      width: 1,
      marginTop: -3,
    }),
    markActive: ({ theme }: { theme: Theme }) => ({
      backgroundColor: (theme.vars || theme).palette.common.white,
    }),
  },
};

export default {
  MuiSlider
};