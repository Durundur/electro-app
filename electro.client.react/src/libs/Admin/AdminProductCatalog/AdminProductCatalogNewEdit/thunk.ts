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
import axios from "axios";
import { CreateOrUpdateProductCommand, CreateOrUpdateProductResult, GetAllProductHierarchyResult, GetAttributesDefinitionsResult, GetProductResult } from "@/libs/api-contract/api-contract";
import { IError } from "@/libs/api-contract/Error";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductStart());
		const response = await axios.get<GetProductResult>(`http://localhost:5146/api/products/${productId}`);
		dispatch(fetchProductSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductError(error as IError));
	}
};

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		const response = await axios.get<GetAllProductHierarchyResult>(`http://localhost:5146/api/productHierarchy`);
		dispatch(fetchProductHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(error as IError));
	}
};

export const fetchAttributesDefinitions = (query: IGetAttributesDefinitionsQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAttributesDefinitionsStart());
		const response = await axios.get<GetAttributesDefinitionsResult>(`http://localhost:5146/api/productHierarchy/attributes-definitions?${buildQueryString(query)}`);
		dispatch(fetchAttributesDefinitionsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAttributesDefinitionsError(error as IError));
	}
};

export const createOrUpdateProduct = (command: CreateOrUpdateProductCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(saveActionStart());
		const response = await axios.post<CreateOrUpdateProductResult>(`http://localhost:5146/api/products`, command);
		dispatch(saveActionSuccess());
	} catch (error: any) {
		dispatch(saveActionError(error as IError));
	}
};
