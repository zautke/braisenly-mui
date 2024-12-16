import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import spacing from './spacing';
import breakpoints from './breakpoints';
// @ts-ignore
import shape from './shape';
import zDepth from './z-depth';

// Create a base theme without components to avoid circular dependencies
// but with all the MUI methods (spacing, breakpoints, transitions, etc.)
const baseTheme = createTheme({
  palette,
  // @ts-ignore
  typography,
  // @ts-ignore
  spacing,
  // @ts-ignore
  breakpoints,
  shape,
});

// Augment with our custom zDepth and other extras
const theme = {
  ...baseTheme,
  zDepth,
  // Ensure typography matches what's exported from typography.ts if createTheme changed it
  typography: {
    ...baseTheme.typography,
    ...typography,
  }
};

export default theme;