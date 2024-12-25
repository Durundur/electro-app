import { IError } from "@/libs/api-contract/Error";
import { GetMenuResult, GetSearchFiltersResult, GetSearchProductsResult } from "@/libs/api-contract/api-contract";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISearchProductsStateUrlParamsFilters, ISearchProductsStateUrlParamsHierarchy, ISearchProductsStateUrlParamsPagination } from "./interfaces";

interface ISearchProductsState {
	products: ISearchProductsStateProducts;
	productHierarchy: ISearchProductsStateProductHierarchy;
	filters: ISearchProductsStateFilters;
	urlParams: ISearchProductsStateUrlParams;
}

interface ISearchProductsStateProducts {
	error?: IError;
	data?: GetSearchProductsResult;
	isLoading: boolean;
}

interface ISearchProductsStateProductHierarchy {
	error?: IError;
	data?: GetMenuResult;
	isLoading: boolean;
}

interface ISearchProductsStateFilters {
	error?: IError;
	data?: GetSearchFiltersResult;
	isLoading: boolean;
}

export interface ISearchProductsStateUrlParams {
	pagination: ISearchProductsStateUrlParamsPagination;
	hierarchy: ISearchProductsStateUrlParamsHierarchy;
	filters: ISearchProductsStateUrlParamsFilters;
}

const initialState: ISearchProductsState = {
	products: {
		error: undefined,
		data: undefined,
		isLoading: false,
	},
	productHierarchy: {
		error: undefined,
		data: undefined,
		isLoading: false,
	},
	filters: {
		error: undefined,
		data: undefined,
		isLoading: false,
	},
	urlParams: {
		filters: {},
		hierarchy: {},
		pagination: {},
	},
};

const SearchProductsSlice = createSlice({
	name: "SearchProductsSlice",
	initialState,
	reducers: {
		fetchProductsStart(state) {
			state.products.isLoading = true;
			state.products.error = undefined;
		},
		fetchProductsSuccess(state, action: PayloadAction<GetSearchProductsResult>) {
			state.products.isLoading = false;
			state.products.data = action.payload;
		},
		fetchProductsError(state, action: PayloadAction<IError>) {
			state.products.isLoading = false;
			state.products.error = action.payload;
		},
		clearProducts(state) {
			state.products.data = undefined;
			state.products.error = undefined;
			state.products.isLoading = false;
		},
		fetchProductHierarchyStart(state) {
			state.productHierarchy.isLoading = true;
			state.productHierarchy.error = undefined;
		},
		fetchProductHierarchySuccess(state, action: PayloadAction<GetMenuResult>) {
			state.productHierarchy.isLoading = false;
			state.productHierarchy.data = action.payload;
		},
		fetchProductHierarchyError(state, action: PayloadAction<IError>) {
			state.productHierarchy.isLoading = false;
			state.productHierarchy.error = action.payload;
		},
		clearProductHierarchy(state) {
			state.productHierarchy.data = undefined;
			state.productHierarchy.error = undefined;
			state.productHierarchy.isLoading = false;
		},
		fetchFiltersStart(state) {
			state.filters.isLoading = true;
			state.filters.error = undefined;
		},
		fetchFiltersSuccess(state, action: PayloadAction<GetSearchFiltersResult>) {
			state.filters.isLoading = false;
			state.filters.data = action.payload;
		},
		fetchFiltersError(state, action: PayloadAction<IError>) {
			state.filters.isLoading = false;
			state.filters.error = action.payload;
		},
		clearFilters(state) {
			state.filters.data = undefined;
			state.filters.error = undefined;
			state.filters.isLoading = false;
		},
		setUrlParams(state, action: PayloadAction<ISearchProductsStateUrlParams>) {
			state.urlParams = action.payload;
		},
		clearUrlParams(state) {
			state.urlParams = {
				pagination: {},
				filters: {},
				hierarchy: {},
			};
		},
	},
});

export const {
	clearFilters,
	clearProductHierarchy,
	clearProducts,
	fetchFiltersError,
	fetchFiltersStart,
	fetchFiltersSuccess,
	fetchProductHierarchyError,
	fetchProductHierarchyStart,
	fetchProductHierarchySuccess,
	fetchProductsError,
	fetchProductsStart,
	fetchProductsSuccess,
	setUrlParams,
	clearUrlParams,
} = SearchProductsSlice.actions;

export default SearchProductsSlice.reducer;
