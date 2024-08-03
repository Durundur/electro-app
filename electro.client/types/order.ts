import type { Product } from "./cart";

export interface IAddress {
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

export enum EOrderCustomerType {
	Invidual = "Invidual",
	Company = "Company",
}

export interface IOrder {
	id: string;
	number: string;
	status: EOrderStatus;
	deliveryMethod: EOrderDeliveryMethod
	deliveryAddress: IAddress;
	recipient: IRecipient;
	payment: IPayment;
	products: IOrderProuct[];
	totalPrice: IPrice;
	createdAt: Date;
	updatedAt: Date;
}

export interface IOrderProuct extends Product {}

export interface IPrice {
	GrossValue: number;
	NetValue: number;
	TaxValue: number;
}

export interface IPayment {
	method: EPaymentMethod;
}

export enum EPaymentMethod {
	OnlinePayment = "OnlinePayment",
	OnlineByCard = "OnlineByCard",
	Blik = "Blik",
	BankTransfer = "Bank transfer",
	OnDelivery = "On delivery",
}

export enum EOrderStatus {
	New = "New",
	Paid = "Paid",
	InProgress = "In progress",
	Delivery = "Delivery",
	Delivered = "Delivered",
}

export enum EOrderDeliveryMethod {
	ParcelLocker = "Parcel locker",
	Courier = "Courier",
}

export const OrderStatusTranslations: Record<EOrderStatus, string> = {
	[EOrderStatus.New]: "Nowe",
	[EOrderStatus.Paid]: "Zapłacone",
	[EOrderStatus.InProgress]: "W realizacji",
	[EOrderStatus.Delivery]: "W dostawie",
	[EOrderStatus.Delivered]: "Dostarczono",
};
