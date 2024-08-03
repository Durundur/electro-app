<template>
	<v-card
		flat
		:border="!disableBorder"
		rounded="lg">
		<v-row
			:class="{ 'pa-2': !disableBorder, 'mr-0': maxHeight !== '100%' }"
			dense
			:style="containerStyle">
			<v-col
				cols="12"
				:sm="sm"
				:md="md"
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
		sm?: number;
		md?: number;
		disableBorder?: boolean;
	}
	export interface IOrderProductsContainerSlotProps {
		product: IOrderProuct;
		index: number;
	}
	const props = withDefaults(defineProps<IOrderProductsContainerProps>(), {
		sm: 12,
		md: 6,
		disableBorder: false,
	});
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
