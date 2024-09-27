import { useAuthStore } from "~/stores/AuthStore";
import type {
	ICart,
	ICartProduct,
	IVerifyCart,
	IVerifyCartResult,
} from "~/types/Cart/Cart";

export const initialCartStore = {
	productsCount: 0,
	totalPrice: {
		currency: "PLN",
		value: 0,
	},
	products: [],
};

export const useCartStore = defineStore("cart-store", () => {
	const authStore = useAuthStore();
	const { $api } = useNuxtApp();
	const cart = ref<ICart>(initialCartStore);
	const messages = ref<string[]>([]);
	const isLoggedIn = computed(() => authStore.isLoggedIn);
	const discountAmount = computed(() =>
		cart.value.products.reduce((acc, item) => {
			if (item.price.oldPriceValue) {
				const priceDiff = item.price.oldPriceValue - item.price.value;
				acc += priceDiff * item.quantity;
			}
			return acc;
		}, 0),
	);

	const fetchCart = async (): Promise<ICart | null> => {
		const { ok, data } = await $api.get<ICart>("api/carts");
		if (!ok) {
			console.error("Failed to fetch cart from API");
			return null;
		}
		return data;
	};

	const getCartFromLocalStorage = (): ICart | null => {
		const savedCart = localStorage.getItem("electro-cart");
		return savedCart ? JSON.parse(savedCart) : null;
	};

	const getCart = async (): Promise<ICart> => {
		if (isLoggedIn.value) {
			return (await fetchCart()) || initialCartStore;
		}
		return getCartFromLocalStorage() || initialCartStore;
	};

	const updateLocalStorage = () => {
		if (!isLoggedIn.value) {
			localStorage.setItem("electro-cart", JSON.stringify(cart.value));
		}
	};

	const verifyCart = async (
		cartToVerify: IVerifyCart,
	): Promise<IVerifyCartResult> => {
		try {
			const { ok, data } = await $api.post("api/carts/verify", cartToVerify);
			if (!ok) throw new Error("Failed to verify cart with API");
			return data as IVerifyCartResult;
		} catch (error) {
			console.error(error);
			return {
				...cartToVerify,
				messages: ["Wystąpił błąd podczas weryfikacji koszyka"],
			};
		}
	};

	const verifyCartAndUpdateStore = async (cartToVerify: ICart) => {
		const { messages: messagesResponse, ...verifiedCart } = await verifyCart(
			cartToVerify,
		);
		cart.value = verifiedCart;
		messages.value = messagesResponse;
		updateCartTotals();
		updateLocalStorage();
	};

	const updateCartTotals = () => {
		cart.value.productsCount = cart.value.products.reduce(
			(acc, item) => acc + item.quantity,
			0,
		);
		cart.value.totalPrice.value = cart.value.products.reduce(
			(acc, item) => acc + item.price.value * item.quantity,
			0,
		);
	};

	const addProductToCart = async (product: ICartProduct) => {
		const existingProduct = cart.value.products.find(
			(item) => item.productId === product.productId,
		);
		if (existingProduct) {
			existingProduct.quantity += product.quantity;
		} else {
			cart.value.products.push({ ...product });
		}
		updateCartTotals();
		await verifyCartAndUpdateStore(cart.value);
	};

	const changeProductQuantity = async (
		productId: string,
		newQuantity: number,
	) => {
		const product = cart.value.products.find((p) => p.productId === productId);
		if (product) {
			product.quantity = newQuantity;
			await verifyCartAndUpdateStore(cart.value);
		}
	};

	const removeProduct = async (productId: string) => {
		cart.value.products = cart.value.products.filter(
			(p) => p.productId !== productId,
		);
		await verifyCartAndUpdateStore(cart.value);
	};

	const clearCart = async () => {
		await verifyCartAndUpdateStore(initialCartStore);
	};

	const loadCartData = async () => {
		const cart = await getCart();
		await verifyCartAndUpdateStore(cart);
	};

	const removeMessage = (messageId: number) => {
		messages.value.splice(messageId, 1);
	};

	const goToCheckout = async () => {
		await verifyCartAndUpdateStore(cart.value);
		if (messages.value.length == 0) {
			return navigateTo("/checkout/");
		}
		return;
	};

	return {
		cart,
		messages,
		discountAmount,
		addProductToCart,
		changeProductQuantity,
		removeProduct,
		clearCart,
		removeMessage,
		loadCartData,
		goToCheckout,
		verifyCartAndUpdateStore,
	};
});
