/**
 * MUI Module Augmentations
 * This file extends MUI's type definitions with custom properties.
 * These augmentations are bundled with the package to ensure consumers
 * get the extended types (colorGuide, ext, bk1-bk4, name, etc.)
 */

import type { ColorGuide } from "./colorGuide";

// Augment @mui/material/styles for Typography variants
declare module "@mui/material/styles" {
  export interface TypographyVariants {
    poster: React.CSSProperties;
  }

  export interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Augment @mui/material/styles/createPalette for extended palette options
declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    colorGuide?: ColorGuide;
    ext?: unknown;
  }

  export interface TypeBackground {
    bk1?: string;
    bk2?: string;
    bk3?: string;
    bk4?: string;
  }

  export interface Palette {
    colorGuide: ColorGuide;
    ext?: unknown;
  }
}

// Augment @mui/material/styles/createTheme for theme name
declare module "@mui/material/styles/createTheme" {
  interface ThemeOptions {
    name?: string;
  }

  interface Theme {
    name?: string;
  }
}

// Ensure this file is treated as a module
export {};

