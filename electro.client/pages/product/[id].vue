<template>
	<Container v-if="product">
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
									v-model="product.averageOpinionsRating"
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
										@click="">
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
									v-if="opinionsStats"
									:opinions-stats="opinionsStats"
									:average-opinions-rating="product.averageOpinionsRating"
									:opinions-count="product.opinionsCount"
									@update:rating="(rating) => (opinionsRatingParam = rating)" />
								<OpinionCreate
									:product="product"
									@new:opinion="(v) => onNewOpinion(v)" />
							</div>
							<OpionionGrid
								v-if="opinions"
								:items="opinions"
								@update-opinion="(v) => onUpdateOpinion(v)"></OpionionGrid>
							<NewPagination v-if="product.opinionsCount > 0" :pagination-data="opinionsPagination" @on-new-page-number="(v) => opinionsPaginationParams.pageNumber = v"></NewPagination>
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
<script setup lang="ts">
	import NewPagination from "~/components/Common/NewPagination.vue";
	import type {
		IPaginationParams,
		IPaginationResult,
	} from "~/types/Api/PagedResult";
	import type { IOpinionWithUserAction } from "~/types/Opinion/Opinion";
	const productStore = useProductStore();
	const opinionStore = useOpinionStore();
	const route = useRoute();
	const opinionsPaginationParams = reactive<IPaginationParams>({
		pageNumber: 1,
		pageSize: 6,
	});
	const opinionsRatingParam = ref<number | undefined>(undefined);

	const { data: product } = await useAsyncData("getProduct", () =>
		productStore.getProduct(route.params.id as string),
	);
	const { data: productOpinions } = await useAsyncData(
		"getProductOpinions",
		() =>
			opinionStore.getProductOpinions(
				product.value?.id as string,
				opinionsPaginationParams,
				opinionsRatingParam.value,
			),
		{
			watch: [opinionsPaginationParams, opinionsRatingParam],
		},
	);
	
	const opinions = computed(() => productOpinions.value?.opinions.data);
	const opinionsPagination = computed(() => {
		if (productOpinions.value) {
			const { data, ...pagination } = productOpinions.value?.opinions;
			return pagination as IPaginationResult;
		}
		return {} as IPaginationResult
	});
	const opinionsStats = computed(() => productOpinions.value?.stats);

	const breadcrumbs = computed(() => {
		const breadcrumbs = [];
		if (product.value) {
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
		}
		return breadcrumbs;
	});

	function onNewOpinion(newOpinion: IOpinionWithUserAction) {
		if (opinions.value) {
			opinions.value.unshift(newOpinion);
		}
	}

	function onUpdateOpinion(updatedOpinion: IOpinionWithUserAction) {
		if (opinions.value) {
			const index = opinions.value.findIndex(
				(opinion) => opinion.id === updatedOpinion.id,
			);
			if (index !== -1) {
				opinions.value.splice(index, 1, updatedOpinion);
			}
		}
	}

	// function onAddProductToCart() {
	// 	const p = product.value;
	// 	const productPhotos = p.photos;
	// 	const productToAdd = {
	// 		quantity: productQuantity.value,
	// 		productId: p.id,
	// 		price: p.price,
	// 		photo: productPhotos.length > 0 ? productPhotos[0] : "",
	// 		name: p.name,
	// 	};
	// 	cartStore.addProductToCart(productToAdd);
	// }
</script>
<style scoped>
	.border {
		border-bottom: 0;
	}
	:deep(.v-progress-linear__determinate) {
		border-radius: inherit;
	}
</style>
