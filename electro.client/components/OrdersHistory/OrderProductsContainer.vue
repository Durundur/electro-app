<template>
	<v-card
		flat
		border
		rounded="lg">
		<v-row
			dense
			class="ma-0"
			:style="containerStyle">
			<v-col
				cols="12"
				md="6"
				v-for="(product, index) in products"
				:key="index">
				<slot
					:product="product"
					:index="index"></slot>
			</v-col>
		</v-row>
	</v-card>
</template>
<script lang="ts" setup>
	import type { IOrderProuct } from "~/types/order";
	export interface IOrderProductsContainerProps {
		products: IOrderProuct[];
		maxHeight: string;
	}
	export interface IOrderProductsContainerSlotProps {
		product: IOrderProuct;
		index: number;
	}
	const props = defineProps<IOrderProductsContainerProps>();
	const slots = defineSlots<{
		default(props: IOrderProductsContainerSlotProps): any;
	}>();
	const containerStyle = computed(() => ({
		maxHeight: props.maxHeight,
		overflowY: "auto",
	}));
</script>
<style lang="css" scoped>
	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-thumb {
		background: #e0e0e0;
		border-radius: 6px;
	}
</style>
