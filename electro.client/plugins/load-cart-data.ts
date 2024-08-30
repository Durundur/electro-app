export default defineNuxtPlugin(async (nuxtApp) => {
	const cartStore = useCartStore();
	await cartStore.loadCartData();
});
