import { ProductStatus } from "@/libs/api-contract/api-contract";
import { IProductForm } from "./interfaces";

export const initialValues: IProductForm = {
	id: undefined,
	name: "",
	amount: 0,
	currency: "",
	status: ProductStatus.Draft,
	stockQuantityDelta: 0,
	groupId: undefined,
	categoryId: undefined,
	subCategoryId: undefined,
	description: "",
	photos: [],
	attributes: [],
};
