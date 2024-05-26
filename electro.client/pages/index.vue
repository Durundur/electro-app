<template>
	<div class="my-4">
		<Carousel></Carousel>
	</div>
	<Container>
		<ProductsGrid
			header="Polecamy"
			:products="products"
			:cols="6"
			:sm="4"></ProductsGrid>
		<Divider class="my-8" />
		<v-row
			align="center"
			gap>
			<v-col
				align-self="stretch"
				:cols="12"
				:sm="6">
				<SpecialOffer></SpecialOffer>
			</v-col>
			<v-col>
				<ProductsGrid
					:max-items="4"
					header="Hity tygodnia"
					:products="products"
					:cols="6"
					:sm="6"></ProductsGrid>
			</v-col>
		</v-row>
		<!-- <ProductsSlide header="Bestsellery" :products="items"></ProductsSlide> -->
	</Container>
</template>
<script setup>
	const { $api } = useNuxtApp();
	const products = ref([]);

	const { data: productsRes } = await useAsyncData(() =>
		$api.get("api/products"),
	);
	if (productsRes.value.ok) {
		products.value = productsRes.value.data;
	}
</script>
