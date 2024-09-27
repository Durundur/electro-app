<template>
	<Suspense>
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
						size="small"
						to="/admin/products/create">
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
										:src="item.photos[0]"
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
								<v-chip
									v-if="item.group"
									size="x-small">
									{{ item.group?.name }}
								</v-chip>
								<v-chip
									v-if="item.category"
									size="x-small">
									{{ item.category?.name }}
								</v-chip>
								<v-chip
									v-if="item.subCategory"
									size="x-small">
									{{ item.subCategory?.name }}
								</v-chip>
							</div>
						</template>
						<template v-slot:item.stockQuantity="{ item }">
							<div class="text-center">
								<v-chip
									:color="item.stockQuantity > 2 ? 'green' : 'red'"
									:text="item.stockQuantity"
									size="small"
									label></v-chip>
							</div>
						</template>
						<template v-slot:item.actions="{ item }">
							<v-btn
								icon="mdi-pencil"
								size="x-small"
								variant="text"
								:to="`/admin/products/${item.id}`"></v-btn>
						</template>
					</v-data-table>
				</v-card-text>
			</v-card>
		</v-container>
	</Suspense>
</template>
<script setup>
	const { $api, $toast } = useNuxtApp();
	definePageMeta({
		layout: "admin",
		allowAnonymous: false,
	});
	const headers = ref([
		//{ title: "ID", key: "id", sortable: false },
		//{ title: "Zdjęcia", key: "image", sortable: false },
		{ title: "Nazwa", key: "name", sortable: true },
		{ title: "Grupy", key: "group", sortable: false },
		{ title: "Stan magazynowy", key: "stockQuantity", sortable: true },
		{ title: "", key: "actions", sortable: false },
	]);
	const expandFilters = ref(false);
	const products = ref([]);

	const { data: productsRes } = await useAsyncData(() =>
		$api.get("api/Products"),
	);
	if (productsRes.value.ok) {
		products.value = productsRes.value.data;
	} else {
		$toast.error("Błąd podczas pobierania dancyh");
	}
</script>
<style>
	:deep(.v-table) {
		font-size: 12px;
	}
</style>
