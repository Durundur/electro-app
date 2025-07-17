import { AppDispatch } from "@/libs/Store";
import { fetchProductCatalogListError, fetchProductCatalogListStart, fetchProductCatalogListSuccess } from "./slice";
import { GetProductCatalogResult } from "@/libs/api-contract/rest-api-contract";
import { createError } from "@/libs/api-contract/Error";
import { GetProductCatalogQuery } from "./interfaces";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import ApiClient from "@/libs/api-contract/ApiClient";
import { graphql } from "@/libs/api-contract/graphql-api-contract";
import { AdminProductCatalogPageProductsQuery, AdminProductCatalogPageProductsQueryVariables } from "@/libs/api-contract/graphql-api-contract/graphql";
import { mapProductStatusFromGraphQL } from "@/libs/api-contract/Mappers/EnumMappers";

export const fetchProductCatalogList = (query: GetProductCatalogQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductCatalogListStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductCatalogPageProductsQuery = graphql(`
				query AdminProductCatalogPageProducts($page: Int!, $pageSize: Int!) {
					catalogProducts(page: $page, pageSize: $pageSize) {
						items {
							id
							name
							price {
								amount
								currency
							}
							mainPhoto
							status
							stockQuantity
						}
						page
						pageSize
						totalPages
					}
				}
			`);
			const variables: AdminProductCatalogPageProductsQueryVariables = {
				page: query.page,
				pageSize: query.pageSize,
			};
			const response = await ApiClient.postGraphql(AdminProductCatalogPageProductsQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetProductCatalogResult(response.data.data);
			dispatch(fetchProductCatalogListSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetProductCatalogResult>(`/api/products/catalog?${buildQueryString(query)}`);
			dispatch(fetchProductCatalogListSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchProductCatalogListError(createError(error)));
	}
};

const mapGraphQLResponseToGetProductCatalogResult = (data: AdminProductCatalogPageProductsQuery): GetProductCatalogResult => {
	return {
		items: data.catalogProducts.items.map((p) => {
			return {
				id: p.id,
				name: p.name,
				amount: p.price.amount,
				currency: p.price.currency,
				photo: p.mainPhoto ?? "",
				status: mapProductStatusFromGraphQL(p.status),
				stockQuantity: p.stockQuantity,
			};
		}),
		page: data.catalogProducts.page,
		pageSize: data.catalogProducts.pageSize,
		totalPages: data.catalogProducts.totalPages,
	};
};
