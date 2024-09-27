import type { IPaginationResult } from "../Api/PagedResult";

export interface IOpinion {
	id: string;
	productId: string;
	review: string;
	authorDisplayName: string;
	likes: number;
	dislikes: number;
	rating: number;
	createdAt: string;
	updatedAt: string;
}

export enum UserOpinionAction {
	"Like" = "Like",
	"Dislike" = "Dislike",
}

export interface IOpinionWithUserAction extends IOpinion {
	userAction?: string;
}

export interface IOpinionsRatingCount {
	rating: number;
	count: number;
}

export interface IOpinionsResult extends IPaginationResult {
	data: IOpinionWithUserAction[];
}

export interface IProductOpinionsResult {
	stats: IOpinionsRatingCount[];
	opinions: IOpinionsResult;
}

export interface ICreateOpinion {
	review: string,
	authorDisplayName: string,
	rating: number;
	productId: string;
}
