import { DeliveryMethod, PaymentMethod } from "../api-contract/rest-api-contract";

export interface PaymentOption {
	name: string;
	value: PaymentMethod;
	amount: number;
	currency: string;
}

export interface DeliveryOption {
	name: string;
	value: DeliveryMethod;
	amount: number;
	currency: string;
}
