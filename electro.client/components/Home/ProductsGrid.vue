<template>
	<v-card flat>
		<v-card-title class="px-0 text-h6 font-weight-medium">
			{{ header }}
		</v-card-title>
		<v-row dense>
			<v-col
				:cols="cols"
				:sm="sm"
				:md="md"
				v-for="(product, index) in productsToShow">
				<ProductGridItem :product="product"></ProductGridItem>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
	export default {
		props: {
			cols: {
				type: Number,
				default: 12,
			},
			sm: {
				type: Number,
			},
			md: {
				type: Number,
			},
			lg: {
				type: Number,
			},
			xl: {
				type: Number,
			},
			header: {
				type: String,
				required: false,
			},
			products: {
				type: Array,
				required: true,
				default: [],
			},
			maxItems: {
				type: Number,
			},
		},
		computed: {
			productsToShow() {
				if (this.maxItems) {
					return this.products.slice(0, this.maxItems);
				}
				return this.products;
			},
		},
	};
</script>
