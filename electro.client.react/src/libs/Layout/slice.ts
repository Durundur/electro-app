import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMenuResult } from "../api-contract/api-contract";

export interface ProductHierarchyState {
	data: GetMenuResult;
	error?: Error;
	isLoading: boolean;
}

const initialState: ProductHierarchyState = {
	data: {
		groups: [],
	},
	error: undefined,
	isLoading: false,
};

const LayoutStore = createSlice({
	name: "LayoutSlice",
	initialState,
	reducers: {
		fetchProductHierarchyStart(state) {
			state.isLoading = true;
			state.error = undefined;
		},
		fetchProductHierarchySuccess(state, action: PayloadAction<GetMenuResult>) {
			state.isLoading = false;
			state.data.groups = action.payload.groups;
		},
		fetchProductHierarchyError(state, action: PayloadAction<Error>) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchProductHierarchyStart, fetchProductHierarchyError, fetchProductHierarchySuccess } = LayoutStore.actions;

export default LayoutStore.reducer;
