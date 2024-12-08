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
import axios from "axios";
import { IError } from "@/libs/api-contract/Error";
import { GetMenuResult, GetSearchProductsResult } from "../api-contract/api-contract";
import { buildQueryString, buildQueryStringWithDuplicatedKey } from "../Helpers/QueryHelper";

export const fetchProducts = (params: object) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductsStart());
		const response = await axios.get<GetSearchProductsResult>(`http://localhost:5146/api/products/search?${buildQueryStringWithDuplicatedKey(params)}`);
		dispatch(fetchProductsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductsError(error as IError));
	}
};

export const fetchFilters = (params: object) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchFiltersStart());
		const response = await axios.get<any>(`http://localhost:5146/api/products/search/filters?${buildQueryString(params)}`);
		dispatch(fetchFiltersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchFiltersError(error as IError));
	}
};

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		const response = await axios.get<GetMenuResult>(`http://localhost:5146/api/ProductHierarchy/menu`);
		dispatch(fetchProductHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(error as IError));
	}
};
