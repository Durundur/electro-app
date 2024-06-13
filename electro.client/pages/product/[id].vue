<template>
	<Container>
		<v-row :no-gutters="true">
			<v-col
				cols="12"
				sm="6"
				align-self="stretch"
				class="pr-2">
				<v-carousel
					hide-delimiters
					:show-arrows="product.photos.length > 1">
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
							<v-card-title class="px-0 nowrap-text">
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
								<div v-for="(field, index) in product.features">
									<span class="text-caption text-truncate d-block">
										{{ field.fieldName }}:
										<template v-for="(fieldVal, i) in field.fieldValue">
											{{
												`${fieldVal}${
													i !== field.fieldValue.length - 1 ? ", " : ""
												}`
											}}
										</template>
									</span>
								</div>
								<v-btn
									link
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
								{{ $formatters.priceFormatter(product.price.price) }} zł
							</v-card-title>
							<v-row
								:no-gutters="true"
								align="stretch">
								<v-col
									cols="3"
									class="mr-4">
									<v-select
										:value="1"
										:hide-details="true"
										density="compact"
										:items="[1, 2, 3, 4, 5, 6, 7, 8, '9+']"
										variant="outlined"></v-select>
								</v-col>
								<v-col cols="8">
									<v-btn
										height="100%"
										block
										prepend-icon="mdi-cart-plus"
										color="success"
										class="text-none">
										Dodaj do koszyka
									</v-btn>
								</v-col>
							</v-row>

							<div class="mt-4">
								<v-card
									class="my-1"
									link
									border
									elevation="0"
									:rounded="false"
									density="compact">
									<v-card-text class="d-flex align-center ga-3">
										<v-icon>mdi-check-circle-outline</v-icon>
										<div class="d-flex flex-column">
											<span class="text-start">Dostępny</span>
											<span class="text-caption">Dowiedz się więcej</span>
										</div>
									</v-card-text>
								</v-card>

								<v-card
									class="my-1"
									link
									border
									elevation="0"
									:rounded="false"
									density="compact">
									<v-card-text class="d-flex align-center ga-3">
										<v-icon>mdi-clock-outline</v-icon>
										<div class="d-flex flex-column">
											<span class="text-start">
												Kup teraz, a otrzymasz jutro
											</span>
											<span class="text-caption">Dowiedz się więcej</span>
										</div>
									</v-card-text>
								</v-card>

								<v-card
									link
									border
									elevation="0"
									:rounded="false"
									density="compact">
									<v-card-text class="d-flex align-center ga-3">
										<v-icon>mdi-truck-outline</v-icon>
										<div class="d-flex flex-column">
											<span class="text-start">Darmowa dostawa</span>
											<span class="text-caption">Sprawdź szczegóły</span>
										</div>
									</v-card-text>
								</v-card>
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
								<ProductRatingSummary
									:product="product"
									@fetch-opinions="onFetchOpinions" />
								<ProductAddOpinion
									:product="product"
									@new-opinion="onNewOpinion" />
							</div>
							<ProductOpionionGrid
								:items="product.opinions"
								@update-opinion="onUpdateOpinion"></ProductOpionionGrid>
							<div class="mx-auto my-4 button-limit">
								<v-btn
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
	const { $api } = useNuxtApp();
	const route = useRoute();
	const product = ref({});

	const { data: productRes } = await useAsyncData(() =>
		$api.get(`api/products/${route.params.id}`),
	);

	if (productRes.value.ok) {
		product.value = productRes.value.data;
	}

	function onNewOpinion(newOpinion) {
		product.value.opinions = [...product.value.opinions, newOpinion];
	}

	function onUpdateOpinion(updatedOpinion) {
		const opinions = [...product.value.opinions];
		const index = opinions.findIndex((o) => o.id === updatedOpinion.id);
		if (index !== -1) {
			opinions.splice(index, 1, updatedOpinion);
			product.value.opinions = opinions;
		}
	}

	async function onFetchOpinions(rating) {
		const response = await $api.get(
			`api/opinions/product/${product.value.id}/rating/${rating}`,
		);
		const { ok, data } = response;
		if (!ok) {
			$toast.error("Błąd podczas pobierania opinii");
		}
		product.value.opinions = data;
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
