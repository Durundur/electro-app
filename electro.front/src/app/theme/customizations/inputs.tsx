import { Theme, Components } from "@mui/material/styles";

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations: Components<Theme> = {
	MuiButton: {
		defaultProps: {
			size: "small",
		},
		styleOverrides: {
			root: {
				textTransform: "none",
			},
		},
	},
	MuiInputBase: {
		styleOverrides: {
			root: {
				border: "none",
			},
			input: ({ theme }) => ({
				"&::placeholder": {
					opacity: 0.7,
					color: theme.palette.grey[600],
				},
			}),
		},
	},
	MuiFormLabel: {
		styleOverrides: {
			root: ({ theme }) => ({
				marginBottom: 2,
				"&.Mui-focused, &.Mui-error": {
					color: theme.palette.text.secondary,
				},
			}),
		},
	},
};
