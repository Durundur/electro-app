<template>
	<Container class="py-3 min-main-content-height">
		<v-card
			border
			flat
			rounded="lg">
			<v-card-title class="text-h6 font-weight-medium">
				<span>Zamówienia</span>
			</v-card-title>
			<v-card-text class="pa-0">
				<v-row class="px-4">
					<v-col
						cols="12"
						sm="4"
						md="3">
						<v-select
							density="compact"
							label="Sortowanie"
							:items="[
								'Od najtańszego',
								'Od najdroższego',
								'Od najnowszego',
								'Od najstarszego',
							]"
							variant="outlined"
							hide-details
							clearable></v-select>
					</v-col>
					<v-col
						cols="12"
						sm="4"
						md="3">
						<v-select
							density="compact"
							label="Status"
							variant="outlined"
							hide-details
							clearable
							:items="[
								'Nowe',
								'W realizacji',
								'Wysłane',
								'Zakończone',
								'Anulowane',
							]"></v-select>
					</v-col>
				</v-row>
				<template v-if="orders.length > 0">
					<OrderHistoryList
						class="d-sm-none"
						:orders="orders"></OrderHistoryList>
					<OrderHistoryTable
						class="d-none d-sm-block"
						:orders="orders"></OrderHistoryTable>
				</template>
				<div v-else>
					<NoResults>Brak wyników</NoResults>
				</div>
			</v-card-text>
		</v-card>
	</Container>
</template>
<script setup>
	const orders = ref([
		{
			id: "jais3294idasjdq",
			totalPrice: 342,
			createdAt: "2024-07-02T17:42:57.908Z",
			status: "Delivered",
		},
		{
			id: "i1j2ei9d1132",
			totalPrice: 11,
			createdAt: "2024-11-02T17:42:57.908Z",
			status: "Send",
		},
		{
			id: "1243123dsa123",
			totalPrice: 123,
			createdAt: "2021-12-12T11:42:57.908Z",
			status: "Delivered",
		},
	]);
</script>
