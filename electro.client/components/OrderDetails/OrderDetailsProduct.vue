<template>
	<v-card
		flat
		border
		rounded="lg"
		:to="`/product/${product.productId}`">
		<v-card-text class="pa-0 d-flex justify-start align-center ga-2">
			<v-img
				class="w-100"
				:aspect-ratio="4 / 3"
				:max-width="120"
				:src="product.photo"></v-img>
			<div>
				<span class="text-body-2 font-weight-bold">
					{{ product.name }}
				</span>
				<p class="text-no-wrap font-weight-bold mt-2">
					<span>
						{{ $formatters.priceFormatter(product.price.value) }}
					</span>
					<span class="px-2 text-grey-darken-1 text-body-2">&times</span>
					<span class="text-grey-darken-1 text-body-2">
						{{ product.quantity }} szt.
					</span>
				</p>
			</div>
		</v-card-text>
	</v-card>
</template>
<script lang="ts" setup>
	import type { IOrderProuct } from "~/types/Order/Order";
	const props = defineProps<{
		product: IOrderProuct;
	}>();
</script>
