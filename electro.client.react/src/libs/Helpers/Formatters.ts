export const formatAmount = (amount: number, currency: string): string => {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 2,
	}).format(amount);
};
