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
							<CustomerInfoForm
								v-model:recipient="orderStore.newOrder.recipient"
								v-model:address="
									orderStore.newOrder.deliveryAddress
								"></CustomerInfoForm>
							<DeliveryMethodSelector
								v-model="
									orderStore.newOrder.deliveryDetails
								"></DeliveryMethodSelector>
							<PaymentMethodSlector
								v-model="
									orderStore.newOrder.paymentMethod as PaymentMethod
								"></PaymentMethodSlector>
						</v-col>
						<v-col
							cols="12"
							md="5"
							lg="4">
							<CheckoutProducts :cart="orderStore.cart"></CheckoutProducts>
							<CheckoutSummary
								:cart="orderStore.cart"
								:delivery-cost="orderStore.newOrder.deliveryDetails.cost.value"
								:discount-amount="orderStore.discountAmount"
								class="py-2"></CheckoutSummary>
							<v-btn
								class="text-none"
								block
								color="success"
								append-icon="mdi-chevron-right"
								@click="orderStore.goToCheckoutConfirmation()">
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
	definePageMeta({
		allowAnonymous: false
	})
	import type { PaymentMethod } from "~/types/Order/Order";
	const orderStore = useOrderStore();
</script>
