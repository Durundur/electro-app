import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import "./search-input.scss";
import { useRouter } from "next/navigation";

const NavbarSearchInput: FC = () => {
	const [search, setSearch] = useState("");
	const router = useRouter();

	const handleSearchClick = () => {
		router.push(`/search`);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearchClick();
		}
	};

	return (
		<div className="SearchInput">
			<TextField
				placeholder="Wyszukaj"
				variant="outlined"
				size="small"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<IconButton onClick={handleSearchClick}>
									<SearchOutlined></SearchOutlined>
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			></TextField>
		</div>
	);
};

export default NavbarSearchInput;
