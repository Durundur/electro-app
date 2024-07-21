<template>
	<v-table
		density="comfortable"
		hover
		fixed-header>
		<thead>
			<tr>
				<th class="text-center">ID</th>
				<th class="text-center">Data złożenia</th>
				<th class="text-center">Wartość</th>
				<th class="text-center">Status</th>
				<th class="text-center"></th>
			</tr>
		</thead>
		<tbody>
			<template v-for="(order, index) in orders">
				<tr class="text-center">
					<td>{{ order.id }}</td>
					<td>
						{{
							new Date(order.createdAt).toLocaleString("pl-PL", {
								dateStyle: "short",
								timeStyle: "medium",
							})
						}}
					</td>
					<td>{{ $formatters.priceFormatter(order.totalPrice) }} zł</td>
					<td>{{ order.status }}</td>
					<td class="text-end">
						<v-btn
							variant="tonal"
							size="small"
							class="text-none text-body-3 font-weight-regular"
							:to="`/account/orders/${order.id}`">
							Szczegóły
						</v-btn>
					</td>
				</tr>
			</template>
		</tbody>
	</v-table>
</template>
<script setup>
	const props = defineProps({
		orders: {
			type: Array,
		},
	});
</script>
