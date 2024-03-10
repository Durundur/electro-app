<template>
	<v-card flat>
		<v-card-title class="px-0 text-h6 font-weight-medium">{{ header }}</v-card-title>
		<v-row dense>
			<v-col cols="6" sm="3" md="3" lg="2" v-for="(product, index) in products">
				<ProductItem :product="product"></ProductItem>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	props: {
		products: {
			type: Array,
			required: true,
			default: () => {
				return [];
			}
		},
		header: {
			type: String,
			required: false
		}
	}
};
</script>
