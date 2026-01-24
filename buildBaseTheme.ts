import { createTheme, Theme } from '@mui/material/styles'
import breakpoints from './breakpoints'
import palette from './palette'
import shape from './shape'
import spacing from './spacing'
import typography from './typography'
import zDepth from './z-depth'
import componentOverrides from './componentOverrides'
import { applyThemeVariant } from './mui/themeVariants'

const themeOptions = {
  palette,
  typography,
  spacing,
  // @ts-ignore
  zDepth,
  breakpoints,
  shape
};

export const customBaseThemeOverrides: Theme = createTheme({
  ...themeOptions,
  components: componentOverrides,
});

export { applyThemeVariant };
export default customBaseThemeOverrides;