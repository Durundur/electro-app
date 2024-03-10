<template>
	<v-card v-on-resize="log" flat>
		<v-card-title class="px-0 text-h6 font-weight-medium">{{ header }}</v-card-title>
		<v-carousel :continuous="false" height="auto" hide-delimiters class="elevation-0">
			<v-carousel-item v-for="(product, index) in products" :key="index">
				<v-row dense>
					<v-col>
						<ProductItem :product="product"></ProductItem>
					</v-col>
				</v-row>
			</v-carousel-item>
		</v-carousel>
	</v-card>
</template>

<script>
export default {
	props: {
		products: {
			type: Array,
			required: true,
			default: () => []
		},
		header: {
			type: String,
			required: false
		}
	}
};
</script>

<style scoped></style>
