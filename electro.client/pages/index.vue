<template>
	<Container>
		<v-container class="pa-0">
			<v-row>
				<v-col cols="4"></v-col>
				<v-col cols="8">
					<!-- <CardTitle>Polecamy</CardTitle>
					<ProductGrid
						:rows="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }"
						:columns="{ xs: 3, sm: 3, md: 4, lg: 4, xl: 4 }"
						:products="
							homeStore.store.bestsellersProducts.products ?? []
						"></ProductGrid> -->
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4"></v-col>
				<v-col cols="12" md="8">
					<CardTitle>Polecamy</CardTitle>
					<ProductCarousel
						:rows="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }"
						:columns="{ xs: 3, sm: 3, md: 4, lg: 4, xl: 4 }"
						:products="
							homeStore.store.bestsellersProducts.products ?? []
						"></ProductCarousel>
				</v-col>
			</v-row>
		</v-container>
	</Container>
</template>
<script setup lang="ts">
import ProductGrid from '~/components/Product/ProductGrid.vue';

	const homeStore = useHomeStore();
	useAsyncData(() =>
		homeStore.getBestsellersProducts({ pageNumber: 1, pageSize: 20 }),
	);
	useAsyncData(() =>
		homeStore.getProductsHits({ pageNumber: 1, pageSize: 10 }),
	);
	useAsyncData(() =>
		homeStore.getRecommendedProducts({ pageNumber: 1, pageSize: 10 }),
	);
</script>

<!-- <template v-for="(items) in homeStore.store.recommendedProducts.products">
			<ProductGridItem :product="items"></ProductGridItem>
		</template> -->
<!-- <Divider class="my-8" /> -->
<!-- <v-row
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
					v-if="status == 'success'"
					:max-items="4"
					header="Hity tygodnia"
					:products="data"
					:cols="6"
					:sm="6"></ProductsGrid>
			</v-col>
		</v-row> -->
<!-- <ProductsSlide header="Bestsellery" :products="data"></ProductsSlide> -->
