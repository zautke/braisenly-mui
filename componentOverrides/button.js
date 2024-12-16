import theme from '../themeStub';

const MuiButton = {
	styleOverrides: {
		root: {
			...theme.typography.button,
			padding: "4px 12px 6px 12px",
			minHeight: 0, // default: 36
			textAlign: "center",
			textTransform: "uppercase",
			borderRadius: 3,
			border: 0,
			minWidth: 0,

            // Moving the specific text button styles to the 'text' slot below is cleaner,
            // but keeping it here with updated selectors for minimal diff.
            // &.MuiButton-text is the class for text variant.
			"&.MuiButton-text:not(.MuiButton-contained):not(.MuiButton-outlined)": {
				color: theme.palette.colorGuide["blue-base"],
				backgroundColor: "transparent",
				"&:active": {
					color: theme.palette.colorGuide["blue-pressed"],
					backgroundColor: "transparent",
				},
				"&:hover:not(:active)": {
					color: theme.palette.colorGuide["blue-hover"],
					backgroundColor: "transparent",
				},
				"&.Mui-focusVisible": {
					color: theme.palette.colorGuide["blue-hover"],
					backgroundColor: "transparent",
				},
				"&.Mui-disabled": {
					color: theme.palette.colorGuide["blue-disabled"],
				},
			},
		},

		text: {}, // Could move the above block here
		textPrimary: {},

		contained: {
			backgroundColor: theme.palette.colorGuide["blue-base"],
			boxShadow: "0 1px 2px 0 rgba(34, 54, 70, 0.1)",
			"&:active": {
				boxShadow: "none",
				backgroundColor:
					theme.palette.colorGuide["blue-pressed"] + "!important",
			},
			"&:hover": {
				backgroundColor: theme.palette.colorGuide["blue-hover"],
			},
			"&.Mui-focusVisible": {
				backgroundColor: theme.palette.colorGuide["blue-hover"],
				border: `solid 1px ${theme.palette.colorGuide["blue-pressed"]}`,
			},
			"&.Mui-disabled": {
				backgroundColor: theme.palette.colorGuide["blue-disabled"],
			},
		},

		outlined: {
			fontWeight: theme.typography.fontWeightBold,
			color: theme.palette.colorGuide["ink-base"],
			backgroundColor: "transparent",
			border: `1px solid ${theme.palette.colorGuide["grey-04"]}`,
			"&:hover": {
				border: `1px solid ${theme.palette.colorGuide["grey-05"]}`,
				backgroundColor: "limegreen",
			},
			"&.Mui-focusVisible": {
				border: `1px solid ${theme.palette.colorGuide["grey-05"]}`,
				backgroundColor: "transparent",
			},
			"&:active": {
				border: `1px solid ${theme.palette.colorGuide["grey-04"]}`,
				backgroundColor: theme.palette.colorGuide["grey-03"],
			},
			"&.Mui-disabled": {
				border: `1px solid ${theme.palette.colorGuide["grey-03"]}`,
				color: theme.palette.action.disabled,
				backgroundColor: "transparent",
			},
		},
	},
};

const MuiButtonBase = {
	styleOverrides: {
		root: {
			"&.Mui-disabled": {
				color: theme.palette.action.disabled,
			},
		},
	},
};

export default {
	MuiButton,
	MuiButtonBase,
};
