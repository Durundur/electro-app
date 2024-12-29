import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import "./search-input.scss";
import { useRouter } from "next/navigation";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import { useSelector } from "@/libs/Store";

const NavbarSearchInput: FC = () => {
	const router = useRouter();
	const filtersSelector = useSelector((store) => store.SearchProductsPageStore.urlParams.filters);
	const search = filtersSelector["search"]?.[0];
	const [searchInput, setSearchInput] = useState<string>(search ?? "");

	useEffect(() => {
		setSearchInput(search ?? "");
	}, [search]);

	const handleSearchClick = () => {
		const params = { search: searchInput };
		router.push(`/search?${buildQueryString(params)}`);
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
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
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
