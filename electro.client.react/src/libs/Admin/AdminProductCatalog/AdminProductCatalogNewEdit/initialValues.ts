import { CreateOrUpdateProductCommand } from "@/libs/api-contract/api-contract";

export const initialValues: CreateOrUpdateProductCommand = {
	id: undefined,
	name: "",
	amount: undefined,
	currency: "",
	active: false,
	status: "",
	stockQuantity: 0,
	groupId: 0,
	categoryId: 0,
	subCategoryId: 0,
	description: "",
	photos: [],
	attributes: [],
};
