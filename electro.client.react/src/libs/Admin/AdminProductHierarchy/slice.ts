import { IError } from "@/libs/api-contract/Error";
import {
	AttributeDefinitionCommand,
	CreateOrUpdateCategoryResult,
	CreateOrUpdateGroupResult,
	CreateOrUpdateSubCategoryResult,
	GetAllProductHierarchyResult,
	GetCategoryResult,
	GetGroupResult,
	GetSubCategoryResult,
} from "@/libs/api-contract/api-contract";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductHierarchyState {
	hierarchy: IHierarchyState;
	selectedItem: ISelectedItemState;
	group: IGroupState;
	category: ICategoryState;
	subCategory: ISubCategoryState;
}

interface IHierarchyState {
	data?: GetAllProductHierarchyResult;
	error?: IError;
	isLoading: boolean;
}

interface ISelectedItemState {
	type?: string;
	id?: string;
	parentId?: number;
}

interface IGroupState {
	data?: GetGroupResult;
	error?: IError;
	isLoading: boolean;
}

interface ICategoryState {
	data?: GetCategoryResult;
	error?: IError;
	isLoading: boolean;
}

interface ISubCategoryState {
	data?: GetSubCategoryResult;
	error?: IError;
	isLoading: boolean;
}

const initialState: IProductHierarchyState = {
	hierarchy: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	selectedItem: {
		id: undefined,
		type: undefined,
		parentId: undefined,
	},
	group: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	category: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	subCategory: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
};

const AdminProductHierarchySlice = createSlice({
	name: "AdminProductHierarchySlice",
	initialState,
	reducers: {
		fetchHierarchyStart(state) {
			state.hierarchy.isLoading = true;
			state.hierarchy.error = undefined;
		},
		fetchHierarchySuccess(state, action: PayloadAction<GetAllProductHierarchyResult>) {
			state.hierarchy.isLoading = false;
			state.hierarchy.data = action.payload;
		},
		fetchHierarchyError(state, action: PayloadAction<IError>) {
			state.hierarchy.isLoading = false;
			state.hierarchy.error = action.payload;
		},
		clearHierarchyState(state) {
			state.hierarchy.data = undefined;
			state.hierarchy.isLoading = false;
			state.hierarchy.error = undefined;
		},
		setSelectedItem(state, action: PayloadAction<ISelectedItemState>) {
			state.selectedItem.id = action.payload.id;
			state.selectedItem.type = action.payload.type;
			state.selectedItem.parentId = action.payload.parentId;
		},
		clearSelectedItemState(state) {
			state.selectedItem.id = undefined;
			state.selectedItem.type = undefined;
		},
		fetchGroupStart(state) {
			state.group.isLoading = true;
		},
		fetchGroupSuccess(state, action: PayloadAction<GetGroupResult>) {
			state.group.isLoading = false;
			state.group.data = action.payload;
		},
		fetchGroupError(state, action: PayloadAction<IError>) {
			state.group.isLoading = false;
			state.group.error = action.payload;
		},
		clearGroup(state) {
			state.group.data = undefined;
			state.group.error = undefined;
			state.group.isLoading = false;
		},
		fetchCategoryStart(state) {
			state.category.isLoading = true;
		},
		fetchCategorySuccess(state, action: PayloadAction<GetCategoryResult>) {
			state.category.isLoading = false;
			state.category.data = action.payload;
		},
		fetchCategoryError(state, action: PayloadAction<IError>) {
			state.category.isLoading = false;
			state.category.error = action.payload;
		},
		clearCategory(state) {
			state.category.data = undefined;
			state.category.error = undefined;
			state.category.isLoading = false;
		},
		fetchSubCategoryStart(state) {
			state.subCategory.isLoading = true;
		},
		fetchSubCategorySuccess(state, action: PayloadAction<GetSubCategoryResult>) {
			state.subCategory.isLoading = false;
			state.subCategory.data = action.payload;
		},
		fetchSubCategoryError(state, action: PayloadAction<IError>) {
			state.subCategory.isLoading = false;
			state.subCategory.error = action.payload;
		},
		clearSubCategory(state) {
			state.subCategory.data = undefined;
			state.subCategory.error = undefined;
			state.subCategory.isLoading = false;
		},
		createOrUpdateGroupStart(state) {
			state.group.isLoading = true;
			state.group.error = undefined;
		},
		createOrUpdateGroupSuccess(state, action: PayloadAction<CreateOrUpdateGroupResult>) {
			state.group.isLoading = false;
			state.group.data = action.payload;
		},
		createOrUpdateGroupError(state, action: PayloadAction<IError>) {
			state.group.isLoading = false;
			state.group.error = action.payload;
		},
		deleteGroupStart(state) {
			state.group.isLoading = true;
			state.group.error = undefined;
		},
		deleteGroupSuccess(state) {
			state.group.data = undefined;
			state.group.error = undefined;
			state.group.isLoading = false;
			state.selectedItem.id = undefined;
			state.selectedItem.type = undefined;
		},
		deleteGroupError(state, action: PayloadAction<IError>) {
			state.group.isLoading = false;
			state.group.error = action.payload;
		},
		deleteCategoryStart(state) {
			state.category.isLoading = true;
			state.category.error = undefined;
		},
		deleteCategorySuccess(state) {
			state.category.data = undefined;
			state.category.error = undefined;
			state.category.isLoading = false;
			state.selectedItem.id = undefined;
			state.selectedItem.type = undefined;
		},
		deleteCategoryError(state, action: PayloadAction<IError>) {
			state.category.isLoading = false;
			state.category.error = action.payload;
		},
		deleteSubCategoryStart(state) {
			state.subCategory.isLoading = true;
			state.subCategory.error = undefined;
		},
		deleteSubCategorySuccess(state) {
			state.subCategory.data = undefined;
			state.subCategory.error = undefined;
			state.subCategory.isLoading = false;
			state.selectedItem.id = undefined;
			state.selectedItem.type = undefined;
		},
		deleteSubCategoryError(state, action: PayloadAction<IError>) {
			state.subCategory.isLoading = false;
			state.subCategory.error = action.payload;
		},
		updateGroupAttribute(state, action: PayloadAction<AttributeDefinitionCommand>) {
			const updatedAttribute = action.payload;
			const attributes = state.group.data?.attributes;

			if (!attributes) return;

			const index = attributes.findIndex((a) => a.id === updatedAttribute.id);

			if (index !== -1) {
				attributes[index] = {
					...attributes[index],
					...updatedAttribute,
				};
			}
		},
		addGroupAttribute(state, action: PayloadAction<AttributeDefinitionCommand>) {
			const newAttribute = action.payload;
			state.group.data?.attributes?.push(newAttribute);
		},
		deleteGroupAttribute(state, action: PayloadAction<string>) {
			const attributeIdToDelete = action.payload;

			if (state.group.data && state.group.data.attributes) {
				state.group.data.attributes = state.group.data.attributes.filter((attribute) => attribute.id !== attributeIdToDelete);
			}
		},
		createOrUpdateCategoryStart(state) {
			state.category.isLoading = true;
			state.category.error = undefined;
		},
		createOrUpdateCategorySuccess(state, action: PayloadAction<CreateOrUpdateCategoryResult>) {
			state.category.isLoading = false;
			state.category.data = action.payload;
		},
		createOrUpdateCategoryError(state, action: PayloadAction<IError>) {
			state.category.isLoading = false;
			state.category.error = action.payload;
		},
		updateCategoryAttribute(state, action: PayloadAction<AttributeDefinitionCommand>) {
			const updatedAttribute = action.payload;
			const attributes = state.category.data?.attributes;

			if (!attributes) return;

			const index = attributes.findIndex((a) => a.id === updatedAttribute.id);

			if (index !== -1) {
				attributes[index] = {
					...attributes[index],
					...updatedAttribute,
				};
			}
		},
		addCategoryAttribute(state, action: PayloadAction<AttributeDefinitionCommand>) {
			const newAttribute = action.payload;
			state.category.data?.attributes?.push(newAttribute);
		},
		deleteCategoryAttribute(state, action: PayloadAction<string>) {
			const attributeIdToDelete = action.payload;

			if (state.category.data && state.category.data.attributes) {
				state.category.data.attributes = state.category.data.attributes.filter((attribute) => attribute.id !== attributeIdToDelete);
			}
		},
		createOrUpdateSubCategoryStart(state) {
			state.subCategory.isLoading = true;
			state.subCategory.error = undefined;
		},
		createOrUpdateSubCategorySuccess(state, action: PayloadAction<CreateOrUpdateSubCategoryResult>) {
			state.subCategory.isLoading = false;
			state.subCategory.data = action.payload;
		},
		createOrUpdateSubCategoryError(state, action: PayloadAction<IError>) {
			state.subCategory.isLoading = false;
			state.subCategory.error = action.payload;
		},
		updateSubCategoryAttribute(state, action: PayloadAction<AttributeDefinitionCommand>) {
			const updatedAttribute = action.payload;
			const attributes = state.subCategory.data?.attributes;

			if (!attributes) return;

			const index = attributes.findIndex((a) => a.id === updatedAttribute.id);

			if (index !== -1) {
				attributes[index] = {
					...attributes[index],
					...updatedAttribute,
				};
			}
		},
		addSubCategoryAttribute(state, action: PayloadAction<AttributeDefinitionCommand>) {
			const newAttribute = action.payload;
			state.subCategory.data?.attributes?.push(newAttribute);
		},
		deleteSubCategoryAttribute(state, action: PayloadAction<string>) {
			const attributeIdToDelete = action.payload;

			if (state.subCategory.data && state.subCategory.data.attributes) {
				state.subCategory.data.attributes = state.subCategory.data.attributes.filter((attribute) => attribute.id !== attributeIdToDelete);
			}
		},
	},
});

