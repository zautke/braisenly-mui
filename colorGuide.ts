// import common from '@mui/material/colors/common';
// import grey from '@mui/material/colors/grey';
// import purple from '@mui/material/colors/purple';
// import red from '@mui/material/colors/red';
// import orange from '@mui/material/colors/orange';
// import blue from '@mui/material/colors/blue';
// import lightBlue from '@mui/material/colors/lightBlue';
// import green from '@mui/material/colors/green';

// export type ColorName = keyof ColorMapEntry | undefined;
export type ColorName = { [color: string]: string } | string | undefined
export type ColorValue = string | undefined

export type ColorTuple = [key: string, V: string]

export type ColorValueReturnValue = string
export type ColorNameOrValue = ColorName | ColorValue | undefined

export type colorNames = keyof ColorMap

// export type ColorMapEntry =  { [color        : string]        : string};
export type ColorMapEntries = ColorMapEntry[]
export type ColorMapEntry = { [color: string]: string } | { [color: string]: string, value: string }

export type ColorMap = ColorMapEntry | ColorMapEntries


export interface ExtractColorEntryProps
{
  colorName: ColorName,
  colorValue: ColorValue
};

export interface ExtractColorEntryParams extends ExtractColorEntryProps
{
  colorNameOrValue: ColorNameOrValue
  colorMapEntries: ColorMapEntries,
};

export const colorValue = (colorMapEntry: ColorMapEntry): ColorValueReturnValue => colorMapEntry.color
export const entryToTuple = (entry: ColorMapEntry): ColorTuple => [entry.key, entry.value]
export function colorEntry (map: { [color: string]: ColorValue }) { return map[0] }
export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>
type ColorGuideNameMap<ColorGuideKey extends string = string> = { [P in ColorGuideKey]: string }
export type ColorGuide = Record<string, string>

const styleguideColors: ColorGuide = {

  treegreen: '#1C6F26', // primary
  walnut: '#7b6748', // secondary
  crimson: '#bf140a', // error
  applegreen: '#41bf60', // success
  lemon: '#eaf21b', // info
  burntorange: '#ff9800', // warning
  ink: '#000000', // black
  white: '#ffffff', // white
  offwhite: '#FEFEFE',
  eggshellCream: '#F5F2F0',
  sage: '#c5ffc3',
  periwinkle: '#7ebcff',
  matteSeafoam: '#de9b61',
  sunflower: '#3b8386',
  lavendar: '#de4641',
  flatLime: '#981d1a',
  pinotNoir: '#9b5a6d',
  darkBeige: '#9b896c',
  darkBeige2: '#9b896c',
  darkBeige3: '#9b896c',
  mud: '#564b3a',
  greyscale: '#dce3f0',
  baseblue: '#4f78f2',
  blue: '#4f78f2',
  deepgreen: '#004400',

  back: '#002B36', // editor
  fore: '#839496',

  back1: '#003847', // input
  fore1: '#93A1A1',

  XXXX: '#222',
  '': 'limegreen',
  'blue-base': '#0a71d0',
  'blue-disabled': '#84b8e7',
  'blue-hover': '#3b8dd9',
  'blue-pressed': '#0964b8',
  'azure-base': '#30b5ff',
  'azure-disabled': '#91d5fb',
  'azure-hover': '#56c2fd',
  'azure-pressed': '#17acff',
  'brand-blue-razz': '#6ae6ce',
  'brand-corporate-blue': '#0082ca',
  'brand-cotton-candy': '#ffc6c3',
  'brand-deep-space': '#0d2345',
  'brand-grape-soda': '#5a61c5',
  'brand-green-apple': '#05dcac',
  'brand-hot-sauce': '#eb5e70',
  'brand-wasabi': '#b6fbaf',
  'dsgn-address': '#0080a3',
  'dsgn-behavioral-analysis': '#4c72b6',
  'dsgn-calgary': '#9b3b88',
  'dsgn-connectors': '#e6e6e6',
  'dsgn-data-investigation': '#7dbebb',
  'dsgn-demographic-analysis': '#a82555',
  'dsgn-developer': '#81979b',
  'dsgn-documentation': '#207ea9',
  'dsgn-favorites': '#ffdb2b',
  'dsgn-in-database': '#44597c',
  'dsgn-in-out': '#009d8d',
  'dsgn-interface': '#d6d6d6',
  'dsgn-join': '#7a52a0',
  'dsgn-parse': '#96b149',
  'dsgn-predictive': '#894727',
  'dsgn-preparation': '#0065a8',
  'dsgn-reporting': '#db9044',
  'dsgn-spatial': '#009031',
  'dsgn-transform': '#e25f45',
  'green-base': '#008765',
  'green-disabled': '#79beae',
  'green-hover': '#309d82',
  'green-pressed': '#006e52',
  'grey-01': '#f7faff',
  'grey-02': '#eaeff9',
  'grey-03': '#dce3f0',
  'grey-04': '#c8d2e6',
  'grey-05': '#8698ba',
  'ink-base': '#252d39',
  'ink-light': '#647492',
  'orange-base': '#e15428',
  'orange-disabled': '#e88a6c',
  'orange-hover': '#e46841',
  'orange-pressed': '#ce4b22',
  'red-base': '#d7354a',
  'red-disabled': '#e595a0',
  'red-hover': '#dc5b6c',
  'red-pressed': '#ca283d',

}

