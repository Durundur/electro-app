import type { Product } from "./cart";

export interface IDeliveryAddress {
	street: String;
	buildingNumber: String;
	city: String;
	postalCode: String;
	country: String;
}

export interface IRecipient {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
}

export interface IPayment {
	method: PaymentMethod;
}

export interface IOrder {
	id: string;
	number: string;
	status: OrderStatus;
	deliveryAddress: IDeliveryAddress;
	recipient: IRecipient;
	payment: IPayment;
	products: IOrderProuct[];
	totalPrice: IPrice;
	createdAt: Date;
	updatedAt: Date;
}

export interface IPrice {
	GrossValue: number;
	NetValue: number;
	TaxValue: number;
}

export enum OrderStatus {
	New = "New",
	Paid = "Paid",
	InProgress = "In progress",
	Delivery = "Delivery",
	Delivered = "Delivered",
}

export const OrderStatusTranslations: Record<OrderStatus, string> = {
	[OrderStatus.New]: "Nowe",
	[OrderStatus.Paid]: "Zapłacone",
	[OrderStatus.InProgress]: "W realizacji",
	[OrderStatus.Delivery]: "W dostawie",
	[OrderStatus.Delivered]: "Dostarczono",
};
export enum PaymentMethod {
	Blik,
	"Bank Transfer",
	"On delivery",
}

export interface IOrderProuct extends Product {}
