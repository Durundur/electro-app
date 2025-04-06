import SelectInput from "@/components/Shared/SelectInput/SelectInput";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import { useSelector } from "@/libs/Store";
import { Grid2, MenuItem, SelectChangeEvent } from "@mui/material";
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
				<SelectInput fullWidth size="small" label={"Sortowanie"} id={"sorting"} displayEmpty defaultValue={sorting} value={sorting} onChange={handleSelectOption}>
					<MenuItem value={""} selected>
						Od najpopularniejszych
					</MenuItem>
					<MenuItem value={"accuracy"}>Od najtrafniejszych</MenuItem>
					<MenuItem value={"price-desc"}>Cena: od najdroższych</MenuItem>
					<MenuItem value={"price-asc"}>Cena: od najtańszych</MenuItem>
				</SelectInput>
			</Grid2>
		</Grid2>
	);
};

export default SearchProductsListFilters;
