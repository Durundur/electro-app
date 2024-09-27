<template>
	<Container v-if="!orderStore.orderCompleted">
		<CardTitle class="pb-0">Podsumowanie zamówienia</CardTitle>
		<p class="pb-2">
			Poniżej możesz sprawdzić swoje zamówienie przed jego realizacją.
		</p>
		<v-card
			flat
			border
			rounded="lg">
			<v-card-text class="pt-0">
				<v-container class="pa-0">
					<v-row>
						<v-col
							cols="12"
							md="8">
							<OrderAddress
								:address="orderStore.newOrder.deliveryAddress"></OrderAddress>
							<OrderRecipient
								:recipient="orderStore.newOrder.recipient"
								:address="orderStore.newOrder.deliveryAddress"></OrderRecipient>
							<div
								v-if="
									orderStore.newOrder.recipient.type == CustomerType.Company
								">
								<OrderInvoiceDetails
									:recipient="orderStore.newOrder.recipient"
									:address="
										orderStore.newOrder.deliveryAddress
									"></OrderInvoiceDetails>
							</div>
							<CheckoutConfirmDelivery></CheckoutConfirmDelivery>
							<CheckoutProducts :cart="orderStore.cart"></CheckoutProducts>
						</v-col>
						<v-col
							cols="12"
							md="4">
							<div class="d-flex flex-row align-center ga-2 pt-md-2">
								<v-icon
									size="x-large"
									icon="mdi-package-variant-closed"></v-icon>
								<div>
									<p>Przewidywany czas dostawy:</p>
									<p>
										{{
											new Date(
												new Date().setDate(new Date().getDate() + 2),
											).toLocaleString("pl-PL", {
												weekday: "long",
												year: "numeric",
												month: "long",
												day: "numeric",
											})
										}}
									</p>
								</div>
							</div>
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
								@click="orderStore.createOrder()">
								Kupuję i płacę
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
		</v-card>
	</Container>
	<CompletedCheckoutInfo
		v-else
		:order-id="orderStore.newOrderInfo.orderId"
		:email="orderStore.newOrderInfo.email"></CompletedCheckoutInfo>
</template>
<script lang="ts" setup>
	definePageMeta({
		allowAnonymous: false
	})
	import { CustomerType } from "~/types/Common/Recipient";
	const orderStore = useOrderStore();
</script>
