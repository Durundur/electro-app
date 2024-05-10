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
										:src="item.photo"
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
						<template v-slot:item.stockQuantity="{ item }">
							<div class="text-end">
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
								link
								:to="`/admin/products/${item.id}`"></v-btn>
						</template>
					</v-data-table>
				</v-card-text>
			</v-card>
		</v-container>
	</Suspense>
</template>
<script setup>
	import { ref } from "vue";
	const nuxtApp = useNuxtApp();
	definePageMeta({
		layout: "admin",
	});
	const headers = ref([
		//{ title: "ID", key: "id", sortable: false },
		//{ title: "Zdjęcia", key: "image", sortable: false },
		{ title: "Nazwa", key: "name", sortable: true },
		{ title: "Grupy", key: "group", sortable: false },
		{ title: "Pozostało", key: "stockQuantity", sortable: true },
		{ title: "", key: "actions", sortable: false },
	]);
	const expandFilters = ref(false);
	const products = ref([]);
	const { data, pending } = await useAsyncData(() =>
		nuxtApp.$api.get("api/Products"),
	);
	products.value = data.value.data;
</script>
<style>
	:deep(.v-table) {
		font-size: 12px;
	}
</style>
