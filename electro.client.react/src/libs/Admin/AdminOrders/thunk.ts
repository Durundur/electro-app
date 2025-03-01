import { AppDispatch } from "@/libs/Store";
import {
	adminOrderEditError,
	adminOrderEditStart,
	fetchAdminOrderDetailsError,
	fetchAdminOrderDetailsStart,
	fetchAdminOrderDetailsSuccess,
	fetchAdminOrdersListError,
	fetchAdminOrdersListStart,
	fetchAdminOrdersListSuccess,
	getAdminOrderEditSuccess,
	putAdminOrderEditSuccess,
} from "./slice";
import { createError } from "@/libs/api-contract/Error";
import { GetOrderDetailsResult, GetOrdersResult, UpdateOrderCommand, UpdateOrderResult } from "@/libs/api-contract/api-contract";
import { GetAdminOrdersListQuery } from "./interfaces";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";
import ApiClient from "@/libs/api-contract/ApiClient";

export const fetchAdminOrdersList = (query: GetAdminOrdersListQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAdminOrdersListStart());
		const response = await ApiClient.get<GetOrdersResult>(`/api/orders?${buildQueryString(query)}`);
		dispatch(fetchAdminOrdersListSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAdminOrdersListError(createError(error)));
	}
};

export const fetchAdminOrderDetails = (orderId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAdminOrderDetailsStart());
		const response = await ApiClient.get<GetOrderDetailsResult>(`/api/orders/${orderId}`);
		dispatch(fetchAdminOrderDetailsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAdminOrderDetailsError(createError(error)));
	}
};

export const getAdminOrderEdit = (orderId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(adminOrderEditStart());
		const response = await ApiClient.get<GetOrderDetailsResult>(`/api/orders/${orderId}`);
		dispatch(getAdminOrderEditSuccess(response.data));
	} catch (error: any) {
		dispatch(adminOrderEditError(createError(error)));
	}
};

export const putAdminOrderEdit = (command: UpdateOrderCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(adminOrderEditStart());
		const response = await ApiClient.put<UpdateOrderResult>(`/api/orders`, command);
		dispatch(putAdminOrderEditSuccess(response.data));
	} catch (error: any) {
		dispatch(adminOrderEditError(createError(error)));
	}
};
