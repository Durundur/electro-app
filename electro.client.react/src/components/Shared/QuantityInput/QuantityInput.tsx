"use client";
import { IconButton, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { AddRounded, RemoveRounded } from "@mui/icons-material";

interface QuantityInputProps {
	value: number;
	onChange: (value: number, id: string) => void;
	id: string;
}

const QuantityInput: FC<QuantityInputProps> = ({ value, onChange, id }) => {
	const handleIncrease = () => {
		onChange(value + 1, id);
	};

	const handleDecrease = () => {
		if (value > 0) {
			onChange(value - 1, id);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		const numericValue = parseInt(inputValue, 10);
		if (!isNaN(numericValue)) {
			onChange(numericValue, id);
		}
	};

	return (
		<Stack direction={"row"} alignItems={"center"}>
			<IconButton disabled={value - 1 <= 0} size="small" onClick={handleDecrease}>
				<RemoveRounded fontSize="small" />
			</IconButton>
			<TextField
				slotProps={{
					htmlInput: {
						pattern: "^[0-9]*$",
					},
				}}
				sx={{
					".MuiInputBase-input": {
						width: "30px",
					},
				}}
				value={value}
				onChange={handleInputChange}
				size="small"
			/>
			<IconButton size="small" onClick={handleIncrease}>
				<AddRounded fontSize="small" />
			</IconButton>
		</Stack>
	);
};

export default QuantityInput;
