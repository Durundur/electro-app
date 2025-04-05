import { CreateOrUpdateProductCommand, GetProductResult, ProductStatus } from "@/libs/api-contract/api-contract";
import { IProductForm } from "./interfaces";

export const mapGetProductResultToForm = (product: GetProductResult): IProductForm => {
	return {
		id: product.id,
		name: product.name ?? "",
		amount: product.amount ?? 0,
		currency: product.currency ?? "",
		status: product.status ?? ProductStatus.Draft,
		stockQuantityDelta: 0,
		groupId: product.groupId ?? undefined,
		categoryId: product.categoryId ?? undefined,
		subCategoryId: product.subCategoryId ?? undefined,
		photos: product.photos ?? [],
		description: product.description ?? "",
		attributes:
			product.attributes?.map((attr) => ({
				id: attr.id,
				value: attr.value,
				isPrimary: attr.isPrimary,
			})) ?? [],
		promotionAmount: product.promotion?.promotionalPrice?.amount ?? 0,
		promotionCurrency: product.promotion?.promotionalPrice?.currency ?? "",
		promotionStartDate: product.promotion?.startDate ?? undefined,
		promotionEndDate: product.promotion?.endDate ?? undefined,
		promotionIsActive: product.promotion?.isActive ?? false,
	};
};

export const mapFormToCreateOrUpdateCommand = (form: IProductForm): CreateOrUpdateProductCommand => {
	const command: CreateOrUpdateProductCommand = {
		id: form.id,
		name: form.name,
		amount: form.amount,
		currency: form.currency,
		status: form.status,
		stockQuantityDelta: form.stockQuantityDelta,
		groupId: form.groupId,
		categoryId: form.categoryId,
		subCategoryId: form.subCategoryId,
		photos: form.photos,
		description: form.description,
		attributes: form.attributes,
	};

	if (form.promotionAmount && form.promotionCurrency && form.promotionStartDate && form.promotionEndDate) {
		command.promotion = {
			promotionAmount: form.promotionAmount,
			promotionCurrency: form.promotionCurrency,
			startDate: form.promotionStartDate,
			endDate: form.promotionEndDate,
			isActive: form.promotionIsActive,
		};
	}

	return command;
};
