export interface IPagedResult<TResult> extends IPaginationResult {
	data: TResult[];
}

export interface IPaginationQuery {
	pageNumber: number;
	pageSize: number;
}

export interface IPaginationResult {
	pageNumber: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
}

export class PaginationQuery implements IPaginationQuery {
	pageNumber: number;
	pageSize: number;

	constructor(pageNumber: number = 1, pageSize: number = 10) {
		this.pageNumber = Math.min(Math.max(pageNumber, 1), 100);
		this.pageSize = Math.min(Math.max(pageSize, 1), 100);
	}

	public toQueryParamsString(): string {
		return `pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
	}

	public fromQueryParamsString(queryString: string): IPaginationQuery {
		const params = new URLSearchParams(queryString);
		return {
			pageNumber: Number(params.get("pageNumber")) || 1,
			pageSize: Number(params.get("pageSize")) || 10,
		};
	}
}
