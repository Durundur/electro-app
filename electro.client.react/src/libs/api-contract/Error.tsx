export interface IError {
	message: string;
	statusCode: number;
}

const createErorr = (response: any): IError => {
	return {
		message: response?.data?.error?.message ?? response?.error?.message ?? "",
		statusCode: response?.data?.error?.status ?? response?.error?.status ?? 500,
	};
};
