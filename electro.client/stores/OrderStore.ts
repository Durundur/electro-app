import { useCartStore } from "~/stores/CartStore";
import { PaginationQuery, type IPagedResult } from "~/types/Api/PagedResult";
import type {
	ICreateOrder,
	ICreateOrderResponse,
} from "~/types/Order/OrderCreate";
import type { IOrder } from "~/types/Order/Order";
import type { IOrderOverview } from "~/types/Order/OrderOverview";

export const initialCreateOrder: ICreateOrder = {
	paymentMethod: undefined,
	deliveryDetails: {
		method: undefined,
		cost: {
			value: 0,
			currency: "PLN",
		},
	},
	deliveryAddress: {
		street: "",
		buildingNumber: "",
		city: "",
		postalCode: "",
		country: "",
	},
	recipient: {
		type: undefined,
		name: "",
		phoneNumber: "",
		email: "",
	},
	products: [],
};

export const initialNewOrderInfo: ICreateOrderResponse = {
	orderId: "",
	email: "",
};

export const useOrderStore = defineStore("order-store", () => {
	const { $api, $toast } = useNuxtApp();
	const cartStore = useCartStore();
	const newOrder = ref<ICreateOrder>(initialCreateOrder);
	const cart = computed(() => cartStore.cart);
	const discountAmount = computed(() => cartStore.discountAmount);
	const orderCompleted = ref(false);
	const newOrderInfo = ref<ICreateOrderResponse>(initialNewOrderInfo);

	const goToCheckoutConfirmation = async () => {
		await cartStore.verifyCartAndUpdateStore(cartStore.cart);
		if (cartStore.messages.length == 0) {
			return navigateTo("/checkout/confirm");
		}
		return navigateTo("/cart");
	};

	const createOrder = async () => {
		try {
			newOrder.value.products = cart.value.products;
			const { ok, data } = await $api.post("api/orders", newOrder.value);
			if (ok) {
				newOrderInfo.value = {
					orderId: data.orderId,
					email: data.email,
				};
				orderCompleted.value = true;
			}
		} catch (error) {
			throw error;
		}
	};

	const getUserOrdersOverview = async (
		paginationQuery?: PaginationQuery,
	): Promise<IPagedResult<IOrderOverview> | undefined> => {
		if (!paginationQuery) {
			paginationQuery = new PaginationQuery();
		}
		try {
			const { ok, data } = await $api.get(
				`api/orders?${paginationQuery.toQueryParamsString()}`,
			);
			if (ok) {
				return data as IPagedResult<IOrderOverview>;
			}
		} catch (error) {
			throw error;
		}
	};

	const getOrder = async (orderId: string): Promise<IOrder | undefined> => {
		try {
			const { ok, data } = await $api.get(`api/orders/${orderId}`);
			if (ok) {
				return data as IOrder;
			}
		} catch (error) {
			throw error;
		}
	};

	return {
		newOrder,
		cart,
		discountAmount,
		goToCheckoutConfirmation,
		createOrder,
		orderCompleted,
		newOrderInfo,
		getUserOrdersOverview,
		getOrder,
	};
});
