import { IError } from "@/libs/api-contract/Error";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetBestsellerProductsResult, GetFeaturedProductsResult, GetPromotionHighlightResult } from "../api-contract/api-contract";

interface IShopRootPageState {
	bestsellers: IShopRootPageBestsellersState;
	featured: IShopRootPageFeaturedState;
	promotionHighlight: IShopRootPagePromotionHighlightState;
}

interface IShopRootPageBestsellersState {
	data?: GetBestsellerProductsResult;
	error?: IError;
	isLoading: boolean;
}

interface IShopRootPageFeaturedState {
	data?: GetFeaturedProductsResult;
	error?: IError;
	isLoading: boolean;
}

interface IShopRootPagePromotionHighlightState {
    data?: GetPromotionHighlightResult;
    error?: IError;
    isLoading: boolean;
}

const initialState: IShopRootPageState = {
	bestsellers: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	featured: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	promotionHighlight: {
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
		getFeaturedProductsStart(state) {
			state.featured.isLoading = true;
			state.featured.error = undefined;
		},
		getFeaturedProductsSuccess(state, action: PayloadAction<GetFeaturedProductsResult>) {
			state.featured.isLoading = false;
			state.featured.data = action.payload;
		},
		getFeaturedProductsError(state, action: PayloadAction<IError>) {
			state.featured.isLoading = false;
			state.featured.error = action.payload;
		},
		clearFeaturedProductsState(state) {
			state.featured.data = undefined;
			state.featured.error = undefined;
			state.featured.isLoading = false;
		},
		getPromotionHighlightStart(state) {
			state.promotionHighlight.isLoading = true;
			state.promotionHighlight.error = undefined;
		},
		getPromotionHighlightSuccess(state, action: PayloadAction<GetPromotionHighlightResult>) {
			state.promotionHighlight.isLoading = false;
			state.promotionHighlight.data = action.payload;
		},
		getPromotionHighlightError(state, action: PayloadAction<IError>) {
			state.promotionHighlight.isLoading = false;
			state.promotionHighlight.error = action.payload;
		},
		clearPromotionHighlightState(state) {
			state.promotionHighlight.data = undefined;
			state.promotionHighlight.error = undefined;
			state.promotionHighlight.isLoading = false;
		},
	},
});

export const {
	clearBestsellerProductsState,
	getBestsellerProductsError,
	getBestsellerProductsStart,
	getBestsellerProductsSuccess,
	clearFeaturedProductsState,
	getFeaturedProductsError,
	getFeaturedProductsStart,
	getFeaturedProductsSuccess,
	clearPromotionHighlightState,
	getPromotionHighlightError,
	getPromotionHighlightStart,
	getPromotionHighlightSuccess,
} = ShopRootPageStore.actions;

export default ShopRootPageStore.reducer;
