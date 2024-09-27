<template>
	<Container class="h-inherit">
		<v-card
			flat
			class="h-inherit d-flex flex-column">
			<CardTitle>Zamówienia</CardTitle>
			<OrdersFilters
				v-model="orderOverviewParams"
				class="pb-4"></OrdersFilters>
			<div
				v-if="orders && pagination && orders.length > 0"
				class="flex-grow-1 d-flex flex-column">
				<v-row
					dense
					class="flex-grow-1">
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
					@on-new-page-number="
						(v) => (paginationParams.pageNumber = v)
					"></NewPagination>
			</div>
			<LackOfOrders
				v-else
				class="flex-grow-1"></LackOfOrders>
		</v-card>
	</Container>
</template>

<script setup lang="ts">
	import type {
		IPaginationParams,
		IPaginationResult,
	} from "~/types/Api/PagedResult";
	import type { IOrderOverviewParams } from "~/types/Order/OrderOverview";
	definePageMeta({
		allowAnonymous: false,
	});
	const orderStore = useOrderStore();
	const { $toast } = useNuxtApp();

	const paginationParams = ref<IPaginationParams>({
		pageNumber: 1,
		pageSize: 10,
	});
	const orderOverviewParams = ref<IOrderOverviewParams>({
		status: undefined,
		order: undefined,
	});

	const { data, error } = await useAsyncData(
		"getUserOrdersOverview",
		() =>
			orderStore.getUserOrdersOverview(
				paginationParams.value,
				orderOverviewParams.value,
			),
		{
			watch: [paginationParams, orderOverviewParams],
		},
	);
	if (error.value) {
		$toast.error("Błąd połączenia z serwerem");
	}

	const orders = computed(() => data.value?.data);

	const pagination = computed<IPaginationResult | undefined>(() => {
		if (data.value) {
			const { data: _, ...rest } = data.value;
			return rest as IPaginationResult;
		}
		return;
	});
</script>
