import { AppDispatch } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { createError } from "../api-contract/Error";
import { graphql } from "../api-contract/graphql-api-contract";
import { LayoutMenuQuery } from "../api-contract/graphql-api-contract/graphql";
import { GetMenuResult } from "../api-contract/rest-api-contract";
import { fetchProductHierarchyError, fetchProductHierarchySuccess, fetchProductHierarchyStart } from "./slice";

export const fetchProductHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductHierarchyStart());
		if (ApiClient.apiType() == "graphql") {
			const LayoutMenuQuery = graphql(`
				query LayoutMenu {
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
			const response = await ApiClient.postGraphql(LayoutMenuQuery);
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

const mapGraphQLResponseToGetMenuResult = (data: LayoutMenuQuery): GetMenuResult => {
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
