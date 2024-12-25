import { fetchFilters } from "@/libs/SearchProducts/thunk";
import { useDispatch, useSelector } from "@/libs/Store";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import SearchProductsSidebarFiltersPrice from "./SearchProductsSidebarFiltersPrice";
import SearchProductsSidebarFiltersSelect from "./SearchProductsSidebarFiltersSelect";
import { useRouter } from "next/navigation";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";

const SearchProductsSidebarFilters: FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const hierarchyParamsSelector = useSelector((store) => store.SearchProducts.urlParams.hierarchy);
	const paginationParamsSelector = useSelector((store) => store.SearchProducts.urlParams.pagination);
	const filtersSelector = useSelector((store) => store.SearchProducts.filters);
	const filters = filtersSelector.data?.filters ?? [];

	useEffect(() => {
		if (!hierarchyParamsSelector.group && !hierarchyParamsSelector.category && !hierarchyParamsSelector.subCategory) return;
		const params = {
			groupId: hierarchyParamsSelector.group,
			categoryId: hierarchyParamsSelector.category,
			subCategoryId: hierarchyParamsSelector.subCategory,
		};
		dispatch(fetchFilters(params));
	}, [hierarchyParamsSelector.category, hierarchyParamsSelector.group, hierarchyParamsSelector.subCategory]);

	const handleClearSelectedFilters = () => {
		const params = {
			group: hierarchyParamsSelector.group,
			category: hierarchyParamsSelector.category,
			subCategory: hierarchyParamsSelector.subCategory,
			page: 1,
			pageSize: paginationParamsSelector.pageSize,
		};
		router.push(`?${buildQueryString(params)}`, { scroll: true });
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
