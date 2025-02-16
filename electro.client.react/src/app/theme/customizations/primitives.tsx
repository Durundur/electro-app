import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
	interface CommonColors {
		gold: string;
	}
	interface TypeAction {
		active2: string;
		selected2: string;
	}
}

const defaultTheme = createTheme();

export const typography = {
	fontFamily: "Roboto",
	h1: {
		fontSize: defaultTheme.typography.pxToRem(48),
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: -0.5,
	},
	h2: {
		fontSize: defaultTheme.typography.pxToRem(36),
		fontWeight: 600,
		lineHeight: 1.2,
	},
	h3: {
		fontSize: defaultTheme.typography.pxToRem(30),
		lineHeight: 1.2,
	},
	h4: {
		fontSize: defaultTheme.typography.pxToRem(24),
		fontWeight: 600,
		lineHeight: 1.5,
	},
	h5: {
		fontSize: defaultTheme.typography.pxToRem(20),
		fontWeight: 600,
	},
	h6: {
		fontSize: defaultTheme.typography.pxToRem(18),
		fontWeight: 600,
	},
	subtitle1: {
		fontSize: defaultTheme.typography.pxToRem(18),
	},
	subtitle2: {
		fontSize: defaultTheme.typography.pxToRem(16),
		fontWeight: 500,
	},
	body1: {
		fontSize: defaultTheme.typography.pxToRem(14),
	},
	body2: {
		fontSize: defaultTheme.typography.pxToRem(14),
		fontWeight: 400,
	},
	caption: {
		fontSize: defaultTheme.typography.pxToRem(12),
		fontWeight: 400,
	},
};

export const palette = {
	action: {
		hover: "rgba(0, 0, 0, 0.06)",
		hoverOpacity: 0.06,
		active: "rgba(0, 0, 0, 0.54)",
		selected: "rgba(0, 0, 0, 0.08)",
		selectedOpacity: 0.08,
		disabled: "rgba(0, 0, 0, 0.26)",
		disabledBackground: "rgba(0, 0, 0, 0.12)",
		disabledOpacity: 0.38,
		focus: "rgba(0, 0, 0, 0.12)",
		focusOpacity: 0.12,
		activatedOpacity: 0.12,
		active2: "hsla(210, 100%, 45%, 0.08)",
		selected2: "hsla(210, 100%, 45%, 0.14)",
	},
	primary: {
		50: "hsl(210, 100%, 96%)",
		100: "hsl(210, 100%, 90%)",
		200: "hsl(210, 100%, 80%)",
		300: "hsl(210, 100%, 70%)",
		400: "hsl(210, 100%, 60%)",
		500: "hsl(210, 100%, 45%)",
		600: "hsl(210, 100%, 42%)",
		700: "hsl(210, 100%, 38%)",
		800: "hsl(210, 100%, 30%)",
		900: "hsl(210, 100%, 23%)",
		main: "hsl(210, 100%, 45%)",
		light: "hsl(210, 100%, 70%)",
		dark: "hsl(210, 100%, 38%)",
		contrastText: "#fff",
	},
	secondary: {
		50: "hsl(215, 15%, 97%)",
		100: "hsl(215, 15%, 92%)",
		200: "hsl(215, 15%, 89%)",
		300: "hsl(215, 15%, 82%)",
		400: "hsl(215, 15%, 75%)",
		500: "hsl(215, 15%, 65%)",
		600: "hsl(215, 15%, 50%)",
		700: "hsl(215, 15%, 40%)",
		800: "hsl(215, 15%, 22%)",
		900: "hsl(215, 15%, 12%)",
		main: "hsl(210, 14%, 87%)",
		contrastText: "hsl(210, 14%, 22%)",
		light: "hsl(210, 14%, 89.6%)",
		dark: "hsl(210, 14%, 60.9%)",
	},
	common: {
		black: "hsl(200, 10%, 4%)",
		white: "#fff",
		gold: "#faaf00",
	},
	text: {
		primary: "hsl(215, 15%, 12%)",
		secondary: "hsl(215, 15%, 22%)",
		disabled: "rgba(0, 0, 0, 0.38)",
	},
	error: {
		50: "hsl(355, 98%, 97%)",
		100: "hsl(355, 98%, 93%)",
		200: "hsl(355, 98%, 87%)",
		300: "hsl(355, 98%, 80%)",
		400: "hsl(355, 98%, 74%)",
		500: "hsl(355, 98%, 66%)",
		600: "hsl(355, 98%, 46%)",
		700: "hsl(355, 98%, 39%)",
		800: "hsl(355, 98%, 29%)",
		900: "hsl(355, 98%, 17%)",
		main: "hsl(355, 98%, 66%)",
		light: "hsl(355, 98%, 80%)",
		dark: "hsl(355, 98%, 39%)",
		contrastText: "#fff",
	},
	success: {
		50: "hsl(144, 72%, 95%)",
		100: "hsl(144, 72%, 87%)",
		200: "hsl(144, 72%, 77%)",
		300: "hsl(144, 72%, 66%)",
		400: "hsl(144, 72%, 56%)",
		500: "hsl(144, 72%, 46%)",
		600: "hsl(144, 72%, 41%)",
		700: "hsl(144, 72%, 37%)",
		800: "hsl(144, 72%, 32%)",
		900: "hsl(144, 72%, 21%)",
		main: "hsl(144, 72%, 37%)",
		light: "hsl(144, 72%, 66%)",
		dark: "hsl(144, 72%, 37%)",
		contrastText: "#fff",
	},
	warning: {
		50: "hsl(48, 100%, 96%)",
		100: "hsl(48, 100%, 88%)",
		200: "hsl(48, 100%, 82%)",
		300: "hsl(48, 100%, 64%)",
		400: "hsl(48, 100%, 48%)",
		500: "hsl(48, 100%, 44%)",
		600: "hsl(40, 100%, 40%)",
		700: "hsl(36, 100%, 34%)",
		800: "hsl(36, 100%, 27%)",
		900: "hsl(36, 100%, 18%)",
		main: "hsl(48, 100%, 44%)",
		light: "hsl(48, 100%, 64%)",
		dark: "hsl(36, 100%, 34%)",
		contrastText: "rgba(0, 0, 0, 0.87)",
	},
};

export const shape = {
	borderRadius: 6,
};

export const transitions = {
	easing: {
		easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
		easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
		easeIn: "cubic-bezier(0.4, 0, 1, 1)",
		sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
	},
	duration: {
		shortest: 150,
		shorter: 200,
		short: 250,
		standard: 300,
		complex: 375,
		enteringScreen: 225,
		leavingScreen: 195,
	},
};