const SolarizedDark: ColorGuideNameMap = {

  Background: '#002B36',
  Foreground: '#839496',
  Text: '#586e75',
  SelectionBackground: '#2E4C52',
  SelectionForeground: '#FFFFFF',
  Buttons: '#073642',
  SecondBackground: '#003745',
  Disabled: '#2E5861',
  Contrast: '#00252E',
  Active: '#003946',
  Border: '#0D3640',
  Highlight: '#005a6f',
  Tree: '#2E4C5280',
  Notifications: '#2E4C52',
  AccentColor: '#d33682',
  ExcludedFilesColor: '#083F4D',
  GreenColor: '#859900',
  YellowColor: '#b58900',
  BlueColor: '#268bd2',
  RedColor: '#d13684',
  PurpleColor: '#6c71c4',
  OrangeColor: '#cb4b16',
  CyanColor: '#2aa198',
  GrayColor: '#657B83',
  WhiteBlackColor: '#93A1A1',
  ErrorColor: '#dc322f',
  CommentsColor: '#657B83',
  VariablesColor: '#268BD2',
  LinksColor: '#268BD2',
  FunctionsColor: '#B58900',
  KeywordColor: '#859900',
  TagsColor: '#268BD2',
  StringsColor: '#2AA198',
  OperatorsColor: '#93A1A1',
  AttributesColor: '#B58900',
  NumbersColor: '#D33682',
  ParametersColor: '#93A1A1'
}


const SolarizedLight: ColorGuide = {

  Background: '#fdf6e3',
  Foreground: '#586e75',
  Text: '#93a1a1',
  SelectionBackground: '#e8dcb6',
  SelectionForeground: '#002b36',
  Buttons: '#d8d4c4',
  SecondBackground: '#F6F0DE',
  Disabled: '#C9CCC3',
  Contrast: '#eee8d5',
  Active: '#d1cbb8',
  Border: '#edead9',
  Highlight: '#d1cbb8',
  Tree: '#e8dcb6b0',
  Notifications: '#EDE8D4',
  AccentColor: '#d33682',
  ExcludedFilesColor: '#E3DCC9',
  GreenColor: '#859900',
  YellowColor: '#b58900',
  BlueColor: '#268bd2',
  RedColor: '#d13684',
  PurpleColor: '#6c71c4',
  OrangeColor: '#cb4b16',
  CyanColor: '#2aa198',
  GrayColor: '#93A1A1',
  WhiteBlackColor: '#657b83',
  ErrorColor: '#dc322f',
  CommentsColor: '#93A1A1',
  VariablesColor: '#268BD2',
  LinksColor: '#268BD2',
  FunctionsColor: '#B58900',
  KeywordsColor: '#859900',
  TagsColor: '#268BD2',
  StringsColor: '#2AA198',
  OperatorsColor: '#657B83',
  AttributesColor: '#657B83',
  NumbersColor: '#D33682',
  ParametersColor: '#657B83',
}
// commonjs shim
export const color = styleguideColors
export
{
  styleguideColors,
  color as colorGuide // Alias for backward compatibility if needed
}

export default styleguideColors;
