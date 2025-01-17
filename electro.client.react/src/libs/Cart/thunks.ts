import { AppDispatch, RootState } from "../Store";
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
import axios from "axios";

export const fetchCart = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchCartStart());
		const response = await axios.get<GetCartResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/carts/06E85F9E-084A-4F7A-A41C-BAA9A6A35189`);
		dispatch(fetchCartSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchCartError(error as Error));
	}
};

export const validateCart = (cartToValidate: ValidateCartCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(validateCartStart());
		const response = await axios.post<ValidateCartResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/carts/validate`, cartToValidate);
		const cartResult = getGetCartResult(response.data);
		dispatch(validateCartSuccess(cartResult));
		dispatch(setValidationErrors(response.data.errors ?? []));
		return response.data.errors ?? [];
	} catch (error: any) {
		dispatch(validateCartError(error as Error));
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

export const fetchRecipients = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchRecipientsStart());
		const response = await axios.get<GetRecipientsResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/users/06E85F9E-084A-4F7A-A41C-BAA9A6A35189/recipients`);
		dispatch(fetchRecipientsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchRecipientsError(error as Error));
	}
};

export const createOrUpdateRecipient = (command: CreateOrUpdateRecipientCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateRecipientStart());
		const response = await axios.post<CreateOrUpdateRecipientResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/users/06E85F9E-084A-4F7A-A41C-BAA9A6A35189/recipients`, command);
		dispatch(createOrUpdateRecipientSuccess(response.data));
	} catch (error: any) {
		dispatch(createOrUpdateRecipientError(error as Error));
	}
};

export const deleteRecipient = (recipientId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteRecipientStart());
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/06E85F9E-084A-4F7A-A41C-BAA9A6A35189/recipients/${recipientId}`);
		dispatch(deleteRecipientSuccess(recipientId));
	} catch (error: any) {
		dispatch(deleteRecipientError(error as Error));
	}
};

export const createOrder = (command: CreateOrderCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrderStart());
		const response = await axios.post<CreateOrderResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, command);
		dispatch(createOrderSuccess(response.data));
	} catch (error: any) {
		dispatch(createOrderError(error as Error));
	}
};
