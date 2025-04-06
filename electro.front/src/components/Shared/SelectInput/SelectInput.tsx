import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material";

type SelectInputProps<T> = SelectProps<T> & {
	helperText?: string;
	error?: boolean;
};

const SelectInput = <T,>({ label, helperText, error, children, ...props }: SelectInputProps<T>) => {
	const labelId = `${props.id}-label`;
	return (
		<FormControl
			fullWidth
			error={error}
			size={props.size}
			sx={(theme) => ({
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
		>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				MenuProps={{
					id: `menu-${props.id}`,
					disablePortal: true,
					sx: {
						"&.MuiPopover-root": {
							position: "absolute",
							"& .MuiPaper-root": {
								maxWidth: "unset !important",
								maxHeight: "unset !important",
								top: "100% !important",
								left: "0 !important",
							},
						},
					},
				}}
				labelId={labelId}
				{...props}
			>
				{children}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default SelectInput;
