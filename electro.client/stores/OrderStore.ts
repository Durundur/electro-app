import { useCartStore } from "~/stores/CartStore";
import {
	type IPagedResult,
	type IPaginationParams,
} from "~/types/Api/PagedResult";
import type {
	ICreateOrder,
	ICreateOrderResult,
} from "~/types/Order/OrderCreate";
import type { IOrder } from "~/types/Order/Order";
import type {
	IOrderOverview,
	IOrderOverviewParams,
} from "~/types/Order/OrderOverview";
import utlis from "~/utlis";

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

export const initialNewOrderInfo: ICreateOrderResult = {
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
	const newOrderInfo = ref<ICreateOrderResult>(initialNewOrderInfo);

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
			const result = await $api.post<ICreateOrderResult>("api/orders", newOrder.value);
			if (!result) {
				throw new ApiError(500, "Błąd");
			}
			newOrderInfo.value = {
				orderId: result.orderId,
				email: result.email,
			};
			orderCompleted.value = true;
		} catch (error) {
			throw error;
		}
	};

	const getUserOrdersOverview = async (
		paginationParams?: IPaginationParams,
		orderOverviewParams?: IOrderOverviewParams,
	): Promise<IPagedResult<IOrderOverview>> => {
		try {
			const result = await $api.get<IPagedResult<IOrderOverview>>(
				`api/orders?${utlis.paramsToString(
					paginationParams,
					orderOverviewParams,
				)}`,
			);
			if (!result) {
				throw new ApiError(500, "Błąd");
			}
			return result;
		} catch (error) {
			throw error;
		}
	};

	const getOrder = async (orderId: string): Promise<IOrder> => {
		try {
			const result = await $api.get<IOrder>(`api/orders/${orderId}`);
			if (!result) {
				throw new ApiError(500, "Błąd");
			}
			return result;
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
