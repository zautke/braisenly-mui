import type { PaletteOptions } from '@mui/material';
import type { PaletteColor, Color } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// ColorPartial type (compatible with MUI v7)
type ColorPartial = Partial<Color>;
import { color } from './colorGuide';



const colorStub: Omit<PaletteColor, 'main'> = {
  light: "",
  dark: "",
  contrastText: ""
};

const randomColor: ColorPartial = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};


export const paletteOptionExtensions: PaletteOptions = {
  primary: { // <PaletteColor>
    main: color.treegreen,
    // light: "",
    // dark: "",
    // contrastText: ""
  },
  secondary: {
    main: color.walnut,
    // light: "",
    // dark: "",
    // contrastText: ""
  },
  error: {
    main: color.crimson,
    // light: "",
    // dark: "",
    // contrastText: ""
  },
  warning: {
    main: color.crimson,
    // light: "",
    // dark: "",
    // contrastText: ""
  },
  info: {
    main: color.crimson,
    // light: "",
    // dark: "",
    // contrastText: ""
  },
  success: {
    main: color.crimson,
    // light: "",
    // dark: "",
    // contrastText: ""
  },
  mode: 'light', //<PaletteMode>='light' | 'dark';
  tonalOffset: 0.2, //<-- default\
  contrastThreshold: 3.3,
  common: { // Partial<CommonColors>
    black: color.XXXX,
    white: color.XXXX
  },
  grey: randomColor, //< ColorPartial>;
  text: { //Partial<TypeText>;
    primary: color.XXXX,
    secondary: color.XXXX,
    disabled: color.XXXX
  },
  divider: color.XXXX,
  action: { // Partial<TypeAction>;
    // values  from default theme
    activatedOpacity: 0.12,
    active: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08
  },
  background: { //Partial<TypeBackground>;
    default: color.offwhite,
    paper: color.offwhite,
    bk1: color.offwhite
  },
  //getContrastText(background), // <-- an internal function used by createPallete.js
  colorGuide: color,
  ext: {}
}


/* MUI v7: createPalette is no longer a public export, use createTheme instead */
const tempTheme = createTheme({ palette: paletteOptionExtensions });
export const extendedPalette = tempTheme.palette;

export default extendedPalette;
