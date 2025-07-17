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
import {
	RootPageBestsellerProductsQuery,
	RootPageBestsellerProductsQueryVariables,
	RootPageFeaturedProductsQuery,
	RootPageFeaturedProductsQueryVariables,
	RootPagePromotionHightlightQuery,
} from "../api-contract/graphql-api-contract/graphql";

export const getBestsellerProducts =
	(limit: number = 10) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(getBestsellerProductsStart());
			if (ApiClient.apiType() === "graphql") {
				const RootPageBestsellerProductsQuery = graphql(`
					query RootPageBestsellerProducts($limit: Int) {
						bestsellerProducts(limit: $limit) {
							id
							name
							price {
								amount
								currency
							}
							mainPhoto
							promotion {
								promotionalPrice {
									amount
									currency
								}
							}
						}
					}
				`);
				const variables: RootPageBestsellerProductsQueryVariables = { limit };
				const response = await ApiClient.postGraphql(RootPageBestsellerProductsQuery, variables);
				const mappedResponse = mapGraphQLResponseToGetBestsellerProductsResult(response.data.data);
				dispatch(getBestsellerProductsSuccess(mappedResponse));
			} else {
				const response = await ApiClient.get<GetBestsellerProductsResult>(`/api/products/bestsellers?limit=${limit}`);
				dispatch(getBestsellerProductsSuccess(response.data));
			}
		} catch (error: any) {
			dispatch(getBestsellerProductsError(createError(error)));
		}
	};

const mapGraphQLResponseToGetBestsellerProductsResult = (data: RootPageBestsellerProductsQuery): GetBestsellerProductsResult => {
	return {
		products: data.bestsellerProducts.map((p) => {
			return {
				id: p.id,
				name: p.name,
				amount: p.price.amount,
				currency: p.price.currency,
				photo: p.mainPhoto ?? "",
				promotion: p.promotion?.promotionalPrice,
			};
		}),
	};
};

export const getFeaturedProducts =
	(limit: number = 10) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(getFeaturedProductsStart());
			if (ApiClient.apiType() == "graphql") {
				const RootPageFeaturedProductsQuery = graphql(`
					query RootPageFeaturedProducts($limit: Int) {
						featuredProducts(limit: $limit) {
							id
							name
							price {
								amount
								currency
							}
							mainPhoto
							promotion {
								promotionalPrice {
									amount
									currency
								}
							}
						}
					}
				`);
				const variables: RootPageFeaturedProductsQueryVariables = { limit };
				const response = await ApiClient.postGraphql(RootPageFeaturedProductsQuery, variables);
				const mappedResponse = mapGraphQLResponseToGetFeaturedProductsResult(response.data.data);
				dispatch(getFeaturedProductsSuccess(mappedResponse));
			} else {
				const response = await ApiClient.get<GetFeaturedProductsResult>(`/api/products/featured?limit=${limit}`);
				dispatch(getFeaturedProductsSuccess(response.data));
			}
		} catch (error: any) {
			dispatch(getFeaturedProductsError(createError(error)));
		}
	};

const mapGraphQLResponseToGetFeaturedProductsResult = (data: RootPageFeaturedProductsQuery): GetFeaturedProductsResult => {
	return {
		products: data.featuredProducts.map((p) => {
			return {
				id: p.id,
				name: p.name,
				amount: p.price.amount,
				currency: p.price.currency,
				photo: p.mainPhoto ?? "",
				promotion: p.promotion?.promotionalPrice,
			};
		}),
	};
};

export const getPromotionHighlight = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(getPromotionHighlightStart());
		if (ApiClient.apiType() == "graphql") {
			const RootPagePromotionHightlightQuery = graphql(`
				query RootPagePromotionHightlight {
					promotionHighlightProduct {
						id
						name
						price {
							amount
							currency
						}
						mainPhoto
						promotion {
							promotionalPrice {
								amount
								currency
							}
						}
					}
				}
			`);
			const response = await ApiClient.postGraphql(RootPagePromotionHightlightQuery);
			const mappedResponse = mapGraphQLResponseToGetPromotionHighlightResult(response.data.data);
			dispatch(getPromotionHighlightSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetPromotionHighlightResult>("/api/products/promotion-highlight");
			dispatch(getPromotionHighlightSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(getPromotionHighlightError(createError(error)));
	}
};

const mapGraphQLResponseToGetPromotionHighlightResult = (data: RootPagePromotionHightlightQuery): GetPromotionHighlightResult => {
	return {
		id: data.promotionHighlightProduct.id,
		name: data.promotionHighlightProduct.name,
		amount: data.promotionHighlightProduct.price.amount,
		currency: data.promotionHighlightProduct.price.currency,
		photo: data.promotionHighlightProduct.mainPhoto ?? "",
		promotion: data.promotionHighlightProduct.promotion?.promotionalPrice,
	};
};
