import { AppDispatch, RootState } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { createError } from "../api-contract/Error";
import {
	CreateOrUpdateRecipientCommand,
	CreateOrUpdateRecipientResult,
	CreateOrderCommand,
	CreateOrderResult,
	GetCartResult,
	GetRecipientsResult,
	ValidateCartCommand,
	ValidateCartResult,
} from "../api-contract/api-contract";
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
		const response = await ApiClient.get<GetCartResult>(`/api/users/${userId}/cart`);
		dispatch(fetchCartSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchCartError(createError(error)));
	}
};

export const validateCart = (cartToValidate: ValidateCartCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(validateCartStart());
		const response = await ApiClient.post<ValidateCartResult>(`/api/carts/validate`, cartToValidate);
		const cartResult = getGetCartResult(response.data);
		dispatch(validateCartSuccess(cartResult));
		dispatch(setValidationErrors(response.data.errors ?? []));
		return response.data.errors ?? [];
	} catch (error: any) {
		dispatch(validateCartError(createError(error)));
	}
};

export const addProductToCart = (productId: string, quantity: number, amount: number, currency: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
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
			price: {
				amount,
				currency,
			},
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
		const response = await ApiClient.get<GetRecipientsResult>(`/api/users/${userId}/recipients`);
		dispatch(fetchRecipientsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchRecipientsError(createError(error)));
	}
};

export const createOrUpdateRecipient = (command: CreateOrUpdateRecipientCommand, userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateRecipientStart());
		const response = await ApiClient.post<CreateOrUpdateRecipientResult>(`/api/users/${userId}/recipients`, command);
		dispatch(createOrUpdateRecipientSuccess(response.data));
	} catch (error: any) {
		dispatch(createOrUpdateRecipientError(createError(error)));
	}
};

export const deleteRecipient = (recipientId: string, userId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteRecipientStart());
		const response = await ApiClient.delete(`/api/users/${userId}/recipients/${recipientId}`);
		dispatch(deleteRecipientSuccess(recipientId));
	} catch (error: any) {
		dispatch(deleteRecipientError(createError(error)));
	}
};

export const createOrder = (command: CreateOrderCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrderStart());
		const response = await ApiClient.post<CreateOrderResult>(`/api/orders`, command);
		dispatch(createOrderSuccess(response.data));
	} catch (error: any) {
		dispatch(createOrderError(createError(error)));
	}
};
