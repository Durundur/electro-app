<template>
	<Container>
		<v-breadcrumbs
			class="pa-0 pt-4"
			:items="breadcrumbs"></v-breadcrumbs>
		<v-row :no-gutters="true">
			<v-col
				cols="12"
				sm="6"
				align-self="stretch"
				class="pr-sm-4">
				<v-carousel
					hide-delimiters
					:show-arrows="true">
					<v-carousel-item
						v-for="photo in product.photos"
						:src="photo"></v-carousel-item>
				</v-carousel>
			</v-col>
			<v-col
				cols="12"
				sm="6">
				<v-row :no-gutters="true">
					<v-col
						cols="12"
						class="order-0">
						<v-card flat>
							<v-card-title class="px-0 pt-0 nowrap-text">
								{{ product.name }}
							</v-card-title>
							<NuxtLink class="d-flex align-center">
								<v-rating
									v-model="product.avgOpinionsRating"
									half-increments
									color="primary"
									hover
									readonly
									size="x-small"
									density="comfortable"></v-rating>
								<span class="ml-2 text-caption">
									({{ product.opinionsCount }} opinii)
								</span>
							</NuxtLink>
							<NuxtLink>
								<span class="text-caption">Pytania i odpowiedzi (9)</span>
							</NuxtLink>
						</v-card>
					</v-col>

					<v-col
						cols="12"
						lg="6"
						class="order-1 order-sm-2">
						<v-card
							flat
							:no-gutters="true">
							<v-card-text class="px-0">
								<ProductFeaturesList :features="product.features" />
								<v-btn
									href="#specification"
									variant="tonal"
									density="compact"
									class="mt-2 text-body-3 text-none"
									append-icon="mdi-chevron-double-down">
									Przewiń do pełnej specyfikacji
								</v-btn>
							</v-card-text>
						</v-card>
					</v-col>

					<v-col
						cols="12"
						lg="6"
						class="order-2 order-sm-1 order-lg-last">
						<v-card flat>
							<v-card-title class="px-0">
								{{ $formatters.priceFormatter(product.price.value) }}
							</v-card-title>
							<v-row
								:no-gutters="true"
								align="stretch"
								justify="space-between">
								<QuantitySelector v-model="productQuantity"></QuantitySelector>
								<v-col cols="8">
									<v-btn
										height="100%"
										block
										prepend-icon="mdi-cart-plus"
										color="success"
										class="text-none"
										@click="onAddProductToCart">
										Dodaj do koszyka
									</v-btn>
								</v-col>
							</v-row>

							<div class="mt-4">
								<PurchaseInfo />
							</div>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12">
				<v-card flat>
					<v-card
						border
						elevation="0"
						class="my-4">
						<v-btn
							class="text-none"
							variant="text"
							href="#description">
							Opis
						</v-btn>
						<v-btn
							class="text-none"
							variant="text"
							href="#specification">
							Specyfikacja
						</v-btn>
						<v-btn
							class="text-none"
							variant="text"
							href="#accessories">
							Akcesoria
						</v-btn>
						<v-btn
							class="text-none"
							variant="text"
							href="#opinions">
							Opinie (60)
						</v-btn>
						<v-btn
							class="text-none"
							variant="text"
							href="#q&a">
							Pytania i odpowiedzi (9)
						</v-btn>
					</v-card>
					<Divider></Divider>
					<v-card
						flat
						id="description">
						<v-card-title class="px-0">Opis</v-card-title>
						<v-card-text
							v-html="product.description"
							class="px-0"></v-card-text>
					</v-card>
					<Divider></Divider>
					<v-card
						flat
						id="specification">
						<v-card-title class="px-0">Specyfikacja</v-card-title>
						<v-card-text class="px-0">
							<ProductSpecificationList
								:specification="
									product.specification
								"></ProductSpecificationList>
						</v-card-text>
					</v-card>
					<Divider></Divider>
					<v-card
						flat
						id="accessories">
						<v-card-title class="px-0">Akcesoria</v-card-title>
						<v-card-text class="px-0"></v-card-text>
					</v-card>
					<Divider></Divider>
					<v-card
						flat
						id="opinions">
						<v-card-title class="px-0">Opinie</v-card-title>
						<v-card-text class="px-0">
							<div class="my-4">
								<RatingSummary
									:opinionsStats="opinionsStats"
									:avgOpinionsRating="product.avgOpinionsRating"
									:opinionsCount="product.opinionsCount"
									@fetch-opinions="fetchOpinions" />
								<OpinionCreate
									:product="product"
									@new-opinion="onNewOpinion" />
							</div>
							<OpionionGrid
								:items="product.opinions"
								@update-opinion="onUpdateOpinion"></OpionionGrid>
							<div class="mx-auto my-4 button-limit">
								<v-btn
									v-if="
										opinionsPagination.pageNumber <
										opinionsPagination.totalPages
									"
									@click="
										fetchOpinions(
											ratingFilter,
											opinionsPagination.pageNumber + 1,
										)
									"
									class="text-none"
									color="primary"
									block>
									Pokaż więcej
								</v-btn>
							</div>
						</v-card-text>
					</v-card>
					<Divider></Divider>
					<v-card
						flat
						id="q&a">
						<v-card-title class="px-0">Pytania i odpowiedzi</v-card-title>
						<v-card-text class="px-0"></v-card-text>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</Container>
