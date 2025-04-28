import { AppDispatch } from "@/libs/Store";
import {
	CreateOrUpdateCategoryCommand,
	CreateOrUpdateGroupCommand,
	CreateOrUpdateGroupResult,
	CreateOrUpdateSubCategoryCommand,
	CreateOrUpdateSubCategoryResult,
	GetAllProductHierarchyResult,
	GetCategoryResult,
	GetGroupResult,
	GetSubCategoryResult,
} from "@/libs/api-contract/rest-api-contract";
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
import { graphql } from "@/libs/api-contract/graphql-api-contract";
import {
	AdminProductHierarchyPageCategoryQuery,
	AdminProductHierarchyPageCategoryQueryVariables,
	AdminProductHierarchyPageCreateOrUpdateCategoryMutation,
	AdminProductHierarchyPageCreateOrUpdateCategoryMutationVariables,
	AdminProductHierarchyPageCreateOrUpdateGroupMutation,
	AdminProductHierarchyPageCreateOrUpdateGroupMutationVariables,
	AdminProductHierarchyPageCreateOrUpdateSubCategoryMutation,
	AdminProductHierarchyPageCreateOrUpdateSubCategoryMutationVariables,
	AdminProductHierarchyPageDeleteCategoryMutationVariables,
	AdminProductHierarchyPageDeleteGroupMutationVariables,
	AdminProductHierarchyPageDeleteSubCategoryMutationVariables,
	AdminProductHierarchyPageGroupQuery,
	AdminProductHierarchyPageGroupQueryVariables,
	AdminProductHierarchyPageProductHierarchyQuery,
	AdminProductHierarchyPageSubCategoryQuery,
	AdminProductHierarchyPageSubCategoryQueryVariables,
} from "@/libs/api-contract/graphql-api-contract/graphql";
import { mapAttributeTypeFromGraphQL, mapAttributeTypeToGraphQL } from "@/libs/api-contract/Mappers/EnumMappers";

export const fetchHierarchy = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchHierarchyStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageProductHierarchyQuery = graphql(`
				query AdminProductHierarchyPageProductHierarchy {
					productHierarchy {
						id
						name
						photo
						icon
						categories {
							id
							name
							subCategories {
								id
								name
							}
						}
					}
				}
			`);
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageProductHierarchyQuery);
			const mappedResponse = mapGraphQLResponseToGetAllProductHierarchyResult(response.data.data);
			dispatch(fetchHierarchySuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetAllProductHierarchyResult>(`/api/product-hierarchy`);
			dispatch(fetchHierarchySuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchHierarchyError(createError(error)));
	}
};

const mapGraphQLResponseToGetAllProductHierarchyResult = (data: AdminProductHierarchyPageProductHierarchyQuery): GetAllProductHierarchyResult => {
	return {
		groups: data.productHierarchy.map((g) => {
			return {
				id: g.id,
				name: g.name,
				icon: g.icon,
				photo: g.photo,
				categories: g.categories.map((c) => {
					return {
						id: c.id,
						name: c.name,
						subCategories: c.subCategories.map((s) => {
							return {
								id: s.id,
								name: s.name,
							};
						}),
					};
				}),
			};
		}),
	};
};

export const fetchGroup = (groupId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchGroupStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageGroupQuery = graphql(`
				query AdminProductHierarchyPageGroup($id: Int!) {
					group(id: $id) {
						id
						name
						photo
						icon
						description
						active
						displayOrder
						createdAt
						modifiedAt
						attributes {
							id
							name
							type
							isRequired
							isFilterable
							description
						}
					}
				}
			`);
			const variables: AdminProductHierarchyPageGroupQueryVariables = { id: Number(groupId) };
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageGroupQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetGroupResult(response.data.data);
			dispatch(fetchGroupSuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetGroupResult>(`/api/product-hierarchy/groups/${groupId}`);
			dispatch(fetchGroupSuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchGroupError(createError(error)));
	}
};

const mapGraphQLResponseToGetGroupResult = (data: AdminProductHierarchyPageGroupQuery): GetGroupResult => {
	return {
		id: data.group.id,
		name: data.group.name,
		photo: data.group.photo,
		icon: data.group.icon,
		description: data.group.description,
		active: data.group.active,
		displayOrder: data.group.displayOrder,
		createdAt: data.group.createdAt,
		modifiedAt: data.group.modifiedAt,
		attributes: data.group.attributes.map((a) => {
			return {
				id: a.id,
				name: a.name,
				type: mapAttributeTypeFromGraphQL(a.type),
				isRequired: a.isRequired,
				isFilterable: a.isFilterable,
				description: a.description,
			};
		}),
	};
};

