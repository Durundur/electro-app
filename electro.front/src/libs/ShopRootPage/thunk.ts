import { AppDispatch } from "@/libs/Store";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";
import {
	getBestsellerProductsError,
	getBestsellerProductsStart,
	getBestsellerProductsSuccess,
	getFeaturedProductsError,
	getFeaturedProductsStart,
	getFeaturedProductsSuccess,
	getPromotionHighlightError,
	getPromotionHighlightStart,
	getPromotionHighlightSuccess,
} from "./slice";
import { GetBestsellerProductsResult, GetFeaturedProductsResult, GetPromotionHighlightResult } from "../api-contract/rest-api-contract";
import { graphql } from "../api-contract/graphql-api-contract";

export const getBestsellerProducts = (limit: number = 10) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getBestsellerProductsStart());
		if (ApiClient.apiType() === "graphql") {
			// const RootPageBestsellersQuery = graphql(`
			// query RootPageBestsellers($limit: Int) {
			// 	bestsellerProducts(limit: $limit) {
			// 		id
			// 		name
			// 	}
			// `);
			// const variables = { limit };
			// const response = await ApiClient.postGraphql(RootPageBestsellersQuery, variables);
			// const mappedResponse = mapGraphQLResponseToGetBestsellerProductsResult(response.data.data);
			// dispatch(getBestsellerProductsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetBestsellerProductsResult>(`/api/products/bestsellers?limit=${limit}`);
			dispatch(getBestsellerProductsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(getBestsellerProductsError(createError(error)));
	}
};

const mapGraphQLResponseToGetBestsellerProductsResult = (data: any): GetBestsellerProductsResult => {
	return {
		
	};
};

export const getFeaturedProducts =
	(limit: number = 10) =>
	async (dispatch: AppDispatch) => {
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
		const response = await ApiClient.get<GetPromotionHighlightResult>("/api/products/promotion-highlight");
		dispatch(getPromotionHighlightSuccess(response.data));
	} catch (error: any) {
		dispatch(getPromotionHighlightError(createError(error)));
	}
};
