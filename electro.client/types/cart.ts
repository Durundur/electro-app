export interface Product {
	count: number;
	productId: string;
	price: {
		price: number;
		oldPrice: number | null;
	};
	photo: string;
	name: string;
}

export interface Cart {
	products: Product[];
	productsCount: number;
	totalPrice: number;
}

export interface CartVerificationResponse {
	cart: Cart;
	messages: string[];
}
