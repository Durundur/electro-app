import { buildQueryString } from "../Helpers/QueryHelper";
import { AppDispatch } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { IError, createError } from "../api-contract/Error";
import { GetUserOrderDetailsResult, GetUserOrdersResult } from "../api-contract/rest-api-contract";
import { getAccountOrderDetailsError, getAccountOrderDetailsStart, getAccountOrderDetailsSuccess, getAccountOrdersError, getAccountOrdersStart, getAccountOrdersSuccess } from "./slice";

export interface IGetAccountOrdersQueryParams {
	userId: string;
	page: number;
	pageSize: number;
}

export const getAccountOrders = (queryParams: IGetAccountOrdersQueryParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getAccountOrdersStart());
		const response = await ApiClient.get<GetUserOrdersResult>(`/api/users/${queryParams.userId}/orders?${buildQueryString({ page: queryParams.page, pageSize: queryParams.pageSize })}`);
		dispatch(getAccountOrdersSuccess(response.data));
	} catch (error) {
		dispatch(getAccountOrdersError(createError(error as IError)));
	}
};

export interface IGetAccountOrderDetailsQueryParams {
	userId: string;
	orderId: string;
}

export const getAccountOrderDetails = (queryParams: IGetAccountOrderDetailsQueryParams) => async (dispatch: AppDispatch) => {
	try {
		dispatch(getAccountOrderDetailsStart());
		const response = await ApiClient.get<GetUserOrderDetailsResult>(`/api/users/${queryParams.userId}/orders/${queryParams.orderId}`);
		dispatch(getAccountOrderDetailsSuccess(response.data));
	} catch (error) {
		dispatch(getAccountOrderDetailsError(createError(error as IError)));
	}
};
