/* module augmentation for Material-UI customizization */

import { } from "@mui/material/styles"
import { } from '@mui/material/Typography'
import { } from "@mui/material/styles/createPalette"
import { ColorGuide } from "./colorGuide"
//import type { PaletteMode } from "@mui/material";

export type PartialColorGuide = {
  [P in keyof ColorGuide]?: Partial<ColorGuide[P]>
}


//export type PaletteColorOptions = PaletteColorExts | SimplePaletteColorOptions | ColorPartial;

declare module '@mui/material/styles' {
  export interface TypographyVariants
  {
    poster: React.CSSProperties
  }

  // allow configuration using `createTheme`
  export interface TypographyVariantsOptions
  {
    poster?: React.CSSProperties
  }
}

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions
  {
    primary?: PaletteColorOptions
    secondary?: PaletteColorOptions
    error?: PaletteColorOptions
    warning?: PaletteColorOptions
    info?: PaletteColorOptions
    success?: PaletteColorOptions
    mode?: PaletteMode
    tonalOffset?: PaletteTonalOffset
    contrastThreshold?: number
    common?: Partial<CommonColors>
    grey?: ColorPartial
    text?: Partial<TypeText>
    divider?: string
    action?: Partial<TypeAction>
    background?: Partial<TypeBackground>
    getContrastText?: (background: string) => string
    colorGuide?: ColorGuide
    ext?: any
  }

  export interface TypeBackground
  {
    bk1?: string
    bk2?: string
    bk3?: string
    bk4?: string
  }

  export interface Palette
  {
    colorGuide: ColorGuide
    ext?: any
  }

  export interface Palette
  {
    colorGuide: ColorGuide
    ext?: any
  }

  export interface PaletteColor extends ColorPartial<Color> { }
}


