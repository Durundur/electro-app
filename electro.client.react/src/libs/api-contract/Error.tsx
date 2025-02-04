export interface IError {
	message: string;
	statusCode: number;
}

export const createError = (response: any): IError => {
	return {
		message: response?.response?.data?.message ?? response?.response?.data?.error?.message ?? response?.response?.statusText ?? response?.message ?? "Error",
		statusCode: response?.status ?? response?.data?.error?.status ?? response?.error?.status ?? 500,
	};
};
