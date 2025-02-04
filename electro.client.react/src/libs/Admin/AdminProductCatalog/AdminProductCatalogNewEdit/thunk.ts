import { AppDispatch } from "@/libs/Store";
import {
	fetchAttributesDefinitionsError,
	fetchAttributesDefinitionsStart,
	fetchAttributesDefinitionsSuccess,
	fetchProductError,
	fetchProductHierarchyError,
	fetchProductHierarchyStart,
	fetchProductHierarchySuccess,
	fetchProductStart,
	fetchProductSuccess,
	saveActionError,
	saveActionStart,
	saveActionSuccess,
} from "./slice";
import { CreateOrUpdateProductCommand, CreateOrUpdateProductResult, GetAllProductHierarchyResult, GetAttributesDefinitionsResult, GetProductResult } from "@/libs/api-contract/api-contract";
import { createError } from "@/libs/api-contract/Error";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import ApiClient from "@/libs/api-contract/ApiClient";

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductStart());
		const response = await ApiClient.get<GetProductResult>(`/api/products/${productId}`);
		dispatch(fetchProductSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductError(createError(error)));
	}
};

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		const response = await ApiClient.get<GetAllProductHierarchyResult>(`/api/productHierarchy`);
		dispatch(fetchProductHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(createError(error)));
	}
};

export const fetchAttributesDefinitions = (query: IGetAttributesDefinitionsQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAttributesDefinitionsStart());
		const response = await ApiClient.get<GetAttributesDefinitionsResult>(`/api/productHierarchy/attributes-definitions?${buildQueryString(query)}`);
		dispatch(fetchAttributesDefinitionsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAttributesDefinitionsError(createError(error)));
	}
};

export const createOrUpdateProduct = (command: CreateOrUpdateProductCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(saveActionStart());
		const response = await ApiClient.post<CreateOrUpdateProductResult>(`/api/products`, command);
		dispatch(saveActionSuccess());
	} catch (error: any) {
		dispatch(saveActionError(createError(error)));
	}
};
