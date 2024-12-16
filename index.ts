import customBaseTheme from "./buildBaseTheme";
import styleOverrides from "./componentOverrides";
import defaultPropOverrides from "./defaultProps";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import _ from "lodash";

const mergeStyleandDefaultPropOverrides = _.merge(
	styleOverrides,
	defaultPropOverrides,
);

const componentOverrides = {
	components: {
		...mergeStyleandDefaultPropOverrides,
	},
};

//console.log(
//	"mergeStyleandDefaultPropOverrides",
//	JSON.stringify(mergeStyleandDefaultPropOverrides, null, 2),
//);

const defaultThemeOptions: ThemeOptions = {
	name: "Default",
};
export const defaultTheme: Theme = createTheme(defaultThemeOptions);

const customThemeOptions: ThemeOptions = _.merge({
	...customBaseTheme,
	...componentOverrides,
	name: "Custom",
});

const _customTheme: Theme = createTheme(customThemeOptions, componentOverrides);

// console.log("customThemeOptions", JSON.stringify(customThemeOptions, null, 2))

export const finalTheme: Theme = createTheme(customThemeOptions);

console.log("finalTheme", JSON.stringify(finalTheme, null, 2));

console.log('default theme', JSON.stringify(defaultTheme, null, 2))
// console.log('custom theme', JSON.stringify(_customTheme, null, 2))

export default finalTheme;
