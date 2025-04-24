import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMenuResult } from "../api-contract/rest-api-contract";
import { IError } from "../api-contract/Error";
import { Breadcrumb } from "@/hooks/Breadcrumbs/useBreadcrumbs";

interface LayoutStore {
	productHierarchy: ProductHierarchyState;
	breadcrumbs: BreadcrumbsState;
}

interface ProductHierarchyState {
	data: GetMenuResult;
	error?: IError;
	isLoading: boolean;
}

interface BreadcrumbsState {
	items: Breadcrumb[];
}

const initialState: LayoutStore = {
	breadcrumbs: {
		items: [],
	},
	productHierarchy: {
		data: {
			groups: [],
		},
		error: undefined,
		isLoading: false,
	},
};

const LayoutStore = createSlice({
	name: "LayoutSlice",
	initialState,
	reducers: {
		fetchProductHierarchyStart(state) {
			state.productHierarchy.isLoading = true;
			state.productHierarchy.error = undefined;
		},
		fetchProductHierarchySuccess(state, action: PayloadAction<GetMenuResult>) {
			state.productHierarchy.isLoading = false;
			state.productHierarchy.data.groups = action.payload.groups;
		},
		fetchProductHierarchyError(state, action: PayloadAction<IError>) {
			state.productHierarchy.isLoading = false;
			state.productHierarchy.error = action.payload;
		},
		setBreadcrumbsItems(state, action: PayloadAction<Breadcrumb[]>) {
			state.breadcrumbs.items = action.payload;
		},
		clearBreadcrumbsItems(state) {
			state.breadcrumbs.items = [];
		},
	},
});

export const { fetchProductHierarchyStart, fetchProductHierarchyError, fetchProductHierarchySuccess, clearBreadcrumbsItems, setBreadcrumbsItems } = LayoutStore.actions;

export default LayoutStore.reducer;
