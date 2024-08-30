<template>
	<Container v-if="orders && pagination && orders.length > 0">
		<v-card flat>
			<CardTitle>Zamówienia</CardTitle>
			<OrdersFilters class="pb-4"></OrdersFilters>
			<v-row dense>
				<v-col
					cols="12"
					lg="6"
					v-for="order in orders"
					:key="order.id">
					<OrdersHistoryOrder :order="order"></OrdersHistoryOrder>
				</v-col>
			</v-row>
			<NewPagination
				class="pt-4"
				:pagination-data="pagination"
				@on-new-page-number="(v) => (page = v)"></NewPagination>
		</v-card>
	</Container>
	<LackOfOrders v-else></LackOfOrders>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import type { IPaginationData } from "~/components/Common/NewPagination.vue";
	import LackOfOrders from "~/components/OrdersHistory/LackOfOrders.vue";
	import { PaginationQuery } from "~/types/Api/PagedResult";

	const orderStore = useOrderStore();
	const { $toast } = useNuxtApp();

	const page = ref(1);
	const pageSize = ref(10);

	const { data, error } = await useAsyncData(
		"getUserOrdersOverview",
		() =>
			orderStore.getUserOrdersOverview(
				new PaginationQuery(page.value, pageSize.value),
			),
		{
			watch: [page, pageSize],
		},
	);

	if (error.value) {
		$toast.error("Błąd połączenia z serwerem");
	}

	const orders = computed(() => data.value?.data);

	const pagination = computed<IPaginationData | undefined>(() => {
		if (data.value) {
			const { data: _, ...rest } = data.value;
			return rest as IPaginationData;
		}
		return;
	});
</script>
