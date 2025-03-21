import { AppDispatch } from "@/libs/Store";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";
import { getBestsellerProductsError, getBestsellerProductsStart, getBestsellerProductsSuccess, getFeaturedProductsError, getFeaturedProductsStart, getFeaturedProductsSuccess, getPromotionHighlightError, getPromotionHighlightStart, getPromotionHighlightSuccess } from "./slice";
import { GetBestsellerProductsResult, GetFeaturedProductsResult, GetPromotionHighlightResult } from "../api-contract/api-contract";

export const getBestsellerProducts = (limit: number = 10) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getBestsellerProductsStart());
		const response = await ApiClient.get<GetBestsellerProductsResult>(`/api/products/bestsellers?limit=${limit}`);
		dispatch(getBestsellerProductsSuccess(response.data));
	} catch (error: any) {
		dispatch(getBestsellerProductsError(createError(error)));
	}
};

export const getFeaturedProducts = (limit: number = 10) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getFeaturedProductsStart());
		const response = await ApiClient.get<GetFeaturedProductsResult>(`/api/products/featured?limit=${limit}`);
		dispatch(getFeaturedProductsSuccess(response.data));
	} catch (error: any) {
		dispatch(getFeaturedProductsError(createError(error)));
	}
};

export const getPromotionHighlight = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(getPromotionHighlightStart());
        const response = await ApiClient.get<GetPromotionHighlightResult>('/api/products/promotion-highlight');
        dispatch(getPromotionHighlightSuccess(response.data));
    } catch (error: any) {
        dispatch(getPromotionHighlightError(createError(error)));
    }
};