import { AppDispatch, RootState } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { createError } from "../api-contract/Error";
import { mapDeliveryMethodToGraphQL, mapOrderStatusFromGraphQL, mapPaymentMethodToGraphQL, mapRecipientTypeFromGraphQL, mapRecipientTypeToGraphQL } from "../api-contract/Mappers/EnumMappers";
import { graphql } from "../api-contract/graphql-api-contract";
import {
	CartPageCartQuery,
	CartPageCartQueryVariables,
	CartPageCreateOrderMutationVariables,
	CartPageCreateOrUpdateRecipientMutation,
	CartPageCreateOrUpdateRecipientMutationVariables,
	CartPageDeleteRecipientMutationVariables,
	CartPageRecipientsQuery,
	CartPageRecipientsQueryVariables,
	CartPageValidateCartMutation,
	CartPageValidateCartMutationVariables,
} from "../api-contract/graphql-api-contract/graphql";
import {
	CreateOrUpdateRecipientCommand,
	CreateOrUpdateRecipientResult,
	CreateOrderCommand,
	CreateOrderResult,
	GetCartResult,
	GetRecipientsResult,
	ValidateCartCommand,
	ValidateCartResult,
} from "../api-contract/rest-api-contract";
import { getGetCartResult, getValidateCartCommand } from "./services";
import {
	createOrUpdateRecipientError,
	createOrUpdateRecipientStart,
	createOrUpdateRecipientSuccess,
	createOrderError,
	createOrderStart,
	createOrderSuccess,
	deleteRecipientError,
	deleteRecipientStart,
	deleteRecipientSuccess,
	fetchCartError,
	fetchCartStart,
	fetchCartSuccess,
	fetchRecipientsError,
	fetchRecipientsStart,
	fetchRecipientsSuccess,
	setValidationErrors,
	validateCartError,
	validateCartStart,
	validateCartSuccess,
} from "./slice";

export const fetchCart = (userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchCartStart());
		if (ApiClient.apiType() == "graphql") {
			const CartPageCartQuery = graphql(`
				query CartPageCart($userId: UUID!) {
					cart(userId: $userId) {
						id
						totalQuantity
						totalPrice {
							amount
							currency
						}
						products {
							quantity
							product {
								id
								promotion {
									promotionalPrice {
										amount
										currency
									}
								}
								price {
									amount
									currency
								}
								mainPhoto
								name
							}
						}
					}
				}
			`);
			const variables: CartPageCartQueryVariables = { userId };
			const response = await ApiClient.postGraphql(CartPageCartQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetCartResult(response.data.data);
			dispatch(fetchCartSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetCartResult>(`/api/users/${userId}/cart`);
			dispatch(fetchCartSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchCartError(createError(error)));
	}
};

const mapGraphQLResponseToGetCartResult = (data: CartPageCartQuery): GetCartResult => {
	return {
		id: data.cart.id,
		totalPrice: data.cart.totalPrice,
		totalQuantity: data.cart.totalQuantity,
		products: data.cart.products.map((p) => {
			return {
				productId: p.product.id,
				name: p.product.name,
				quantity: p.quantity,
				price: p.product.price,
				photo: p.product.mainPhoto ?? "",
				promotion: p.product.promotion?.promotionalPrice,
			};
		}),
	};
};

export const validateCart = (cartToValidate: ValidateCartCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(validateCartStart());
		if (ApiClient.apiType() == "graphql") {
			const CartPageValidateCartMutation = graphql(`
				mutation CartPageValidateCart($input: ValidateCartInput!) {
					validateCart(input: $input) {
						cart {
							id
							totalQuantity
							totalPrice {
								amount
								currency
							}
							products {
								quantity
								product {
									id
									promotion {
										promotionalPrice {
											amount
											currency
										}
									}
									price {
										amount
										currency
									}
									mainPhoto
									name
								}
							}
						}
						errors
					}
				}
			`);
			const variables: CartPageValidateCartMutationVariables = {
				input: {
					products: cartToValidate
						.products!.filter((p) => p.productId && p.quantity)
						.map((p) => ({
							productId: p.productId!,
							quantity: p.quantity!,
						})),
				},
			};
			const response = await ApiClient.postGraphql(CartPageValidateCartMutation, variables);
			const mappedResponse = mapGraphQlResponseToValidateCartResult(response.data.data);
			const cartResult = getGetCartResult(mappedResponse);
			dispatch(validateCartSuccess(cartResult));
			dispatch(setValidationErrors(mappedResponse.errors ?? []));
			return response.data.errors ?? [];
		} else {
			const response = await ApiClient.post<ValidateCartResult>(`/api/carts/validate`, cartToValidate);
			const cartResult = getGetCartResult(response.data);
			dispatch(validateCartSuccess(cartResult));
			dispatch(setValidationErrors(response.data.errors ?? []));
			return response.data.errors ?? [];
		}
	} catch (error: any) {
		dispatch(validateCartError(createError(error)));
	}
};

