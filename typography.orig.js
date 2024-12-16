import {Barlow} from 'typeface-barlow';
import extendedPalette from './palette';
import palette, { ColorGuide } from './colorGuide';

const p = extendedPalette;
const color = extendedPalette.colorGuide;

const fontSize = 14; // material default
const htmlFontSize = 16; // browser default

const coef = fontSize / 14;
export function pxToRem(value) {
  return `${(value / htmlFontSize) * coef}rem`;
}

const barlowFont = {
  fontFamily: [
    'Barlow', 'Lato', 'sans-serif'
  ].join(','),
}

const fontFamily = {
  ...barlowFont
}

const baseVariants = {
  barlowFont: {...barlowFont},

  title1: {
    ...barlowFont,
    fontSize: pxToRem(22),
    fontWeight: 'bold',
    letterSpacing: 'normal',
    lineHeight: 1.09,
    color: color['greyscale'],
  },
  title2: {
    ...barlowFont,
    fontSize: pxToRem(18),
    fontWeight: 'bold',
    letterSpacing: 'normal',
    lineHeight: 1.11,
    color: color['greyscale'],
  },
  title3: {
    ...barlowFont,
    fontSize: pxToRem(14),
    fontWeight: 600,
    lineHeight: 1.29,
    color: color['greyscale'],
  },
  title4: {
    ...barlowFont,
    fontSize: pxToRem(13),
    fontWeight: 600,
    letterSpacing: 'normal',
    lineHeight: 1.15,
    color: color['greyscale'],
  },
  label: {
    ...barlowFont,
    fontSize: pxToRem(12),
    fontWeight: 600,
    letterSpacing: '0.5px',
    lineHeight: 1.25,
    textTransform: 'capitalize',
    color: color['greyscale'],
  },
  regular: {
    ...barlowFont,
    fontSize: pxToRem(13),
    fontWeight: 'normal',
    letterSpacing: 'normal',
    lineHeight: 1.54,
    color: color['greyscale'],
  },
  small: {
    ...barlowFont,
    fontSize: pxToRem(12),
    fontWeight: 'normal',
    letterSpacing: 'normal',
    lineHeight: 1.33,
    color: color['greyscale'],
  }
}

const normalWeight = {
  fontWeight: 'normal',
}

const semibold = {
  fontWeight: 600,
}

const description = {
  color: color['greyscale'],
}

const hyperlink = {
  color: color['greyscale'],
}


const dkBg = {
  color: p.common.white,
}


const subVariants = {
  title2Hyperlink: {
    ...baseVariants.title2,
    ...hyperlink,
  },
  title2Dkbg: {
    ...baseVariants.title2,
    ...dkBg,
  },
  title3Inactive: {
    ...baseVariants.title3,
    ...normalWeight,
  },
  title3Hyperlink: {
    ...baseVariants.title3,
    ...hyperlink,
  },
  title3Dkbg: {
    ...baseVariants.title3,
    ...dkBg,
  },
  title4Description: {
    ...baseVariants.title4,
    ...description,
  },
  title4Inactive: {
    ...baseVariants.title4,
    ...normalWeight,
  },
  title4Hyperlink: {
    ...baseVariants.title4,
    ...hyperlink,
  },
  regularSemibold: {
    ...baseVariants.regular,
    ...semibold,
  },
  regularDescription: {
    ...baseVariants.regular,
    ...description,
  },
  regularHyperlink: {
    ...baseVariants.regular,
    ...hyperlink,
  },
  smallSemibold: {
    ...baseVariants.small,
    ...semibold,
  },
  smallDescription: {
    ...baseVariants.small,
    ...description,
  },
  smallHyperlink: {
    ...baseVariants.small,
    ...hyperlink,
  },
}

const darkVariants = {
  whiteText: {
    color: p.common.white,
  },
}

const typographyOverrides = {
  button: {
    ...barlowFont,
    fontSize: pxToRem(13),
    fontWeight: 'normal',
    letterSpacing: 'normal',
    lineHeight: 1.15,
    textTransform: 'captialize',
    color: color['greyscale'],
  },
  fontFamily: fontFamily
};

const typographyInput = {

}

console.log("typographyInput:", typographyInput )

export default {
  typography: {
    altVariants: {},
    ...baseVariants,
    ...subVariants, ...darkVariants, ...typographyOverrides, }
};
