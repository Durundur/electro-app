<template>
	<div
		class="bg-grey-lighten-4 pa-2 d-flex align-center justify-space-between px-4">
		<p class="text-no-wrap font-weight-bold">
			<span>
				{{ $formatters.priceFormatter(totalAmount) }}
			</span>
			<span class="text-grey-darken-1 text-body-2">
				({{ productCount }} produktów)
			</span>
		</p>
		<v-btn
			color="success"
			class="text-none"
			size="small"
			:to="`/account/orders/${orderId}`">
			Szczegóły
		</v-btn>
	</div>
</template>
<script lang="ts" setup>
	export interface IOrderFooterProps {
		orderId: string;
		productCount: number;
		totalAmount: number;
	}
	const props = defineProps<IOrderFooterProps>();
</script>
