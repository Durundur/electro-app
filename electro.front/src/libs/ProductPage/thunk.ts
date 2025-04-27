import { AppDispatch } from "@/libs/Store";
import {
	createOpinionError,
	createOpinionReactionError,
	createOpinionReactionStart,
	createOpinionReactionSuccess,
	createOpinionStart,
	createOpinionSuccess,
	fetchProductError,
	fetchProductStart,
	fetchProductSuccess,
	getOpinionsError,
	getOpinionsStart,
	getOpinionsStatsError,
	getOpinionsStatsStart,
	getOpinionsStatsSuccess,
	getOpinionsSuccess,
	getSimilarProductsError,
	getSimilarProductsStart,
	getSimilarProductsSuccess,
	updateOpinionReaction,
} from "./slice";
import {
	CreateOpinionCommand,
	CreateOpinionReactionResult,
	CreateOpinionResult,
	GetProductOpinionsResult,
	GetProductOpinionsStatsResult,
	GetProductResult,
	GetSimilarProductsResult,
	OpinionReactionType,
} from "@/libs/api-contract/rest-api-contract";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";
import { buildQueryString } from "../Helpers/QueryHelper";
import { IGetOpinionsQueryParams } from "./interfaces";
import { graphql } from "../api-contract/graphql-api-contract";
import { mapAttributeTypeFromGraphQL, mapOpinionReactionTypeFromGraphQL, mapOpinionReactionTypeToGraphQL, mapProductStatusFromGraphQL } from "../api-contract/Mappers/EnumMappers";
import {
	ProductPageCreateOpinionMutation,
	ProductPageCreateOpinionMutationVariables,
	ProductPageCreateOpinionReactionMutation,
	ProductPageCreateOpinionReactionMutationVariables,
	ProductPageOpinionsQuery,
	ProductPageOpinionsQueryVariables,
	ProductPageOpinionsStatsQuery,
	ProductPageOpinionsStatsQueryVariables,
	ProductPageProductQuery,
	ProductPageProductQueryVariables,
	ProductPageSimilarProductsQuery,
	ProductPageSimilarProductsQueryVariables,
} from "../api-contract/graphql-api-contract/graphql";

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductStart());
		if (ApiClient.apiType() === "graphql") {
			const ProductPageProductQuery = graphql(`
				query ProductPageProduct($id: UUID!) {
					product(id: $id) {
						id
						name
						description
						price {
							amount
							currency
						}
						photos
						status
						group {
							id
						}
						category {
							id
						}
						subCategory {
							id
						}
						stockQuantity
						averageOpinionRating
						opinionCount
						promotion {
							id
							productId
							startDate
							endDate
							promotionalPrice {
								amount
								currency
							}
							isActive
							isValid
						}
						attributes {
							value
							isPrimary
							attributeDefinition {
								id
								name
								type
							}
						}
					}
				}
			`);
			const variables: ProductPageProductQueryVariables = { id: productId };
			const response = await ApiClient.postGraphql(ProductPageProductQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetProductResult(response.data.data);
			dispatch(fetchProductSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetProductResult>(`/api/products/${productId}`);
			dispatch(fetchProductSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchProductError(createError(error)));
	}
};

const mapGraphQLResponseToGetProductResult = (data: ProductPageProductQuery): GetProductResult => {
	return {
		id: data.product?.id,
		name: data.product?.name,
		description: data.product?.description,
		amount: data.product?.price?.amount,
		currency: data.product?.price?.currency,
		photos: data.product?.photos,
		status: data.product?.status ? mapProductStatusFromGraphQL(data.product.status) : undefined,
		groupId: data.product?.group?.id,
		categoryId: data.product?.category?.id,
		subCategoryId: data.product?.subCategory?.id,
		stockQuantity: data.product?.stockQuantity,
		averageOpinionRating: data.product?.averageOpinionRating ?? undefined,
		opinionCount: data.product?.opinionCount ?? undefined,
		promotion: data.product?.promotion ?? undefined,
		attributes: data.product?.attributes.map((a) => {
			return {
				id: a.attributeDefinition.id,
				name: a.attributeDefinition.name,
				isPrimary: a.isPrimary,
				value: a.value,
				type: mapAttributeTypeFromGraphQL(a.attributeDefinition.type),
			};
		}),
	};
};

export const getOpinions = (productId: string, queryParams: IGetOpinionsQueryParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getOpinionsStart());
		if (ApiClient.apiType() === "graphql") {
			const ProductPageOpinionsQuery = graphql(`
				query ProductPageOpinions($productId: UUID!, $page: Int!, $pageSize: Int!, $rating: Int) {
					productOpinions(productId: $productId, page: $page, pageSize: $pageSize, rating: $rating) {
						items {
							id
							content
							rating
							createdAt
							authorDisplayName
							userReaction
							likesCount
							dislikesCount
						}
						page
						pageSize
						totalPages
					}
				}
			`);
			const variables: ProductPageOpinionsQueryVariables = {
				productId,
				page: queryParams.page ?? 1,
				pageSize: queryParams.pageSize ?? 10,
				rating: queryParams.rating,
			};
			const response = await ApiClient.postGraphql(ProductPageOpinionsQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetProductOpinionsResult(response.data.data);
			dispatch(getOpinionsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetProductOpinionsResult>(`/api/opinions/products/${productId}?${buildQueryString(queryParams)}`);
			dispatch(getOpinionsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(getOpinionsError(createError(error)));
	}
};

const mapGraphQLResponseToGetProductOpinionsResult = (data: ProductPageOpinionsQuery): GetProductOpinionsResult => {
	return {
		items: data.productOpinions.items.map((i) => {
			return {
				id: i.id,
				content: i.content,
				rating: i.rating,
				createdAt: i.createdAt,
				authorDisplayName: i.authorDisplayName,
				likesCount: i.likesCount,
				dislikesCount: i.dislikesCount,
				reactionType: i.userReaction ? mapOpinionReactionTypeFromGraphQL(i.userReaction) : undefined,
			};
		}),
		page: data.productOpinions.page,
		pageSize: data.productOpinions.pageSize,
		totalPages: data.productOpinions.totalPages,
	};
};

export const getOpinionsStats = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getOpinionsStatsStart());
		if (ApiClient.apiType() === "graphql") {
			const ProductPageProductOpinionsStatsQuery = graphql(`
				query ProductPageOpinionsStats($productId: UUID!) {
					productOpinionsStats(productId: $productId) {
						rating
						count
					}
				}
			`);
			const variables: ProductPageOpinionsStatsQueryVariables = { productId };
			const response = await ApiClient.postGraphql(ProductPageProductOpinionsStatsQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetProductOpinionsStatsResult(response.data.data);
			dispatch(getOpinionsStatsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetProductOpinionsStatsResult>(`/api/opinions/products/${productId}/stats`);
			dispatch(getOpinionsStatsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(getOpinionsStatsError(createError(error)));
	}
};

const mapGraphQLResponseToGetProductOpinionsStatsResult = (data: ProductPageOpinionsStatsQuery): GetProductOpinionsStatsResult => {
	return {
		stats: data.productOpinionsStats.map((s) => {
			return {
				rating: s.rating,
				count: s.count,
			};
		}),
	};
};

export const createOpinionReaction = (opinionId: string, reaction: OpinionReactionType) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOpinionReactionStart());
		if (ApiClient.apiType() === "graphql") {
			const ProductPageCreateOpinionReactionMutation = graphql(`
				mutation ProductPageCreateOpinionReaction($input: CreateOpinionReactionInput!) {
					createOpinionReaction(input: $input) {
						userReaction
						likesCount
						dislikesCount
					}
				}
			`);
			const variables: ProductPageCreateOpinionReactionMutationVariables = {
				input: {
					opinionId,
					reactionType: mapOpinionReactionTypeToGraphQL(reaction),
				},
			};
			const response = await ApiClient.postGraphql(ProductPageCreateOpinionReactionMutation, variables);
			const mappedResponse = mapGraphQLResponseToCreateOpinionReactionResult(response.data.data);
			dispatch(createOpinionReactionSuccess());
			dispatch(
				updateOpinionReaction({
					opinionId,
					reactionType: mappedResponse.reactionType!,
					likesCount: mappedResponse.likesCount!,
					dislikesCount: mappedResponse.dislikesCount!,
				})
			);
		} else {
			const response = await ApiClient.post<CreateOpinionReactionResult>(`/api/opinions/${opinionId}/reactions/${reaction}`);
			dispatch(createOpinionReactionSuccess());
			dispatch(
				updateOpinionReaction({
					opinionId,
					reactionType: response.data.reactionType!,
					likesCount: response.data.likesCount!,
					dislikesCount: response.data.dislikesCount!,
				})
			);
		}
	} catch (error: any) {
		dispatch(createOpinionReactionError(createError(error)));
	}
};

const mapGraphQLResponseToCreateOpinionReactionResult = (data: ProductPageCreateOpinionReactionMutation): CreateOpinionReactionResult => {
	return {
		reactionType: mapOpinionReactionTypeFromGraphQL(data.createOpinionReaction.userReaction!),
		likesCount: data.createOpinionReaction.likesCount,
		dislikesCount: data.createOpinionReaction.dislikesCount,
	};
};

export const createOpinion = (command: CreateOpinionCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOpinionStart());
		if (ApiClient.apiType() === "graphql") {
			const ProductPageCreateOpinionMutation = graphql(`
				mutation ProductPageCreateOpinion($input: CreateOpinionInput!) {
					createOpinion(input: $input) {
						id
						content
						rating
						createdAt
						authorDisplayName
					}
				}
			`);
			const variables: ProductPageCreateOpinionMutationVariables = {
				input: {
					content: command.content!,
					productId: command.productId,
					rating: command.rating!,
					authorDisplayName: command.authorDisplayName!,
				},
			};
			const response = await ApiClient.postGraphql(ProductPageCreateOpinionMutation, variables);
			const mappedResponse = mapGraphQLResponseToCreateOpinionResult(response.data.data);
			dispatch(createOpinionSuccess(mappedResponse));
		} else {
			const response = await ApiClient.post<CreateOpinionResult>(`/api/opinions`, command);
			dispatch(createOpinionSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(createOpinionError(createError(error)));
	}
};

const mapGraphQLResponseToCreateOpinionResult = (data: ProductPageCreateOpinionMutation): CreateOpinionResult => {
	return {
		id: data.createOpinion?.id,
		content: data.createOpinion?.content,
		rating: data.createOpinion?.rating,
		createdAt: data.createOpinion?.createdAt,
		authorDisplayName: data.createOpinion?.authorDisplayName,
	};
};

export const getSimilarProducts = (productId: string, limit?: number) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getSimilarProductsStart());
		if (ApiClient.apiType() === "graphql") {
			const ProductPageSimilarProductsQuery = graphql(`
				query ProductPageSimilarProducts($productId: UUID!, $limit: Int) {
					similarProducts(productId: $productId, limit: $limit) {
						id
						name
						price {
							amount
							currency
						}
						photos
						promotion {
							promotionalPrice {
								amount
								currency
							}
						}
					}
				}
			`);
			const variables: ProductPageSimilarProductsQueryVariables = { productId, limit };
			const response = await ApiClient.postGraphql(ProductPageSimilarProductsQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetSimilarProductsResult(response.data.data);
			dispatch(getSimilarProductsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetSimilarProductsResult>(`/api/products/${productId}/similar?limit=${limit ?? 8}`);
			dispatch(getSimilarProductsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(getSimilarProductsError(createError(error)));
	}
};

const mapGraphQLResponseToGetSimilarProductsResult = (data: ProductPageSimilarProductsQuery): GetSimilarProductsResult => {
	return {
		products: data.similarProducts.map((p) => {
			return {
				id: p.id,
				name: p.name,
				amount: p.price.amount,
				currency: p.price.currency,
				photo: p.photos?.length ? p.photos[0] : "",
				promotion: p.promotion?.promotionalPrice,
			};
		}),
	};
};
