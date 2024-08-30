export interface IRecipient {
	name: string;
	phoneNumber: string;
	email: string;
	type?: CustomerType;
	companyName?: string;
	nip?: string;
}

export enum CustomerType {
	Invidual = "Invidual",
	Company = "Company",
}