export const fetchCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchCategoryStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageCategoryQuery = graphql(`
				query AdminProductHierarchyPageCategory($id: Int!) {
					category(id: $id) {
						id
						name
						description
						active
						displayOrder
						createdAt
						modifiedAt
						groupId
						attributes {
							id
							name
							type
							isRequired
							isFilterable
							description
						}
					}
				}
			`);
			const variables: AdminProductHierarchyPageCategoryQueryVariables = { id: Number(categoryId) };
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageCategoryQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetCategoryResult(response.data.data);
			dispatch(fetchCategorySuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetCategoryResult>(`/api/product-hierarchy/categories/${categoryId}`);
			dispatch(fetchCategorySuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchCategoryError(createError(error)));
	}
};

const mapGraphQLResponseToGetCategoryResult = (data: AdminProductHierarchyPageCategoryQuery): GetCategoryResult => {
	return {
		id: data.category.id,
		name: data.category.name,
		description: data.category.description,
		active: data.category.active,
		displayOrder: data.category.displayOrder,
		createdAt: data.category.createdAt,
		modifiedAt: data.category.modifiedAt,
		groupId: data.category.groupId ?? undefined,
		attributes: data.category.attributes.map((a) => {
			return {
				id: a.id,
				name: a.name,
				type: mapAttributeTypeFromGraphQL(a.type),
				isRequired: a.isRequired,
				isFilterable: a.isFilterable,
				description: a.description,
			};
		}),
	};
};

export const fetchSubCategory = (subCategoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(fetchSubCategoryStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageSubCategoryQuery = graphql(`
				query AdminProductHierarchyPageSubCategory($id: Int!) {
					subCategory(id: $id) {
						id
						name
						description
						active
						displayOrder
						createdAt
						modifiedAt
						categoryId
						attributes {
							id
							name
							type
							isRequired
							isFilterable
							description
						}
					}
				}
			`);
			const variables: AdminProductHierarchyPageSubCategoryQueryVariables = { id: Number(subCategoryId) };
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageSubCategoryQuery, variables);
			const mappedResponse = mapGraphQLResponseToGetSubCategoryResult(response.data.data);
			dispatch(fetchSubCategorySuccess(mappedResponse));
		} else {
			const response = await ApiClient.get<GetSubCategoryResult>(`/api/product-hierarchy/subcategories/${subCategoryId}`);
			dispatch(fetchSubCategorySuccess(response.data));
		}
	} catch (error: any) {
		dispatch(fetchSubCategoryError(createError(error)));
	}
};

const mapGraphQLResponseToGetSubCategoryResult = (data: AdminProductHierarchyPageSubCategoryQuery): GetSubCategoryResult => {
	return {
		id: data.subCategory.id,
		name: data.subCategory.name,
		description: data.subCategory.description,
		active: data.subCategory.active,
		displayOrder: data.subCategory.displayOrder,
		createdAt: data.subCategory.createdAt,
		modifiedAt: data.subCategory.modifiedAt,
		categoryId: data.subCategory.categoryId ?? undefined,
		attributes: data.subCategory.attributes.map((a) => {
			return {
				id: a.id,
				name: a.name,
				type: mapAttributeTypeFromGraphQL(a.type),
				isRequired: a.isRequired,
				isFilterable: a.isFilterable,
				description: a.description,
			};
		}),
	};
};

export const createOrUpdateGroup = (groupData: CreateOrUpdateGroupCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateGroupStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageCreateOrUpdateGroupMutation = graphql(`
				mutation AdminProductHierarchyPageCreateOrUpdateGroup($input: CreateOrUpdateGroupInput!) {
					createOrUpdateGroup(input: $input) {
						id
						name
						icon
						photo
						description
						active
						displayOrder
						createdAt
						modifiedAt
						attributes {
							id
							name
							type
							isRequired
							description
							isFilterable
						}
					}
				}
			`);
			const variables: AdminProductHierarchyPageCreateOrUpdateGroupMutationVariables = {
				input: {
					id: groupData.id,
					name: groupData.name!,
					icon: groupData.icon!,
					photo: groupData.photo!,
					description: groupData.description!,
					active: groupData.active!,
					displayOrder: groupData.displayOrder!,
					attributes: groupData.attributes!.map((a) => {
						return {
							id: a.id,
							name: a.name!,
							type: mapAttributeTypeToGraphQL(a.type!),
							isRequired: a.isRequired!,
							isFilterable: a.isFilterable!,
							description: a.description!,
						};
					}),
				},
			};
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageCreateOrUpdateGroupMutation, variables);
			const mappedResponse = mapGraphQLResponseToCreateOrUpdateGroupResult(response.data.data);
			dispatch(createOrUpdateGroupSuccess(mappedResponse));
		} else {
			const response = await ApiClient.post<CreateOrUpdateGroupResult>(`/api/product-hierarchy/groups`, groupData);
			dispatch(createOrUpdateGroupSuccess(response.data));
		}
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateGroupError(createError(error)));
	}
};

