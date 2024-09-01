<template>
	<Container v-if="cart.productsCount">
		<v-container class="px-0">
			<v-row>
				<v-col
					cols="12"
					md="8">
					<div>
						<div
							v-if="cartMessages.length > 0"
							class="mt-3">
							<CartMessage
								v-for="(message, index) in cartMessages"
								:text="message"
								:message-index="index"></CartMessage>
						</div>
						<div class="d-flex align-center">
							<CardTitle>Koszyk</CardTitle>
							<v-spacer></v-spacer>
							<v-btn
								variant="text"
								prepend-icon="mdi-trash-can-outline"
								class="text-none"
								@click="cartStore.clearCart">
								Wyczyść koszyk
							</v-btn>
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
					class="pt-0 pt-md-5">
					<v-card
						border
						flat
						rounded="lg"
						class="px-4">
						<CartSummary
							:cart-total-price="cart.totalPrice.value"
							:discount-amount="cartDiscountAmount"></CartSummary>
						<v-btn
							block
							append-icon="mdi-chevron-right"
							color="success"
							class="text-none my-3"
							@click="cartStore.goToCheckout()">
							Dostawa i płatność
						</v-btn>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</Container>
	<EmptyCartInfo v-else></EmptyCartInfo>
</template>
<script setup lang="ts">
	const cartStore = useCartStore();
	const cart = computed(() => cartStore.cart);
	const cartMessages = computed(() => cartStore.messages);
	const cartDiscountAmount = computed(() => cartStore.discountAmount);
	await useAsyncData("fetchCart", () => cartStore.loadCartData());
</script>
