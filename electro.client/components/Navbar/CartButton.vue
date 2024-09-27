<template>
	<v-btn
		size="small"
		variant="text"
		icon="mdi-cart-outline"
		to="/cart">
		<v-badge
			:model-value="cartProductsCount > 0"
			color="primary"
			:content="cartProductsCount">
			<v-icon size="large"></v-icon>
		</v-badge>
	</v-btn>
</template>
<script setup lang="ts">
	const cartStore = useCartStore();
	const cartProductsCount = computed(() => cartStore.cart.productsCount);
</script>
