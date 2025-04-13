import { DeliveryMethod, DeliveryStatus, OrderStatus, PaymentMethod, PaymentStatus } from "@/libs/api-contract/api-contract";

export const translateOrderStatus = (orderStatus: OrderStatus): string => {
	const orderStatusMap: { [key in OrderStatus]: string } = {
		Created: "Utworzone",
		Processing: "Przetwarzanie",
		Paid: "Opłacone",
		Shipped: "Wysłane",
		Completed: "Zakończone",
		Cancelled: "Anulowane",
	};

	return orderStatusMap[orderStatus] || orderStatus;
};

export const translatePaymentMethod = (paymentMethod: PaymentMethod): string => {
	const paymentMethodMap: { [key in PaymentMethod]: string } = {
		CreditCard: "Karta kredytowa",
		InstantTransfer: "Przelew natychmiastowy",
		BankTransfer: "Przelew bankowy",
		GooglePay: "Google Pay",
		Blik: "BLIK",
	};

	return paymentMethodMap[paymentMethod] || paymentMethod;
};

export const translatePaymentStatus = (paymentStatus: PaymentStatus): string => {
	const paymentStatusMap: { [key in PaymentStatus]: string } = {
		Pending: "Oczekujące",
		Paid: "Opłacone",
		Failed: "Nieudane",
		Refunded: "Zwrócone",
	};

	return paymentStatusMap[paymentStatus] || paymentStatus;
};

export const translateDeliveryMethod = (deliveryMethod: DeliveryMethod): string => {
	const deliveryMethodMap: { [key in DeliveryMethod]: string } = {
		CourierExpress: "Kurier ekspresowy",
		CourierStandard: "Kurier standardowy",
		CourierCashOnDelivery: "Kurier za pobraniem",
		Locker: "Paczkomat",
		PickupZabka: "Odbiór w Żabce",
	};

	return deliveryMethodMap[deliveryMethod] || deliveryMethod;
};

export const translateDeliveryStatus = (deliveryStatus: DeliveryStatus): string => {
	const deliveryStatusMap: { [key in DeliveryStatus]: string } = {
		Pending: "Oczekujące",
		Shipped: "Wysłane",
		Delivered: "Dostarczone",
		Cancelled: "Anulowane",
	};

	return deliveryStatusMap[deliveryStatus] || deliveryStatus;
};
