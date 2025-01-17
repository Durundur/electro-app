import { AppDispatch } from "@/libs/Store";
import { fetchAdminOrderDetailsError, fetchAdminOrderDetailsStart, fetchAdminOrderDetailsSuccess, fetchAdminOrdersListError, fetchAdminOrdersListStart, fetchAdminOrdersListSuccess } from "./slice";
import axios from "axios";
import { IError } from "@/libs/api-contract/Error";
import { GetOrderDetailsResult, GetOrdersResult } from "@/libs/api-contract/api-contract";
import { GetAdminOrdersListQuery } from "./interfaces";
import { buildQueryString } from "@/libs/Helpers/QueryHelper";

export const fetchAdminOrdersList = (query: GetAdminOrdersListQuery) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAdminOrdersListStart());
		const response = await axios.get<GetOrdersResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?${buildQueryString(query)}`);
		dispatch(fetchAdminOrdersListSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAdminOrdersListError(error as IError));
	}
};

export const fetchAdminOrderDetails = (orderId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchAdminOrderDetailsStart());
		const response = await axios.get<GetOrderDetailsResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`);
		dispatch(fetchAdminOrderDetailsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAdminOrderDetailsError(error as IError));
	}
};
