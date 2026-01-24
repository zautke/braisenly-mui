/**
 * Type augmentations for MUI components
 * This file re-exports all type augmentations to ensure they are bundled with the package
 */

// Re-export ColorGuide type so consumers can use it
export { type ColorGuide, type ColorName, type ColorValue, type ColorMap, type ColorMapEntry, type ColorMapEntries } from "./colorGuide";

// Import the module augmentations - this ensures they are bundled with the package
// and consumers get the extended MUI types (colorGuide, ext, bk1-bk4, name, etc.)
import "./augments";

// Re-export augmented types from MUI for explicit access
export type { Palette, PaletteOptions, TypeBackground, PaletteColor } from "@mui/material/styles/createPalette";
export type { Theme, ThemeOptions, TypographyVariants, TypographyVariantsOptions } from "@mui/material/styles";

