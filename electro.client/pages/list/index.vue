<template>
	<Container class="pa-4">
		<v-row dense>
			<v-col cols="0" md="3" class="d-none d-md-block">
				<v-sheet border class="h-100" rounded="lg">
					<CategoryFilter />
					<ProductFilter/>
				</v-sheet>
			</v-col>
			<v-col cols="12" md="9">
				<v-row dense>
					<v-col cols="12">
						<v-sheet flat border rounded="lg" class="my-1 d-flex align-center">
							<div class="d-md-none">
								<ProductListFilterMenu/>
							</div>
							<v-select density="compact" label="Sortowanie"
								:items="['Od najpopularniejszych', 'Ocena klientów: od najlepszej', 'Cena: od najtańszych', 'Cena: od najdroższych']"
								variant="outlined" hide-details clearable>
							</v-select>
						</v-sheet>
					</v-col>
					<v-col cols="12" v-for="(product, index) in items">
						<ProductListItem :product="product" />
					</v-col>
					<v-col cols="12" class="my-2">
						<Pagination />
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</Container>
</template>
<script>
export default {
	props: {
		showDetails: {
			type: Boolean,
			default: true
		},
		showRating: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			items: [
				{
					id: 12312313,
					name: 'MSI Bravo 15 Ryzen 5-7535HS/16GB/512/Win11X RX6550M 144Hz 5-7535HS/16GB/512/Win11X RX6550M 144Hz',
					details: [
						{
							name: 'Processor',
							value: 'AMD Ryzen™ 5 7535HS'
						},
						{
							name: 'Pamięć',
							value: '16 GB'
						},
						{
							name: 'Grafika',
							value: 'AMD Radeon™ RX 6550M'
						},
						{
							name: 'Typ ekranu',
							value: 'Matowy, LED, IPS'
						}
					],
					rating: 4.5,
					noOfOpinions: 20,
					price: 3349.0,
					oldPrice: 3333.0,
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2023/10/pr_2023_10_4_14_23_57_401_00.jpg'
				},
				{
					id: 12312313,
					name: 'TP-Link Archer C6 (1200Mb/s a/b/g/n/ac) DualBand',
					details: [
						{
							name: 'Rodzaj',
							value: 'Router bezprzewodowy'
						},
						{
							name: 'Standard',
							value: 'Wi-Fi 5'
						},
						{
							name: 'Częstotliwość',
							value: '2.4 / 5 GHz'
						},
						{
							name: 'Prędkość transmisji',
							value: '1200 Mb/s'
						}
					],
					rating: 4.5,
					noOfOpinions: 1,
					price: 158.9,
					oldPrice: null,
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_14_8_38_35_688_00.jpg'
				},
				{
					id: 12312313,
					name: 'HP 255 G9 Ryzen 5-5625U/16GB/512/Win11',
					details: [
						{
							name: 'Processor',
							value: 'AMD Ryzen™ 5 5625U'
						},
						{
							name: 'Pamięć',
							value: '16 GB'
						},
						{
							name: 'Grafika',
							value: 'AMD Radeon™ RX 6550M'
						},
						{
							name: 'Typ ekranu',
							value: 'Matowy, LED, IPS'
						}
					],
					rating: 1,
					noOfOpinions: 2,
					price: 2149.0,
					oldPrice: null,
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/1/pr_2024_1_8_8_30_6_717_03.jpg'
				},
				{
					id: 12312313,
					name: 'Lenovo Yoga Slim 6-14 i5-1240P/16GB/512/Win11',
					details: [
						{
							name: 'Processor',
							value: 'Intel® Core™ i5-1240P'
						},
						{
							name: 'Pamięć',
							value: '16 GB'
						},
						{
							name: 'Grafika',
							value: 'Intel Iris Xe Graphics'
						},
						{
							name: 'Typ ekranu',
							value: 'Błyszczący, OLED'
						}
					],
					rating: 4.5,
					noOfOpinions: 20,
					price: 3799.0,
					oldPrice: 4300.99,
					image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/10/pr_2023_10_16_7_5_8_667_00.jpg'
				}
			]
		};
	}
};
</script>
<style scoped></style>
