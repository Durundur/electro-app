import type { ICartProduct } from "../Cart/Cart";
import type { IAddressBase } from "../Common/Address";
import type { IPriceBase } from "../Common/Price";
import type { IRecipient } from "../Common/Recipient";

export interface IOrder {
	id: string;
	number: number;
	status: OrderStatus;
	deliveryDetails: IDeliveryDetails;
	customer: IRecipient;
	payment: IPaymentDetails;
	products: IOrderProuct[];
	totalPrice: IPriceBase;
	createdAt: string;
	updatedAt: string;
}

export interface IOrderProuct extends ICartProduct {}

export interface IDeliveryDetails {
	method: DeliveryMethod;
	trackingNumber: string;
	cost: IPriceBase;
	recipient: IRecipient;
	address: IAddressBase;
}

export interface IPaymentDetails {
	method: PaymentMethod;
	status: PaymentStatus;
}

export enum PaymentStatus {
	Started = "Started",
	InProgress = "InProgress",
	Paid = "Paid",
}

export enum OrderStatus {
	New = "New",
	Paid = "Paid",
	InProgress = "In progress",
	Delivery = "Delivery",
	Delivered = "Delivered",
}

export enum PaymentMethod {
	OnlinePayment = "OnlinePayment",
	OnlineByCard = "OnlineByCard",
	Blik = "Blik",
	BankTransfer = "BankTransfer",
	OnDelivery = "OnDelivery",
}

export enum DeliveryMethod {
	ParcelLocker = "Parcel locker",
	Courier = "Courier",
}
