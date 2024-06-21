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
					aspect-ratio="1"
					:src="product.photos[0]"></v-img>
				<span class="product-name">{{ product.name }}</span>
				<div class="d-flex align-end product-price">
					<div>
						<span
							v-if="product.price.oldPrice"
							class="text-caption d-block text-decoration-line-through">
							{{ $formatters.priceFormatter(product.price.oldPrice) }} zł
						</span>
						<span class="text-body-1 d-block">
							{{ $formatters.priceFormatter(product.price.price) }} zł
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
<script>
	export default {
		props: {
			product: {
				type: Object,
				required: true,
				default() {
					return { id: null, title: null, image: null, price: null };
				},
			},
		},
	};
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
