import { GetCartResult, ValidateCartCommand, ValidateCartResult } from "../api-contract/api-contract";

export const getValidateCartCommand = (cart: GetCartResult): ValidateCartCommand => {
	return {
		products:
			cart?.products?.map((product) => ({
				productId: product.productId,
				quantity: product.quantity,
				price: product.price,
			})) || [],
	};
};

export const getGetCartResult = (validationResult: ValidateCartResult): GetCartResult => {
	return {
		id: validationResult.id,
		totalQuantity: validationResult.totalQuantity,
		totalPrice: validationResult.totalPrice,
		products:
			validationResult.products?.map((product) => ({
				productId: product.productId,
				quantity: product.quantity,
				price: product.price,
				name: product.name,
				photo: product.photo,
			})) || [],
	};
};
