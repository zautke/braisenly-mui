import React from 'react'
import extendedPalette from './palette'
import { createTheme } from '@mui/material/styles'
// import type { TypographyOptions, TypographyStyle, TypographyUtils } from '@mui/material/styles/createTypography'
import '@fontsource-variable/victor-mono'

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

const fontFamilyDef = {
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
  fontWeight: 'normal' as React.CSSProperties['fontWeight'],
  letterSpacing: 'normal',
  lineHeight: 1.15,
  color: '#000000', // Placeholder for colorGuide
  fontVariant: 'italic' as React.CSSProperties['fontVariant']
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
  // Custom variants not in standard MUI but used in project
  | 'banner'
  | 'poster'

// Mock types to avoid import issues
type TypographyStyle = React.CSSProperties;
type TypographyUtils = { pxToRem: (px: number) => string };
type TypographyOptions = any;

export interface Typography extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils { }

const typographyOptions: TypographyOptions = {
  banner: {},
  poster: {},
  ...palmBeachFont,
  ...fontFamilyDef,
  button: buttonOverrides,
  pxToRem,
}

const dummyTheme = createTheme({
  palette,
  typography: typographyOptions
})

export default dummyTheme.typography
