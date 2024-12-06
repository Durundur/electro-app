import { useDispatch, useSelector } from "@/libs/Store";
import { Box, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import SearchProductsListItem from "./SearchProductsListItem";
import { fetchProducts } from "@/libs/SearchProducts/thunk";
import { clearProducts } from "@/libs/SearchProducts/slice";
import SearchProductsListFilters from "./SearchProductsListFilters";
import SearchProductsListPagination from "./SearchProductsListPagination";
import SearchProductsListNoRecords from "./SearchProductsListNoRecords/SearchProductsListNoRecords";

const SearchProductsList: FC = () => {
	const dispatch = useDispatch();
	const productsSelector = useSelector((store) => store.SearchProducts.products);
	const hierarchyParamsSelector = useSelector((store) => store.SearchProducts.urlParams.hierarchy);
	const paginationParamsSelector = useSelector((store) => store.SearchProducts.urlParams.pagination);

	const { products, ...pagination } = productsSelector.data ?? {};
	const pageCount = pagination.pageCount;

	useEffect(() => {
		const hierarchyParams = { groupId: hierarchyParamsSelector.group, categoryId: hierarchyParamsSelector.category, subCategoryId: hierarchyParamsSelector.subCategory };
		const paginationParams = { page: paginationParamsSelector.page, pageSize: 2 };
		const queryParams = { ...hierarchyParams, ...paginationParams };
		dispatch(fetchProducts(queryParams));

		return () => {
			dispatch(clearProducts());
		};
	}, [hierarchyParamsSelector, paginationParamsSelector]);

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
