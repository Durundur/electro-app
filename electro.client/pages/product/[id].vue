<template>
  <Container>
    <v-row :no-gutters="true">
      <v-col cols="12" sm="6" align-self="center">
        <v-img :src="photos[0]"></v-img>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row :no-gutters="true">

          <v-col cols="12" class="order-0">
            <v-card flat>
              <v-card-title class="px-0 nowrap-text">{{ name }}</v-card-title>
              <NuxtLink class="d-flex align-center">
                <ProductRatingStars v-model="rating" :disabled="true" />
                <span class="ml-2 text-caption">(60 opinii)</span>
              </NuxtLink>
              <NuxtLink>
                <span class="text-caption">Pytania i odpowiedzi (9)</span>
              </NuxtLink>
            </v-card>
          </v-col>

          <v-col cols="12" lg="6" class="order-1 order-sm-2">
            <v-card flat :no-gutters="true">
              <v-card-text class="px-0">
                <div v-for="(detail, index) in details">
                  <span class="text-caption text-truncate d-block"
                    >{{ detail.name }}: {{ detail.value }}</span
                  >
                </div>
                <v-btn
                  link
                  href="#specification"
                  variant="tonal"
                  density="compact"
                  class="mt-2 text-body-3 text-none"
                  append-icon="mdi-chevron-double-down"
                  >Przewiń do pełnej specyfikacji</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="6" class="order-2 order-sm-1 order-lg-last">
            <v-card flat>
              <v-card-title class="px-0">4 999,00 zł</v-card-title>
              <v-row :no-gutters="true" align="stretch">
                <v-col cols="3" class="mr-4">
                  <v-select
                    :value="1"
                    :hide-details="true"
                    density="compact"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, '9+']"
                    variant="outlined"
                  ></v-select>
                </v-col>
                <v-col cols="8">
                  <v-btn
                    height="100%"
                    :flat="true"
                    block
                    prepend-icon="mdi-cart-plus"
                    color="success"
                    class="text-none"
                    >Dodaj do koszyka</v-btn
                  >
                </v-col>
              </v-row>

              <div class="mt-4">
                <v-card
                  class="my-1"
                  link
                  border
                  elevation="0"
                  :rounded="false"
                  density="compact"
                >
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
                  density="compact"
                >
                  <v-card-text class="d-flex align-center ga-3">
                    <v-icon>mdi-clock-outline</v-icon>
                    <div class="d-flex flex-column">
                      <span class="text-start"
                        >Kup teraz, a otrzymasz jutro</span
                      >
                      <span class="text-caption">Dowiedz się więcej</span>
                    </div>
                  </v-card-text>
                </v-card>

                <v-card
                  link
                  border
                  elevation="0"
                  :rounded="false"
                  density="compact"
                >
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
          <v-card border elevation="0" class="my-4">
            <v-btn class="text-none" variant="text" href="#description"
              >Opis</v-btn
            >
            <v-btn class="text-none" variant="text" href="#specification"
              >Specyfikacja</v-btn
            >
            <v-btn class="text-none" variant="text" href="#accessories"
              >Akcesoria</v-btn
            >
            <v-btn class="text-none" variant="text" href="#opinions"
              >Opinie (60)</v-btn
            >
            <v-btn class="text-none" variant="text" href="#q&a"
              >Pytania i odpowiedzi (9)</v-btn
            >
          </v-card>
          <Divider></Divider>
          <v-card flat id="description">
            <v-card-title class="px-0">Opis</v-card-title>
            <v-card-text v-html="desc" class="px-0"></v-card-text>
          </v-card>
          <Divider></Divider>
          <v-card flat id="specification">
            <v-card-title class="px-0">Specyfikacja</v-card-title>
            <v-card-text class="px-0">
              <ProductSpecificationList
                :specification="specification"
              ></ProductSpecificationList>
            </v-card-text>
          </v-card>
          <Divider></Divider>
          <v-card flat id="accessories">
            <v-card-title class="px-0">Akcesoria</v-card-title>
            <v-card-text class="px-0"></v-card-text>
          </v-card>
          <Divider></Divider>
          <v-card flat id="opinions">
            <v-card-title class="px-0">Opinie</v-card-title>
            <v-card-text class="px-0">
              <div class="my-4">
                <ProductRatingSummary />
                <ProductAddOpinion :product="{ name, photos }" />
              </div>
              <ProductOpionionGrid :items="opionions"></ProductOpionionGrid>
              <div class="mx-auto my-4 button-limit">
                <v-btn class="text-none" variant="flat" color="primary" block
                  >Pokaż więcej</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
          <Divider></Divider>
          <v-card flat id="q&a">
            <v-card-title class="px-0">Pytania i odpowiedzi</v-card-title>
            <v-card-text class="px-0"></v-card-text>
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
      name: "OnePlus 12 5G 16/512GB Flowy Emerald 120Hz",
      price: {
        newPrice: null,
        oldPrice: 4999.0,
        currency: "PLN",
      },
      photos: [
        "https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_19_433_01.jpg",
        "https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_25_490_04.jpg",
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-large,,2024/1/pr_2024_1_17_11_18_31_250_07.jpg",
        "https://cdn.x-kom.pl/i/setup/images/prod/big/2400x2000,,2024/1/pr_2024_1_17_11_18_23_576_03.jpg",
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-large,,2024/1/pr_2024_1_17_11_18_33_201_08.jpg",
      ],
      details: [
        {
          name: "Rodzaj",
          value: "Router bezprzewodowy",
        },
        {
          name: "Standard",
          value: "Wi-Fi 5",
        },
        {
          name: "Częstotliwość",
          value: "2.4 / 5 GHz",
        },
        {
          name: "Prędkość transmisji",
          value: "1200 Mb/s",
        },
      ],
      specification: {
        procesor:
          "Qualcomm Snapdragon 8 gen 3 (1x 3.3 GHz, X4 + 5x 3.0 GHz, A720 + 2x 2.3 GHz)",
        "układ graficzny": "Adreno 750",
        "Pamięć RAM": "16 GB",
        "Pamięć wbudowana": "512 GB",
        "Typ ekranu": "Dotykowy, AMOLED",
        "Częstotliwość odświeżania ekranu": "120Hz",
        "Przekątna ekranu": '6,82"',
        "Rozdzielczość ekranu": "3168 x 1440",
        "Rozdzielczość aparatu - tył": [
          "50.0 Mpix",
          "48.0 Mpix - ultraszerokokątny",
          "64.0 Mpix - teleobiektyw",
        ],
        Łączność: ["5G", "Wi-Fi", "NFC", "Bluetooth 5.4", "LoraWan", "BLE"],
      },
      rating: 2.9,
      opionions: [
        {
          createdAt: "10/31/2023",
          rating: 4.5,
          title: "Great purchase!",
          review:
            "Our big family room TV stopped working. We didnt want to spend a lot. This was a great deal and the perfect size. It has Roku so its taking a bit to get used tit. Picture is crystal clear! We are very happy with our purchase",
          authorName: "John",
          isVerifiedPurchase: true,
          likes: 0,
          dislikes: 10,
        },
        {
          createdAt: "11/31/2023",
          rating: 4.3,
          title: "Świetny telefon",
          review:
            "Świetny telefon, działa jak burza. Jedyny mały minus to program zwrotu 400 zł, który jest tak na prawdę sprzedażą twoich danych jakimś zewnętrznym firmom. Moim zdaniem trochę nie fair polityka, bo można byłoby zwyczajnie obniżyć cenę urządzenia na start zamiast zmuszać do sprzedaży danych.",
          authorName: "Marek",
          isVerifiedPurchase: false,
          likes: 41,
          dislikes: 5,
        },
        {
          createdAt: "1/31/2023",
          rating: 3.45,
          title: "Ok",
          review:
            "Najlepszy telefon obecnie na rynku, genialny aparat, mega szybki.",
          authorName: "Kamil",
          isVerifiedPurchase: true,
          likes: 11,
          dislikes: 5,
        },
        {
          createdAt: "19/31/2023",
          rating: 3.45,
          title: "Ok",
          review: `Dory smartfon.Używam iPhone 15 plus i do niego pomimo różnic w systemie porównam.Szybkość działania podobna,skaner twarzy
gorszy,odcisk palca szybki,wyświetlacz dobry lecz nie ma wielkiej różnicy w oglądaniu ( onepus lepszy przy przewijaniu obrazu
np.góra-dół).Przewaga oneplusa to to,że jest bardziej poręczny od iPhona 15 plus ,lepiej się go trzyma w ręku-jest jednak węższy.Jeżeli ktoś
obawia się wielkości ekranu to niech się nie martwi,ten smarfon wymiarami bardzo podobny jak stary Samsung A 70. Super telefon . Pełnoprawny flagowiec. Wydajność , ekran, aparat , bateria na najwyższym poziomie . Wersja kolorystyczna`,
          authorName: "Radosław",
          isVerifiedPurchase: true,
          likes: 1,
          dislikes: 0,
        },
        {
          createdAt: "1/31/2023",
          rating: 3.45,
          title: "Ok",
          review: "Całkiem Ok",
          authorName: "Kamil",
          isVerifiedPurchase: true,
          likes: 11,
          dislikes: 5,
        },
        {
          createdAt: "1/31/2023",
          rating: 1.45,
          title: "Spoko",
          review: `Smartfon działa i wygląda bardzo dobrze. Aparatu jeszcze nie przetestowałem, ale bateria, jej ładowanie i długość pracy jest rewelacja.
Co prawda okazało się że najnowszy Snapdragon jest za nowy i np. gra Pokemon Go co jakiś czas się wywraca, ale to podobno wina Nintica i
Unity, bo to samo jest na Samsungu S24 Ultra.`,
          authorName: "Kamil",
          isVerifiedPurchase: true,
          likes: 11,
          dislikes: 5,
        },
      ],
      desc: `<div class="row text-left fresh-content">
	<div class="col-md-2 text-center">
	<div class="col-md-10">
		<h2 class="text-left">
			OnePlus 12 5G 512 GB Flowy Emerald</h2>
		<p>
			Jeśli szukasz flagowego smartfona z mnogością doskonałych rozwiązań to OnePlus 12 5G 512 GB Flowy Emerald jest właśnie dla Ciebie. Swoją niesamowitą wydajność zawdzięcza procesorowi Procesor Snapdragon 8 Gen 3 i baterii o dużej pojemności. Oprócz tego ekran AMOLED i częstotliwość odświeżania 120 Hz przeniesie Cię w świat pełen detali, niesamowitych szczegółów i barw, które zachwycają. Skorzystaj z ładowania 100 W i wróć błyskawicznie do najlepszej rozrywki.</p>
	</div>
</div>`,
    };
  },
};
</script>
<style scoped>
.border {
  border-bottom: 0;
}
:deep(.v-progress-linear__determinate) {
  border-radius: inherit;
}
</style>
