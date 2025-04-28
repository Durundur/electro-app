import { AppDispatch } from "@/libs/Store";
import {
	adminOrderEditError,
	adminOrderEditStart,
	fetchAdminOrderDetailsError,
	fetchAdminOrderDetailsStart,
	fetchAdminOrderDetailsSuccess,
	fetchAdminOrdersListError,
	fetchAdminOrdersListStart,
	fetchAdminOrdersListSuccess,
	getAdminOrderEditSuccess,
	putAdminOrderEditSuccess,
} from "./slice";
import { createError } from "@/libs/api-contract/Error";
import { GetOrderDetailsResult, GetOrdersResult, UpdateOrderCommand, UpdateOrderResult } from "@/libs/api-contract/rest-api-contract";
import { GetAdminOrdersListQuery } from "./interfaces";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import ApiClient from "@/libs/api-contract/ApiClient";
import { graphql } from "@/libs/api-contract/graphql-api-contract";
import { AdminOrdersPageOrderQuery, AdminOrdersPageOrderQueryVariables, AdminOrdersPageOrdersQuery, AdminOrdersPageOrdersQueryVariables, AdminOrdersPageUpdateOrderMutation, AdminOrdersPageUpdateOrderMutationVariables } from "@/libs/api-contract/graphql-api-contract/graphql";
import {
	mapDeliveryMethodFromGraphQL,
	mapDeliveryStatusFromGraphQL,
	mapOrderStatusFromGraphQL,
	mapOrderStatusToGraphQL,
	mapPaymentMethodFromGraphQL,
	mapPaymentStatusFromGraphQL,
	mapRecipientTypeFromGraphQL,
	mapRecipientTypeToGraphQL,
} from "@/libs/api-contract/Mappers/EnumMappers";

