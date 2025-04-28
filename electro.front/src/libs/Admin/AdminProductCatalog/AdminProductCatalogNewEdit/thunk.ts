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
import { CreateOrUpdateProductCommand, CreateOrUpdateProductResult, GetAllProductHierarchyResult, GetAttributesDefinitionsResult, GetProductResult } from "@/libs/api-contract/rest-api-contract";
import { createError } from "@/libs/api-contract/Error";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import ApiClient from "@/libs/api-contract/ApiClient";
import { IGetAttributesDefinitionsQuery } from "./interfaces";
import { graphql } from "@/libs/api-contract/graphql-api-contract";
import {
	AdminProductPageAttributesDefinitionsQuery,
	AdminProductPageAttributesDefinitionsQueryVariables,
	AdminProductPageCreateOrUpdateProductMutationVariables,
	AdminProductPageProductHierarchyQuery,
	AdminProductPageProductQuery,
	AdminProductPageProductQueryVariables,
} from "@/libs/api-contract/graphql-api-contract/graphql";
import { mapAttributeTypeFromGraphQL, mapProductStatusFromGraphQL, mapProductStatusToGraphQL } from "@/libs/api-contract/Mappers/EnumMappers";

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductPageProductQuery = graphql(`
				query AdminProductPageProduct($id: UUID!) {
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
			const variables: AdminProductPageProductQueryVariables = { id: productId };
			const response = await ApiClient.postGraphql(AdminProductPageProductQuery, variables);
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

const mapGraphQLResponseToGetProductResult = (data: AdminProductPageProductQuery): GetProductResult => {
	return {
		id: data.product?.id,
		name: data.product?.name,
		description: data.product?.description,
		amount: data.product?.price?.amount,
		currency: data.product?.price?.currency,
		photos: data.product?.photos,
		status: mapProductStatusFromGraphQL(data.product?.status!),
		groupId: data.product?.group?.id,
		categoryId: data.product?.category?.id,
		subCategoryId: data.product?.subCategory?.id,
		stockQuantity: data.product?.stockQuantity,
		averageOpinionRating: data.product?.averageOpinionRating ?? undefined,
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
		opinionCount: data.product?.opinionCount ?? undefined,
	};
};

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductPageProductHierarchyQuery = graphql(`
				query AdminProductPageProductHierarchy {
					productHierarchy {
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
			const response = await ApiClient.postGraphql(AdminProductPageProductHierarchyQuery);
			const mappedResponse = mapGraphQLResponseToGetAllProductHierarchyResult(response.data.data);
			dispatch(fetchProductHierarchySuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetAllProductHierarchyResult>(`/api/product-hierarchy`);
			dispatch(fetchProductHierarchySuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchProductHierarchyError(createError(error)));
	}
};

const mapGraphQLResponseToGetAllProductHierarchyResult = (data: AdminProductPageProductHierarchyQuery): GetAllProductHierarchyResult => {
	return {
		groups: data.productHierarchy.map((g) => {
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

export const fetchAttributesDefinitions = (query: IGetAttributesDefinitionsQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAttributesDefinitionsStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductPageAttributesDefinitionsQuery = graphql(`
				query AdminProductPageAttributesDefinitions($groupId: Int, $categoryId: Int, $subCategoryId: Int) {
					attributesDefinitions(groupId: $groupId, categoryId: $categoryId, subCategoryId: $subCategoryId) {
						id
						name
						type
						isRequired
						description
						isFilterable
					}
				}
			`);
			const variables: AdminProductPageAttributesDefinitionsQueryVariables = { ...query };
			const response = await ApiClient.postGraphql(AdminProductPageAttributesDefinitionsQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetAttributesDefinitionsResult(response.data.data);
			dispatch(fetchAttributesDefinitionsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetAttributesDefinitionsResult>(`/api/product-hierarchy/attributes-definitions?${buildQueryString(query)}`);
			dispatch(fetchAttributesDefinitionsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchAttributesDefinitionsError(createError(error)));
	}
};

const mapGraphQLResponseToGetAttributesDefinitionsResult = (data: AdminProductPageAttributesDefinitionsQuery): GetAttributesDefinitionsResult => {
	return {
		attributesDefinitions: data.attributesDefinitions.map((a) => {
			return {
				id: a.id,
				name: a.name,
				type: mapAttributeTypeFromGraphQL(a.type),
				isRequired: a.isRequired,
				description: a.description,
				isFilterable: a.isFilterable,
			};
		}),
	};
};

export const createOrUpdateProduct = (command: CreateOrUpdateProductCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(saveActionStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductPageCreateOrUpdateProductMutation = graphql(`
				mutation AdminProductPageCreateOrUpdateProduct($input: CreateOrUpdateProductInput!) {
					createOrUpdateProduct(input: $input) {
						id
					}
				}
			`);
			const variables: AdminProductPageCreateOrUpdateProductMutationVariables = {
				input: {
					id: command.id,
					name: command.name!,
					description: command.description!,
					amount: command.amount,
					currency: command.currency!,
					photos: command.photos!,
					stockQuantityDelta: command.stockQuantityDelta!,
					status: mapProductStatusToGraphQL(command.status!),
					groupId: command.groupId,
					categoryId: command.categoryId,
					subCategoryId: command.subCategoryId,
					attributes: (command.attributes ?? []).map((a) => {
						return {
							id: a.id!,
							value: a.value!,
							isPrimary: a.isPrimary!,
						};
					}),
					promotion: {
						promotionAmount: command.promotion?.promotionAmount,
						promotionCurrency: command.promotion?.promotionCurrency!,
						startDate: command.promotion?.startDate,
						endDate: command.promotion?.endDate,
						isActive: command.promotion?.isActive!,
					},
				},
			};
			const response = await ApiClient.postGraphql(AdminProductPageCreateOrUpdateProductMutation, variables);
			dispatch(saveActionSuccess());
		} else {
			const response = await ApiClient.post<CreateOrUpdateProductResult>(`/api/products`, command);
			dispatch(saveActionSuccess());
		}
	} catch (error: any) {
		dispatch(saveActionError(createError(error)));
	}
};
