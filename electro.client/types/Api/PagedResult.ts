export interface IPagedResult<TResult> extends IPaginationResult {
	data: TResult[];
}

export interface IPaginationParams {
	pageNumber: number;
	pageSize: number;
}

export interface IPaginationResult {
	pageNumber: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
}
