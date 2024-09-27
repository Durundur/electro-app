<template>
	<v-hover v-slot:default="{ isHovering, props }">
		<v-card
			v-bind="props"
			link
			:to="`/product/${product.id}`"
			elevation="0"
			border
			rounded="lg">
			<v-card-text>
				<v-img
					:aspect-ratio="4/3"
					:src="product.photo"></v-img>
				<span class="product-name">{{ product.name }}</span>
				<div class="d-flex align-end product-price">
					<div>
						<span
							v-if="product.price.oldPriceValue"
							class="text-caption d-block text-decoration-line-through">
							{{ $formatters.priceFormatter(product.price.oldPriceValue) }}
						</span>
						<span class="text-body-1 d-block">
							{{ $formatters.priceFormatter(product.price.value) }}
						</span>
					</div>
					<v-spacer></v-spacer>
					<v-fade-transition>
						<v-btn
							size="small"
							v-if="isHovering"
							color="success"
							icon="mdi-cart-outline"></v-btn>
					</v-fade-transition>
				</div>
			</v-card-text>
		</v-card>
	</v-hover>
</template>
<script setup lang="ts">
	import type { IProductOverview } from '~/types/Product/Product';
	const { $formatters } = useNuxtApp();
	const props = defineProps<{
		product: IProductOverview;
	}>();
</script>
<style scoped>
	.product-name {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
		padding: 0;
		font-size: inherit;
		line-height: 1.5em;
		height: 3em;
	}
	.product-price {
		height: 3em;
	}
</style>
