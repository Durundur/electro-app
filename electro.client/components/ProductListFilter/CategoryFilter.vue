<template>
	<v-card :flat="true">
		<v-card-title class="text-body-1 py-0 font-600">Kategorie</v-card-title>
		<v-list density="compact">
			<v-list-group v-for="(category, index) in categories">
				<template v-slot:activator="{ props }">
					<v-list-item active-class="font-600 bg-grey-lighten-3" density="compact" v-bind="props">
						<span class="text-body-3">{{ category.namePl }}</span>
					</v-list-item>
				</template>
				<v-list-group height="10px" v-for="(subCategory, index) in category.subCategories">
					<template v-slot:activator="{ props }">
						<v-list-item active-class="font-600 bg-grey-lighten-3" density="compact" v-bind="props">
						<span class="text-body-3">{{ subCategory.namePl }}</span>
						</v-list-item>
					</template>
				</v-list-group>
			</v-list-group>
		</v-list>
	</v-card>
</template>
<style scoped>
:deep(.v-list-item--density-compact.v-list-item--one-line) {
	min-height: unset;
}
</style>
<script>
export default {
	data() {
		return {
			categories: [
				{
					id: 987654,
					namePl: 'Laptopy i komputery',
					nameEn: 'Laptops and computers',
					subCategories: [
						{
							id: 123,
							namePl: 'Laptopy/Notebooki/Ultrabooki',
							nameEn: 'Laptops/Notebooks/Ultrabooks'
						},
						{
							id: 113,
							namePl: 'Laptopy 2 w 1',
							nameEn: '2-in-1 Laptops'
						},
						{
							id: 134,
							namePl: 'Laptopy biznesowe',
							nameEn: 'Business Laptops'
						},
						{
							id: 209,
							namePl: 'Komputery stacjonarne',
							nameEn: 'Desktop Computers'
						},
						{
							id: 187,
							namePl: 'Komputery G4M3R',
							nameEn: 'Gaming Computers'
						},
						{
							id: 345,
							namePl: 'Tablety',
							nameEn: 'Tablets'
						},
						{
							id: 567,
							namePl: 'Serwery i storage',
							nameEn: 'Servers and Storage'
						},
						{
							id: 890,
							namePl: 'Programy',
							nameEn: 'Software'
						},
						{
							id: 1234,
							namePl: 'Akcesoria komputerowe',
							nameEn: 'Computer Accessories'
						},
						{
							id: 5678,
							namePl: 'Akcesoria do laptopów',
							nameEn: 'Laptop Accessories'
						},
						{
							id: 9876,
							namePl: 'Torby i etui',
							nameEn: 'Bags and Cases'
						},
						{
							id: 5432,
							namePl: 'Stacje dokujące do laptopów',
							nameEn: 'Laptop Docking Stations'
						}
					]
				},
				{
					id: 987654,
					namePl: 'Smartfony i smartwatche',
					nameEn: 'Smartphones and Smartwatches',
					subCategories: [
						{
							id: 123,
							namePl: 'Smartfony i telefony',
							nameEn: 'Smartphones and Mobile Phones'
						},
						{
							id: 113,
							namePl: 'Tablety',
							nameEn: 'Tablets'
						},
						{
							id: 134,
							namePl: 'Inteligentne zegarki',
							nameEn: 'Smart Watches'
						},
						{
							id: 209,
							namePl: 'Czytniki ebook',
							nameEn: 'Ebook Readers'
						},
						{
							id: 187,
							namePl: 'Ochrona na telefon',
							nameEn: 'Phone Cases'
						},
						{
							id: 345,
							namePl: 'Ładowarki i powerbanki',
							nameEn: 'Chargers and Power Banks'
						},
						{
							id: 567,
							namePl: 'Karty pamięci microSD',
							nameEn: 'MicroSD Memory Cards'
						},
						{
							id: 890,
							namePl: 'Słuchawki True Wireless',
							nameEn: 'True Wireless Earbuds'
						},
						{
							id: 1234,
							namePl: 'Akcesoria GSM',
							nameEn: 'Mobile Accessories'
						},
						{
							id: 5678,
							namePl: 'Akcesoria do tabletów',
							nameEn: 'Tablet Accessories'
						},
						{
							id: 9876,
							namePl: 'Pamięci flash',
							nameEn: 'Flash Drives'
						}
					]
				},
				{
					id: 1213123,
					namePl: 'Gaming i streaming',
					nameEn: 'Gaming and streaming',
					subCategories: [
						{
							id: 923,
							namePl: 'Laptopy do gier',
							nameEn: 'Gaming laptops'
						},
						{
							id: 139,
							namePl: 'Komputery do gier',
							nameEn: 'Gaming computers'
						},
						{
							id: 1747,
							namePl: 'Podzespoły do gier',
							nameEn: 'Gaming components'
						},
						{
							id: 82,
							namePl: 'Konsole',
							nameEn: 'Consoles'
						},
						{
							id: 914,
							namePl: 'Akcesoria do konsol',
							nameEn: 'Console accessories'
						},
						{
							id: 1167,
							namePl: 'Myszki i klawiatury dla graczy',
							nameEn: 'Gaming mice and keyboards'
						},
						{
							id: 1123,
							namePl: 'Gry',
							nameEn: 'Games'
						},
						{
							id: 54,
							namePl: 'VR (Virtual Reality)',
							nameEn: 'VR (Virtual Reality)'
						},
						{
							id: 442,
							namePl: 'Urządzenia do streamingu',
							nameEn: 'Streaming devices'
						},
						{
							id: 554,
							namePl: 'Meble gamingowe',
							nameEn: 'Gaming furniture'
						},
						{
							id: 677,
							namePl: 'Monitory dla graczy',
							nameEn: 'Gaming monitors'
						},
						{
							id: 936,
							namePl: 'Gadżety dla graczy',
							nameEn: 'Gaming gadgets'
						},
						{
							id: 531,
							namePl: 'Audio dla graczy',
							nameEn: 'Gaming audio'
						},
						{
							id: 1,
							namePl: 'Tablety dla graczy',
							nameEn: 'Tablets for gamers'
						},
						{
							id: 459,
							namePl: 'Kontrolery do gier',
							nameEn: 'Gaming controllers'
						},
						{
							id: 26,
							namePl: 'Plecaki dla graczy',
							nameEn: 'Gaming backpacks'
						},
						{
							id: 3,
							namePl: 'Karty pamięci do konsol',
							nameEn: 'Memory cards for consoles'
						},
						{
							id: 353,
							namePl: 'Fotele dla graczy',
							nameEn: 'Gaming chairs'
						},
						{
							id: 41,
							namePl: 'Symulatory lotów',
							nameEn: 'Flight simulators'
						},
						{
							id: 144,
							namePl: 'Symulatory jazdy',
							nameEn: 'Driving simulators'
						}
					]
				},
				{
					id: 987654,
					namePl: 'Podzespoły komputerowe',
					nameEn: 'Computer Components',
					subCategories: [
						{
							id: 1211,
							namePl: 'Dyski twarde HDD i SSD',
							nameEn: 'Hard Drives HDD and SSD'
						},
						{
							id: 397,
							namePl: 'Karty graficzne',
							nameEn: 'Graphics Cards'
						},
						{
							id: 145,
							namePl: 'Procesory',
							nameEn: 'Processors'
						},
						{
							id: 290,
							namePl: 'Płyty główne',
							nameEn: 'Motherboards'
						},
						{
							id: 855,
							namePl: 'Obudowy komputerowe',
							nameEn: 'Computer Cases'
						},
						{
							id: 655,
							namePl: 'Pamięci RAM',
							nameEn: 'RAM Memory'
						},
						{
							id: 551,
							namePl: 'Zasilacze komputerowe',
							nameEn: 'Power Supplies'
						},
						{
							id: 680,
							namePl: 'Chłodzenia komputerowe',
							nameEn: 'Computer Coolers'
						},
						{
							id: 300,
							namePl: 'Modding PC',
							nameEn: 'PC Modding'
						},
						{
							id: 24,
							namePl: 'Karty dźwiękowe',
							nameEn: 'Sound Cards'
						},
						{
							id: 5,
							namePl: 'Karty przechwytujące wideo',
							nameEn: 'Video Capture Cards'
						},
						{
							id: 121,
							namePl: 'Karty sieciowe',
							nameEn: 'Network Cards'
						},
						{
							id: 40,
							namePl: 'Napędy optyczne',
							nameEn: 'Optical Drives'
						},
						{
							id: 43,
							namePl: 'Podzespoły serwerowe',
							nameEn: 'Server Components'
						},
						{
							id: 126,
							namePl: 'Akcesoria do dysków',
							nameEn: 'Hard Drive Accessories'
						}
					]
				},
				{
					id: 1234567,
					namePl: 'Urządzenia peryferyjne',
					nameEn: 'Peripheral Devices',
					subCategories: [
						{
							id: 1712,
							namePl: 'Monitory',
							nameEn: 'Monitors'
						},
						{
							id: 196,
							namePl: 'Drukarki',
							nameEn: 'Printers'
						},
						{
							id: 232,
							namePl: 'Drukarki ze skanerem',
							nameEn: 'Printers with Scanner'
						},
						{
							id: 1965,
							namePl: 'Urządzenia sieciowe',
							nameEn: 'Networking Devices'
						},
						{
							id: 734,
							namePl: 'Myszki',
							nameEn: 'Mice'
						},
						{
							id: 917,
							namePl: 'Klawiatury',
							nameEn: 'Keyboards'
						},
						{
							id: 1872,
							namePl: 'Słuchawki',
							nameEn: 'Headphones'
						},
						{
							id: 606,
							namePl: 'Głośniki',
							nameEn: 'Speakers'
						},
						{
							id: 446,
							namePl: 'Mikrofony i akcesoria',
							nameEn: 'Microphones and Accessories'
						},
						{
							id: 146,
							namePl: 'Tablety graficzne',
							nameEn: 'Graphic Tablets'
						},
						{
							id: 387,
							namePl: 'Projektory i ekrany',
							nameEn: 'Projectors and Screens'
						},
						{
							id: 317,
							namePl: 'Podkładki do komputera',
							nameEn: 'Mouse Pads'
						},
						{
							id: 938,
							namePl: 'Zasilacze UPS i stabilizatory',
							nameEn: 'UPS and Stabilizers'
						},
						{
							id: 1435,
							namePl: 'Materiały eksploatacyjne',
							nameEn: 'Consumables'
						},
						{
							id: 36,
							namePl: 'Skanery',
							nameEn: 'Scanners'
						},
						{
							id: 627,
							namePl: 'Kamery',
							nameEn: 'Cameras'
						},
						{
							id: 80,
							namePl: 'Sprzęt do wideokonferencji',
							nameEn: 'Video Conferencing Equipment'
						},
						{
							id: 102,
							namePl: 'Urządzenia biurowe',
							nameEn: 'Office Equipment'
						},
						{
							id: 47,
							namePl: 'Piloty i manipulatory',
							nameEn: 'Remotes and Controllers'
						},
						{
							id: 389,
							namePl: 'Akcesoria do monitorów',
							nameEn: 'Monitor Accessories'
						},
						{
							id: 36,
							namePl: 'Akcesoria do tabletów graficznych',
							nameEn: 'Graphic Tablet Accessories'
						}
					]
				},
				{
					id: 1,
					namePl: 'TV i audio',
					nameEn: 'TV and audio',
					subCategories: [
						{
							id: 273,
							namePl: 'Telewizory',
							nameEn: 'Televisions'
						},
						{
							id: 85,
							namePl: 'Soundbary',
							nameEn: 'Soundbars'
						},
						{
							id: 156,
							namePl: 'Kino domowe',
							nameEn: 'Home Theater Systems'
						},
						{
							id: 387,
							namePl: 'Projektory i ekrany',
							nameEn: 'Projectors and Screens'
						},
						{
							id: 143,
							namePl: 'Hi-Fi audio',
							nameEn: 'Hi-Fi Audio'
						},
						{
							id: 115,
							namePl: 'Kolumny głośnikowe',
							nameEn: 'Loudspeakers'
						},
						{
							id: 606,
							namePl: 'Głośniki',
							nameEn: 'Speakers'
						},
						{
							id: 1872,
							namePl: 'Słuchawki',
							nameEn: 'Headphones'
						},
						{
							id: 446,
							namePl: 'Mikrofony i akcesoria',
							nameEn: 'Microphones and Accessories'
						},
						{
							id: 18,
							namePl: 'Odtwarzacze multimedialne',
							nameEn: 'Media Players'
						},
						{
							id: 237,
							namePl: 'Przenośny sprzęt audio',
							nameEn: 'Portable Audio Equipment'
						},
						{
							id: 24,
							namePl: 'Karty dźwiękowe',
							nameEn: 'Sound Cards'
						},
						{
							id: 31,
							namePl: 'Power Audio',
							nameEn: 'Power Audio'
						},
						{
							id: 351,
							namePl: 'Akcesoria do telewizorów',
							nameEn: 'TV Accessories'
						},
						{
							id: 170,
							namePl: 'Akcesoria do słuchawek',
							nameEn: 'Headphone Accessories'
						},
						{
							id: 25,
							namePl: 'Sprzęt DJ',
							nameEn: 'DJ Equipment'
						},
						{
							id: 1,
							namePl: 'Tunery do TV',
							nameEn: 'TV Tuners'
						},
						{
							id: 6,
							namePl: 'Anteny DVB-T',
							nameEn: 'DVB-T Antennas'
						}
					]
				},
				{
					id: 1213123,
					namePl: 'Smarthome i lifestyle',
					nameEn: 'Smarthome and lifestyle',
					subCategories: [
						{
							id: 2219,
							namePl: 'Inteligentny dom',
							nameEn: 'Smart Home'
						},
						{
							id: 420,
							namePl: 'Drony i akcesoria',
							nameEn: 'Drones and Accessories'
						},
						{
							id: 127,
							namePl: 'Pojazdy elektryczne',
							nameEn: 'Electric Vehicles'
						},
						{
							id: 409,
							namePl: 'Zdrowie i ergonomia',
							nameEn: 'Health and Ergonomics'
						},
						{
							id: 133,
							namePl: 'Aparaty fotograficzne',
							nameEn: 'Cameras'
						},
						{
							id: 641,
							namePl: 'Akcesoria samochodowe',
							nameEn: 'Car Accessories'
						},
						{
							id: 454,
							namePl: 'Monitoring',
							nameEn: 'Surveillance'
						},
						{
							id: 291,
							namePl: 'Obiektywy',
							nameEn: 'Lenses'
						},
						{
							id: 439,
							namePl: 'Kamery sportowe i akcesoria',
							nameEn: 'Action Cameras and Accessories'
						},
						{
							id: 604,
							namePl: 'Akcesoria foto-video',
							nameEn: 'Photo and Video Accessories'
						},
						{
							id: 172,
							namePl: 'Lampy błyskowe i studyjne',
							nameEn: 'Flashes and Studio Lights'
						},
						{
							id: 234,
							namePl: 'Statywy i głowice',
							nameEn: 'Tripods and Heads'
						},
						{
							id: 55,
							namePl: 'Stabilizatory obrazu',
							nameEn: 'Image Stabilizers'
						},
						{
							id: 250,
							namePl: 'Wyposażenie studia',
							nameEn: 'Studio Equipment'
						},
						{
							id: 208,
							namePl: 'Torby i pokrowce na aparat',
							nameEn: 'Camera Bags and Cases'
						},
						{
							id: 19,
							namePl: 'Akcesoria rowerowe',
							nameEn: 'Bicycle Accessories'
						},
						{
							id: 4,
							namePl: 'Akcesoria motocyklowe',
							nameEn: 'Motorcycle Accessories'
						},
						{
							id: 2,
							namePl: 'Kamery cyfrowe',
							nameEn: 'Digital Cameras'
						},
						{
							id: 58,
							namePl: 'Fotele do biura',
							nameEn: 'Office Chairs'
						},
						{
							id: 82,
							namePl: 'Konsole',
							nameEn: 'Consoles'
						},
						{
							id: 54,
							namePl: 'VR (Virtual Reality)',
							nameEn: 'VR (Virtual Reality)'
						},
						{
							id: 1123,
							namePl: 'Gry',
							nameEn: 'Games'
						},
						{
							id: 936,
							namePl: 'Gadżety dla graczy',
							nameEn: 'Gaming Gadgets'
						},
						{
							id: 100,
							namePl: 'Akcesoria do urządzeń smart',
							nameEn: 'Smart Device Accessories'
						},
						{
							id: 36,
							namePl: 'Fotowoltaika',
							nameEn: 'Photovoltaics'
						}
					]
				},
				{
					id: 1213123,
					namePl: 'Akcesoria',
					nameEn: 'Accessories',
					subCategories: [
						{
							id: 1201,
							namePl: 'Kable i przejściówki',
							nameEn: 'Cables and Adapters'
						},
						{
							id: 2212,
							namePl: 'Zasilanie',
							nameEn: 'Power Supplies'
						},
						{
							id: 813,
							namePl: 'Nośniki danych',
							nameEn: 'Data Storage Devices'
						},
						{
							id: 1872,
							namePl: 'Słuchawki',
							nameEn: 'Headphones'
						},
						{
							id: 734,
							namePl: 'Myszki',
							nameEn: 'Mice'
						},
						{
							id: 917,
							namePl: 'Klawiatury',
							nameEn: 'Keyboards'
						},
						{
							id: 3963,
							namePl: 'Akcesoria do laptopów',
							nameEn: 'Laptop Accessories'
						},
						{
							id: 3268,
							namePl: 'Akcesoria komputerowe',
							nameEn: 'Computer Accessories'
						},
						{
							id: 5117,
							namePl: 'Akcesoria GSM',
							nameEn: 'Mobile Accessories'
						},
						{
							id: 169,
							namePl: 'Dyski zewnętrzne SSD',
							nameEn: 'External SSD Drives'
						},
						{
							id: 243,
							namePl: 'Dyski zewnętrzne HDD',
							nameEn: 'External HDD Drives'
						},
						{
							id: 51,
							namePl: 'Czytniki kart pamięci',
							nameEn: 'Memory Card Readers'
						},
						{
							id: 24,
							namePl: 'Karty dźwiękowe',
							nameEn: 'Sound Cards'
						},
						{
							id: 29,
							namePl: 'Środki czyszczące',
							nameEn: 'Cleaning Supplies'
						},
						{
							id: 606,
							namePl: 'Głośniki',
							nameEn: 'Speakers'
						},
						{
							id: 127,
							namePl: 'Pojazdy elektryczne',
							nameEn: 'Electric Vehicles'
						},
						{
							id: 317,
							namePl: 'Podkładki do komputera',
							nameEn: 'Mouse Pads'
						},
						{
							id: 185,
							namePl: 'Listwy zasilające',
							nameEn: 'Power Strips'
						},
						{
							id: 126,
							namePl: 'Akcesoria do dysków',
							nameEn: 'Drive Accessories'
						},
						{
							id: 102,
							namePl: 'Urządzenia biurowe',
							nameEn: 'Office Equipment'
						},
						{
							id: 85,
							namePl: 'Usługi dodatkowe',
							nameEn: 'Additional Services'
						},
						{
							id: 11,
							namePl: 'Gadżety',
							nameEn: 'Gadgets'
						},
						{
							id: 53,
							namePl: 'Narzędzia serwisowe i sieciowe',
							nameEn: 'Service and Networking Tools'
						},
						{
							id: 935,
							namePl: 'Akcesoria do tabletów',
							nameEn: 'Tablet Accessories'
						},
						{
							id: 604,
							namePl: 'Akcesoria foto-video',
							nameEn: 'Photo and Video Accessories'
						},
						{
							id: 389,
							namePl: 'Akcesoria do monitorów',
							nameEn: 'Monitor Accessories'
						},
						{
							id: 351,
							namePl: 'Akcesoria do telewizorów',
							nameEn: 'TV Accessories'
						},
						{
							id: 914,
							namePl: 'Akcesoria do konsol',
							nameEn: 'Console Accessories'
						},
						{
							id: 170,
							namePl: 'Akcesoria do słuchawek',
							nameEn: 'Headphone Accessories'
						},
						{
							id: 38,
							namePl: 'Akcesoria do myszek',
							nameEn: 'Mouse Accessories'
						},
						{
							id: 66,
							namePl: 'Akcesoria do klawiatur',
							nameEn: 'Keyboard Accessories'
						},
						{
							id: 38,
							namePl: 'Akcesoria do kontrolerów',
							nameEn: 'Controller Accessories'
						},
						{
							id: 36,
							namePl: 'Akcesoria do tabletów graficznych',
							nameEn: 'Graphic Tablet Accessories'
						},
						{
							id: 820,
							namePl: 'Pamięci flash',
							nameEn: 'Flash Memory'
						}
					]
				}
			]
		};
	}
};
</script>
