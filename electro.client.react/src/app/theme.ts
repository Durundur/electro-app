import { createTheme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		smalltitle: true;
	}
}

interface ExtendedTypographyOptions extends TypographyOptions {
	smalltitle: React.CSSProperties;
}

declare module "@mui/material/styles/createPalette" {
	interface CommonColors {
		gold: string;
	}
	interface TypeAction {
		active2: string;
		selected2: string;
	}
}

interface ExtendedTypographyOptions extends TypographyOptions {
	smalltitle: React.CSSProperties;
}

const theme = createTheme({
	palette: {
		mode: "light",
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
	},
	typography: {
		fontFamily: '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
		htmlFontSize: 16,
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		smalltitle: {
			fontSize: 18,
			fontWeight: 500,
		},
	} as ExtendedTypographyOptions,
	shadows: [
		"none",
		"0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
		"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
		"0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
		"0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
		"0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
		"0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
		"0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
		"0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
		"0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
		"0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
		"0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
		"0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
		"0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
		"0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
		"0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
		"0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
		"0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
		"0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
		"0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
		"0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
		"0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
		"0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
		"0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
		"0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
	],
	shape: { borderRadius: 6 },
	transitions: {
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
	},
	components: {
		MuiCardHeader: {
			styleOverrides: {
				root: {
					paddingBottom: 0,
				},
			},
			defaultProps: {
				titleTypographyProps: {
					variant: "h6",
				},
			},
		},
		MuiCard: {
			defaultProps: {
				elevation: 4,
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
		MuiContainer: {
			defaultProps: {
				maxWidth: "lg",
			},
		},
		MuiLink: {
			defaultProps: {
				underline: "none",
			},
		},
		MuiTooltip: {
			defaultProps: {
				arrow: true,
			},
		},
		MuiSelect: {
			defaultProps: {
				MenuProps: { disableScrollLock: true },
			},
		},
		MuiTypography: {},
	},
});

export default theme;
