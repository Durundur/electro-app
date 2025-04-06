export const formatAmount = (amount: number, currency: string, minimumFractionDigits = 2): string => {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency: currency,
		minimumFractionDigits,
	}).format(amount);
};