const mapGraphQlResponseToValidateCartResult = (data: CartPageValidateCartMutation): ValidateCartResult => {
	return {
		id: data.validateCart.cart.id,
		totalPrice: data.validateCart.cart.totalPrice,
		totalQuantity: data.validateCart.cart.totalQuantity,
		products: data.validateCart.cart.products.map((p) => {
			return {
				productId: p.product.id,
				name: p.product.name,
				quantity: p.quantity,
				price: p.product.price,
				photo: p.product.mainPhoto ?? "",
				promotion: p.product.promotion?.promotionalPrice,
			};
		}),
		errors: data.validateCart.errors,
	};
};

export const addProductToCart = (productId: string, quantity: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
	const currentCart = getState().CartStore.cart.data;
	const currentCartValidationCommand = getValidateCartCommand(currentCart!);

	const updatedProducts = [...(currentCartValidationCommand?.products || [])];
	const existingProductIndex = updatedProducts.findIndex((p) => p.productId === productId);

	if (existingProductIndex >= 0) {
		updatedProducts[existingProductIndex] = {
			...updatedProducts[existingProductIndex],
			quantity: updatedProducts[existingProductIndex].quantity! + quantity,
		};
	} else {
		updatedProducts.push({
			productId,
			quantity,
		});
	}
	const updatedCartValidationCommand = {
		...currentCartValidationCommand,
		products: updatedProducts,
	};
	dispatch(validateCart(updatedCartValidationCommand));
};

export const fetchRecipients = (userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchRecipientsStart());
		if (ApiClient.apiType() == "graphql") {
			const CartPageRecipientsQuery = graphql(`
				query CartPageRecipients($userId: UUID!) {
					recipients(userId: $userId) {
						id
						firstName
						surname
						companyName
						taxIdentificationNumber
						type
						phoneNumber
						street
						houseNumber
						postalCode
						city
					}
				}
			`);
			const variables: CartPageRecipientsQueryVariables = { userId };
			const response = await ApiClient.postGraphql(CartPageRecipientsQuery, variables);
			const mappedResponse = mapGraphQlResponseToGetRecipientsResult(response.data.data);
			dispatch(fetchRecipientsSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetRecipientsResult>(`/api/users/${userId}/recipients`);
			dispatch(fetchRecipientsSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchRecipientsError(createError(error)));
	}
};

const mapGraphQlResponseToGetRecipientsResult = (data: CartPageRecipientsQuery): GetRecipientsResult => {
	return {
		recipients: data.recipients.map((r) => {
			return {
				id: r.id,
				firstName: r.firstName ?? undefined,
				surname: r.surname ?? undefined,
				companyName: r.companyName ?? undefined,
				taxIdentificationNumber: r.taxIdentificationNumber ?? undefined,
				type: mapRecipientTypeFromGraphQL(r.type),
				phoneNumber: r.phoneNumber,
				street: r.street,
				houseNumber: r.houseNumber,
				postalCode: r.postalCode,
				city: r.city,
			};
		}),
	};
};

