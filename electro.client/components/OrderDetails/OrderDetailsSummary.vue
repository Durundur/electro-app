<template>
	<v-card
		flat
		rounded="lg">
		<v-card-text class="px-0">
			<div class="my-2">
				<p class="d-inline-block text-start w-50">Wartość koszyka</p>
				<p class="d-inline-block text-end w-50">
					{{ $formatters.priceFormatter(productsCost) }} 
				</p>
			</div>
			<div class="my-2">
				<p class="d-inline-block text-start w-50">Koszt dostawy</p>
				<p class="d-inline-block text-end w-50">
					{{ $formatters.priceFormatter(deliveryCost) }} 
				</p>
			</div>
			<v-divider></v-divider>
			<div class="my-2 font-600">
				<p class="d-inline-block text-start w-50">Razem</p>
				<p class="d-inline-block text-end w-50">
					{{ $formatters.priceFormatter(totalPrice) }} 
				</p>
			</div>
		</v-card-text>
	</v-card>
</template>
<script setup lang="ts">
	const props = defineProps<{
		totalPrice: number;
		deliveryCost: number;
		productsCost: number;
	}>();
</script>
