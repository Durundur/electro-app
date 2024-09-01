import type { IPriceBase } from "../Common/Price";
import type { IOrderProuct, OrderStatus } from "./Order";

export interface IOrderOverview {
	id: string;
	number: number;
	status: OrderStatus;
	products: IOrderProuct[];
	totalPrice: IPriceBase;
	createdAt: string;
	updatedAt: string;
}

export interface IOrderOverviewParams {
	status?: OrderStatus;
	order?: OrdersOverviewOrderOptions;
}

export enum OrdersOverviewOrderOptions {
	DateDesc = "DateDesc",
	DateAsc = "DateAsc",
	TotalPriceDesc = "TotalPriceDesc",
	TotalPriceAsc = "TotalPriceAsc",
}
