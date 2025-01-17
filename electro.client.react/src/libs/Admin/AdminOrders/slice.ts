import { IError } from "@/libs/api-contract/Error";
import { GetOrderDetailsResult, GetOrdersResult } from "@/libs/api-contract/api-contract";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAdminOrdersState {
	list: IAdminOrdersListState;
	details: IAdminOrderDetailsState;
}

interface IAdminOrdersListState {
	data?: GetOrdersResult;
	isLoading: boolean;
	error?: IError;
}

interface IAdminOrderDetailsState {
	data?: GetOrderDetailsResult;
	isLoading: boolean;
	error?: IError;
}

const initialState: IAdminOrdersState = {
	list: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	details: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
};

const AdminOrdersStore = createSlice({
	name: "AdminOrdersSlice",
	initialState,
	reducers: {
		fetchAdminOrdersListStart(state) {
			state.list.isLoading = true;
			state.list.error = undefined;
		},
		fetchAdminOrdersListSuccess(state, action: PayloadAction<GetOrdersResult>) {
			state.list.isLoading = false;
			state.list.data = action.payload;
		},
		fetchAdminOrdersListError(state, action: PayloadAction<IError>) {
			state.list.isLoading = false;
			state.list.error = action.payload;
		},
		fetchAdminOrderDetailsStart(state) {
			state.details.isLoading = true;
			state.details.error = undefined;
		},
		fetchAdminOrderDetailsSuccess(state, action: PayloadAction<GetOrderDetailsResult>) {
			state.details.isLoading = false;
			state.details.data = action.payload;
		},
		fetchAdminOrderDetailsError(state, action: PayloadAction<IError>) {
			state.details.isLoading = false;
			state.details.error = action.payload;
		},
	},
});

export const { fetchAdminOrderDetailsError, fetchAdminOrderDetailsStart, fetchAdminOrderDetailsSuccess, fetchAdminOrdersListError, fetchAdminOrdersListStart, fetchAdminOrdersListSuccess } =
	AdminOrdersStore.actions;

export default AdminOrdersStore.reducer;
