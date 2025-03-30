import { CreateOrUpdateProductCommand, ProductStatus } from "@/libs/api-contract/api-contract";

export const initialValues: CreateOrUpdateProductCommand = {
	id: undefined,
	name: "",
	amount: undefined,
	currency: "",
	status: ProductStatus.Draft,
	stockQuantityDelta: 0,
	groupId: 0,
	categoryId: 0,
	subCategoryId: 0,
	description: "",
	photos: [],
	attributes: [],
};
