<template>
	<Container>
		<v-row :no-gutters="true">
			<v-col cols="12">
				<v-img :src="photos[0]"></v-img>
			</v-col>
			<v-col cols="12">
				<v-card flat>
					<v-card-title class="px-0 nowrap-text">{{ name }}</v-card-title>
					<NuxtLink class="d-flex align-center">
						<ProductRating :rating="2.6" />
						<span class="ml-2 text-caption">(60 opinii)</span>
					</NuxtLink>
					<NuxtLink>
						<span class="text-caption">Pytania i odpowiedzi (9)</span>
					</NuxtLink>
					<v-card-title class="px-0">4 999,00 zł</v-card-title>

					<v-row :no-gutters="true">
						<v-col cols="3">
							<v-select :value="1" :hide-details="true" density="compact" :items="[1, 2, 3, 4, 5, 6, 7, 8, '9+']" variant="outlined"></v-select>
						</v-col>
						<v-col class="ml-4">
							<v-btn height="100%" :flat="true" block prepend-icon="mdi-cart-plus" color="success" class="text-none">Dodaj do koszyka</v-btn>
						</v-col>
					</v-row>

					<div class="my-4">
						<v-card class="my-1" link border elevation="0" :rounded="false" density="compact">
							<v-card-text class="d-flex align-center ga-3">
								<v-icon>mdi-check-circle-outline</v-icon>
								<div class="d-flex flex-column">
									<span class="text-start">Dostępny</span>
									<span class="text-caption">Dowiedz się więcej</span>
								</div>
							</v-card-text>
						</v-card>

						<v-card class="my-1" link border elevation="0" :rounded="false" density="compact">
							<v-card-text class="d-flex align-center ga-3">
								<v-icon>mdi-clock-outline</v-icon>
								<div class="d-flex flex-column">
									<span class="text-start">Kup teraz, a otrzymasz jutro</span>
									<span class="text-caption">Dowiedz się więcej</span>
								</div>
							</v-card-text>
						</v-card>

						<v-card class="my-1" link border elevation="0" :rounded="false" density="compact">
							<v-card-text class="d-flex align-center ga-3">
								<v-icon>mdi-truck-outline</v-icon>
								<div class="d-flex flex-column">
									<span class="text-start">Darmowa dostawa</span>
									<span class="text-caption">Sprawdź szczegóły</span>
								</div>
							</v-card-text>
						</v-card>
					</div>

					<v-card border elevation="0" class="my-4">
						<v-btn class="text-none" variant="text" href="#description">Opis</v-btn>
						<v-btn class="text-none" variant="text" href="#specyfication">Specyfikacja</v-btn>
						<v-btn class="text-none" variant="text" href="#accessories">Akcesoria</v-btn>
						<v-btn class="text-none" variant="text" href="#opinions">Opinie (60)</v-btn>
						<v-btn class="text-none" variant="text" href="#q&a">Pytania i odpowiedzi (9)</v-btn>
					</v-card>
					<v-divider class="border-opacity-100" color="primary"></v-divider>
					<v-card flat id="description">
						<v-card-title class="px-0">Opis</v-card-title>
						<v-card-text v-html="desc" class="px-0"></v-card-text>
					</v-card>
					<v-divider class="border-opacity-100" color="primary"></v-divider>
					<v-card flat id="specyfication">
						<v-card-title class="px-0">Specyfikacja</v-card-title>
						<v-card-text class="px-0">
							<ProductSpecificationList :specification="specification"></ProductSpecificationList>
						</v-card-text>
					</v-card>
					<v-divider class="border-opacity-100" color="primary"></v-divider>
					<v-card flat id="accessories">
						<v-card-title>Akcesoria</v-card-title>
						<v-card-text></v-card-text>
					</v-card>
					<v-divider class="border-opacity-100" color="primary"></v-divider>
					<v-card flat id="opinions">
						<v-card-title>Opinie</v-card-title>
						<v-card-text></v-card-text>
					</v-card>
					<v-divider class="border-opacity-100" color="primary"></v-divider>
					<v-card flat id="q&a">
						<v-card-title>Pytania i odpowiedzi</v-card-title>
						<v-card-text></v-card-text>
					</v-card>
				</v-card>
			</v-col>
		</v-row>
	</Container>
</template>
<script>
export default {
	data() {
		return {
			id: 123123,
			name: 'OnePlus 12 5G 16/512GB Flowy Emerald 120Hz',
			price: {
				newPrice: null,
				oldPrice: 4999.0,
				currency: 'PLN'
			},
			photos: [
				'https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_19_433_01.jpg',
				'https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_25_490_04.jpg',
				'https://cdn.x-kom.pl/i/setup/images/prod/big/product-large,,2024/1/pr_2024_1_17_11_18_31_250_07.jpg',
				'https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_23_576_03.jpg',
				'https://cdn.x-kom.pl/i/setup/images/prod/big/product-large,,2024/1/pr_2024_1_17_11_18_33_201_08.jpg'
			],
			specification: {
				procesor: 'Qualcomm Snapdragon 8 gen 3 (1x 3.3 GHz, X4 + 5x 3.0 GHz, A720 + 2x 2.3 GHz)',
				'układ graficzny': 'Adreno 750',
				'Pamięć RAM': '16 GB',
				'Pamięć wbudowana': '512 GB',
				'Typ ekranu': 'Dotykowy, AMOLED',
				'Częstotliwość odświeżania ekranu': '120Hz',
				'Przekątna ekranu': '6,82"',
				'Rozdzielczość ekranu': '3168 x 1440',
				'Rozdzielczość aparatu - tył': ['50.0 Mpix', '48.0 Mpix - ultraszerokokątny', '64.0 Mpix - teleobiektyw'],
				Łączność: ['5G', 'Wi-Fi', 'NFC', 'Bluetooth 5.4', 'LoraWan', 'BLE']
			},
			rewievs: {},
			desc: `<div class="row text-left fresh-content">
	<div class="col-md-2 text-center">
	<div class="col-md-10">
		<h2 class="text-left">
			OnePlus 12 5G 512 GB Flowy Emerald</h2>
		<p>
			Jeśli szukasz flagowego smartfona z mnogością doskonałych rozwiązań to OnePlus 12 5G 512 GB Flowy Emerald jest właśnie dla Ciebie. Swoją niesamowitą wydajność zawdzięcza procesorowi Procesor Snapdragon 8 Gen 3 i baterii o dużej pojemności. Oprócz tego ekran AMOLED i częstotliwość odświeżania 120 Hz przeniesie Cię w świat pełen detali, niesamowitych szczegółów i barw, które zachwycają. Skorzystaj z ładowania 100 W i wróć błyskawicznie do najlepszej rozrywki.</p>
	</div>
</div>`
		};
	}
};
</script>
<style>
.border {
	border-bottom: 0;
}
</style>
