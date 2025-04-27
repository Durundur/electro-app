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
import { GetMenuResult, GetSearchFiltersResult, GetSearchProductsResult } from "@/libs/api-contract/rest-api-contract";
import { buildQueryString, buildQueryStringWithDuplicatedKey } from "@/libs/Helpers/QueryHelper";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";
import { graphql } from "../api-contract/graphql-api-contract";
import {
	SeachPageFiltersQuery,
	SeachPageFiltersQueryVariables,
	SeachPageProductHierarchyQuery,
	SearchPageProductsQuery,
	SearchPageProductsQueryVariables,
} from "../api-contract/graphql-api-contract/graphql";
import { mapAttributeTypeFromGraphQL, mapProductStatusFromGraphQL } from "../api-contract/Mappers/EnumMappers";

export interface IFetchProductsBaseParams {
	groupId?: number;
	categoryId?: number;
	subCategoryId?: number;
	page?: number;
	pageSize?: number;
}

export type IFetchProductsParams = IFetchProductsBaseParams & {
	[key: string]: string[] | undefined;
};

export const fetchProducts = (params: IFetchProductsParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductsStart());
		if (ApiClient.apiType() == "graphql") {
			const SearchPageProductsQuery = graphql(`
				query SearchPageProducts($input: GetSearchProductsInput!) {
					searchProducts(input: $input) {
						items {
							id
							name
							price {
								amount
								currency
							}
							photos
							status
							averageOpinionRating
							opinionCount
							attributes {
								value
								isPrimary
								attributeDefinition {
									id
									name
									type
								}
							}
							promotion {
								promotionalPrice {
									amount
									currency
								}
							}
						}
						page
						pageSize
						totalPages
					}
				}
			`);
			const variables: SearchPageProductsQueryVariables = {
				input: {
					groupId: params.groupId,
					categoryId: params.categoryId,
					subCategoryId: params.subCategoryId,
					page: params.page ?? 1,
					pageSize: params.pageSize ?? 10,
					filters: Object.entries(params)
						.filter(([key]) => !["groupId", "categoryId", "subCategoryId", "page", "pageSize"].includes(key))
						.map(([key, values]) => ({
							key,
							value: Array.isArray(values) ? values : [],
						})),
				},
			};
			const response = await ApiClient.postGraphql(SearchPageProductsQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetSearchProductsResult(response.data.data);
			dispatch(fetchProductsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetSearchProductsResult>(`/api/products/search?${buildQueryStringWithDuplicatedKey(params)}`);
			dispatch(fetchProductsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchProductsError(createError(error)));
	}
};

const mapGraphQLResponseToGetSearchProductsResult = (data: SearchPageProductsQuery): GetSearchProductsResult => {
	return {
		items: data.searchProducts.items.map((p) => {
			return {
				id: p.id,
				amount: p.price.amount,
				currency: p.price.currency,
				name: p.name,
				photo: p.photos.length ? p.photos[0] : "",
				averageOpinionRating: p.averageOpinionRating ?? undefined,
				opinionCount: p.opinionCount ?? undefined,
				status: mapProductStatusFromGraphQL(p.status),
				attributes: p.attributes.map((a) => {
					return {
						id: a.attributeDefinition.id,
						name: a.attributeDefinition.name,
						type: mapAttributeTypeFromGraphQL(a.attributeDefinition.type),
						value: a.value,
						isPrimary: a.isPrimary,
					};
				}),
				promotion: p.promotion?.promotionalPrice,
			};
		}),
		page: data.searchProducts.page,
		pageSize: data.searchProducts.pageSize,
		totalPages: data.searchProducts.totalPages,
	};
};

export interface IFetchFiltersParams {
	groupId?: number;
	categoryId?: number;
	subCategoryId?: number;
}

export const fetchFilters = (params: IFetchFiltersParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchFiltersStart());
		if (ApiClient.apiType() == "graphql") {
			const SeachPageFiltersQuery = graphql(`
				query SeachPageFilters($groupId: Int, $categoryId: Int, $subCategoryId: Int) {
					productFilters(groupId: $groupId, categoryId: $categoryId, subCategoryId: $subCategoryId) {
						attributeDefinitionId
						type
						name
						values
					}
				}
			`);
			const variables: SeachPageFiltersQueryVariables = { ...params };
			const response = await ApiClient.postGraphql(SeachPageFiltersQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetSearchFiltersResult(response.data.data);
			dispatch(fetchFiltersSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetSearchFiltersResult>(`/api/products/filters?${buildQueryString(params)}`);
			dispatch(fetchFiltersSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchFiltersError(createError(error)));
	}
};

const mapGraphQLResponseToGetSearchFiltersResult = (data: SeachPageFiltersQuery): GetSearchFiltersResult => {
	return {
		filters: data.productFilters.map((f) => {
			return {
				attributeDefinitionId: f.attributeDefinitionId,
				name: f.name,
				type: mapAttributeTypeFromGraphQL(f.type),
				values: f.values,
			};
		}),
	};
};

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		if (ApiClient.apiType() == "graphql") {
			const SeachPageProductHierarchyQuery = graphql(`
				query SeachPageProductHierarchy {
					menu {
						id
						name
						photo
						icon
						categories {
							id
							name
							subCategories {
								id
								name
							}
						}
					}
				}
			`);
			const response = await ApiClient.postGraphql(SeachPageProductHierarchyQuery);
			const mappedResponse = mapGraphQLResponseToGetMenuResult(response.data.data);
			dispatch(fetchProductHierarchySuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetMenuResult>(`/api/product-hierarchy/menu`);
			dispatch(fetchProductHierarchySuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(createError(error)));
	}
};

const mapGraphQLResponseToGetMenuResult = (data: SeachPageProductHierarchyQuery): GetMenuResult => {
	return {
		groups: data.menu.map((g) => {
			return {
				id: g.id,
				name: g.name,
				icon: g.icon,
				photo: g.photo,
				categories: g.categories.map((c) => {
					return {
						id: c.id,
						name: c.name,
						subCategories: c.subCategories.map((s) => {
							return {
								id: s.id,
								name: s.name,
							};
						}),
					};
				}),
			};
		}),
	};
};
