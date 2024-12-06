import { IError } from "@/libs/api-contract/Error";
import { GetProductCatalogResult } from "@/libs/api-contract/api-contract";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProductCatalogListState {
	data?: GetProductCatalogResult;
	error?: IError;
	isLoading: boolean;
}

const initialState: IProductCatalogListState = {
	data: undefined,
	error: undefined,
	isLoading: false,
};

const AdminProductCatalogListSlice = createSlice({
	name: "AdminProductCatalogListSlice",
	initialState,
	reducers: {
		fetchProductCatalogListStart(state) {
			state.isLoading = true;
			state.error = undefined;
		},
		fetchProductCatalogListSuccess(state, action: PayloadAction<GetProductCatalogResult>) {
			state.isLoading = false;
			state.data = action.payload;
		},
		fetchProductCatalogListError(state, action: PayloadAction<IError>) {
			state.isLoading = false;
			state.error = action.payload;
		},
		clearProductCatalogListState(state) {
			state.data = undefined;
			state.isLoading = false;
			state.error = undefined;
		},
	},
});

export const { clearProductCatalogListState, fetchProductCatalogListError, fetchProductCatalogListStart, fetchProductCatalogListSuccess } = AdminProductCatalogListSlice.actions;

export default AdminProductCatalogListSlice.reducer;
