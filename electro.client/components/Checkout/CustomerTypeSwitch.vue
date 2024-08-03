<template>
	<SubCardTitle>Kupujesz jako</SubCardTitle>
	<SelectableOptionGroup
		horizontal
		:options="deliveryMethods"
		option-border
		:container-border="false"
		v-model="model">
		<template #default="{ option }">
			<span>{{ option.label }}</span>
		</template>
	</SelectableOptionGroup>
</template>
<script lang="ts" setup>
	import { EOrderCustomerType } from "~/types/order";
	import type { Options } from "../Common/SelectableOptionGroup.vue";

	const model = defineModel<EOrderCustomerType>();
	const deliveryMethods: Options[] = [
		{
			label: "Osoba prywatna",
			value: EOrderCustomerType.Invidual,
		},
		{
			label: "Firma",
			value: EOrderCustomerType.Company,
		},
	];
</script>
<style lang="css">
	.selection-active {
		outline: 2px solid black;
		outline-offset: -2px;
		transition: outline 0.2s ease;
	}
</style>
