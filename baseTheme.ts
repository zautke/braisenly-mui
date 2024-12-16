import { createTheme, Theme } from '@mui/material/styles'
import breakpoints from './breakpoints'
import palette from './palette'
import shape from './shape'
import spacing from './spacing'
import typography from './typography'
import zDepth from './z-depth'

// Create the base theme without overrides to avoid circular dependencies
export const baseTheme: Theme = createTheme({
  palette,
  typography,
  spacing,
  // @ts-ignore
  zDepth
}, {
  breakpoints,
  shape,
})

export default baseTheme
