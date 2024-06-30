import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { useAuthStore } from "@/stores/authStore";

interface Product {
	count: number;
	productId: string;
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

interface CartVerificationResponse {
	cart: Cart;
	messages: string[];
}

export const useCartStore = defineStore("cart", () => {
	const authStore = useAuthStore();
	const { $api } = useNuxtApp();
	const cart = ref<Cart>({ productsCount: 0, totalPrice: 0, products: [] });
	const messages = ref<string[]>([]);

	const isLoggedIn = computed(() => authStore.isLoggedIn);

	const fetchCartFromAPI = async (): Promise<Cart | null> => {
		const { ok, data } = await $api.get("api/carts");
		if (!ok) {
			console.error("Failed to fetch cart from API");
			return null;
		}
		return data;
	};

	const getCartFromLocalStorage = (): Cart | null => {
		const savedCart = localStorage.getItem("electro-store");
		return savedCart ? JSON.parse(savedCart) : null;
	};

	const getCart = async (): Promise<Cart> => {
		if (isLoggedIn.value) {
			return (
				(await fetchCartFromAPI()) || {
					productsCount: 0,
					totalPrice: 0,
					products: [],
				}
			);
		}

		return (
			getCartFromLocalStorage() || {
				productsCount: 0,
				totalPrice: 0,
				products: [],
			}
		);
	};

	const updateLocalStorage = () => {
		if (!isLoggedIn.value) {
			localStorage.setItem("electro-store", JSON.stringify(cart.value));
		}
	};

	const verifyCart = async (
		cartToVerify: Cart,
	): Promise<CartVerificationResponse> => {
		try {
			const { ok, data } = await $api.post("api/carts/verify", cartToVerify);
			if (!ok) throw new Error("Failed to verify cart with API");
			return data as CartVerificationResponse;
		} catch (error) {
			console.error(error);
			return {
				cart: cartToVerify,
				messages: ["Wystąpił błąd podczas weryfikacji koszyka"],
			};
		}
	};

	const verifyCartAndUpdateStore = async (cartToVerify: Cart) => {
		const { cart: verifiedCart, messages: messagesResponse } = await verifyCart(
			cartToVerify,
		);
		cart.value = verifiedCart;
		messages.value = messagesResponse;
		updateCartTotals();
		updateLocalStorage();
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

	const addToCart = async (product: Product) => {
		const existingProduct = cart.value.products.find(
			(item) => item.productId === product.productId,
		);
		if (existingProduct) {
			existingProduct.count += product.count;
		} else {
			cart.value.products.push({ ...product });
		}
		await verifyCartAndUpdateStore(cart.value);
	};

	const changeProductQuantity = async (
		productId: string,
		newQuantity: number,
	) => {
		const product = cart.value.products.find((p) => p.productId === productId);
		if (product) {
			product.count = newQuantity;
			await verifyCartAndUpdateStore(cart.value);
		}
	};

	const removeProduct = async (productId: string) => {
		cart.value.products = cart.value.products.filter((p) => p.productId !== productId);
		await verifyCartAndUpdateStore(cart.value);
	};

	const clearCart = async () => {
		const emptyCart = { productsCount: 0, totalPrice: 0, products: [] };
		await verifyCartAndUpdateStore(emptyCart);
	};

	onMounted(async () => {
		const initialCart = await getCart();
		await verifyCartAndUpdateStore(initialCart);
	});

	const removeMessage = (messageId: number) => {
		messages.value.splice(messageId, 1);
	};

	return {
		cart,
		messages,
		addToCart,
		changeProductQuantity,
		removeProduct,
		clearCart,
		removeMessage,
	};
});
