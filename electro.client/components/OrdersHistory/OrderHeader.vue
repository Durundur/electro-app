<template>
	<div class="d-flex justify-center align-center">
		<OrderNumber :number="number"></OrderNumber>
		<v-spacer></v-spacer>
		<v-chip
			variant="outlined"
			color="grey">
			{{ createDateString }}
		</v-chip>
		<v-chip
			class="ml-6"
			variant="tonal"
			color="success">
			{{ orderStatusTranslations[status] }}
		</v-chip>
	</div>
</template>
<script lang="ts" setup>
	import {
		orderStatusTranslations,
		type OrderStatus,
	} from "~/types/Order/Order";

	export interface IOrderHeaderProps {
		number: number;
		status: OrderStatus;
		createdAt: string;
	}
	const props = defineProps<IOrderHeaderProps>();

	const createDateString = computed(() => {
		const date = new Date(props.createdAt);
		const now = new Date();
		const dateDiff = now.getTime() - date.getTime();
		if (dateDiff / (1000 * 60 * 60 * 20) > 7) {
			return date.toLocaleString("pl-PL", {
				dateStyle: "long",
			});
		}
		return date.toLocaleString("pl-PL", {
			dateStyle: "full",
		});
	});
</script>
