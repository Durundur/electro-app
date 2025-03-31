import { CreateOrUpdateProductCommandAttributeDefinitionValue, ProductStatus } from "@/libs/api-contract/api-contract";

export interface IGetAttributesDefinitionsQuery {
	groupId?: number;
	categoryId?: number;
	subCategoryId?: number;
}

export interface IProductForm {
	id?: string;
	name: string;
	amount: number;
	currency: string;
	status: ProductStatus;
	stockQuantityDelta: number;
	groupId?: number;
	categoryId?: number;
	subCategoryId?: number;
	photos: string[];
	description: string;
	attributes: CreateOrUpdateProductCommandAttributeDefinitionValue[];
	promotionAmount?: number;
	promotionCurrency?: string;
	promotionStartDate?: Date;
	promotionEndDate?: Date;
	promotionIsActive?: boolean;
}
