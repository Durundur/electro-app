import { AppDispatch } from "@/libs/Store";
import {
	CreateOrUpdateCategoryCommand,
	CreateOrUpdateGroupCommand,
	CreateOrUpdateGroupResult,
	CreateOrUpdateSubCategoryCommand,
	GetAllProductHierarchyResult,
	GetCategoryResult,
	GetGroupResult,
} from "@/libs/api-contract/api-contract";
import {
	createOrUpdateCategoryError,
	createOrUpdateCategoryStart,
	createOrUpdateCategorySuccess,
	createOrUpdateGroupError,
	createOrUpdateGroupStart,
	createOrUpdateGroupSuccess,
	createOrUpdateSubCategoryError,
	createOrUpdateSubCategoryStart,
	createOrUpdateSubCategorySuccess,
	deleteCategoryError,
	deleteCategoryStart,
	deleteCategorySuccess,
	deleteGroupError,
	deleteGroupStart,
	deleteGroupSuccess,
	deleteSubCategoryError,
	deleteSubCategoryStart,
	deleteSubCategorySuccess,
	fetchCategoryError,
	fetchCategoryStart,
	fetchCategorySuccess,
	fetchGroupError,
	fetchGroupStart,
	fetchGroupSuccess,
	fetchHierarchyError,
	fetchHierarchyStart,
	fetchHierarchySuccess,
	fetchSubCategoryError,
	fetchSubCategoryStart,
	fetchSubCategorySuccess,
} from "./slice";
import { createError } from "@/libs/api-contract/Error";
import ApiClient from "@/libs/api-contract/ApiClient";

export const fetchHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchHierarchyStart());
		const response = await ApiClient.get<GetAllProductHierarchyResult>(`/api/product-hierarchy`);
		dispatch(fetchHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchHierarchyError(createError(error)));
	}
};

export const fetchGroup = (groupId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchGroupStart());
		const response = await ApiClient.get<GetGroupResult>(`/api/product-hierarchy/groups/${groupId}`);
		dispatch(fetchGroupSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchGroupError(createError(error)));
	}
};

export const fetchCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchCategoryStart());
		const response = await ApiClient.get<GetCategoryResult>(`/api/product-hierarchy/categories/${categoryId}`);
		dispatch(fetchCategorySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchCategoryError(createError(error)));
	}
};

export const fetchSubCategory = (subCategoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchSubCategoryStart());
		const response = await ApiClient.get<GetGroupResult>(`/api/product-hierarchy/subcategories/${subCategoryId}`);
		dispatch(fetchSubCategorySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSubCategoryError(createError(error)));
	}
};

export const createOrUpdateGroup = (groupData: CreateOrUpdateGroupCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateGroupStart());
		const response = await ApiClient.post<CreateOrUpdateGroupResult>(`/api/product-hierarchy/groups`, groupData);
		dispatch(createOrUpdateGroupSuccess(response.data));
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateGroupError(createError(error)));
	}
};

export const deleteGroup = (groupId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteGroupStart());
		const response = await ApiClient.delete(`/api/product-hierarchy/groups/${groupId}`);
		dispatch(deleteGroupSuccess());
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteGroupError(createError(error)));
	}
};

export const createOrUpdateCategory = (category: CreateOrUpdateCategoryCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateCategoryStart());
		const response = await ApiClient.post<CreateOrUpdateGroupResult>(`/api/product-hierarchy/categories`, category);
		dispatch(createOrUpdateCategorySuccess(response.data));
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateCategoryError(createError(error)));
	}
};

export const deleteCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteCategoryStart());
		const response = await ApiClient.delete(`/api/product-hierarchy/categories/${categoryId}`);
		dispatch(deleteCategorySuccess());
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteCategoryError(createError(error)));
	}
};

export const createOrUpdateSubCategory = (subCategory: CreateOrUpdateSubCategoryCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateSubCategoryStart());
		const response = await ApiClient.post<CreateOrUpdateGroupResult>(`/api/product-hierarchy/subCategories`, subCategory);
		dispatch(createOrUpdateSubCategorySuccess(response.data));
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateSubCategoryError(createError(error)));
	}
};

export const deleteSubCategory = (subCategoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteSubCategoryStart());
		const response = await ApiClient.delete(`/api/product-hierarchy/subCategories/${subCategoryId}`);
		dispatch(deleteSubCategorySuccess());
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteSubCategoryError(createError(error)));
	}
};
