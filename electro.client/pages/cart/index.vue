<template>
	<div class="min-main-content-height">
		<Container v-if="cart?.productsCount">
			<v-row no-gutters>
				<v-col
					cols="12"
					md="8"
					class="py-0">
					<v-card flat>
						<v-card-text class="pa-0">
							<v-alert
								class="mt-4 mb-2 text-body-3"
								type="warning"
								variant="tonal"
								v-for="(message, index) in cartStore.messages"
								@click:close="cartStore.removeMessage(index)"
								:text="message"
								closable
								density="compact"></v-alert>
						</v-card-text>
						<v-card-title class="px-0 text-h6 font-weight-medium d-flex">
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
						</v-card-title>
						<v-card-text class="px-0">
							<v-card
								border
								flat
								rounded="lg">
								<template
									v-for="(product, index) in cart.products"
									:key="product.productId">
									<CartListItem :product="product" />
									<v-divider v-if="index !== cart.products.length - 1" />
								</template>
							</v-card>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col
					cols="12"
					md="4"
					class="py-0 mb-4 mb-md-0 pt-md-3 pl-md-3">
					<v-card
						border
						flat
						rounded="lg">
						<v-card-title
							class="text-body-1 text-bold d-flex justify-space-between">
							<span class="text-start">Łączna kwota</span>
							<span class="text-end">
								{{ $formatters.priceFormatter(cart.totalPrice) }} zł
							</span>
						</v-card-title>
						<v-card-text class="text-body-1 text-bold">
							<v-divider></v-divider>
							<div
								v-if="savings > 0"
								class="my-2 text-body-2 text-green">
								<p class="d-inline-block text-start w-50">Oszczędzasz</p>
								<p class="d-inline-block text-end w-50">
									{{ $formatters.priceFormatter(savings) }} zł
								</p>
							</div>
							<div class="my-2">
								<p class="d-inline-block text-start w-50">Suma</p>
								<p class="d-inline-block text-end w-50">
									{{ $formatters.priceFormatter(cart.totalPrice) }} zł
								</p>
							</div>
							<v-btn
								block
								append-icon="mdi-chevron-right"
								color="success"
								class="text-none">
								Dostawa i płatność
							</v-btn>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</Container>
		<EmptyCart v-else></EmptyCart>
	</div>
</template>
<script setup>
	const cartStore = useCartStore();
	const cart = computed(() => cartStore.cart);
	const savings = computed(() => {
		return cart.value.products.reduce((acc, item) => {
			if (item.price.oldPrice) {
				const priceDiff = item.price.oldPrice - item.price.price;
				acc += priceDiff * item.count;
			}
			return acc;
		}, 0);
	});
</script>
