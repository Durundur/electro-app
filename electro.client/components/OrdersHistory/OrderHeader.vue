<template>
	<div class="d-flex justify-center align-center">
		<OrderNumber :number="number"></OrderNumber>
		<v-spacer></v-spacer>
		<v-chip
			variant="outlined"
			color="grey">
			{{ $formatters.dateFormatter(createdAt) }}
		</v-chip>
		<v-chip
			class="ml-6"
			variant="tonal"
			color="success">
			{{ status }}
		</v-chip>
	</div>
</template>
<script lang="ts" setup>
	import type { OrderStatus } from "~/types/Order/Order";

	export interface IOrderHeaderProps {
		number: number;
		status: OrderStatus;
		createdAt: string;
	}
	const props = defineProps<IOrderHeaderProps>();
</script>
