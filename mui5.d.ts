import { type Theme } from "@mui/material/styles/createTheme";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import " @mui/material/styles/createTypography";

import "@mui/material/styles/createPalette";

// interface ActiveElementArray<T> {};

//declare module "@mui/material/styles" {
//	export interface ThemeOptions {
//		name?: string;
//	}
//	export interface Theme {
//		name?: string;
//	}
//}

declare module "@mui/material/styles/createTheme" {
	interface ThemeOptions {
		name?: string;
	}

	interface Theme {
		name?: string;
	}
}

declare module "@mui/material/styles/createPalette" {
	interface CommonColors {
		// tan: string;
		// lightRed: string;
		// red: string;
		// offBlack: string;
	}
}

/* augmentations to facilitate a new custom Typography Variant */
declare module "@mui/material/styles" {
	interface TypographyVariants {
		//inputLabel: React.CSSProperties;
		//inputPlaceholder: React.CSSProperties;
		//inputTypedText: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		//inputLabel?: React.CSSProperties;
		//inputPlaceholder?: React.CSSProperties
		//inputTypedText?: React.CSSProperties
		//h3: false;         <-- disable `h3' variant
	}
}

// // Update the Typography's variant prop options
// declare module '@mui/material/styles/createTypography' {
//   export interface FontStyle
//     extends Required<{
//       fontFamily: React.CSSProperties['fontFamily']
//       fontSize: number
//       fontWeightLight: React.CSSProperties['fontWeight']
//       fontWeightRegular: React.CSSProperties['fontWeight']
//       fontWeightMedium: React.CSSProperties['fontWeight']
//       fontWeightBold: React.CSSProperties['fontWeight']
//       htmlFontSize: number
//     }>
//   {
//     fontWeightSemiBold: React.CSSProperties['fontWeight'],
//     whiteText: React.CSSProperties['color'] | string,
//   }
// }

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
type MuiThemeTuple = [Theme, Theme];
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
type MuiThemeState = [
	Theme | undefined,
	React.Dispatch<React.SetStateAction<Theme | undefined>>,
];
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
type MuiThemeStateTuple<Theme> = [Theme, Dispatch<SetStateAction<Theme>>];
