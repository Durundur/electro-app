<template>
	<Container class="pa-4">
		<v-row dense>
			<v-col
				cols="0"
				md="3"
				class="d-none d-md-block">
				<v-sheet
					border
					class="h-100"
					rounded="lg">
					<CategoryFilter />
					<FeaturesFilter />
				</v-sheet>
			</v-col>
			<v-col
				cols="12"
				md="9">
				<v-row dense>
					<v-col cols="12">
						<v-sheet
							flat
							border
							rounded="lg"
							class="my-1 d-flex align-center">
							<div class="d-md-none">
								<FiltersDialog />
							</div>
							<v-select
								density="compact"
								label="Sortowanie"
								:items="[
									'Od najpopularniejszych',
									'Ocena klientów: od najlepszej',
									'Cena: od najtańszych',
									'Cena: od najdroższych',
								]"
								variant="outlined"
								hide-details
								clearable></v-select>
						</v-sheet>
					</v-col>
					<v-col
						cols="12"
						v-for="(product, index) in products"
						:key="index">
						<ProductListItem :product="product" />
					</v-col>
					<v-col
						cols="12"
						class="my-2">
						<Pagination v-model="pagination" />
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</Container>
</template>

<script setup>
	const products = ref([]);
	const pagination = ref({});
	const filters = ref({});
	const route = useRoute();
	const router = useRouter();
	const { $api } = useNuxtApp();

	parsePathParams();
	await useAsyncData("products", getProducts);

	async function getProducts() {
		let url = `api/products/search`;
		const queryParamsString = new URLSearchParams(route.query).toString();
		url += `?${queryParamsString}`;
		const { ok, data } = await $api.post(url, filters.value);
		if (ok) {
			const { data: items, ...paginationStats } = data;
			products.value = items;
			pagination.value = paginationStats;
		}
	}
	watch(
		() => route.query,
		async () => await getProducts(),
		{ deep: true }
	);

	function parsePathParams() {
		const pathParams = route.params.filters;
		const filtersObj = {};
		for (let i = 0; i < pathParams.length; i += 2) {
			const key = pathParams[i];
			const value = pathParams[i + 1];
			if (key && value) {
				filtersObj[key] = parseInt(value);
			}
		}
		filters.value = filtersObj;
	}
</script>

<style scoped></style>
