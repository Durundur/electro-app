import { IError } from "@/libs/api-contract/Error";
import { GetOrderDetailsResult, GetOrdersResult, UpdateOrderResult } from "@/libs/api-contract/rest-api-contract";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAdminOrdersState {
	list: IAdminOrdersListState;
	details: IAdminOrderDetailsState;
	edit: IAdminOrderEditState;
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

interface IAdminOrderEditState {
	data?: GetOrderDetailsResult;
	isLoading: boolean;
	error?: IError;
	result?: UpdateOrderResult;
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
	edit: {
		data: undefined,
		error: undefined,
		isLoading: false,
		result: undefined,
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
		adminOrderEditStart(state) {
			state.edit.isLoading = true;
			state.edit.error = undefined;
		},
		getAdminOrderEditSuccess(state, action: PayloadAction<GetOrderDetailsResult>) {
			state.edit.isLoading = false;
			state.edit.data = action.payload;
		},
		putAdminOrderEditSuccess(state, action: PayloadAction<UpdateOrderResult>) {
			state.edit.isLoading = false;
			state.edit.result = action.payload;
		},
		adminOrderEditError(state, action: PayloadAction<IError>) {
			state.edit.isLoading = false;
			state.edit.error = action.payload;
		},
		clearAdminOrderEditState(state) {
			state.edit = initialState.edit;
		},
		clearAdminOrderDetailsState(state) {
			state.details = initialState.details;
		},
		clearAdminOrdersListState(state) {
			state.list = initialState.list;
		},
	},
});

export const {
	fetchAdminOrderDetailsError,
	fetchAdminOrderDetailsStart,
	fetchAdminOrderDetailsSuccess,
	fetchAdminOrdersListError,
	fetchAdminOrdersListStart,
	fetchAdminOrdersListSuccess,
	adminOrderEditError,
	adminOrderEditStart,
	getAdminOrderEditSuccess,
	putAdminOrderEditSuccess,
	clearAdminOrderEditState,
	clearAdminOrderDetailsState,
	clearAdminOrdersListState,
} = AdminOrdersStore.actions;

export default AdminOrdersStore.reducer;
