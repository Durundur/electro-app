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
				<v-row
					dense
					align="stretch">
					<v-col
						cols="12"
						sm="3"
						align-self="center">
						<v-img
							class="mx-auto"
							:aspect-ratio="4 / 3"
							:max-width="200"
							:src="product.photos[0]"></v-img>
					</v-col>
					<v-col
						cols="12"
						sm="7"
						align-self="start"
						style="min-height: 140px">
						<v-card-subtitle class="px-0 text-body-2 default-text product-name">
							{{ product.name }}
						</v-card-subtitle>
						<div class="d-flex align-center ga-2 text-caption">
							<v-rating
								v-model="product.avgOpinionsRating"
								half-increments
								color="primary"
								hover
								readonly
								size="x-small"
								density="comfortable"></v-rating>
							<span class="text-caption">({{ product.opinionsCount }})</span>
						</div>
						<div>
							<ProductFeaturesList :features="product.features" />
						</div>
					</v-col>
					<v-col
						cols="12"
						sm="2"
						align-self="stretch">
						<div
							class="d-flex flex-row flex-sm-column align-end justify-space-between h-100">
							<div class="d-flex flex-column justify-end">
								<span
									style="height: 20px"
									class="text-caption d-block text-decoration-line-through text-sm-end text-sm-body-2">
									{{
										product.price.oldPrice
											? $formatters.priceFormatter(product.price.oldPrice) +
											  "zł"
											: null
									}}
								</span>
								<span
									class="d-block text-h6"
									style="white-space: nowrap">
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
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-hover>
</template>
<script setup>
	const props = defineProps({
		product: {
			type: Object,
			required: true,
		},
	});
</script>
<style scoped>
	.product-name {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
	}
</style>
