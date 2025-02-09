import { ProductStatus } from "@/libs/api-contract/api-contract";

export const translateProductStatus = (productStatus: ProductStatus): string => {
	const productStatusMap: { [key in ProductStatus]: string } = {
		Active: "Aktywny",
		Inavtive: "Nieaktywny",
		Removed: "Usunięty",
	};

	return productStatusMap[productStatus] || productStatus;
};
