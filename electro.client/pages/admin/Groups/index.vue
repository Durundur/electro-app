<template>
	<v-container fluid>
		<v-card
			border
			flat
			rounded="lg">
			<v-card-title class="d-flex justify-space-between align-center">
				<span>Grupy</span>
				<v-btn
					color="success"
					prepend-icon="mdi-plus"
					variant="elevated"
					class="text-none"
					flat
					size="small"
					to="/admin/products/edit">
					Dodaj
				</v-btn>
			</v-card-title>
			<v-card-text>
				<v-expansion-panels>
					<v-expansion-panel v-for="item in groups">
						<v-expansion-panel-title>{{ item.namePl }}</v-expansion-panel-title>
						<v-expansion-panel-text>
							<v-card flat>
								<v-container class="pa-0">
									<v-row>
										<v-col cols="4">
											<v-text-field
												density="compact"
												:model-value="item.id"
												variant="outlined"
												color="primary"
												label="ID"
												hide-details
												readonly
												class="my-3"></v-text-field>
											<v-text-field
												density="compact"
												v-model="item.namePl"
												variant="outlined"
												color="primary"
												label="Nazwa"
												hide-details
												class="my-3"></v-text-field>
											<v-text-field
												density="compact"
												v-model="item.iconUrl"
												variant="outlined"
												color="primary"
												label="Zdjęcie ikony"
												hide-details
												class="my-3"></v-text-field>
											<v-text-field
												density="compact"
												v-model="item.photoUrl"
												variant="outlined"
												color="primary"
												label="Zdjęcie podglądowe"
												hide-details
												class="my-3"></v-text-field>
										</v-col>
										<v-col>
											<v-card
												height="100%"
												flat>
												<v-card-title>Kategorie</v-card-title>
												<v-card-text>
													<v-select
														multiple
														chips
														density="compact"
														v-model="item.categories"
														:items="item.categories"
														item-title="namePl"
														:item-props-subtitle="item.id"
														variant="solo"></v-select>
												</v-card-text>
											</v-card>
										</v-col>
									</v-row>
								</v-container>
							</v-card>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-card-text>
		</v-card>
	</v-container>