</template>
<script setup>
	const cartStore = useCartStore();
	const { $api } = useNuxtApp();
	const route = useRoute();
	const product = ref({});
	const opinionsStats = ref([]);
	const opinionsPagination = ref({});
	const ratingFilter = ref(null);
	const productQuantity = ref(1);

	const { data: productRes } = await useAsyncData(() =>
		$api.get(`api/products/${route.params.id}`),
	);
	if (productRes.value.ok) {
		product.value = productRes.value.data;
	}

	const { data: opinionsRes } = await useAsyncData(() =>
		$api.get(`api/opinions/product/${product.value.id}`),
	);
	if (opinionsRes.value.ok) {
		const { stats, opinions } = opinionsRes.value.data;
		const { data, ...pagination } = opinions;
		product.value.opinions = data;
		opinionsPagination.value = pagination;
		opinionsStats.value = stats;
	}

	const breadcrumbs = computed(() => {
		const breadcrumbs = [];
		const { group, category, subCategory } = product.value;
		group?.name
			? breadcrumbs.push({
					title: group.name,
					to: `/search/group/${group.id}`,
					disabled: false,
			  })
			: null;
		category?.name
			? breadcrumbs.push({
					title: category.name,
					to: `/search/group/${group.id}/category/${category.id}`,
					disabled: false,
			  })
			: null;
		subCategory?.name
			? breadcrumbs.push({
					title: subCategory.name,
					to: `/search/group/${group.id}/category/${category.id}/subcategory/${subCategory.id}`,
					disabled: false,
			  })
			: null;
		return breadcrumbs;
	});

	function onNewOpinion(newOpinion) {
		product.value.opinions = [newOpinion, ...product.value.opinions];
	}

	function onUpdateOpinion(updatedOpinion) {
		const opinions = [...product.value.opinions];
		const index = opinions.findIndex((o) => o.id === updatedOpinion.id);
		if (index !== -1) {
			opinions.splice(index, 1, updatedOpinion);
			product.value.opinions = opinions;
		}
	}

	async function fetchOpinions(rating, page = 1) {
		ratingFilter.value = rating;
		let url = `api/opinions/product/${product.value.id}`;
		if (rating !== null) {
			url += `/rating/${rating}`;
		}
		if (page) {
			const params = new URLSearchParams();
			params.append("PageNumber", page);
			url += `?${params.toString()}`;
		}
		const response = await $api.get(url);
		const { ok, data } = response;
		if (!ok) {
			$toast.error("Błąd podczas pobierania opinii");
			return;
		}
		const { stats, opinions } = data;
		const { data: opinionsItems, ...pagination } = opinions;
		if (page !== 1)
			product.value.opinions = [...product.value.opinions, ...opinionsItems];
		else product.value.opinions = [...opinionsItems];
		opinionsPagination.value = pagination;
		opinionsStats.value = stats;
	}

	function onAddProductToCart() {
		const p = product.value;
		const productPhotos = p.photos;
		const productToAdd = {
			quantity: productQuantity.value,
			productId: p.id,
			price: p.price,
			photo: productPhotos.length > 0 ? productPhotos[0] : "",
			name: p.name,
		};
		cartStore.addProductToCart(productToAdd);
	}
</script>
<style scoped>
	.border {
		border-bottom: 0;
	}
	:deep(.v-progress-linear__determinate) {
		border-radius: inherit;
	}
</style>
