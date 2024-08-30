import type { IPriceBase, IProductPrice } from "../Common/Price";

export interface ICartProduct {
	productId: string;
	photo: string;
	name: string;
	quantity: number;
	price: IProductPrice;
}

export interface ICart {
	products: ICartProduct[];
	productsCount: number;
	totalPrice: IPriceBase;
}

export interface IVerifyCart extends ICart {}

export interface IVerifyCartResult extends IVerifyCart {
	messages: string[];
}
