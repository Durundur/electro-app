import { clearFilters } from "@/libs/SearchProducts/slice";
import { fetchFilters } from "@/libs/SearchProducts/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import SearchProductsSidebarFiltersPrice from "./SearchProductsSidebarFiltersPrice";
import SearchProductsSidebarFiltersSelect from "./SearchProductsSidebarFiltersSelect";
import { useSearchParams, useRouter } from "next/navigation";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";

const SearchProductsSidebarFilters: FC = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const dispatch = useDispatch();
	const hierarchyParamsSelector = useSelector((store) => store.SearchProducts.urlParams.hierarchy);
	const filtersSelector = useSelector((store) => store.SearchProducts.filters);
	const filters = filtersSelector.data?.filters ?? [];

	useEffect(() => {
		const params = {
			groupId: hierarchyParamsSelector.group,
			categoryId: hierarchyParamsSelector.category,
			subCategoryId: hierarchyParamsSelector.subCategory,
		};
		dispatch(fetchFilters(params));
		return () => {
			dispatch(clearFilters());
		};
	}, [hierarchyParamsSelector.category, hierarchyParamsSelector.group, hierarchyParamsSelector.subCategory]);

	const handleClearSelectedFilters = () => {
		const group = searchParams.get("group");
		const category = searchParams.get("category");
		const subCategory = searchParams.get("subCategory");
		const pageSize = searchParams.get("pageSize");

		router.push(`?${buildQueryString({ group, category, subCategory, page: 1, pageSize })}`, { scroll: true });
	};

	return (
		<Box paddingBottom={0.5}>
			<Stack direction={"row"} justifyContent={"space-between"} paddingX={1.5}>
				<Typography variant="body1" fontWeight={500} paddingY={0.5}>
					Filtry
				</Typography>
				<Button onClick={handleClearSelectedFilters} color="inherit" size="small" variant="text">
					wyczyść
				</Button>
			</Stack>
			<Stack spacing={0.5}>
				<SearchProductsSidebarFiltersPrice />
				{filters.map((f) => (
					<SearchProductsSidebarFiltersSelect filter={f} key={f.attributeDefinitionId} />
				))}
			</Stack>
		</Box>
	);
};

export default SearchProductsSidebarFilters;
