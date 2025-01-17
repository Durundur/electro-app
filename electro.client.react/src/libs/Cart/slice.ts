import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateOrderResult, CreateOrUpdateRecipientResult, GetCartResult, GetRecipientsResult, GetRecipientsResultItem } from "../api-contract/api-contract";
import { DeliveryOption, PaymentOption } from "./interfaces";

interface CartStore {
	cart: CartState;
	checkout: CheckoutState;
	checkoutRecipients: CheckoutRecipientsState;
	createOrder: CreateOrderState;
}

interface CartState {
	data?: GetCartResult;
	validationErrors: string[];
	error?: Error;
	isLoading: boolean;
}

interface CheckoutRecipientsState {
	data?: GetRecipientsResult;
	error?: Error;
	isLoading: boolean;
}

interface CheckoutState {
	recipientOption?: GetRecipientsResultItem;
	paymentOption?: PaymentOption;
	deliveryOption?: DeliveryOption;
	isPaymentOptionValid: boolean;
	isDeliveryOptionValid: boolean;
	isRecipientOptionValid: boolean;
}

interface CreateOrderState {
	result?: CreateOrderResult;
	error?: Error;
	isLoading: boolean;
}

const initialState: CartStore = {
	cart: {
		data: undefined,
		validationErrors: [],
		error: undefined,
		isLoading: false,
	},
	checkout: {
		recipientOption: undefined,
		deliveryOption: undefined,
		paymentOption: undefined,
		isPaymentOptionValid: true,
		isDeliveryOptionValid: true,
		isRecipientOptionValid: true,
	},
	checkoutRecipients: {
		data: undefined,
		error: undefined,
		isLoading: false,
	},
	createOrder: {
		result: undefined,
		error: undefined,
		isLoading: false,
	},
};

const CartStore = createSlice({
	name: "CartSlice",
	initialState,
	reducers: {
		fetchCartStart(state) {
			state.cart.isLoading = true;
			state.cart.error = undefined;
		},
		fetchCartSuccess(state, action: PayloadAction<GetCartResult>) {
			state.cart.isLoading = false;
			state.cart.data = action.payload;
		},
		fetchCartError(state, action: PayloadAction<Error>) {
			state.cart.isLoading = false;
			state.cart.error = action.payload;
		},
		clearCart(state) {
			state.cart.data = undefined;
			state.cart.validationErrors = [];
		},
		validateCartStart(state) {
			state.cart.isLoading = true;
			state.cart.validationErrors = [];
			state.cart.error = undefined;
		},
		validateCartSuccess(state, action: PayloadAction<GetCartResult>) {
			state.cart.isLoading = false;
			state.cart.data = action.payload;
		},
		setValidationErrors(state, action: PayloadAction<string[]>) {
			state.cart.validationErrors = action.payload;
		},
		validateCartError(state, action: PayloadAction<Error>) {
			state.cart.isLoading = false;
			state.cart.error = action.payload;
		},
		fetchRecipientsStart(state) {
			state.checkoutRecipients.isLoading = true;
			state.checkoutRecipients.error = undefined;
		},
		fetchRecipientsSuccess(state, action: PayloadAction<GetRecipientsResult>) {
			state.checkoutRecipients.isLoading = false;
			state.checkoutRecipients.data = action.payload;
		},
		fetchRecipientsError(state, action: PayloadAction<Error>) {
			state.checkoutRecipients.isLoading = false;
			state.checkoutRecipients.error = action.payload;
		},
		createOrUpdateRecipientStart(state) {
			state.checkoutRecipients.isLoading = true;
			state.checkoutRecipients.error = undefined;
		},
		createOrUpdateRecipientError(state, action: PayloadAction<Error>) {
			state.checkoutRecipients.isLoading = false;
			state.checkoutRecipients.error = action.payload;
		},
		createOrUpdateRecipientSuccess(state, action: PayloadAction<CreateOrUpdateRecipientResult>) {
			state.checkoutRecipients.isLoading = false;
			const recipients = state.checkoutRecipients.data?.recipients || [];
			const existingRecipientIndex = recipients.findIndex((r) => r.id === action.payload.id);
			if (existingRecipientIndex !== -1) {
				recipients[existingRecipientIndex] = action.payload;
			} else {
				recipients.push(action.payload);
			}
			if (state.checkoutRecipients.data) {
				state.checkoutRecipients.data.recipients = recipients;
			}
		},
		deleteRecipientStart(state) {
			state.checkoutRecipients.isLoading = true;
			state.checkoutRecipients.error = undefined;
		},
		deleteRecipientError(state, action: PayloadAction<Error>) {
			state.checkoutRecipients.isLoading = false;
			state.checkoutRecipients.error = action.payload;
		},
		deleteRecipientSuccess(state, action: PayloadAction<string>) {
			state.checkoutRecipients.isLoading = false;
			const recipients = state.checkoutRecipients.data?.recipients || [];
			const recipientIdToDelete = action.payload;
			if (state.checkoutRecipients.data && state.checkoutRecipients.data.recipients) {
				state.checkoutRecipients.data.recipients = recipients.filter((r) => r.id !== recipientIdToDelete);
			}
		},
		setRecipientOption(state, action: PayloadAction<GetRecipientsResultItem>) {
			state.checkout.recipientOption = action.payload;
		},
		setDeliveryOption(state, action: PayloadAction<DeliveryOption>) {
			state.checkout.deliveryOption = action.payload;
		},
		setPaymentOption(state, action: PayloadAction<PaymentOption>) {
			state.checkout.paymentOption = action.payload;
		},
		setDeliveryOptionValidation: (state, action: PayloadAction<boolean>) => {
			state.checkout.isDeliveryOptionValid = action.payload;
		},
		setPaymentOptionValidation: (state, action: PayloadAction<boolean>) => {
			state.checkout.isPaymentOptionValid = action.payload;
		},
		setRecipientOptionValidation: (state, action: PayloadAction<boolean>) => {
			state.checkout.isRecipientOptionValid = action.payload;
		},
		createOrderStart(state) {
			state.createOrder.isLoading = true;
		},
		createOrderSuccess(state, action: PayloadAction<CreateOrderResult>) {
			state.createOrder.isLoading = false;
			state.createOrder.result = action.payload;
		},
		createOrderError(state, action: PayloadAction<Error>) {
			state.createOrder.isLoading = false;
			state.createOrder.error = action.payload;
		},
	},
});

export const {
	fetchCartError,
	fetchCartStart,
	fetchCartSuccess,
	validateCartError,
	validateCartStart,
	validateCartSuccess,
	clearCart,
	setValidationErrors,
	fetchRecipientsError,
	fetchRecipientsStart,
	fetchRecipientsSuccess,
	createOrUpdateRecipientError,
	createOrUpdateRecipientStart,
	createOrUpdateRecipientSuccess,
	deleteRecipientError,
	deleteRecipientStart,
	deleteRecipientSuccess,
	setDeliveryOption,
	setPaymentOption,
	setRecipientOption,
	setDeliveryOptionValidation,
	setPaymentOptionValidation,
	setRecipientOptionValidation,
	createOrderError,
	createOrderStart,
	createOrderSuccess,
} = CartStore.actions;

export default CartStore.reducer;
