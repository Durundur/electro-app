import { AppDispatch } from "@/libs/Store";
import {
	createOpinionError,
	createOpinionReactionError,
	createOpinionReactionStart,
	createOpinionReactionSuccess,
	createOpinionStart,
	createOpinionSuccess,
	fetchProductError,
	fetchProductStart,
	fetchProductSuccess,
	getOpinionsError,
	getOpinionsStart,
	getOpinionsStatsError,
	getOpinionsStatsStart,
	getOpinionsStatsSuccess,
	getOpinionsSuccess,
	getSimilarProductsError,
	getSimilarProductsStart,
	getSimilarProductsSuccess,
	updateOpinionReaction,
} from "./slice";
import { CreateOpinionCommand, CreateOpinionReactionResult, CreateOpinionResult, GetProductOpinionsResult, GetProductOpinionsStatsResult, GetProductResult, GetSimilarProductsResult, OpinionReactionType } from "@/libs/api-contract/api-contract";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "../api-contract/ApiClient";
import { buildQueryString } from "../Helpers/QueryHelper";
import { IGetOpinionsQueryParams } from "./interfaces";

export const fetchProduct = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchProductStart());
		const response = await ApiClient.get<GetProductResult>(`/api/products/${productId}`);
		dispatch(fetchProductSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchProductError(createError(error)));
	}
};

export const getOpinions = (productId: string, queryParams: IGetOpinionsQueryParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getOpinionsStart());
		const response = await ApiClient.get<GetProductOpinionsResult>(`/api/opinions/products/${productId}?${buildQueryString(queryParams)}`);
		dispatch(getOpinionsSuccess(response.data));
	} catch (error: any) {
		dispatch(getOpinionsError(createError(error)));
	}
};

export const getOpinionsStats = (productId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getOpinionsStatsStart());
		const response = await ApiClient.get<GetProductOpinionsStatsResult>(`/api/opinions/products/${productId}/stats`);
		dispatch(getOpinionsStatsSuccess(response.data));
	} catch (error: any) {
		dispatch(getOpinionsStatsError(createError(error)));
	}
};

export const createOpinionReaction = (opinionId: string, reaction: OpinionReactionType) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOpinionReactionStart());
		const response = await ApiClient.post<CreateOpinionReactionResult>(`/api/opinions/${opinionId}/reactions/${reaction}`);
		dispatch(createOpinionReactionSuccess());
		dispatch(
			updateOpinionReaction({
				opinionId,
				reactionType: response.data.reactionType!,
				likesCount: response.data.likesCount!,
				dislikesCount: response.data.dislikesCount!,
			})
		);
	} catch (error: any) {
		dispatch(createOpinionReactionError(createError(error)));
	}
};

export const createOpinion = (command: CreateOpinionCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOpinionStart());
		const response = await ApiClient.post<CreateOpinionResult>(`/api/opinions`, command);
		dispatch(createOpinionSuccess(response.data));
	} catch (error: any) {
		dispatch(createOpinionError(createError(error)));
	}
};

export const getSimilarProducts = (productId: string, limit?: number) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getSimilarProductsStart());
		const response = await ApiClient.get<GetSimilarProductsResult>(`/api/products/${productId}/similar?limit=${limit ?? 8}`);
		dispatch(getSimilarProductsSuccess(response.data));
	} catch (error: any) {
		dispatch(getSimilarProductsError(createError(error)));
	}
};
