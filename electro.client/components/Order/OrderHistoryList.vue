<template>
	<div>
		<template v-for="(order, index) in orders">
			<OrderHistoryListItem :order="order"></OrderHistoryListItem>
			<v-divider v-if="index < orders.length - 1"></v-divider>
		</template>
	</div>
</template>
<script setup>
	const props = defineProps({
		orders: {
			type: Array,
			default: [],
		},
	});
</script>