export const createOrUpdateRecipient = (command: CreateOrUpdateRecipientCommand, userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateRecipientStart());
		if (ApiClient.apiType() == "graphql") {
			const CartPageCreateOrUpdateRecipientMutation = graphql(`
				mutation CartPageCreateOrUpdateRecipient($input: CreateOrUpdateRecipientInput!) {
					createOrUpdateRecipient(input: $input) {
						id
						firstName
						surname
						companyName
						taxIdentificationNumber
						type
						phoneNumber
						street
						houseNumber
						postalCode
						city
					}
				}
			`);
			const variables: CartPageCreateOrUpdateRecipientMutationVariables = {
				input: {
					userId: userId,
					firstName: command.firstName,
					surname: command.surname,
					companyName: command.companyName,
					taxIdentificationNumber: command.taxIdentificationNumber,
					type: mapRecipientTypeToGraphQL(command.type!),
					phoneNumber: command.phoneNumber!,
					street: command.street!,
					houseNumber: command.houseNumber!,
					postalCode: command.postalCode!,
					city: command.city!,
				},
			};
			const response = await ApiClient.postGraphql(CartPageCreateOrUpdateRecipientMutation, variables);
			const mappedResponse = mapGraphQlResponseToCreateOrUpdateRecipientResult(response.data.data);
			dispatch(createOrUpdateRecipientSuccess(mappedResponse));
		} else {
			const response = await ApiClient.post<CreateOrUpdateRecipientResult>(`/api/users/${userId}/recipients`, command);
			dispatch(createOrUpdateRecipientSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(createOrUpdateRecipientError(createError(error)));
	}
};

const mapGraphQlResponseToCreateOrUpdateRecipientResult = (data: CartPageCreateOrUpdateRecipientMutation): CreateOrUpdateRecipientResult => {
	return {
		id: data.createOrUpdateRecipient.id,
		firstName: data.createOrUpdateRecipient.firstName ?? undefined,
		surname: data.createOrUpdateRecipient.surname ?? undefined,
		companyName: data.createOrUpdateRecipient.companyName ?? undefined,
		taxIdentificationNumber: data.createOrUpdateRecipient.taxIdentificationNumber ?? undefined,
		type: mapRecipientTypeFromGraphQL(data.createOrUpdateRecipient.type),
		phoneNumber: data.createOrUpdateRecipient.phoneNumber,
		street: data.createOrUpdateRecipient.street,
	};
};

export const deleteRecipient = (recipientId: string, userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteRecipientStart());
		if (ApiClient.apiType() == "graphql") {
			const CartPageDeleteRecipientMutation = graphql(`
				mutation CartPageDeleteRecipient($recipientId: UUID!, $userId: UUID!) {
					deleteRecipient(recipientId: $recipientId, userId: $userId)
				}
			`);
			const variables: CartPageDeleteRecipientMutationVariables = { recipientId, userId };
			const response = await ApiClient.postGraphql(CartPageDeleteRecipientMutation, variables);
			dispatch(deleteRecipientSuccess(recipientId));
		} else {
			const response = await ApiClient.delete(`/api/users/${userId}/recipients/${recipientId}`);
			dispatch(deleteRecipientSuccess(recipientId));
		}
	} catch (error: any) {
		dispatch(deleteRecipientError(createError(error)));
	}
};

export const createOrder = (command: CreateOrderCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrderStart());
		if (ApiClient.apiType() == "graphql") {
			const CartPageCreateOrderMutation = graphql(`
				mutation CartPageCreateOrder($input: CreateOrderInput!) {
					createOrder(input: $input) {
						id
						status
					}
				}
			`);
			const variables: CartPageCreateOrderMutationVariables = {
				input: {
					deliveryMethod: mapDeliveryMethodToGraphQL(command.deliveryMethod!),
					paymentMethod: mapPaymentMethodToGraphQL(command.paymentMethod!),
					products: command.products!.map((p) => ({
						productId: p.productId!,
						quantity: p.quantity!,
					})),
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
			const response = await ApiClient.postGraphql(CartPageCreateOrderMutation, variables);
			dispatch(createOrderSuccess({ orderId: response.data.data.createOrder.id, status: mapOrderStatusFromGraphQL(response.data.data.createOrder.status) }));
		} else {
			const response = await ApiClient.post<CreateOrderResult>(`/api/orders`, command);
			dispatch(createOrderSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(createOrderError(createError(error)));
	}
};
