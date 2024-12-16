import { createTheme, Theme } from '@mui/material/styles'
import breakpoints from './breakpoints'
import palette from './palette'
import shape from './shape'
import spacing from './spacing'
import typography from './typography'
import zDepth from './z-depth'
import componentOverrides from './componentOverrides'

// Create the base theme first to avoid circular dependency issues when components are loaded
// However, since components import 'theme' from here, and we import 'components' from there,
// we have a cycle.
// If "this flow is working right now", we must adhere to the existing structure.
// But 'componentOverrides' uses 'theme.palette'.
// We will construct the theme in two passes if necessary, or rely on the fact that
// createTheme might be lazy? No, it's not.

// To support the existing flow where components import THIS file:
// We must export the theme object.

const themeOptions = {
  palette,
  typography,
  spacing,
  // @ts-ignore
  zDepth,
  breakpoints,
  shape
};

// We create a "base" theme here just to satisfy the import in componentOverrides if they use it.
// But wait, the final theme needs componentOverrides.
// If we export the final theme, components reading it during their own module load will see undefined.

// Strategy:
// 1. Define the base options.
// 2. Create the theme WITH component overrides.
// 3. Export it.

export const customBaseThemeOverrides: Theme = createTheme({
  ...themeOptions,
  components: componentOverrides,
});

export default customBaseThemeOverrides;
