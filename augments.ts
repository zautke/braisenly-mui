/**
 * MUI Module Augmentations
 * This file extends MUI's type definitions with custom properties.
 * These augmentations are bundled with the package to ensure consumers
 * get the extended types (colorGuide, ext, bk1-bk4, name, etc.)
 */

import type { ColorGuide } from "./colorGuide";

// Augment @mui/material/styles (MUI v7 compatible - single consolidated declaration)
declare module "@mui/material/styles" {
  // Typography variants
  export interface TypographyVariants {
    poster: React.CSSProperties;
  }

  export interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }

  // Theme name
  export interface Theme {
    name?: string;
  }

  export interface ThemeOptions {
    name?: string;
  }

  // Extended palette options
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

// Ensure this file is treated as a module
export {};

