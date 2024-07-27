<template>
	<v-card
		border
		flat
		rounded="lg"
		class="pa-4 text-body-1 text-bold">
		<div class="mb-2">
			<p class="d-inline-block text-start w-50">Łączna kwota</p>
			<p class="d-inline-block text-end w-50">
				{{ $formatters.priceFormatter(totalPrice) }} zł
			</p>
		</div>
		<v-divider></v-divider>
		<div
			v-if="moneySaved > 0"
			class="my-2 text-body-2 text-green">
			<p class="d-inline-block text-start w-50">Oszczędzasz</p>
			<p class="d-inline-block text-end w-50">
				{{ $formatters.priceFormatter(moneySaved) }} zł
			</p>
		</div>
		<div class="my-2">
			<p class="d-inline-block text-start w-50">Suma</p>
			<p class="d-inline-block text-end w-50">
				{{ $formatters.priceFormatter(totalPrice) }} zł
			</p>
		</div>
		<v-btn
			block
			append-icon="mdi-chevron-right"
			color="success"
			class="text-none">
			Dostawa i płatność
		</v-btn>
	</v-card>
</template>
<script lang="ts" setup>
	export interface ICartSummaryProps {
		totalPrice: number;
		moneySaved: number;
	}
	const props = defineProps<ICartSummaryProps>();
</script>