const mapGraphQLResponseToCreateOrUpdateGroupResult = (data: AdminProductHierarchyPageCreateOrUpdateGroupMutation): CreateOrUpdateGroupResult => {
	return {
		id: data.createOrUpdateGroup.id,
		name: data.createOrUpdateGroup.name,
		icon: data.createOrUpdateGroup.icon,
		photo: data.createOrUpdateGroup.photo,
		description: data.createOrUpdateGroup.description,
		active: data.createOrUpdateGroup.active,
		displayOrder: data.createOrUpdateGroup.displayOrder,
		createdAt: data.createOrUpdateGroup.createdAt,
		modifiedAt: data.createOrUpdateGroup.modifiedAt,
		attributes: data.createOrUpdateGroup.attributes.map((a) => {
			return {
				id: a.id,
				name: a.name,
				type: mapAttributeTypeFromGraphQL(a.type),
				isRequired: a.isRequired,
				isFilterable: a.isFilterable,
				description: a.description,
			};
		}),
	};
};

export const deleteGroup = (groupId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteGroupStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageDeleteGroupMutation = graphql(`
				mutation AdminProductHierarchyPageDeleteGroup($id: Int!) {
					deleteGroup(id: $id)
				}
			`);
			const variables: AdminProductHierarchyPageDeleteGroupMutationVariables = {
				id: Number(groupId),
			};
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageDeleteGroupMutation, variables);
			dispatch(deleteGroupSuccess());
		} else {
			const response = await ApiClient.delete(`/api/product-hierarchy/groups/${groupId}`);
			dispatch(deleteGroupSuccess());
		}
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteGroupError(createError(error)));
	}
};

export const createOrUpdateCategory = (category: CreateOrUpdateCategoryCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateCategoryStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageCreateOrUpdateCategoryMutation = graphql(`
				mutation AdminProductHierarchyPageCreateOrUpdateCategory($input: CreateOrUpdateCategoryInput!) {
					createOrUpdateCategory(input: $input) {
						id
						name
						description
						active
						displayOrder
						createdAt
						modifiedAt
						attributes {
							id
							name
							type
							isRequired
							isFilterable
							description
						}
					}
				}
			`);
			const variables: AdminProductHierarchyPageCreateOrUpdateCategoryMutationVariables = {
				input: {
					id: category.id,
					name: category.name!,
					description: category.description!,
					active: category.active!,
					displayOrder: category.displayOrder!,
					groupId: category.groupId!,
					attributes: category.attributes!.map((a) => {
						return {
							id: a.id,
							name: a.name!,
							type: mapAttributeTypeToGraphQL(a.type!),
							isRequired: a.isRequired!,
							isFilterable: a.isFilterable!,
							description: a.description!,
						};
					}),
				},
			};
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageCreateOrUpdateCategoryMutation, variables);
			const mappedResponse = mapGraphQLResponseToCreateOrUpdateCategoryResult(response.data.data);
			dispatch(createOrUpdateCategorySuccess(mappedResponse));
		} else {
			const response = await ApiClient.post<CreateOrUpdateGroupResult>(`/api/product-hierarchy/categories`, category);
			dispatch(createOrUpdateCategorySuccess(response.data));
		}
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateCategoryError(createError(error)));
	}
};

const mapGraphQLResponseToCreateOrUpdateCategoryResult = (data: AdminProductHierarchyPageCreateOrUpdateCategoryMutation): CreateOrUpdateGroupResult => {
	return {
		id: data.createOrUpdateCategory.id,
		name: data.createOrUpdateCategory.name,
		description: data.createOrUpdateCategory.description,
		active: data.createOrUpdateCategory.active,
		displayOrder: data.createOrUpdateCategory.displayOrder,
		createdAt: data.createOrUpdateCategory.createdAt,
		modifiedAt: data.createOrUpdateCategory.modifiedAt,
		attributes: data.createOrUpdateCategory.attributes.map((a) => {
			return {
				id: a.id,
				name: a.name,
				type: mapAttributeTypeFromGraphQL(a.type),
				isRequired: a.isRequired,
				isFilterable: a.isFilterable,
				description: a.description,
			};
		}),
	};
};

