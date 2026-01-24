import customBaseTheme from "./buildBaseTheme";
import styleOverrides from "./componentOverrides";
import defaultPropOverrides from "./defaultProps";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import merge from "lodash/merge";

// Re-export type augmentations so they are bundled with the package
// This ensures consumers get the extended MUI types (colorGuide, ext, bk1-bk4, etc.)
export * from "./types";

export { default as palette } from "./palette";
export { customBaseTheme };
export { styleOverrides };

const mergeStyleandDefaultPropOverrides = merge(
	styleOverrides,
	defaultPropOverrides,
);

const componentOverrides = {
	components: {
		...mergeStyleandDefaultPropOverrides,
	},
};

const defaultThemeOptions: ThemeOptions = {
	name: "Default",
};
export const defaultTheme: Theme = createTheme(defaultThemeOptions);

const customThemeOptions: ThemeOptions = merge({
	...customBaseTheme,
	...componentOverrides,
	name: "Custom",
});

export const finalTheme: Theme = createTheme(customThemeOptions);

export default finalTheme;
