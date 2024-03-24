<template>
	<v-card :flat="true">
		<v-card-title class="d-flex justify-space-between align-center text-body-1 py-0 font-600">
			Filtry
			<v-btn variant="tonal" size="x-small" class="text-none text-body-3">wyczyść</v-btn>
		</v-card-title>
		<div>
			<v-card-title class="py-0 text-body-2">Cena</v-card-title>
			<div class="px-4 d-flex align-center ga-4">
				<v-text-field hide-details density="compact" label="od" variant="outlined" suffix="zł">
				</v-text-field>
				<span>-</span>
				<v-text-field hide-details density="compact" label="do" variant="outlined" suffix="zł">
				</v-text-field>
			</div>
		</div>
		<FilterItem v-model="selected" header="Status" :options="options"></FilterItem>
		<!-- <div>
				<v-card-title class="pa-0 text-body-2">Dostępność</v-card-title>
				<v-checkbox color="primary" hide-details density="compact">
					<template #label>Ukryj czasowo niedostępne</template>
</v-checkbox>
</div> -->
	</v-card>
</template>
<style scoped>
:deep(.v-label--clickable) {
	font-size: 12px;
	opacity: 1;
}
</style>
<script>export default {
	data() {
		return {
			options: ['Promocja', 'Wyprzedaż', 'Nowość', 'Polecane', 'Przedsprzedaż'],
			selected: []
		}
	},
	watch: {
		selected: {
			deep: true,
			handler() {
				console.log(this.selected)
			}
		}
	}
}
</script>
