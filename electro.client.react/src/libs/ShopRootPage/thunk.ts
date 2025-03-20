import { AppDispatch } from "@/libs/Store";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";
import { getBestsellerProductsError, getBestsellerProductsStart, getBestsellerProductsSuccess } from "./slice";
import { GetBestsellerProductsResult } from "../api-contract/api-contract";

export const getBestsellerProducts = (limit: number = 10) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getBestsellerProductsStart());
		const response = await ApiClient.get<GetBestsellerProductsResult>(`/api/products/bestsellers?limit=${limit}`);
		dispatch(getBestsellerProductsSuccess(response.data));
	} catch (error: any) {
		dispatch(getBestsellerProductsError(createError(error)));
	}
};
