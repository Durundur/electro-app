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
				<v-row dense>
					<v-col
						cols="12"
						sm="3">
						<v-img
							class="mx-auto"
							:aspect-ratio="4 / 3"
							:max-width="200"
							:src="product.image"></v-img>
					</v-col>
					<v-col
						cols="12"
						sm="7"
						align-center>
						<v-card-subtitle class="px-0 text-body-2 default-text product-name">
							{{ product.name }}
						</v-card-subtitle>
						<div
							v-if="showRating"
							class="d-flex align-center ga-2 text-caption">
							<v-rating
								v-model="rating"
								half-increments
								color="primary"
								hover
								readonly
								size="x-small"
								density="comfortable"></v-rating>
							<span class="text-caption">({{ product.noOfOpinions }})</span>
						</div>
						<div v-if="showDetails">
							<div v-for="(detail, index) in product.details">
								<span class="text-caption text-truncate d-block">
									{{ detail.name }}: {{ detail.value }}
								</span>
							</div>
						</div>
					</v-col>
					<v-col
						cols="12"
						sm="2">
						<div
							class="d-flex flex-row flex-sm-column align-end justify-space-between h-100">
							<div class="d-flex flex-column justify-end">
								<span
									style="height: 20px"
									class="text-caption d-block text-decoration-line-through text-sm-end text-sm-body-2">
									{{
										product.oldPrice
											? $formatters.priceFormatter(product.oldPrice) + "zł"
											: null
									}}
								</span>
								<span class="text-body-1 d-block text-sm-h5">
									{{ $formatters.priceFormatter(product.price) }} zł
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
<script>
	export default {
		props: {
			showDetails: {
				type: Boolean,
				default: true,
			},
			showRating: {
				type: Boolean,
				default: true,
			},
			product: {
				type: Object,
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
		height: 3em;
	}
</style>
