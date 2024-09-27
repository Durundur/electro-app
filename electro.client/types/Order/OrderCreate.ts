import type { IAddressBase } from "../Common/Address";
import type { IPriceBase } from "../Common/Price";
import type { IRecipient } from "../Common/Recipient";
import type { DeliveryMethod, IOrderProuct, PaymentMethod } from "./Order";

export interface ICreateOrder {
	paymentMethod?: PaymentMethod;
	deliveryDetails: ICreateOrderDeliveryDetails;
	deliveryAddress: IAddressBase;
	recipient: IRecipient;
	products: IOrderProuct[];
}

export interface ICreateOrderResult {
	orderId: string;
	email: string;
}

export interface ICreateOrderDeliveryDetails {
	method?: DeliveryMethod;
	cost: IPriceBase;
}
