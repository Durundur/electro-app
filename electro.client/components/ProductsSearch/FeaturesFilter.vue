<template>
	<v-card :flat="true">
		<v-card-title
			class="d-flex justify-space-between align-center text-body-1 font-600">
			Filtry
			<v-btn
				variant="tonal"
				size="x-small"
				class="text-none text-body-3 font-weight-regular">
				wyczyść
			</v-btn>
		</v-card-title>
		<PriceRange />
		<FilterOptionItem
			v-for="filter in filters"
			:header="filter.header"
			v-model="options[filter.fieldName]"
			:options="filter.options" />
	</v-card>
</template>
<style scoped>
	:deep(.v-label--clickable) {
		font-size: 12px;
		opacity: 1;
	}
</style>
<script>
	export default {
		data() {
			return {
				filters: [
					{
						header: "Status",
						options: [
							"Promocja",
							"Wyprzedaż",
							"Nowość",
							"Polecane",
							"Przedsprzedaż",
						],
						fieldName: "status",
					},
					{
						header: "Producent",
						options: [
							"ASUS",
							"HP",
							"Lenovo",
							"Apple",
							"Dell",
							"Acer",
							"Gigabyte",
							"MSI",
							"Huawei",
							"Razer",
						],
						fieldName: "brand",
					},
					{
						header: "Dostępność",
						options: ["Ukryj czasowo niedostępne"],
						fieldName: "hide-unavailable",
					},
				],
				options: {
					status: [],
					brand: [],
				},
			};
		},
		watch: {
			options: {
				deep: true,
				handler(nv) {
					console.log(nv);
				},
			},
		},
	};
</script>
