<template>
	<SubCardTitle>Produkty</SubCardTitle>
	<OrderProductsContainer
		:md="12"
		maxHeight="100%"
		:products="products">
		<template #default="{ product, index }">
			<OrderDetailsProduct :product="product"></OrderDetailsProduct>
		</template>
	</OrderProductsContainer>
</template>
<script lang="ts" setup>
	import type { IOrderProuct } from "~/types/Order/Order";
	import utlis from "~/utlis";

	const productCount = computed(() =>
		utlis.countTotalOrderProductsQuantity(products.value as IOrderProuct[]),
	);
</script>
