import { buildQueryString } from "../Helpers/QueryHelper";
import { AppDispatch } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { IError, createError } from "../api-contract/Error";
import {
	mapDeliveryMethodFromGraphQL,
	mapDeliveryStatusFromGraphQL,
	mapOrderStatusFromGraphQL,
	mapPaymentMethodFromGraphQL,
	mapPaymentStatusFromGraphQL,
	mapRecipientTypeFromGraphQL,
} from "../api-contract/Mappers/EnumMappers";
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
							number
							createdAt
							totalPrice {
								amount
								currency
							}
							products {
								id
								quantity
								name
								product {
									id
									photos
								}
								price {
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
				number: i.number,
				products: i.products.map((p) => {
					return {
						id: p.id,
						productId: p.product.id,
						name: p.name,
						photo: p.product.photos.length ? p.product.photos[0] : "",
						quantity: p.quantity,
						price: p.price,
					};
				}),
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
						updatedAt
						totalPrice {
							amount
							currency
						}
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
		number: data.userOrder.number,
		status: mapOrderStatusFromGraphQL(data.userOrder.status),
		totalPrice: data.userOrder.totalPrice,
		createdAt: data.userOrder.createdAt,
		updatedAt: new Date(data.userOrder.updatedAt),
		products: data.userOrder.products.map((p) => {
			return {
				id: p.id,
				productId: p.product.id,
				name: p.product.name,
				photo: p.product.photos.length ? p.product.photos[0] : "",
				quantity: p.quantity,
				price: p.product.price,
				totalPrice: p.totalPrice,
			};
		}),
		payment: {
			id: data.userOrder.payment.id,
			method: mapPaymentMethodFromGraphQL(data.userOrder.payment.method),
			cost: data.userOrder.payment.cost,
			status: mapPaymentStatusFromGraphQL(data.userOrder.payment.status),
			paidAt: data.userOrder.payment.paidAt,
		},
		delivery: {
			id: data.userOrder.delivery.id,
			method: mapDeliveryMethodFromGraphQL(data.userOrder.delivery.method),
			cost: data.userOrder.delivery.cost,
			status: mapDeliveryStatusFromGraphQL(data.userOrder.delivery.status),
			trackingNumber: data.userOrder.delivery.trackingNumber ?? undefined,
			shippedAt: data.userOrder.delivery.shippedAt,
			deliveredAt: data.userOrder.delivery.deliveredAt,
		},
		recipient: {
			type: mapRecipientTypeFromGraphQL(data.userOrder.recipient.type),
			firstName: data.userOrder.recipient.firstName ?? undefined,
			surname: data.userOrder.recipient.surname ?? undefined,
			companyName: data.userOrder.recipient.companyName ?? undefined,
			taxIdentificationNumber: data.userOrder.recipient.taxIdentificationNumber ?? undefined,
			phoneNumber: data.userOrder.recipient.phoneNumber,
			street: data.userOrder.recipient.street,
			houseNumber: data.userOrder.recipient.houseNumber,
			postalCode: data.userOrder.recipient.postalCode,
			city: data.userOrder.recipient.city,
		},
	};
};
