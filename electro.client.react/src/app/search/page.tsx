"use client";
import SearchProductHeader from "@/components/SearchProducts/SearchProductsHeader/SearchProductsHeader";
import SearchProductsList from "@/components/SearchProducts/SearchProductsList/SearchProductsList";
import SearchProductsSidebar from "@/components/SearchProducts/SearchProductsSidebar/SearchProductsSidebar";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import { ISearchProductsStateUrlParamsFilters, ISearchProductsStateUrlParamsHierarchy, ISearchProductsStateUrlParamsPagination } from "@/libs/SearchProducts/interfaces";
import { ISearchProductsStateUrlParams, setUrlParams } from "@/libs/SearchProducts/slice";
import { useDispatch } from "@/libs/Store";
import { Grid2, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const isParamValueValid = (value: string | null): boolean => {
	const valueAsNumber = Number(value);
	return value !== null && !isNaN(valueAsNumber) && Number.isInteger(valueAsNumber) && valueAsNumber > 0;
};

const validateProductHierarchyParams = (searchParams: URLSearchParams): ISearchProductsStateUrlParamsHierarchy => {
	const group = searchParams.get("group");
	const category = searchParams.get("category");
	const subCategory = searchParams.get("subCategory");

	const isGroupValid = isParamValueValid(group);
	const isCategoryValid = isGroupValid && isParamValueValid(category);
	const isSubCategoryValid = isCategoryValid && isParamValueValid(subCategory);

	const validParams: ISearchProductsStateUrlParamsHierarchy = {
		group: isGroupValid ? Number(group) : undefined,
		category: isCategoryValid ? Number(category) : undefined,
		subCategory: isSubCategoryValid ? Number(subCategory) : undefined,
	};

	return validParams;
};

const validatePaginationParams = (searchParams: URLSearchParams): ISearchProductsStateUrlParamsPagination => {
	const page = searchParams.get("page");
	const pageSize = searchParams.get("pageSize");

	const DEFAULT_PAGE = 1;
	const DEFAULT_PAGE_SIZE = 5;
	const MAX_PAGE_SIZE = 100;

	const isPageValid = isParamValueValid(page);
	const isPageSizeValid = isParamValueValid(pageSize) && Number(pageSize) <= MAX_PAGE_SIZE;

	const validParams: ISearchProductsStateUrlParamsPagination = {
		page: isPageValid ? Number(page) : DEFAULT_PAGE,
		pageSize: isPageSizeValid ? Number(pageSize) : DEFAULT_PAGE_SIZE,
	};

	return validParams;
};

const validateFiltersParams = (searchParams: URLSearchParams): ISearchProductsStateUrlParamsFilters => {
	const excludedKeys = ["group", "category", "subCategory", "page", "pageSize"];

	const filters: ISearchProductsStateUrlParamsFilters = {};

	searchParams.forEach((value, key) => {
		if (!excludedKeys.includes(key)) {
			const values = value.split(";");
			filters[key] = values.map((v) => v.trim());
		}
	});

	return filters;
};

const SearchProductPage: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch();

	useEffect(() => {
		const hierarchy = validateProductHierarchyParams(searchParams);
		const pagination = validatePaginationParams(searchParams);
		const filters = validateFiltersParams(searchParams);
		const newParams = buildQueryString({ ...hierarchy, ...pagination, ...filters });
		if (searchParams.toString() !== newParams) {
			router.push(`?${newParams}`, { scroll: true });
		}
		const urlParams: ISearchProductsStateUrlParams = { hierarchy, pagination, filters };
		dispatch(setUrlParams(urlParams));
	}, [searchParams.toString()]);

	return (
		<Stack spacing={1}>
			<SearchProductHeader />
			<Grid2 container columnSpacing={2}>
				<Grid2 size={{ xs: 3 }}>
					<SearchProductsSidebar />
				</Grid2>
				<Grid2 size={{ xs: 9 }}>
					<SearchProductsList />
				</Grid2>
			</Grid2>
		</Stack>
	);
};

export default SearchProductPage;
