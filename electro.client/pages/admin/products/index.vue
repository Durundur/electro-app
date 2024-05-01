<template>
	<v-container fluid>
		<v-card
			border
			flat
			rounded="lg">
			<v-card-title class="d-flex justify-space-between align-center">
				<span>Produkty</span>
				<v-btn
					color="success"
					prepend-icon="mdi-plus"
					variant="elevated"
					class="text-none"
					flat
					size="small"
					to="/admin/products/edit">
					Dodaj nowy
				</v-btn>
			</v-card-title>
			<!-- <v-row>
					<v-col
						cols="4"
						align-self="center">
						<v-text-field
							v-model="resetPassEmail"
							density="compact"
							variant="outlined"
							label="Wyszukaj"
							hide-details="auto"
							prepend-inner-icon="mdi-magnify"></v-text-field>
					</v-col>
					<v-spacer></v-spacer>
					<v-btn
						@click="expandFilters = !expandFilters"
						size="x-small"
						style="font-size: 14px; width: 25px; height: 25px"
						variant="outlined"
						icon="mdi-chevron-down"></v-btn>
				</v-row>
				<v-expand-transition>
					<v-card
						flat
						v-show="expandFilters">
						<v-card-text class="px-0">
							<v-row>
								<v-col cols="4"></v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-expand-transition>
			</v-card-title> -->
			<v-card-text>
				<v-data-table
					:headers="headers"
					:items="products">
					<template v-slot:header.stock="{ column }">
						<div class="text-end">{{ column.title }}</div>
					</template>
					<template v-slot:item.name="{ item }">
						<div
							class="d-flex ga-2"
							style="align-items: center">
							<div style="width: 48px">
								<v-img
									:src="item.image"
									height="48"></v-img>
								<v-tooltip
									activator="parent"
									location="bottom"
									style="font-size: 10px">
									{{ item.name }}
								</v-tooltip>
							</div>
							<PureLink
								:to="`/product/${item.id}`"
								style="font-size: 0">
								<span
									class="d-inline-block text-truncate text-body-2"
									style="max-width: 300px">
									{{ item.name }}
								</span>
							</PureLink>
						</div>
					</template>
					<template v-slot:item.group="{ item }">
						<div class="d-flex flex-row ga-1">
							<v-chip size="x-small">{{ item.group }}</v-chip>
							<v-chip size="x-small">{{ item.category }}</v-chip>
							<v-chip size="x-small">{{ item.subCategory }}</v-chip>
						</div>
					</template>
					<template v-slot:item.stock="{ item }">
						<div class="text-end">
							<v-chip
								:color="item.stock > 2 ? 'green' : 'red'"
								:text="item.stock"
								size="small"
								label></v-chip>
						</div>
					</template>
					<template v-slot:item.actions="{ item }">
						<v-btn
							icon="mdi-pencil"
							size="x-small"
							variant="text"
							link
							:to="`/admin/product/edit/${item.id}`"></v-btn>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</v-container>
</template>
<style>
	:deep(.v-table) {
		font-size: 12px;
	}
</style>
<script>
	definePageMeta({
		layout: "admin",
	});
	export default {
		data() {
			return {
				headers: [
					//{ title: "ID", key: "id", sortable: false },
					//{ title: "Zdjęcia", key: "image", sortable: false },
					{ title: "Nazwa", key: "name", sortable: true },
					{ title: "Grupy", key: "group", sortable: false },
					{ title: "Pozostało", key: "stock", sortable: true },
					{ title: "", key: "actions", sortable: false },
				],
				expandFilters: false,
				products: [
					{
						id: 12312313,
						name: "MSI Bravo 15 Ryzen 5-7535HS/16GB/512/Win11X RX6550M 144Hz 5-7535HS/16GB/512/Win11X RX6550M 144Hz",
						price: 3349.0,
						oldPrice: 3333.0,
						image:
							"https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2023/10/pr_2023_10_4_14_23_57_401_00.jpg",
						group: "Laptopy i komputety",
						category: "Laptopy/Notebooki/Ultrabooki",
						subCategory: "Gamingowe",
						stock: 10,
					},
					{
						id: 12312313,
						name: "TP-Link Archer C6 (1200Mb/s a/b/g/n/ac) DualBand",
						group: "Urządzenia sieciowe",
						category: "Rutery",
						subCategory: "Gamingowe",
						stock: 2,
						price: 158.9,
						oldPrice: null,
						image:
							"https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_14_8_38_35_688_00.jpg",
					},
					{
						id: 12312313,
						name: "HP 255 G9 Ryzen 5-5625U/16GB/512/Win11",
						group: "Laptopy i komputety",
						category: "Laptopy/Notebooki/Ultrabooki",
						subCategory: "Gamingowe",
						stock: 123,
						price: 2149.0,
						oldPrice: null,
						image:
							"https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/1/pr_2024_1_8_8_30_6_717_03.jpg",
					},
				],
			};
		},
	};
</script>
