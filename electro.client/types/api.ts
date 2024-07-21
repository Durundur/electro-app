export interface ApiResponse<T> {
	ok: Boolean;
	status: number;
	data: T;
}
