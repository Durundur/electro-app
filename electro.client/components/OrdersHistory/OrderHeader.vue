<template>
	<div class="d-flex justify-center align-center">
		<OrderNumber :number="number"></OrderNumber>
		<v-spacer></v-spacer>
		<v-chip
			variant="outlined"
			color="grey">
			{{
				createdAt.toLocaleString("pl-PL", {
					dateStyle: "full",
				})
			}}
		</v-chip>
		<v-chip
			class="ml-6"
			variant="tonal"
			color="success">
			{{ OrderStatusTranslations[status] }}
		</v-chip>
	</div>
</template>
<script lang="ts" setup>
	import { OrderStatusTranslations, type OrderStatus } from "~/types/order";
	export interface IOrderHeaderProps {
		number: string;
		status: OrderStatus;
		createdAt: Date;
	}
	const props = defineProps<IOrderHeaderProps>();
</script>
