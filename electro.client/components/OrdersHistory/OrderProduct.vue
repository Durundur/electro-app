<template>
	<v-card flat>
		<v-card-text class="pa-0 d-flex justify-start align-center ga-2">
			<v-img
				class="border rounded-lg w-100"
				:aspect-ratio="4 / 3"
				:max-width="120"
				:src="product.photo"></v-img>

			<div>
				<NuxtLink
					:to="`/product/${product.productId}`"
					style="display: block; text-decoration: none; color: unset">
					<span class="text-body-2 font-weight-bold">
						{{ product.name }}
					</span>
				</NuxtLink>
				<p class="text-no-wrap font-weight-bold mt-2">
					<span>
						{{ $formatters.priceFormatter(product.price.price) }}
					</span>
					<span>zł</span>
					<span class="px-2 text-grey-darken-1 text-body-2">&times</span>
					<span class="text-grey-darken-1 text-body-2">
						{{ product.count }} szt.
					</span>
				</p>
			</div>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
	import type { IOrderProuct } from "~/types/order";
	interface IOrderProductProps {
		product: IOrderProuct;
	}
	const props = defineProps<IOrderProductProps>();
</script>