export const deleteCategory = (categoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteCategoryStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageDeleteCategoryMutation = graphql(`
				mutation AdminProductHierarchyPageDeleteCategory($id: Int!) {
					deleteCategory(id: $id)
				}
			`);
			const variables: AdminProductHierarchyPageDeleteCategoryMutationVariables = {
				id: Number(categoryId),
			};
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageDeleteCategoryMutation, variables);
			dispatch(deleteCategorySuccess());
		} else {
			const response = await ApiClient.delete(`/api/product-hierarchy/categories/${categoryId}`);
			dispatch(deleteCategorySuccess());
		}
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteCategoryError(createError(error)));
	}
};

export const createOrUpdateSubCategory = (subCategory: CreateOrUpdateSubCategoryCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(createOrUpdateSubCategoryStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageCreateOrUpdateSubCategoryMutation = graphql(`
				mutation AdminProductHierarchyPageCreateOrUpdateSubCategory($input: CreateOrUpdateSubCategoryInput!) {
					createOrUpdateSubCategory(input: $input) {
						id
						name
						description
						active
						displayOrder
						createdAt
						modifiedAt
						categoryId
						attributes {
							id
							name
							type
							isRequired
							isFilterable
							description
						}
					}
				}
			`);
			const variables: AdminProductHierarchyPageCreateOrUpdateSubCategoryMutationVariables = {
				input: {
					id: subCategory.id,
					name: subCategory.name!,
					description: subCategory.description!,
					active: subCategory.active!,
					displayOrder: subCategory.displayOrder!,
					categoryId: subCategory.categoryId!,
					attributes: subCategory.attributes!.map((a) => {
						return {
							id: a.id,
							name: a.name!,
							type: mapAttributeTypeToGraphQL(a.type!),
							isRequired: a.isRequired!,
							isFilterable: a.isFilterable!,
							description: a.description!,
						};
					}),
				},
			};
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageCreateOrUpdateSubCategoryMutation, variables);
			const mappedResponse = mapGraphQLResponseToCreateOrUpdateSubCategoryResult(response.data.data);
			dispatch(createOrUpdateSubCategorySuccess(mappedResponse));
		} else {
			const response = await ApiClient.post<CreateOrUpdateSubCategoryResult>(`/api/product-hierarchy/subCategories`, subCategory);
			dispatch(createOrUpdateSubCategorySuccess(response.data));
		}
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(createOrUpdateSubCategoryError(createError(error)));
	}
};

const mapGraphQLResponseToCreateOrUpdateSubCategoryResult = (data: AdminProductHierarchyPageCreateOrUpdateSubCategoryMutation): CreateOrUpdateSubCategoryResult => {
	return {
		id: data.createOrUpdateSubCategory.id,
		name: data.createOrUpdateSubCategory.name,
		description: data.createOrUpdateSubCategory.description,
		active: data.createOrUpdateSubCategory.active,
		displayOrder: data.createOrUpdateSubCategory.displayOrder,
		createdAt: data.createOrUpdateSubCategory.createdAt,
		modifiedAt: data.createOrUpdateSubCategory.modifiedAt,
		categoryId: data.createOrUpdateSubCategory.categoryId ?? undefined,
		attributes: data.createOrUpdateSubCategory.attributes.map((a) => {
			return {
				id: a.id,
				name: a.name,
				type: mapAttributeTypeFromGraphQL(a.type),
				isRequired: a.isRequired,
				isFilterable: a.isFilterable,
				description: a.description,
			};
		}),
	};
};

export const deleteSubCategory = (subCategoryId: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(deleteSubCategoryStart());
		if (ApiClient.apiType() == "graphql") {
			const AdminProductHierarchyPageDeleteSubCategoryMutation = graphql(`
				mutation AdminProductHierarchyPageDeleteSubCategory($id: Int!) {
					deleteSubCategory(id: $id)
				}
			`);
			const variables: AdminProductHierarchyPageDeleteSubCategoryMutationVariables = {
				id: Number(subCategoryId),
			};
			const response = await ApiClient.postGraphql(AdminProductHierarchyPageDeleteSubCategoryMutation, variables);
			dispatch(deleteSubCategorySuccess());
		} else {
			const response = await ApiClient.delete(`/api/product-hierarchy/subCategories/${subCategoryId}`);
			dispatch(deleteSubCategorySuccess());
		}
		dispatch(fetchHierarchy());
	} catch (error: any) {
		dispatch(deleteSubCategoryError(createError(error)));
	}
};
