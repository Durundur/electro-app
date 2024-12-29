import { AppDispatch, RootState } from "../Store";
import { GetCartResult, ValidateCartCommand, ValidateCartResult } from "../api-contract/api-contract";
import { getGetCartResult, getValidateCartCommand } from "./services";
import { fetchCartError, fetchCartStart, fetchCartSuccess, setValidationErrors, validateCartError, validateCartStart, validateCartSuccess } from "./slice";
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
	} catch (error: any) {
		dispatch(validateCartError(error as Error));
	}
};

export const addProductToCart = (productId: string, quantity: number, amount: number, currency: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
	const currentCart = getState().CartStore.data;
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

///clear cart czy w thunku nie robic
