import { buildQueryString } from "../Helpers/QueryHelper";
import { AppDispatch } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { IError, createError } from "../api-contract/Error";
import { mapOrderStatusFromGraphQL } from "../api-contract/Mappers/EnumMappers";
import { graphql } from "../api-contract/graphql-api-contract";
import { AccountOrdersPageOrderQuery, AccountOrdersPageOrderQueryVariables, AccountOrdersPageOrdersQuery, AccountOrdersPageOrdersQueryVariables } from "../api-contract/graphql-api-contract/graphql";
import { GetUserOrderDetailsResult, GetUserOrdersResult } from "../api-contract/rest-api-contract";
import { getAccountOrderDetailsError, getAccountOrderDetailsStart, getAccountOrderDetailsSuccess, getAccountOrdersError, getAccountOrdersStart, getAccountOrdersSuccess } from "./slice";

export interface IGetAccountOrdersQueryParams {
	userId: string;
	page: number;
	pageSize: number;
}

export const getAccountOrders = (queryParams: IGetAccountOrdersQueryParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getAccountOrdersStart());
		if (ApiClient.apiType() == "graphql") {
			const AccountOrdersPageOrdersQuery = graphql(`
				query AccountOrdersPageOrders($page: Int!, $pageSize: Int!) {
					userOrders(page: $page, pageSize: $pageSize) {
						items {
							id
							status
							totalPrice {
								amount
								currency
							}
							createdAt
						}
						page
						pageSize
						totalPages
					}
				}
			`);
			const variables: AccountOrdersPageOrdersQueryVariables = {
				page: queryParams.page,
				pageSize: queryParams.pageSize,
			};
			const response = await ApiClient.postGraphql(AccountOrdersPageOrdersQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetUserOrdersResult(response.data.data);
			dispatch(getAccountOrdersSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetUserOrdersResult>(`/api/users/${queryParams.userId}/orders?${buildQueryString({ page: queryParams.page, pageSize: queryParams.pageSize })}`);
			dispatch(getAccountOrdersSuccess(response.data));
		}
	} catch (error) {
		dispatch(getAccountOrdersError(createError(error as IError)));
	}
};

const mapGraphQLResponseToGetUserOrdersResult = (data: AccountOrdersPageOrdersQuery): GetUserOrdersResult => {
	return {
		items: data.userOrders.items.map((i) => {
			return {
				id: i.id,
				status: mapOrderStatusFromGraphQL(i.status),
				totalPrice: i.totalPrice,
				createdAt: i.createdAt,
			};
		}),
		page: data.userOrders.page,
		pageSize: data.userOrders.pageSize,
		totalPages: data.userOrders.totalPages,
	};
};

export interface IGetAccountOrderDetailsQueryParams {
	userId: string;
	orderId: string;
}

export const getAccountOrderDetails = (queryParams: IGetAccountOrderDetailsQueryParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getAccountOrderDetailsStart());
		if (ApiClient.apiType() == "graphql") {
			const AccountOrdersPageOrderQuery = graphql(`
				query AccountOrdersPageOrder($orderId: UUID!) {
					userOrder(orderId: $orderId) {
						id
						number
						status
						createdAt
						products {
							id
							quantity
							totalPrice {
								amount
								currency
							}
							product {
								id
								name
								photos
								price {
									amount
									currency
								}
							}
						}
						payment {
							id
							method
							cost {
								amount
								currency
							}
							status
							paidAt
						}
						delivery {
							id
							method
							cost {
								amount
								currency
							}
							status
							trackingNumber
							shippedAt
							deliveredAt
						}
						recipient {
							type
							firstName
							surname
							companyName
							taxIdentificationNumber
							phoneNumber
							street
							houseNumber
							postalCode
							city
						}
					}
				}
			`);
			const variables: AccountOrdersPageOrderQueryVariables = {
				orderId: queryParams.orderId,
			};
			const response = await ApiClient.postGraphql(AccountOrdersPageOrderQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetUserOrderDetailsResult(response.data.data);
			dispatch(getAccountOrderDetailsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetUserOrderDetailsResult>(`/api/users/${queryParams.userId}/orders/${queryParams.orderId}`);
			dispatch(getAccountOrderDetailsSuccess(response.data));
		}
	} catch (error) {
		dispatch(getAccountOrderDetailsError(createError(error as IError)));
	}
};

const mapGraphQLResponseToGetUserOrderDetailsResult = (data: AccountOrdersPageOrderQuery): GetUserOrderDetailsResult => {
	return {
		id: data.userOrder.id,
		status: mapOrderStatusFromGraphQL(data.userOrder.status),
		createdAt: data.userOrder.createdAt,
	};
};
