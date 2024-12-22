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
import axios from "axios";
import { IError } from "@/libs/api-contract/Error";

export const fetchHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchHierarchyStart());
		const response = await axios.get<GetAllProductHierarchyResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy`);
		dispatch(fetchHierarchySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchHierarchyError(error as IError));
	}
};

export const fetchGroup = (groupId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchGroupStart());
		const response = await axios.get<GetGroupResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/groups/${groupId}`);
		dispatch(fetchGroupSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchGroupError(error as IError));
	}
};

export const fetchCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchCategoryStart());
		const response = await axios.get<GetCategoryResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/categories/${categoryId}`);
		dispatch(fetchCategorySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchCategoryError(error as IError));
	}
};

export const fetchSubCategory = (subCategoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchSubCategoryStart());
		const response = await axios.get<GetGroupResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/subcategories/${subCategoryId}`);
		dispatch(fetchSubCategorySuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSubCategoryError(error as IError));
	}
};

export const createOrUpdateGroup = (groupData: CreateOrUpdateGroupCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateGroupStart());
		const response = await axios.post<CreateOrUpdateGroupResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/groups`, groupData);
		dispatch(createOrUpdateGroupSuccess(response.data));
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateGroupError(error as IError));
	}
};

export const deleteGroup = (groupId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteGroupStart());
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/groups/${groupId}`);
		dispatch(deleteGroupSuccess());
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteGroupError(error as IError));
	}
};

export const createOrUpdateCategory = (category: CreateOrUpdateCategoryCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateCategoryStart());
		const response = await axios.post<CreateOrUpdateGroupResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/categories`, category);
		dispatch(createOrUpdateCategorySuccess(response.data));
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateCategoryError(error as IError));
	}
};

export const deleteCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteCategoryStart());
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/categories/${categoryId}`);
		dispatch(deleteCategorySuccess());
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteCategoryError(error as IError));
	}
};

export const createOrUpdateSubCategory = (subCategory: CreateOrUpdateSubCategoryCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateSubCategoryStart());
		const response = await axios.post<CreateOrUpdateGroupResult>(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/subCategories`, subCategory);
		dispatch(createOrUpdateSubCategorySuccess(response.data));
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateSubCategoryError(error as IError));
	}
};

export const deleteSubCategory = (subCategoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteSubCategoryStart());
		const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/ProductHierarchy/subCategories/${subCategoryId}`);
		dispatch(deleteSubCategorySuccess());
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteSubCategoryError(error as IError));
	}
};
