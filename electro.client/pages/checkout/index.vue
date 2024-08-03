<template>
	<Container>
		<CardTitle>Dostawa i płatność</CardTitle>
		<v-card
			flat
			border
			rounded="lg">
			<v-card-text class="pt-0">
				<v-container class="pa-0">
					<v-row>
						<v-col
							cols="12"
							md="7"
							lg="8">
							<CustomerTypeSwitch v-model="customerType"></CustomerTypeSwitch>
							<CustomerInfoForm :customerType="customerType"></CustomerInfoForm>
							<DeliveryMethodSelector
								v-model="deliveryMethod"></DeliveryMethodSelector>
							<PaymentMethodSlector
								v-model="paymentMethod"></PaymentMethodSlector>
						</v-col>
						<v-col
							cols="12"
							md="5"
							lg="4">
							<CheckoutProducts></CheckoutProducts>
							<CheckoutSummary class="py-2"></CheckoutSummary>
							<v-btn
								class="text-none"
								block
								color="success"
								append-icon="mdi-chevron-right"
								to="/checkout/confirm">
								Podsumowanie
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
		</v-card>
	</Container>
</template>
<script lang="ts" setup>
	import {
		EOrderCustomerType,
		EOrderDeliveryMethod,
		EPaymentMethod,
	} from "~/types/order";
	const customerType = ref<EOrderCustomerType>(EOrderCustomerType.Invidual);
	const deliveryMethod = ref<EOrderDeliveryMethod>();
	const paymentMethod = ref<EPaymentMethod>();
</script>
