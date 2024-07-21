<template>
	<v-card flat>
		<v-card-text class="d-flex flex-column ga-2">
			<div class="d-flex flex-row justify-space-between align-center">
				<span>Nr. zamówienia:</span>
				<span>{{ order.id }}</span>
			</div>
			<div class="d-flex flex-row justify-space-between align-center">
				<span>Data złożenia:</span>
				<span>
					{{
						new Date(order.createdAt).toLocaleString("pl-PL", {
							dateStyle: "short",
							timeStyle: "medium",
						})
					}}
				</span>
			</div>
			<div class="d-flex flex-row justify-space-between align-center">
				<span>Status:</span>
				<span>
					{{ order.status }}
				</span>
			</div>
			<div class="d-flex flex-row justify-space-between align-center">
				<span>Wartość:</span>
				<span>{{ $formatters.priceFormatter(order.totalPrice) }} zł</span>
			</div>
			<v-btn
				block
				variant="tonal"
				size="small"
				class="text-none text-body-3 font-weight-regular"
				:to="`/account/orders/${order.id}`">
				Szczegóły
			</v-btn>
		</v-card-text>
	</v-card>
</template>
<script setup>
	const props = defineProps({
		order: {
			type: Object,
		},
	});
</script>
