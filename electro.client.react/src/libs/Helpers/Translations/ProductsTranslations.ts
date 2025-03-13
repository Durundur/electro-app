import { ProductStatus } from "@/libs/api-contract/api-contract";

export const translateProductStatus = (productStatus: ProductStatus): string => {
	const productStatusMap: { [key in ProductStatus]: string } = {
		Active: "Aktywny",
		Inactive: "Nieaktywny",
		Draft: "Szkic",
		Discontinued: "Wycofany",
	};

	return productStatusMap[productStatus] || productStatus;
};
