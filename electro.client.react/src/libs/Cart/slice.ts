import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCartResult } from "../api-contract/api-contract";

export interface CartState {
	data?: GetCartResult;
	validationErrors: string[];
	error?: Error;
	isLoading: boolean;
}

const initialState: CartState = {
	data: undefined,
	validationErrors: [],
	error: undefined,
	isLoading: false,
};

const CartStore = createSlice({
	name: "CartSlice",
	initialState,
	reducers: {
		fetchCartStart(state) {
			state.isLoading = true;
			state.error = undefined;
		},
		fetchCartSuccess(state, action: PayloadAction<GetCartResult>) {
			state.isLoading = false;
			state.data = action.payload;
		},
		fetchCartError(state, action: PayloadAction<Error>) {
			state.isLoading = false;
			state.error = action.payload;
		},
		clearCart(state) {
			state.data = undefined;
			state.validationErrors = [];
		},
		validateCartStart(state) {
			state.isLoading = true;
			state.validationErrors = [];
			state.error = undefined;
		},
		validateCartSuccess(state, action: PayloadAction<GetCartResult>) {
			state.isLoading = false;
			state.data = action.payload;
		},
		setValidationErrors(state, action: PayloadAction<string[]>) {
			state.validationErrors = action.payload;
		},
		validateCartError(state, action: PayloadAction<Error>) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchCartError, fetchCartStart, fetchCartSuccess, validateCartError, validateCartStart, validateCartSuccess, clearCart, setValidationErrors } = CartStore.actions;

export default CartStore.reducer;
