<template>
	<Container>
		<v-breadcrumbs
			class="px-0 py-2"
			:items="breadcrumbs"></v-breadcrumbs>
		<v-card flat>
			<v-card-title class="text-body-1 px-1">
				{{ breadcrumbs[breadcrumbs.length - 1]?.title }}
				<span class="text-body-3">(431)</span>
			</v-card-title>
		</v-card>

		<v-row dense>
			<v-col
				cols="0"
				md="3"
				class="d-none d-md-block">
				<v-card
					border
					rounded="lg"
					elevation="0">
					<CategoryFilter v-model="activeCategories" />
					<FeaturesFilter />
				</v-card>
			</v-col>
			<v-col
				cols="12"
				md="9">
				<v-row dense>
					<v-col>
						<div class="d-md-none">
							<FiltersDialog v-model="activeCategories" />
						</div>
					</v-col>
					<v-col
						sm="6"
						md="5"
						lg="4">
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
					</v-col>
					<template v-if="products.length > 0">
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
					</template>
					<template v-else>
						<v-col cols="12">
							<NoResults>Brak wyników dla wybranych filtrów</NoResults>
						</v-col>
					</template>
				</v-row>
			</v-col>
		</v-row>
	</Container>
</template>

<script setup>
	const products = ref([]);
	const pagination = ref({});
	const filters = ref({});
	const activeCategories = ref({});
	const route = useRoute();
	const router = useRouter();
	const { $api } = useNuxtApp();

	parsePathParams();
	await useAsyncData("products", getProducts);

	watch(
		() => route.fullPath,
		async () => await getProducts(),
		{ deep: true },
	);

	const breadcrumbs = computed(() => {
		const breadcrumbs = [];
		activeCategories.value["group"]
			? breadcrumbs.push({
					title: activeCategories.value["group"].name,
					to: `/search/group/${activeCategories.value["group"].id}`,
					disabled: false,
			  })
			: null;
		activeCategories.value["category"]
			? breadcrumbs.push({
					title: activeCategories.value["category"].name,
					to: `/search/group/${activeCategories.value["group"].id}/category/${activeCategories.value["category"].id}`,
					disabled: false,
			  })
			: null;
		activeCategories.value["subCategory"]
			? breadcrumbs.push({
					title: activeCategories.value["subCategory"].name,
					to: `/search/group/${activeCategories.value["group"].id}/category/${activeCategories.value["category"].id}/subcategory/${activeCategories.value["subCategory"].id}`,
					disabled: false,
			  })
			: null;
		return breadcrumbs;
	});

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
