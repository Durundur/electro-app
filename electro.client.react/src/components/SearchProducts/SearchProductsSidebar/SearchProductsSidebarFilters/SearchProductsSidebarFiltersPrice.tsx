import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";

const SearchProductsSidebarFiltersPrice: FC = () => {
	return (
		<Stack paddingX={1.5}>
			<Typography variant="body1" fontWeight={500}>
				Cena
			</Typography>
			<Stack direction={"row"} alignItems={"center"} spacing={2}>
				<TextField
					size="small"
					placeholder="od"
					slotProps={{
						input: {
							endAdornment: <InputAdornment position="end">zł</InputAdornment>,
						},
						htmlInput: {
							style: {
								textAlign: "center",
							},
						},
					}}
				/>
				<span>-</span>
				<TextField
					size="small"
					placeholder="do"
					slotProps={{
						input: {
							endAdornment: <InputAdornment position="end">zł</InputAdornment>,
						},
						htmlInput: {
							style: {
								textAlign: "center",
							},
						},
					}}
				/>
			</Stack>
		</Stack>
	);
};

export default SearchProductsSidebarFiltersPrice;
