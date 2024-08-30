<template>
	<div>
		<SummaryItem
			:description="'Wartość produktów'"
			:value="$formatters.priceFormatter(cartTotalPrice)"></SummaryItem>
		<SummaryItem
			class="text-success"
			:description="'Oszczędzasz'"
			:value="$formatters.priceFormatter(discountAmount)"></SummaryItem>
		<v-divider class="my-2"></v-divider>
		<SummaryTotalItem
			:description="'Do zapłaty'"
			:value="
				$formatters.priceFormatter(cartTotalPrice)
			"></SummaryTotalItem>
	</div>
</template>
<script lang="ts" setup>
	export interface ICartSummaryProps {
		cartTotalPrice: number;
		discountAmount: number;
	}
	const props = defineProps<ICartSummaryProps>();
</script>
