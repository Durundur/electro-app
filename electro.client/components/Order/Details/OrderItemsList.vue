<template>
	<v-card
		border
		flat
		rounded="lg">
		<template v-for="(product, index) in products">
			<OrderListItem :product="product" />
			<v-divider v-if="index !== products.length - 1" />
		</template>
	</v-card>
</template>
<script setup>
	const props = defineProps({
		products: {
			type: Array,
			default: [],
		},
	});
</script>
