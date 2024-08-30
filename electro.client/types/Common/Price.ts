export interface IPriceBase {
	currency: string;
	value: number;
}

export interface IProductPrice extends IPriceBase {
	oldPriceValue: number;
}
