import { AppDispatch } from "@/libs/Store";
import { fetchProductError, fetchProductStart, fetchProductSuccess } from "./slice";
import { GetProductResult } from "@/libs/api-contract/api-contract";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductStart());
		const response = await ApiClient.get<GetProductResult>(`/api/products/${productId}`);
		dispatch(fetchProductSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductError(createError(error)));
	}
};
