export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("formatters", {
		priceFormatter,
		dateFormatter,
	});

	function priceFormatter(price) {
		return price.toFixed(2).replace(".", ",");
	}

	function dateFormatter(date) {
		return new Date(date).toLocaleString("pl-PL", { timeStyle: "short", dateStyle: "long" });
	}
});
