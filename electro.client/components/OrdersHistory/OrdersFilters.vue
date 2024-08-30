<template>
	<v-container class="pa-0">
		<v-row dense>
			<v-col cols="12" md="3">
				<DefaultSelect
					:items="sortItems"
					label="Sortuj"
					v-model="sortOption"></DefaultSelect>
			</v-col>
			<v-col cols="12" md="3">
				<DefaultSelect
					:items="statusItems"
					label="Status"
					v-model="filterOption"></DefaultSelect>
			</v-col>
		</v-row>
	</v-container>
</template>
<script setup lang="ts">
	import { OrderStatus } from "~/types/Order/Order";
	import type { IDefaultSelectItem } from "../Common/DefaultSelect.vue";

	const statusItems: IDefaultSelectItem<OrderStatus>[] = [
		{
			label: "Nowe",
			value: OrderStatus.New,
		},
		{
			label: "Opłacone",
			value: OrderStatus.Paid,
		},
		{
			label: "W realizacji",
			value: OrderStatus.InProgress,
		},
		{
			label: "Wysłane",
			value: OrderStatus.Delivery,
		},
		{
			label: "Zakończone",
			value: OrderStatus.Delivered,
		},
		// {
		// 	label: "Anulowane",
		//     value: OrderStatus.
		// },
	];

	const sortItems: IDefaultSelectItem<string>[] = [
		{
			label: "Data zakupu od najnowszego",
			value: "date-desc",
		},
		{
			label: "Data zakupu od najstarszego",
			value: "date-asc",
		},
		{
			label: "Wartość zamówienia od najtańszego",
			value: "price-asc",
		},
		{
			label: "Wartość zamówienia od najdroższego",
			value: "price-desc",
		},
	];

	const sortOption = ref(undefined);
	const filterOption = ref(undefined);
</script>
