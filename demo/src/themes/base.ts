import { createTheme } from '@mui/material/styles';
import { customBaseTheme as customBaseThemeOverrides } from '@braisenly/mui';

// Re-create the theme to ensure it's a fresh instance if needed, 
// or just export the pre-built one.
export const baseTheme = customBaseThemeOverrides;
