
import React from 'react'
import extendedPalette from './palette'
// import colorGuide, { ColorGuide } from './colorGuide'
import colorGuide from './colorGuide'

import createTypography, { TypographyOptions, TypographyStyle, TypographyStyleOptions, TypographyUtils } from '@mui/material/styles/createTypography'
import FontFamily from '@mui/material/Typography'
// Supports weights 100-700
import '@fontsource-variable/victor-mono'
//import createTypography, { TypographyStyle, TypographyUtils } from '@mui/material/styles/createTypography'

// import { Palette } from '@mui/material/styles/createPalette';

const palette = extendedPalette

const fontSize = 14 // material default
const htmlFontSize = 16 // browser default
const coef = fontSize / 14
export function pxToRem (value: number): string
{
  return `${(value / htmlFontSize) * coef}rem`
}


const fontFallbacks = [
  'Lato',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'sans-serif'
]

const barlowFont = {
  fontFamily: [
    '"Barlow"',
    [...fontFallbacks]
  ].join(', '),
}

const cormorantFont = {
  fontFamily: [
    '"cormorant"',
    [...fontFallbacks]
  ].join(', '),
}

const palmBeachFont = {
  fontFamily: [
    '"PalmBeach"',
    [...fontFallbacks]
  ].join(', '),
}

const victorMonoFont = {
  fontFamily: [
    '"Victor Mono Variable"',
    [...fontFallbacks]
  ].join(', '),
}

const fontFamily = {
  ...victorMonoFont,
  fontSize: 16,
  htmlFontSize: 14,
  fontWeightThin: 100,
  fontWeightExtraLight: 200,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
}

const buttonOverrides = {
  ...barlowFont,
  fontSize: pxToRem(13),
  fontWeight: 'normal',
  letterSpacing: 'normal',
  lineHeight: 1.15,
  //textTransform: 'captialize',
  color: colorGuide['greyscale'],
  fontVariant: 'italic'
}


const typographyOverrides = {
  button: {
    ...cormorantFont,
    fontSize: pxToRem(13),
    fontWeight: 'normal',
    letterSpacing: 'normal',
    lineHeight: 1.15,
    textTransform: 'captialize',
    color: colorGuide['greyscale'],
    fontVariant: 'italic'
  },
  fontFamily
}

export interface FontStyle
  extends Required<{
    fontFamily: React.CSSProperties['fontFamily']
    fontSize: number
    fontWeightLight: React.CSSProperties['fontWeight']
    fontWeightRegular: React.CSSProperties['fontWeight']
    fontWeightMedium: React.CSSProperties['fontWeight']
    fontWeightBold: React.CSSProperties['fontWeight']
    htmlFontSize: number
  }>
{
  fontWeightThin?: React.CSSProperties['fontWeight'],
  fontWeightExtraLight?: React.CSSProperties['fontWeight'],
  fontWeightSemiBold?: React.CSSProperties['fontWeight'],
  fontWeightExtraBold?: React.CSSProperties['fontWeight'],
  whiteText?: React.CSSProperties['color'] | string,
}

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'banner'
  | 'poster'

//typography: TypographyOptions | ((palette: Palette) => TypographyOptions),

export interface Typography extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils { }

//export interface TypographyOptions
//   extends Partial<Record<Variant, TypographyStyleOptions> & FontStyleOptions> {}

const fontWeightSemiBold = {
  fontWeight: 600
}

const typographyOptions: Typography = {
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
  subtitle1: {},
  subtitle2: {},
  body1: {},
  body2: {},
  caption: {},
  overline: {},
  banner: {},
  poster: {},
  // @ts-ignore
  regular: {},
  // @ts-ignore
  label: {},
  ...palmBeachFont,
  ...fontFamily,
  //...typographyOverrides,
  button: buttonOverrides,
  pxToRem,
}


export default createTypography(
  palette,
  typographyOptions
)


//   console.log("typographyInput:", typography )

// export default typography;
