import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const TextInput = (props: TextFieldProps) => {
	return (
		<TextField
			{...props}
			sx={(theme) => ({
				"& legend > span": {
					display: "none",
				},
				"& label": {
					position: "initial",
					transform: "none",
					pointerEvents: "auto",
					fontSize: theme.typography.body1.fontSize,
					fontWeight: 500,
					color: theme.palette.text.secondary,
					marginBottom: 0.25,
					"&.Mui-focused, &.Mui-error": {
						color: theme.palette.text.secondary,
					},
				},
			})}
		/>
	);
};

export default TextInput;
