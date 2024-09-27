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
	InProgress = "InProgress",
	InDelivery = "InDelivery",
	Delivered = "Delivered",
}

export const orderStatusTranslations: Record<OrderStatus, string> = {
	[OrderStatus.New]: "Nowe",
	[OrderStatus.Paid]: "Opłacone",
	[OrderStatus.InProgress]: "W trakcie realizacji",
	[OrderStatus.InDelivery]: "W dostawie",
	[OrderStatus.Delivered]: "Dostarczone",
};

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
