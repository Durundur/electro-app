export default defineNuxtPlugin((nuxtApp) => {
	function priceFormatter(price: number) {
		return price.toFixed(2).replace(".", ",");
	}

	function dateFormatter(date: string) {
		return new Date(date).toLocaleString("pl-PL", {
			timeStyle: "short",
			dateStyle: "long",
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
