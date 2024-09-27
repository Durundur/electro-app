<template>
	<v-container class="pa-0">
		<v-row dense>
			<v-col
				cols="12"
				sm="5"
				md="4">
				<v-select
					:list-props="{ slim: true, density: 'compact' }"
					clearable
					hide-details="auto"
					variant="outlined"
					class="size-medium"
					:items="sortItems"
					label="Sortuj"
					item-title="label"
					:model-value="proxy.order"
					@update:model-value="(v: OrdersOverviewOrderOptions) => proxy = { ...proxy, order: v }"></v-select>
			</v-col>
			<v-col
				cols="12"
				sm="3">
				<v-select
					:list-props="{ slim: true, density: 'compact' }"
					clearable
					hide-details="auto"
					variant="outlined"
					class="size-medium"
					:items="statusItems"
					label="Status"
					item-title="label"
					:model-value="proxy.status"
					@update:model-value="(v: OrderStatus) => proxy = { ...proxy, status: v }"></v-select>
			</v-col>
		</v-row>
	</v-container>
</template>
<script setup lang="ts">
	import { OrderStatus } from "~/types/Order/Order";
	import type { Option } from "../Common/SelectableOptionGroup.vue";
	import {
		OrdersOverviewOrderOptions,
		type IOrderOverviewParams,
	} from "~/types/Order/OrderOverview";

	const props = defineProps<{ modelValue: IOrderOverviewParams }>();
	const emit = defineEmits<{
		(e: "update:modelValue", value: IOrderOverviewParams): void;
	}>();

	const proxy = computed({
		get() {
			return props.modelValue;
		},
		set(value: IOrderOverviewParams) {
			emit("update:modelValue", value);
		},
	});

	const statusItems: Option<OrderStatus>[] = [
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
			value: OrderStatus.InDelivery,
		},
		{
			label: "Zakończone",
			value: OrderStatus.Delivered,
		},
	];

	const sortItems: Option<string>[] = [
		{
			label: "Data zakupu od najnowszego",
			value: OrdersOverviewOrderOptions.DateDesc,
		},
		{
			label: "Data zakupu od najstarszego",
			value: OrdersOverviewOrderOptions.DateAsc,
		},
		{
			label: "Wartość zamówienia od najtańszego",
			value: OrdersOverviewOrderOptions.TotalPriceAsc,
		},
		{
			label: "Wartość zamówienia od najdroższego",
			value: OrdersOverviewOrderOptions.TotalPriceDesc,
		},
	];
</script>
