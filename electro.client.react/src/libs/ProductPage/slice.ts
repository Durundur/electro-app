import { IError } from "@/libs/api-contract/Error";
import { GetProductResult } from "@/libs/api-contract/api-contract";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProductPageState {
	product: IProductState;
}

interface IProductState {
	data?: GetProductResult;
	error?: IError;
	isLoading: boolean;
}

const initialState: IProductPageState = {
	product: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
};

const ProductPageStore = createSlice({
	name: "ProductPageSlice",
	initialState,
	reducers: {
		fetchProductStart(state) {
			state.product.isLoading = true;
			state.product.error = undefined;
		},
		fetchProductSuccess(state, action: PayloadAction<GetProductResult>) {
			state.product.isLoading = false;
			state.product.data = action.payload;
		},
		fetchProductError(state, action: PayloadAction<IError>) {
			state.product.isLoading = false;
			state.product.error = action.payload;
		},
		clearProductState(state) {
			state.product.data = undefined;
			state.product.error = undefined;
			state.product.isLoading = false;
		},
	},
});

export const { clearProductState, fetchProductError, fetchProductStart, fetchProductSuccess } = ProductPageStore.actions;

export default ProductPageStore.reducer;
