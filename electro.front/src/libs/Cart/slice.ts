import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateOrderResult, CreateOrUpdateRecipientResult, GetCartResult, GetRecipientsResult, GetRecipientsResultItem } from "../api-contract/rest-api-contract";
import { DeliveryOption, PaymentOption } from "./interfaces";
import { IError } from "../api-contract/Error";

interface CartStore {
	cart: CartState;
	checkout: CheckoutState;
	checkoutRecipients: CheckoutRecipientsState;
	createOrder: CreateOrderState;
}

interface CartState {
	data?: GetCartResult;
	validationErrors: string[];
	error?: IError;
	isLoading: boolean;
}

interface CheckoutRecipientsState {
	data?: GetRecipientsResult;
	error?: IError;
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
	error?: IError;
	isLoading: boolean;
}

export type StoredCartState = GetCartResult;

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
		fetchCartError(state, action: PayloadAction<IError>) {
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
		validateCartError(state, action: PayloadAction<IError>) {
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
		fetchRecipientsError(state, action: PayloadAction<IError>) {
			state.checkoutRecipients.isLoading = false;
			state.checkoutRecipients.error = action.payload;
		},
		createOrUpdateRecipientStart(state) {
			state.checkoutRecipients.isLoading = true;
			state.checkoutRecipients.error = undefined;
		},
		createOrUpdateRecipientError(state, action: PayloadAction<IError>) {
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
		deleteRecipientError(state, action: PayloadAction<IError>) {
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
		clearCheckoutState: (state) => {
			state.checkout.deliveryOption = initialState.checkout.deliveryOption;
			state.checkout.isDeliveryOptionValid = initialState.checkout.isDeliveryOptionValid;
			state.checkout.isPaymentOptionValid = initialState.checkout.isPaymentOptionValid;
			state.checkout.isRecipientOptionValid = initialState.checkout.isRecipientOptionValid;
			state.checkout.paymentOption = initialState.checkout.paymentOption;
			state.checkout.recipientOption = initialState.checkout.recipientOption;
		},
		clearCheckoutRecipientsState: (state) => {
			state.checkoutRecipients.data = initialState.checkoutRecipients.data;
			state.checkoutRecipients.isLoading = initialState.checkoutRecipients.isLoading;
			state.checkoutRecipients.error = initialState.checkoutRecipients.error;
		},
		clearCreateOrderState: (state) => {
			state.createOrder.error = initialState.createOrder.error;
			state.createOrder.isLoading = initialState.createOrder.isLoading;
			state.createOrder.result = initialState.createOrder.result;
		},
		createOrderStart(state) {
			state.createOrder.isLoading = true;
		},
		createOrderSuccess(state, action: PayloadAction<CreateOrderResult>) {
			state.createOrder.isLoading = false;
			state.createOrder.result = action.payload;
		},
		createOrderError(state, action: PayloadAction<IError>) {
			state.createOrder.isLoading = false;
			state.createOrder.error = action.payload;
		},
		restoreCart(state, action: PayloadAction<StoredCartState>) {
			state.cart.data = action.payload;
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
	restoreCart,
	clearCheckoutRecipientsState,
	clearCheckoutState,
	clearCreateOrderState,
} = CartStore.actions;

export default CartStore.reducer;
