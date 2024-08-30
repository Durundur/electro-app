<template>
	<v-card
		flat
		border
		rounded="lg">
		<v-card-title>
			<OrderHeader
				:createdAt="order.createdAt"
				:number="order.number"
				:status="order.status"></OrderHeader>
		</v-card-title>
		<div style="height: 130px">
			<v-card-text class="py-0">
				<OrderProductsContainer
					:maxHeight="'130px'"
					:products="order.products">
					<template #default="{ product, index }">
						<OrderProduct
							:product="product"
							:key="index" />
					</template>
				</OrderProductsContainer>
			</v-card-text>
		</div>
		<OrderFooter
			:orderId="order.id"
			:productCount="productCount"
			:totalAmount="order.totalPrice.value"></OrderFooter>
	</v-card>
</template>
<script lang="ts" setup>
	import type { IOrderOverview } from "~/types/Order/OrderOverview";
	export interface IOrderProps {
		order: IOrderOverview;
	}
	const props = defineProps<IOrderProps>();
	const productCount = computed(() =>
		props.order.products.reduce((acc, item) => (acc += item.quantity), 0),
	);
</script>
