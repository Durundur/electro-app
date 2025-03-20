import { IError } from "@/libs/api-contract/Error";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetBestsellerProductsResult } from "../api-contract/api-contract";

interface IShopRootPageState {
	bestsellers: IShopRootPageBestsellersState;
}

interface IShopRootPageBestsellersState {
	data?: GetBestsellerProductsResult;
	error?: IError;
	isLoading: boolean;
}

const initialState: IShopRootPageState = {
	bestsellers: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
};

const ShopRootPageStore = createSlice({
	name: "ShopRootPageStore",
	initialState,
	reducers: {
		getBestsellerProductsStart(state) {
			state.bestsellers.isLoading = true;
			state.bestsellers.error = undefined;
		},
		getBestsellerProductsSuccess(state, action: PayloadAction<GetBestsellerProductsResult>) {
			state.bestsellers.isLoading = false;
			state.bestsellers.data = action.payload;
		},
		getBestsellerProductsError(state, action: PayloadAction<IError>) {
			state.bestsellers.isLoading = false;
			state.bestsellers.error = action.payload;
		},
		clearBestsellerProductsState(state) {
			state.bestsellers.data = undefined;
			state.bestsellers.error = undefined;
			state.bestsellers.isLoading = false;
		},
	},
});

export const { clearBestsellerProductsState, getBestsellerProductsError, getBestsellerProductsStart, getBestsellerProductsSuccess } = ShopRootPageStore.actions;

export default ShopRootPageStore.reducer;
