import { Components, Theme } from "@mui/material";

/* eslint-disable import/prefer-default-export */
export const componentsCustomizations: Components<Theme> = {
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
	MuiSelect: {
		defaultProps: {
			MenuProps: { disableScrollLock: true },
		},
	},
	MuiTypography: {
		defaultProps: {
			variant: "body1",
		},
	},
};
