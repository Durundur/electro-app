import { IError } from "@/libs/api-contract/Error";
import { CreateOpinionResult, GetProductOpinionsResult, GetProductOpinionsStatsResult, GetProductResult, GetSimilarProductsResult, OpinionReactionType } from "@/libs/api-contract/rest-api-contract";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProductPageState {
	product: IProductState;
	opinions: IOpinionsState;
	opinionsStats: IOpinionsStatsState;
	createOpinion: ICreateOpinionState;
	createOpinionReaction: ICreateOpinionReactionState;
	similarProducts: ISimilarProductsState;
}

interface IProductState {
	data?: GetProductResult;
	error?: IError;
	isLoading: boolean;
}

interface IOpinionsState {
	data?: GetProductOpinionsResult;
	error?: IError;
	isLoading: boolean;
}

interface IOpinionsStatsState {
	data?: GetProductOpinionsStatsResult;
	error?: IError;
	isLoading: boolean;
}

interface ICreateOpinionReactionState {
	success?: boolean;
	error?: IError;
	isLoading: boolean;
}

interface ICreateOpinionState {
	data?: CreateOpinionResult;
	error?: IError;
	isLoading: boolean;
}

interface ISimilarProductsState {
	data?: GetSimilarProductsResult;
	error?: IError;
	isLoading: boolean;
}

const initialState: IProductPageState = {
	product: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	opinions: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	opinionsStats: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	createOpinionReaction: {
		success: undefined,
		error: undefined,
		isLoading: false,
	},
	createOpinion: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	similarProducts: {
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
		getOpinionsStart(state) {
			state.opinions.isLoading = true;
			state.opinions.error = undefined;
		},
		getOpinionsSuccess(state, action: PayloadAction<GetProductOpinionsResult>) {
			state.opinions.isLoading = false;
			state.opinions.data = action.payload;
		},
		getOpinionsError(state, action: PayloadAction<IError>) {
			state.opinions.isLoading = false;
			state.opinions.error = action.payload;
		},
		clearOpinionsState(state) {
			state.opinions.data = undefined;
			state.opinions.error = undefined;
			state.opinions.isLoading = false;
		},
		getOpinionsStatsStart(state) {
			state.opinionsStats.isLoading = true;
			state.opinionsStats.error = undefined;
		},
		getOpinionsStatsSuccess(state, action: PayloadAction<GetProductOpinionsStatsResult>) {
			state.opinionsStats.isLoading = false;
			state.opinionsStats.data = action.payload;
		},
		getOpinionsStatsError(state, action: PayloadAction<IError>) {
			state.opinionsStats.isLoading = false;
			state.opinionsStats.error = action.payload;
		},
		clearOpinionsStatsState(state) {
			state.opinionsStats.data = undefined;
			state.opinionsStats.error = undefined;
			state.opinionsStats.isLoading = false;
		},
		createOpinionReactionStart(state) {
			state.createOpinionReaction.isLoading = true;
			state.createOpinionReaction.error = undefined;
		},
		createOpinionReactionSuccess(state) {
			state.createOpinionReaction.isLoading = false;
			state.createOpinionReaction.success = true;
		},
		createOpinionReactionError(state, action: PayloadAction<IError>) {
			state.createOpinionReaction.isLoading = false;
			state.createOpinionReaction.error = action.payload;
		},
		clearOpinionReactionState(state) {
			state.createOpinionReaction.success = undefined;
			state.createOpinionReaction.error = undefined;
			state.createOpinionReaction.isLoading = false;
		},
		updateOpinionReaction(state, action: PayloadAction<{ opinionId: string; reactionType: OpinionReactionType; likesCount: number; dislikesCount: number }>) {
			if (state.opinions.data?.items) {
				const opinion = state.opinions.data.items.find((o) => o.id === action.payload.opinionId);
				if (opinion) {
					opinion.reactionType = action.payload.reactionType;
					opinion.likesCount = action.payload.likesCount;
					opinion.dislikesCount = action.payload.dislikesCount;
				}
			}
		},
		createOpinionStart(state) {
			state.createOpinion.isLoading = true;
			state.createOpinion.error = undefined;
		},
		createOpinionSuccess(state, action: PayloadAction<CreateOpinionResult>) {
			state.createOpinion.isLoading = false;
			state.createOpinion.data = action.payload;
		},
		createOpinionError(state, action: PayloadAction<IError>) {
			state.createOpinion.isLoading = false;
			state.createOpinion.error = action.payload;
		},
		clearCreateOpinionState(state) {
			state.createOpinion.data = undefined;
			state.createOpinion.error = undefined;
			state.createOpinion.isLoading = false;
		},
		getSimilarProductsStart(state) {
			state.similarProducts.isLoading = true;
			state.similarProducts.error = undefined;
		},
		getSimilarProductsSuccess(state, action: PayloadAction<GetSimilarProductsResult>) {
			state.similarProducts.isLoading = false;
			state.similarProducts.data = action.payload;
		},
		getSimilarProductsError(state, action: PayloadAction<IError>) {
			state.similarProducts.isLoading = false;
			state.similarProducts.error = action.payload;
		},
		clearSimilarProductsState(state) {
			state.similarProducts.data = undefined;
			state.similarProducts.error = undefined;
			state.similarProducts.isLoading = false;
		},
	},
});

export const {
	clearProductState,
	fetchProductError,
	fetchProductStart,
	fetchProductSuccess,
	getOpinionsError,
	getOpinionsStart,
	getOpinionsSuccess,
	clearOpinionsState,
	getOpinionsStatsError,
	getOpinionsStatsStart,
	getOpinionsStatsSuccess,
	clearOpinionsStatsState,
	createOpinionReactionError,
	createOpinionReactionStart,
	createOpinionReactionSuccess,
	clearOpinionReactionState,
	updateOpinionReaction,
	createOpinionError,
	createOpinionStart,
	createOpinionSuccess,
	clearCreateOpinionState,
	getSimilarProductsError,
	getSimilarProductsStart,
	getSimilarProductsSuccess,
	clearSimilarProductsState,
} = ProductPageStore.actions;

export default ProductPageStore.reducer;
