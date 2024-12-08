import { useDispatch, useSelector } from "@/libs/Store";
import { Box, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import SearchProductsListItem from "./SearchProductsListItem";
import { fetchProducts } from "@/libs/SearchProducts/thunk";
import { clearProducts } from "@/libs/SearchProducts/slice";
import SearchProductsListFilters from "./SearchProductsListFilters";
import SearchProductsListPagination from "./SearchProductsListPagination";
import SearchProductsListNoRecords from "./SearchProductsListNoRecords/SearchProductsListNoRecords";
import { ISearchProductsStateUrlParamsFilters } from "@/libs/SearchProducts/interfaces";
import { GetSearchFiltersResultElement } from "@/libs/api-contract/api-contract";

const SearchProductsList: FC = () => {
	const dispatch = useDispatch();
	const productsSelector = useSelector((store) => store.SearchProducts.products);
	const hierarchyParamsSelector = useSelector((store) => store.SearchProducts.urlParams.hierarchy);
	const paginationParamsSelector = useSelector((store) => store.SearchProducts.urlParams.pagination);
	const filtersParamsSelector = useSelector((store) => store.SearchProducts.urlParams.filters);
	const filtersSelector = useSelector((store) => store.SearchProducts.filters);
	const filters = filtersSelector.data?.filters ?? [];

	const { products, ...pagination } = productsSelector.data ?? {};
	const pageCount = pagination.pageCount;

	useEffect(() => {
		if (paginationParamsSelector.page === undefined) return;
		const hierarchyParams = { groupId: hierarchyParamsSelector.group, categoryId: hierarchyParamsSelector.category, subCategoryId: hierarchyParamsSelector.subCategory };
		const paginationParams = { page: paginationParamsSelector.page, pageSize: paginationParamsSelector.pageSize };
		const filtersParams = getFiltersSearchParams(filtersParamsSelector, filters);
		const queryParams = { ...hierarchyParams, ...paginationParams, ...filtersParams };
		dispatch(fetchProducts(queryParams));

		return () => {
			dispatch(clearProducts());
		};
	}, [hierarchyParamsSelector, paginationParamsSelector, filtersParamsSelector]);

	const getFiltersSearchParams = (activeFilters: ISearchProductsStateUrlParamsFilters, filters: GetSearchFiltersResultElement[]) => {
		const queryFilters: Record<string, string[]> = {};

		for (const [filterKey, filterValues] of Object.entries(activeFilters)) {
			if (!filterValues) continue;
			const fullFilterId = filters.find((f) => getFilterUrlKey(f) === filterKey)?.attributeDefinitionId;
			if(!fullFilterId) continue;
			queryFilters[fullFilterId] = filterValues;
		}
		return queryFilters;
	};

	const getFilterUrlKey = (filter: GetSearchFiltersResultElement): string => {
		const key = filter.attributeDefinitionId?.split("-")[4];
		const formattedKey = key!.toLowerCase();
		return formattedKey;
	};

	return (
		<Stack>
			<SearchProductsListFilters />
			{products?.length ? (
				<Stack spacing={2}>
					{products?.map((p, i) => (
						<SearchProductsListItem key={`product-${i}`} product={p} />
					))}
					<SearchProductsListPagination page={paginationParamsSelector.page ?? 1} pageCount={pageCount ?? 1} />
				</Stack>
			) : (
				<SearchProductsListNoRecords />
			)}
		</Stack>
	);
};

export default SearchProductsList;
