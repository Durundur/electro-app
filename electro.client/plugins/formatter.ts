export default defineNuxtPlugin((nuxtApp) => {
	function priceFormatter(price: number) {
		return price.toFixed(2).replace(".", ",");
	}

	function dateFormatter(
		date: string,
		timeStyle: TimeStyleType = "short",
		dateStyle: DateStyleType = "long",
	) {
		return new Date(date).toLocaleString("pl-PL", {
			timeStyle,
			dateStyle,
		});
	}

	return {
		provide: {
			formatters: {
				priceFormatter,
				dateFormatter,
			},
		},
	};
});

type TimeStyleType = NonNullable<Intl.DateTimeFormatOptions["timeStyle"]>;
type DateStyleType = NonNullable<Intl.DateTimeFormatOptions["dateStyle"]>;
