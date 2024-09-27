<template>
	<Container v-if="order">
		<v-card flat>
			<CardTitle class="text-h1">Szczegóły zamówienia</CardTitle>
			<v-card
				border
				flat
				rounded="lg">
				<v-card-title>
					<OrderNumber :number="order.number"></OrderNumber>
				</v-card-title>
				<v-card-text>
					<OrderTimeLine></OrderTimeLine>
					<OrderDeliveryInfo></OrderDeliveryInfo>
					<div
						class="d-flex flex-column flex-sm-row justify-space-between ga-sm-2">
						<div class="w-100">
							<OrderAddress
								:address="order.deliveryDetails.address"></OrderAddress>
						</div>
						<div class="w-100">
							<OrderRecipient
								:recipient="order.deliveryDetails.recipient"
								:address="order.deliveryDetails.address"></OrderRecipient>
						</div>
					</div>
					<OrderProductsHeader
						:productCount="productCount as number"></OrderProductsHeader>
					<OrderProductsContainer
						maxHeight="100%"
						:products="order.products">
						<template #default="{ product, index }">
							<OrderDetailsProduct :product="product"></OrderDetailsProduct>
						</template>
					</OrderProductsContainer>
					<div class="d-flex justify-end">
						<OrderDetailsSummary
							class="w-100 w-sm-50 w-md-33"
							:deliveryCost="order.deliveryDetails.cost.value"
							:totalPrice="
								order.deliveryDetails.cost.value + order.totalPrice.value
							"
							:productsCost="order.totalPrice.value"></OrderDetailsSummary>
					</div>
				</v-card-text>
			</v-card>
		</v-card>
	</Container>
	<Container v-else>nie znaleziono takiego zamówienia</Container>
</template>
<script setup lang="ts">
	definePageMeta({
		allowAnonymous: false
	})
	const orderStore = useOrderStore();
	const route = useRoute();
	const orderId = route.params.id as string;

	const { data: order, error } = useAsyncData(() =>
		orderStore.getOrder(orderId),
	);

	const productCount = computed(() =>
		order.value?.products.reduce((acc, item) => (acc += item.quantity), 0),
	);

	const breadcrumbs = computed(() => [
		{
			title: "Zamówienia",
			to: "account/orders",
			disabled: false,
		},
	]);
</script>

<style scoped>
	.min-main-content-height {
		min-height: 80vh;
	}
</style>
