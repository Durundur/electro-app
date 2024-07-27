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
			:totalAmount="order.totalPrice.GrossValue"></OrderFooter>
	</v-card>
</template>
<script lang="ts" setup>
	import utlis from "~/utlis";
	import { type IOrder } from "~/types/order";
	export interface IOrderProps {
		order: IOrder;
	}
	const props = defineProps<IOrderProps>();
	const productCount = computed(() =>
		utlis.countTotalOrderProductsQuantity(props.order.products),
	);
</script>