export const fetchAdminOrdersList = (query: GetAdminOrdersListQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAdminOrdersListStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminOrdersPageOrdersQuery = graphql(`
				query AdminOrdersPageOrders($page: Int!, $pageSize: Int!) {
					orders(page: $page, pageSize: $pageSize) {
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
			const variables: AdminOrdersPageOrdersQueryVariables = {
				page: query.page,
				pageSize: query.pageSize,
			};
			const response = await ApiClient.postGraphql(AdminOrdersPageOrdersQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetUserOrdersResult(response.data.data);
			dispatch(fetchAdminOrdersListSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetOrdersResult>(`/api/orders?${buildQueryString(query)}`);
			dispatch(fetchAdminOrdersListSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchAdminOrdersListError(createError(error)));
	}
};

const mapGraphQLResponseToGetUserOrdersResult = (data: AdminOrdersPageOrdersQuery): GetOrdersResult => {
	return {
		items: data.orders.items.map((i) => {
			return {
				id: i.id,
				status: mapOrderStatusFromGraphQL(i.status),
				totalPrice: i.totalPrice,
				createdAt: i.createdAt,
			};
		}),
		page: data.orders.page,
		pageSize: data.orders.pageSize,
		totalPages: data.orders.totalPages,
	};
};

export const fetchAdminOrderDetails = (orderId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAdminOrderDetailsStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminOrdersPageOrderQuery = graphql(`
				query AdminOrdersPageOrder($orderId: UUID!) {
					order(id: $orderId) {
						id
						number
						status
						totalPrice {
							amount
							currency
						}
						createdAt
						updatedAt
						products {
							id
							quantity
							name
							price {
								amount
								currency
							}
							totalPrice {
								amount
								currency
							}
							product {
								id
								photos
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
			const variables: AdminOrdersPageOrderQueryVariables = {
				orderId: orderId,
			};
			const response = await ApiClient.postGraphql(AdminOrdersPageOrderQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetUserOrderDetailsResult(response.data.data);
			dispatch(fetchAdminOrderDetailsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetOrderDetailsResult>(`/api/orders/${orderId}`);
			dispatch(fetchAdminOrderDetailsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchAdminOrderDetailsError(createError(error)));
	}
};

const mapGraphQLResponseToGetUserOrderDetailsResult = (data: AdminOrdersPageOrderQuery): GetOrderDetailsResult => {
	return {
		id: data.order.id,
		status: mapOrderStatusFromGraphQL(data.order.status),
		createdAt: data.order.createdAt,
		updatedAt: data.order.updatedAt,
		totalPrice: data.order.totalPrice,
		number: data.order.number,
		products: data.order.products.map((p) => {
			return {
				id: p.id,
				productId: p.product.id,
				name: p.name,
				photo: p.product.photos.length ? p.product.photos[0] : "",
				quantity: p.quantity,
				price: p.price,
				totalPrice: p.totalPrice,
			};
		}),
		payment: {
			id: data.order.payment.id,
			method: mapPaymentMethodFromGraphQL(data.order.payment.method),
			cost: data.order.payment.cost,
			status: mapPaymentStatusFromGraphQL(data.order.payment.status),
			paidAt: data.order.payment.paidAt,
		},
		delivery: {
			id: data.order.delivery.id,
			method: mapDeliveryMethodFromGraphQL(data.order.delivery.method),
			cost: data.order.delivery.cost,
			status: mapDeliveryStatusFromGraphQL(data.order.delivery.status),
			trackingNumber: data.order.delivery.trackingNumber ?? undefined,
			shippedAt: data.order.delivery.shippedAt,
			deliveredAt: data.order.delivery.deliveredAt,
		},
		recipient: {
			type: mapRecipientTypeFromGraphQL(data.order.recipient.type),
			firstName: data.order.recipient.firstName ?? undefined,
			surname: data.order.recipient.surname ?? undefined,
			companyName: data.order.recipient.companyName ?? undefined,
			taxIdentificationNumber: data.order.recipient.taxIdentificationNumber ?? undefined,
			phoneNumber: data.order.recipient.phoneNumber,
			street: data.order.recipient.street,
			houseNumber: data.order.recipient.houseNumber,
			postalCode: data.order.recipient.postalCode,
			city: data.order.recipient.city,
		},
	};
};

export const getAdminOrderEdit = (orderId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(adminOrderEditStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminOrdersPageOrderQuery = graphql(`
				query AdminOrdersPageOrder($orderId: UUID!) {
					order(id: $orderId) {
						id
						number
						status
						totalPrice {
							amount
							currency
						}
						createdAt
						updatedAt
						products {
							id
							quantity
							name
							price {
								amount
								currency
							}
							totalPrice {
								amount
								currency
							}
							product {
								id
								photos
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
			const variables: AdminOrdersPageOrderQueryVariables = {
				orderId: orderId,
			};
			const response = await ApiClient.postGraphql(AdminOrdersPageOrderQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetOrderDetailsResult(response.data.data);
			dispatch(getAdminOrderEditSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetOrderDetailsResult>(`/api/orders/${orderId}`);
			dispatch(getAdminOrderEditSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(adminOrderEditError(createError(error)));
	}
};

const mapGraphQLResponseToGetOrderDetailsResult = (data: AdminOrdersPageOrderQuery): GetOrderDetailsResult => {
	return {
		id: data.order.id,
		status: mapOrderStatusFromGraphQL(data.order.status),
		createdAt: data.order.createdAt,
		updatedAt: data.order.updatedAt,
		totalPrice: data.order.totalPrice,
		number: data.order.number,
		products: data.order.products.map((p) => {
			return {
				id: p.id,
				productId: p.product.id,
				name: p.name,
				photo: p.product.photos.length ? p.product.photos[0] : "",
				quantity: p.quantity,
				price: p.price,
				totalPrice: p.totalPrice,
			};
		}),
		payment: {
			id: data.order.payment.id,
			method: mapPaymentMethodFromGraphQL(data.order.payment.method),
			cost: data.order.payment.cost,
			status: mapPaymentStatusFromGraphQL(data.order.payment.status),
			paidAt: data.order.payment.paidAt,
		},
		delivery: {
			id: data.order.delivery.id,
			method: mapDeliveryMethodFromGraphQL(data.order.delivery.method),
			cost: data.order.delivery.cost,
			status: mapDeliveryStatusFromGraphQL(data.order.delivery.status),
			trackingNumber: data.order.delivery.trackingNumber ?? undefined,
			shippedAt: data.order.delivery.shippedAt,
			deliveredAt: data.order.delivery.deliveredAt,
		},
		recipient: {
			type: mapRecipientTypeFromGraphQL(data.order.recipient.type),
			firstName: data.order.recipient.firstName ?? undefined,
			surname: data.order.recipient.surname ?? undefined,
			companyName: data.order.recipient.companyName ?? undefined,
			taxIdentificationNumber: data.order.recipient.taxIdentificationNumber ?? undefined,
			phoneNumber: data.order.recipient.phoneNumber,
			street: data.order.recipient.street,
			houseNumber: data.order.recipient.houseNumber,
			postalCode: data.order.recipient.postalCode,
			city: data.order.recipient.city,
		},
	};
};

export const putAdminOrderEdit = (command: UpdateOrderCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(adminOrderEditStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminOrdersPageUpdateOrderMutation = graphql(`
				mutation AdminOrdersPageUpdateOrder($input: UpdateOrderInput!) {
					updateOrder(input: $input) {
						id
						number
						status
						totalPrice {
							amount
							currency
						}
						createdAt
						updatedAt
						products {
							id
							quantity
							name
							price {
								amount
								currency
							}
							totalPrice {
								amount
								currency
							}
							product {
								id
								photos
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
			const variables: AdminOrdersPageUpdateOrderMutationVariables = {
				input: {
					orderId: command.orderId,
					status: mapOrderStatusToGraphQL(command.status!),
					trackingNumber: command.trackingNumber,
					recipient: {
						city: command.recipient!.city!,
						companyName: command.recipient!.companyName,
						firstName: command.recipient!.firstName!,
						houseNumber: command.recipient!.houseNumber!,
						phoneNumber: command.recipient!.phoneNumber!,
						postalCode: command.recipient!.postalCode!,
						street: command.recipient!.street!,
						surname: command.recipient!.surname!,
						taxIdentificationNumber: command.recipient!.taxIdentificationNumber,
						type: mapRecipientTypeToGraphQL(command.recipient!.type!),
					},
				},
			};
			const response = await ApiClient.postGraphql(AdminOrdersPageUpdateOrderMutation, variables);
			const mappedResponse = mapGraphQLResponseToUpdateOrderResult(response.data.data);
			dispatch(putAdminOrderEditSuccess(mappedResponse));

		} else {
			const response = await ApiClient.put<UpdateOrderResult>(`/api/orders`, command);
			dispatch(putAdminOrderEditSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(adminOrderEditError(createError(error)));
	}
};

const mapGraphQLResponseToUpdateOrderResult = (data: AdminOrdersPageUpdateOrderMutation): UpdateOrderResult => {
	return {
		id: data.updateOrder.id,
		status: mapOrderStatusFromGraphQL(data.updateOrder.status),
		createdAt: data.updateOrder.createdAt,
		updatedAt: data.updateOrder.updatedAt,
		totalPrice: data.updateOrder.totalPrice,
		number: data.updateOrder.number,
		products: data.updateOrder.products.map((p) => {
			return {
				id: p.id,
				productId: p.product.id,
				name: p.name,
				photo: p.product.photos.length ? p.product.photos[0] : "",
				quantity: p.quantity,
				price: p.price,
				totalPrice: p.totalPrice,
			};
		}),
		payment: {
			id: data.updateOrder.payment.id,
			method: mapPaymentMethodFromGraphQL(data.updateOrder.payment.method),
			cost: data.updateOrder.payment.cost,
			status: mapPaymentStatusFromGraphQL(data.updateOrder.payment.status),
			paidAt: data.updateOrder.payment.paidAt,
		},
		delivery: {
			id: data.updateOrder.delivery.id,
			method: mapDeliveryMethodFromGraphQL(data.updateOrder.delivery.method),
			cost: data.updateOrder.delivery.cost,
			status: mapDeliveryStatusFromGraphQL(data.updateOrder.delivery.status),
			trackingNumber: data.updateOrder.delivery.trackingNumber ?? undefined,
			shippedAt: data.updateOrder.delivery.shippedAt,
			deliveredAt: data.updateOrder.delivery.deliveredAt,
		},
		recipient: {
			type: mapRecipientTypeFromGraphQL(data.updateOrder.recipient.type),
			firstName: data.updateOrder.recipient.firstName ?? undefined,
			surname: data.updateOrder.recipient.surname ?? undefined,
			companyName: data.updateOrder.recipient.companyName ?? undefined,
			taxIdentificationNumber: data.updateOrder.recipient.taxIdentificationNumber ?? undefined,
			phoneNumber: data.updateOrder.recipient.phoneNumber,
			street: data.updateOrder.recipient.street,
			houseNumber: data.updateOrder.recipient.houseNumber,
			postalCode: data.updateOrder.recipient.postalCode,
			city: data.updateOrder.recipient.city,
		},
	};
};
