import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { useAuthStore } from "@/stores/authStore";

interface Product {
	count: number;
	id: string;
	price: {
		price: number;
		oldPrice: number | null;
	};
	photo: string;
	name: string;
}

interface Cart {
	products: Product[];
	productsCount: number;
	totalPrice: number;
}

export const useCartStore = defineStore("cart", () => {
	const authStore = useAuthStore();
	const { $api } = useNuxtApp();
	const cart = ref<Cart>({
		productsCount: 0,
		totalPrice: 0,
		products: [],
	});

	const getCart = async (): Promise<Cart> => {
		if (authStore.isLoggedIn) {
			const { ok, data } = await $api.get("/carts");
			if (ok) {
				return data;
			}
		} else {
			const savedCart = JSON.parse(
				localStorage.getItem("electro-store") || "null",
			);
			if (savedCart) {
				return savedCart;
			}
		}
		return {
			productsCount: 0,
			totalPrice: 0,
			products: [],
		};
	};

	onMounted(async () => {
		cart.value = await getCart();
		updateCartTotals();
	});

	const addToCart = async (product: Product) => {
		const existingProduct = cart.value.products.find(
			(item) => item.id === product.id,
		);
		if (existingProduct) {
			existingProduct.count = existingProduct.count + 1;
		} else {
			cart.value.products.push(product);
		}
		updateCartTotals();
		if (authStore.isLoggedIn) {
			await syncCart();
		} else {
			localStorage.setItem("electro-store", JSON.stringify(cart.value));
		}
	};

	const syncCart = async () => {
		const { ok, data } = await $api.post("/carts", cart.value);
		if (!ok) {
			console.error("Failed to sync cart with API");
		}
	};

	const updateCartTotals = () => {
		cart.value.productsCount = cart.value.products.reduce(
			(acc, item) => acc + item.count,
			0,
		);
		cart.value.totalPrice = cart.value.products.reduce(
			(acc, item) => acc + item.price.price * item.count,
			0,
		);
	};

	const clearCart = () => {
		cart.value.products = [];
		cart.value.productsCount = 0;
		cart.value.totalPrice = 0;
		localStorage.removeItem("electro-store");
		if (authStore.isLoggedIn) {
			syncCart();
		}
	};

	const removeProduct = (productId: string) => {
		const index = cart.value.products.findIndex((p) => p.id === productId);
		cart.value.products.splice(index, 1);
		updateCartTotals();
		if (authStore.isLoggedIn) {
			syncCart();
		} else {
			localStorage.setItem("electro-store", JSON.stringify(cart.value));
		}
	};

	const verifyCart = async () => {
		if (authStore.isLoggedIn) {
			const { ok, data } = await $api.get("/carts");
			if (ok) {
				cart.value = data;
				updateCartTotals();
			} else {
				console.error("Failed to verify cart with API");
			}
		}
	};

	const changeProductQuantity = async (
		productId: string,
		newQuantity: number,
	) => {
		const product = cart.value.products.find((p) => p.id === productId);
		if (product) {
			if (newQuantity <= 0) {
				removeProduct(product.id);
			} else {
				product.count = newQuantity;
			}
			updateCartTotals();
			if (authStore.isLoggedIn) {
				syncCart();
			} else {
				localStorage.setItem("electro-store", JSON.stringify(cart.value));
			}
		}
	};

	return {
		cart,
		addToCart,
		removeProduct,
		clearCart,
		verifyCart,
		changeProductQuantity,
	};
});
