import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import { useSelector } from "@/libs/Store";
import TextInput from "@/components/Shared/TextInput/TextInput";

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
		<TextInput
			size="small"
			variant="outlined"
			placeholder="Wyszukaj"
			label=" "
			value={searchInput}
			onChange={(e) => setSearchInput(e.target.value)}
			onKeyDown={handleKeyDown}
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<IconButton onClick={handleSearchClick} size="small">
								<SearchOutlined></SearchOutlined>
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		></TextInput>
	);
};

export default NavbarSearchInput;
