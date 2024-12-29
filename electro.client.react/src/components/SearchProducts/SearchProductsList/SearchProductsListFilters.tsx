import { buildQueryString, buildQueryStringWithDuplicatedKey } from "@/libs/Helpers/QueryHelper";
import { useSelector } from "@/libs/Store";
import { FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const SearchProductsListFilters: FC = () => {
	const router = useRouter();
	const paginationSelector = useSelector((store) => store.SearchProductsPageStore.urlParams.pagination);
	const hierarchySelector = useSelector((store) => store.SearchProductsPageStore.urlParams.hierarchy);
	const filtersSelector = useSelector((store) => store.SearchProductsPageStore.urlParams.filters);
	const sortValue = filtersSelector["sort"]?.[0];
	const [sorting, setSorting] = useState(sortValue ?? "");

	useEffect(() => {
		setSorting(sortValue ?? "");
	}, [sortValue]);

	const handleSelectOption = (e: SelectChangeEvent<string>) => {
		const newValue = e.target.value;
		setSorting(newValue);
		const params = { ...hierarchySelector, ...filtersSelector, ...paginationSelector, sort: newValue, page: 1 };
		router.push(`/search?${buildQueryString(params)}`);
	};

	return (
		<Grid2 container justifyContent={"end"}>
			<Grid2 size={{ xs: 12, sm: 4 }}>
				<FormControl size="small" fullWidth>
					<InputLabel shrink id="sort-label">
						Sortowanie
					</InputLabel>
					<Select displayEmpty labelId="sort-label" id="sort" defaultValue={sorting} label="Sortowanie" value={sorting} onChange={handleSelectOption}>
						<MenuItem value={""} selected>
							Od najpopularniejszych
						</MenuItem>
						<MenuItem value={"accuracy"}>Od najtrafniejszych</MenuItem>
						<MenuItem value={"price-asc"}>Cena: od najdroższych</MenuItem>
						<MenuItem value={"price-desc"}>Cena: od najtańszych</MenuItem>
					</Select>
				</FormControl>
			</Grid2>
		</Grid2>
	);
};

export default SearchProductsListFilters;
