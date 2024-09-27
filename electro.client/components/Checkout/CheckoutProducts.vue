<template>
	<OrderProductsHeader :productCount="cart.productsCount" />
	<OrderProductsContainer
		disable-border
		:md="12"
		maxHeight="100%"
		:products="cart.products">
		<template #default="{ product, index }">
			<OrderDetailsProduct
				:key="index"
				:product="product"></OrderDetailsProduct>
		</template>
	</OrderProductsContainer>
</template>
<script lang="ts" setup>
	import type { ICart } from "~/types/Cart/Cart";
	const props = defineProps<{ cart: ICart }>();
</script>
