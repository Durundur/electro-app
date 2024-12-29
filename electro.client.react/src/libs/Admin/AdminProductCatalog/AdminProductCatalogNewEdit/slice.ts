import { IError } from "@/libs/api-contract/Error";
import { GetAllProductHierarchyResult, GetAttributesDefinitionsResult, GetProductResult } from "@/libs/api-contract/api-contract";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProductCatalogNewEditState {
	product: IProductCatalogProductState;
	productHierarchy: IProductCatalogProductHierarchyState;
	attributesDefinitions: IProductCatalogAttributesDefinitionsState;
	saveAction: IProductCatalogsaveActionState;
}

interface IProductCatalogsaveActionState {
	error?: IError;
	isLoading: boolean;
}

interface IProductCatalogProductState {
	data?: GetProductResult;
	error?: IError;
	isLoading: boolean;
}

interface IProductCatalogProductHierarchyState {
	data?: GetAllProductHierarchyResult;
	error?: IError;
	isLoading: boolean;
}

interface IProductCatalogAttributesDefinitionsState {
	data?: GetAttributesDefinitionsResult;
	error?: IError;
	isLoading: boolean;
}

const initialState: IProductCatalogNewEditState = {
	product: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	productHierarchy: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	attributesDefinitions: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	saveAction: {
		error: undefined,
		isLoading: false,
	},
};

const AdminProductCatalogNewEditPageStore = createSlice({
	name: "AdminProductCatalogNewEditPageSlice",
	initialState,
	reducers: {
		fetchProductStart(state) {
			state.product.isLoading = true;
			state.product.error = undefined;
		},
		fetchProductSuccess(state, action: PayloadAction<GetProductResult>) {
			state.product.isLoading = false;
			state.product.data = action.payload;
		},
		fetchProductError(state, action: PayloadAction<IError>) {
			state.product.isLoading = false;
			state.product.error = action.payload;
		},
		clearProductState(state) {
			state.product.data = undefined;
			state.product.error = undefined;
			state.product.isLoading = false;
		},
		fetchProductHierarchyStart(state) {
			state.productHierarchy.isLoading = true;
			state.productHierarchy.error = undefined;
		},
		fetchProductHierarchySuccess(state, action: PayloadAction<GetAllProductHierarchyResult>) {
			state.productHierarchy.isLoading = false;
			state.productHierarchy.data = action.payload;
		},
		fetchProductHierarchyError(state, action: PayloadAction<IError>) {
			state.productHierarchy.isLoading = false;
			state.productHierarchy.error = action.payload;
		},
		clearProductHierarchyState(state) {
			state.productHierarchy.data = undefined;
			state.productHierarchy.error = undefined;
			state.productHierarchy.isLoading = false;
		},
		fetchAttributesDefinitionsStart(state) {
			state.attributesDefinitions.isLoading = true;
			state.attributesDefinitions.error = undefined;
		},
		fetchAttributesDefinitionsSuccess(state, action: PayloadAction<GetAttributesDefinitionsResult>) {
			state.attributesDefinitions.isLoading = false;
			state.attributesDefinitions.data = action.payload;
		},
		fetchAttributesDefinitionsError(state, action: PayloadAction<IError>) {
			state.attributesDefinitions.isLoading = false;
			state.attributesDefinitions.error = action.payload;
		},
		clearAttributesDefinitionsState(state) {
			state.attributesDefinitions.data = undefined;
			state.attributesDefinitions.error = undefined;
			state.attributesDefinitions.isLoading = false;
		},
		saveActionStart(state) {
			state.saveAction.isLoading = true;
			state.saveAction.error = undefined;
		},
		saveActionSuccess(state) {
			state.saveAction.isLoading = true;
			state.saveAction.error = undefined;
		},
		saveActionError(state, action: PayloadAction<IError>) {
			state.saveAction.isLoading = false;
			state.saveAction.error = action.payload;
		},
	},
});

export const {
	clearProductHierarchyState,
	clearProductState,
	fetchProductError,
	fetchProductHierarchyError,
	fetchProductHierarchyStart,
	fetchProductHierarchySuccess,
	fetchProductStart,
	fetchProductSuccess,
	clearAttributesDefinitionsState,
	fetchAttributesDefinitionsError,
	fetchAttributesDefinitionsStart,
	fetchAttributesDefinitionsSuccess,
	saveActionError,
	saveActionStart,
	saveActionSuccess,
} = AdminProductCatalogNewEditPageStore.actions;

export default AdminProductCatalogNewEditPageStore.reducer;
