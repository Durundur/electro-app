import { CreateOrderCommand, DeliveryMethod, GetCartResult, GetCartResultProduct, GetRecipientsResultItem, PaymentMethod, ValidateCartCommand, ValidateCartResult } from "../api-contract/api-contract";

export const getValidateCartCommand = (cart: GetCartResult, userProfileId?: string): ValidateCartCommand => {
	return {
		userId: userProfileId,
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

export const getCreateOrderCommand = (products: GetCartResultProduct[], paymentMethod: PaymentMethod, deliveryMethod: DeliveryMethod, recipient: GetRecipientsResultItem): CreateOrderCommand => {
	return {
		products: products.map((product) => ({
			productId: product.productId,
			quantity: product.quantity,
			price: product.price,
		})),
		paymentMethod: paymentMethod,
		deliveryMethod: deliveryMethod,
		recipient: {
			firstName: recipient.firstName,
			surname: recipient.surname,
			companyName: recipient.companyName,
			taxIdentificationNumber: recipient.taxIdentificationNumber,
			type: recipient.type,
			phoneNumber: recipient.phoneNumber,
			street: recipient.street,
			houseNumber: recipient.houseNumber,
			postalCode: recipient.postalCode,
			city: recipient.city,
		},
	};
};
