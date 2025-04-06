import { AppDispatch } from "@/libs/Store";
import {
	fetchFiltersError,
	fetchFiltersStart,
	fetchFiltersSuccess,
	fetchProductHierarchyError,
	fetchProductHierarchyStart,
	fetchProductHierarchySuccess,
	fetchProductsError,
	fetchProductsStart,
	fetchProductsSuccess,
} from "./slice";
import { GetMenuResult, GetSearchProductsResult } from "@/libs/api-contract/api-contract";
import { buildQueryString, buildQueryStringWithDuplicatedKey } from "@/libs/Helpers/QueryHelper";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";

export const fetchProducts = (params: object) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductsStart());
		const response = await ApiClient.get<GetSearchProductsResult>(`/api/products/search?${buildQueryStringWithDuplicatedKey(params)}`);
		dispatch(fetchProductsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductsError(createError(error)));
	}
};

export const fetchFilters = (params: object) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchFiltersStart());
		const response = await ApiClient.get<any>(`/api/products/filters?${buildQueryString(params)}`);
		dispatch(fetchFiltersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchFiltersError(createError(error)));
	}
};

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		const response = await ApiClient.get<GetMenuResult>(`/api/product-hierarchy/menu`);
		dispatch(fetchProductHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(createError(error)));
	}
};