</template>
<script>
	definePageMeta({
		layout: "admin",
	});
	export default {
		data() {
			return {
				headers: [
					{ title: "ID", key: "id", sortable: false },
					{ title: "Nazwa", key: "namePl", sortable: false },
					{ title: "Kategorie", key: "categories", sortable: false },
					{ title: "Akcje", key: "actions", sortable: false },
				],
				groups: [
					{
						id: 987654,
						namePl: "Laptopy i komputery",
						nameEn: "Laptops and computers",
						categories: [
							{
								id: 123,
								namePl: "Laptopy/Notebooki/Ultrabooki",
								nameEn: "Laptops/Notebooks/Ultrabooks",
							},
							{
								id: 113,
								namePl: "Laptopy 2 w 1",
								nameEn: "2-in-1 Laptops",
							},
							{
								id: 134,
								namePl: "Laptopy biznesowe",
								nameEn: "Business Laptops",
							},
							{
								id: 209,
								namePl: "Komputery stacjonarne",
								nameEn: "Desktop Computers",
							},
							{
								id: 187,
								namePl: "Komputery G4M3R",
								nameEn: "Gaming Computers",
							},
							{
								id: 345,
								namePl: "Tablety",
								nameEn: "Tablets",
							},
							{
								id: 567,
								namePl: "Serwery i storage",
								nameEn: "Servers and Storage",
							},
							{
								id: 890,
								namePl: "Programy",
								nameEn: "Software",
							},
							{
								id: 1234,
								namePl: "Akcesoria komputerowe",
								nameEn: "Computer Accessories",
							},
							{
								id: 5678,
								namePl: "Akcesoria do laptopów",
								nameEn: "Laptop Accessories",
							},
							{
								id: 9876,
								namePl: "Torby i etui",
								nameEn: "Bags and Cases",
							},
							{
								id: 5432,
								namePl: "Stacje dokujące do laptopów",
								nameEn: "Laptop Docking Stations",
							},
						],
					},
					{
						id: 987654,
						namePl: "Smartfony i smartwatche",
						nameEn: "Smartphones and Smartwatches",
						categories: [
							{
								id: 123,
								namePl: "Smartfony i telefony",
								nameEn: "Smartphones and Mobile Phones",
							},
							{
								id: 113,
								namePl: "Tablety",
								nameEn: "Tablets",
							},
							{
								id: 134,
								namePl: "Inteligentne zegarki",
								nameEn: "Smart Watches",
							},
							{
								id: 209,
								namePl: "Czytniki ebook",
								nameEn: "Ebook Readers",
							},
							{
								id: 187,
								namePl: "Ochrona na telefon",
								nameEn: "Phone Cases",
							},
							{
								id: 345,
								namePl: "Ładowarki i powerbanki",
								nameEn: "Chargers and Power Banks",
							},
							{
								id: 567,
								namePl: "Karty pamięci microSD",
								nameEn: "MicroSD Memory Cards",
							},
							{
								id: 890,
								namePl: "Słuchawki True Wireless",
								nameEn: "True Wireless Earbuds",
							},
							{
								id: 1234,
								namePl: "Akcesoria GSM",
								nameEn: "Mobile Accessories",
							},
							{
								id: 5678,
								namePl: "Akcesoria do tabletów",
								nameEn: "Tablet Accessories",
							},
							{
								id: 9876,
								namePl: "Pamięci flash",
								nameEn: "Flash Drives",
							},
						],
					},
					{
						id: 1213123,
						namePl: "Gaming i streaming",
						nameEn: "Gaming and streaming",
						categories: [
							{
								id: 923,
								namePl: "Laptopy do gier",
								nameEn: "Gaming laptops",
							},
							{
								id: 139,
								namePl: "Komputery do gier",
								nameEn: "Gaming computers",
							},
							{
								id: 1747,
								namePl: "Podzespoły do gier",
								nameEn: "Gaming components",
							},
							{
								id: 82,
								namePl: "Konsole",
								nameEn: "Consoles",
							},
							{
								id: 914,
								namePl: "Akcesoria do konsol",
								nameEn: "Console accessories",
							},
							{
								id: 1167,
								namePl: "Myszki i klawiatury dla graczy",
								nameEn: "Gaming mice and keyboards",
							},
							{
								id: 1123,
								namePl: "Gry",
								nameEn: "Games",
							},
							{
								id: 54,
								namePl: "VR (Virtual Reality)",
								nameEn: "VR (Virtual Reality)",
							},
							{
								id: 442,
								namePl: "Urządzenia do streamingu",
								nameEn: "Streaming devices",
							},
							{
								id: 554,
								namePl: "Meble gamingowe",
								nameEn: "Gaming furniture",
							},
							{
								id: 677,
								namePl: "Monitory dla graczy",
								nameEn: "Gaming monitors",
							},
							{
								id: 936,
								namePl: "Gadżety dla graczy",
								nameEn: "Gaming gadgets",
							},
							{
								id: 531,
								namePl: "Audio dla graczy",
								nameEn: "Gaming audio",
							},
							{
								id: 1,
								namePl: "Tablety dla graczy",
								nameEn: "Tablets for gamers",
							},
							{
								id: 459,
								namePl: "Kontrolery do gier",
								nameEn: "Gaming controllers",
							},
							{
								id: 26,
								namePl: "Plecaki dla graczy",
								nameEn: "Gaming backpacks",
							},
							{
								id: 3,
								namePl: "Karty pamięci do konsol",
								nameEn: "Memory cards for consoles",
							},
							{
								id: 353,
								namePl: "Fotele dla graczy",
								nameEn: "Gaming chairs",
							},
							{
								id: 41,
								namePl: "Symulatory lotów",
								nameEn: "Flight simulators",
							},
							{
								id: 144,
								namePl: "Symulatory jazdy",
								nameEn: "Driving simulators",
							},
						],
					},
				],
			};
		},
	};
</script>