export const {
	fetchHierarchyError,
	fetchHierarchyStart,
	fetchHierarchySuccess,
	clearHierarchyState,
	clearSelectedItemState,
	setSelectedItem,
	clearGroup,
	fetchGroupError,
	fetchGroupStart,
	fetchGroupSuccess,
	clearCategory,
	clearSubCategory,
	fetchCategoryError,
	fetchCategoryStart,
	fetchCategorySuccess,
	fetchSubCategoryError,
	fetchSubCategoryStart,
	fetchSubCategorySuccess,
	createOrUpdateGroupError,
	createOrUpdateGroupStart,
	createOrUpdateGroupSuccess,
	deleteGroupError,
	deleteGroupStart,
	deleteGroupSuccess,
	addGroupAttribute,
	updateGroupAttribute,
	deleteGroupAttribute,
	addCategoryAttribute,
	addSubCategoryAttribute,
	deleteCategoryAttribute,
	deleteSubCategoryAttribute,
	updateCategoryAttribute,
	updateSubCategoryAttribute,
	createOrUpdateCategoryError,
	createOrUpdateCategoryStart,
	createOrUpdateCategorySuccess,
	createOrUpdateSubCategoryError,
	createOrUpdateSubCategoryStart,
	createOrUpdateSubCategorySuccess,
	deleteCategoryError,
	deleteCategoryStart,
	deleteCategorySuccess,
	deleteSubCategoryError,
	deleteSubCategoryStart,
	deleteSubCategorySuccess,
} = AdminProductHierarchySlice.actions;

export default AdminProductHierarchySlice.reducer;
