<template>
	<Container>
		<v-row :no-gutters="true">
			<v-col
				cols="12"
				sm="6"
				align-self="center">
				<v-img :src="product.photos[0]"></v-img>
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
								<ProductRatingStars
									v-model="rating"
									:disabled="true" />
								<span class="ml-2 text-caption">
									({{ product.opinions?.length }} opinii)
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
								{{ product.price.price }} zł
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
								<ProductRatingSummary />
								<ProductAddOpinion :product="{ name, photos }" />
							</div>
							<ProductOpionionGrid
								:items="product.opinions"></ProductOpionionGrid>
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

	//       rating: 2.9,
	//       opionions: [
	//         {
	//           createdAt: "10/31/2023",
	//           rating: 4.5,
	//           title: "Great purchase!",
	//           review:
	//             "Our big family room TV stopped working. We didnt want to spend a lot. This was a great deal and the perfect size. It has Roku so its taking a bit to get used tit. Picture is crystal clear! We are very happy with our purchase",
	//           authorName: "John",
	//           isVerifiedPurchase: true,
	//           likes: 0,
	//           dislikes: 10,
	//         },
	//         {
	//           createdAt: "11/31/2023",
	//           rating: 4.3,
	//           title: "Świetny telefon",
	//           review:
	//             "Świetny telefon, działa jak burza. Jedyny mały minus to program zwrotu 400 zł, który jest tak na prawdę sprzedażą twoich danych jakimś zewnętrznym firmom. Moim zdaniem trochę nie fair polityka, bo można byłoby zwyczajnie obniżyć cenę urządzenia na start zamiast zmuszać do sprzedaży danych.",
	//           authorName: "Marek",
	//           isVerifiedPurchase: false,
	//           likes: 41,
	//           dislikes: 5,
	//         },
	//         {
	//           createdAt: "1/31/2023",
	//           rating: 3.45,
	//           title: "Ok",
	//           review:
	//             "Najlepszy telefon obecnie na rynku, genialny aparat, mega szybki.",
	//           authorName: "Kamil",
	//           isVerifiedPurchase: true,
	//           likes: 11,
	//           dislikes: 5,
	//         },
	//         {
	//           createdAt: "19/31/2023",
	//           rating: 3.45,
	//           title: "Ok",
	//           review: `Dory smartfon.Używam iPhone 15 plus i do niego pomimo różnic w systemie porównam.Szybkość działania podobna,skaner twarzy
	// gorszy,odcisk palca szybki,wyświetlacz dobry lecz nie ma wielkiej różnicy w oglądaniu ( onepus lepszy przy przewijaniu obrazu
	// np.góra-dół).Przewaga oneplusa to to,że jest bardziej poręczny od iPhona 15 plus ,lepiej się go trzyma w ręku-jest jednak węższy.Jeżeli ktoś
	// obawia się wielkości ekranu to niech się nie martwi,ten smarfon wymiarami bardzo podobny jak stary Samsung A 70. Super telefon . Pełnoprawny flagowiec. Wydajność , ekran, aparat , bateria na najwyższym poziomie . Wersja kolorystyczna`,
	//           authorName: "Radosław",
	//           isVerifiedPurchase: true,
	//           likes: 1,
	//           dislikes: 0,
	//         },
	//         {
	//           createdAt: "1/31/2023",
	//           rating: 3.45,
	//           title: "Ok",
	//           review: "Całkiem Ok",
	//           authorName: "Kamil",
	//           isVerifiedPurchase: true,
	//           likes: 11,
	//           dislikes: 5,
	//         },
	//         {
	//           createdAt: "1/31/2023",
	//           rating: 1.45,
	//           title: "Spoko",
	//           review: `Smartfon działa i wygląda bardzo dobrze. Aparatu jeszcze nie przetestowałem, ale bateria, jej ładowanie i długość pracy jest rewelacja.
	// Co prawda okazało się że najnowszy Snapdragon jest za nowy i np. gra Pokemon Go co jakiś czas się wywraca, ale to podobno wina Nintica i
	// Unity, bo to samo jest na Samsungu S24 Ultra.`,
	//           authorName: "Kamil",
	//           isVerifiedPurchase: true,
	//           likes: 11,
	//           dislikes: 5,
	//         },
</script>
<style scoped>
	.border {
		border-bottom: 0;
	}
	:deep(.v-progress-linear__determinate) {
		border-radius: inherit;
	}
</style>
