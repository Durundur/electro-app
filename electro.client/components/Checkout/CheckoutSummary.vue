<template>
	<div>
		<SummaryItem
			:description="`Wartość produktów (${cart.productsCount})`"
			:value="$formatters.priceFormatter(cart.totalPrice.value)"></SummaryItem>
		<SummaryItem
			v-if="discountAmount > 0"
			class="text-success"
			:description="`Oszczędzasz`"
			:value="$formatters.priceFormatter(discountAmount)"></SummaryItem>
		<SummaryItem
			:description="`Dostawa`"
			:value="$formatters.priceFormatter(deliveryCost)"></SummaryItem>
		<v-divider class="my-2"></v-divider>
		<SummaryTotalItem
			:description="'Do zapłaty'"
			:value="
				$formatters.priceFormatter(cart.totalPrice.value + deliveryCost)
			"></SummaryTotalItem>
	</div>
</template>
<script lang="ts" setup>
	const { $formatters } = useNuxtApp();
	import type { ICart } from "~/types/cart";
	const props = defineProps<{
		cart: ICart;
		deliveryCost: number;
		discountAmount: number;
	}>();
</script>
