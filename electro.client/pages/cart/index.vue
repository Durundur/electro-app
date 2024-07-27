<template>
	<Container
		class="min-main-content-height"
		v-if="cart?.productsCount">
		<v-row no-gutters>
			<v-col
				cols="12"
				md="8">
				<div>
					<div class="mt-3">
						<CartMessage
							v-for="(message, index) in cartStore.messages"
							:text="message"
							:message-index="index"></CartMessage>
					</div>
					<div class="my-2 text-h6 font-weight-medium d-flex">
						<p>Koszyk ({{ cart.productsCount }})</p>
						<v-spacer></v-spacer>
						<div>
							<v-btn
								variant="text"
								prepend-icon="mdi-trash-can-outline"
								class="text-none"
								@click="cartStore.clearCart">
								Wyczyść koszyk
							</v-btn>
						</div>
					</div>
					<div>
						<v-card
							border
							flat
							rounded="lg">
							<template
								v-for="(product, index) in cart.products"
								:key="product.productId">
								<CartProduct :product="product" />
								<v-divider v-if="index !== cart.products.length - 1" />
							</template>
						</v-card>
					</div>
				</div>
			</v-col>
			<v-col
				cols="12"
				md="4"
				class="my-2 my-md-0 pt-md-3 pl-md-3">
				<CartSummaryPanel
					:moneySaved="moneySaved"
					:totalPrice="cart.totalPrice"></CartSummaryPanel>
			</v-col>
		</v-row>
	</Container>
	<EmptyCartInfo v-else></EmptyCartInfo>
</template>
<script setup>
	const cartStore = useCartStore();
	const cart = computed(() => cartStore.cart);

	const moneySaved = computed(() => {
		return cart.value.products.reduce((acc, item) => {
			if (item.price.oldPrice) {
				const priceDiff = item.price.oldPrice - item.price.price;
				acc += priceDiff * item.count;
			}
			return acc;
		}, 0);
	});
</script>
