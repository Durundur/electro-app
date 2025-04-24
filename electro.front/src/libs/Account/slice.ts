import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../api-contract/Error";
import { GetUserOrderDetailsResult, GetUserOrdersResult } from "../api-contract/rest-api-contract";

interface AccountStore {
	list: AccountOrderListState;
	details: AccountOrderDetailsState;
}

interface AccountOrderListState {
	data?: GetUserOrdersResult;
	isLoading: boolean;
	error?: IError;
}

interface AccountOrderDetailsState {
	data?: GetUserOrderDetailsResult;
	isLoading: boolean;
	error?: IError;
}

const initialState: AccountStore = {
	list: {
		data: undefined,
		isLoading: false,
		error: undefined,
	},
	details: {
		data: undefined,
		isLoading: false,
		error: undefined,
	},
};

const AccountStore = createSlice({
	name: "AccountStore",
	initialState,
	reducers: {
		getAccountOrdersStart(state) {
			state.list.isLoading = true;
			state.list.error = undefined;
		},
		getAccountOrdersSuccess(state, action: PayloadAction<GetUserOrdersResult>) {
			state.list.isLoading = false;
			state.list.data = action.payload;
		},
		getAccountOrdersError(state, action: PayloadAction<IError>) {
			state.list.isLoading = false;
			state.list.error = action.payload;
		},
		clearAccountOrders(state) {
			state.list = initialState.list;
		},
		getAccountOrderDetailsStart(state) {
			state.details.isLoading = true;
			state.details.error = undefined;
		},
		getAccountOrderDetailsSuccess(state, action: PayloadAction<GetUserOrderDetailsResult>) {
			state.details.isLoading = false;
			state.details.data = action.payload;
		},
		getAccountOrderDetailsError(state, action: PayloadAction<IError>) {
			state.details.isLoading = false;
			state.details.error = action.payload;
		},
		clearAccountOrderDetails(state) {
			state.details = initialState.details;
		},
	},
});

export const {
	clearAccountOrderDetails,
	clearAccountOrders,
	getAccountOrderDetailsError,
	getAccountOrderDetailsStart,
	getAccountOrderDetailsSuccess,
	getAccountOrdersError,
	getAccountOrdersStart,
	getAccountOrdersSuccess,
} = AccountStore.actions;

export default AccountStore.reducer;
