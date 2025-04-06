import { AppDispatch } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { createError } from "../api-contract/Error";
import { GetMenuResult } from "../api-contract/api-contract";
import { fetchProductHierarchyError, fetchProductHierarchySuccess, fetchProductHierarchyStart } from "./slice";

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		const response = await ApiClient.get<GetMenuResult>(`/api/product-hierarchy/menu`);
		dispatch(fetchProductHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(createError(error)));
	}
};
