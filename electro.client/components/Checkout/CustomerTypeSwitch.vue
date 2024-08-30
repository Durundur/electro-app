<template>
	<SubCardTitle>Kupujesz jako</SubCardTitle>
	<SelectableOptionGroup
		horizontal
		:defaultOption="customerTypeOptions.at(0)"
		:options="customerTypeOptions"
		option-border
		:container-border="false"
		v-model="model">
		<template #default="{ option }">
			<span>{{ option.label }}</span>
		</template>
	</SelectableOptionGroup>
</template>
<script lang="ts" setup>
	import { CustomerType } from "~/types/Common/Recipient";
	import type { Option } from "../Common/SelectableOptionGroup.vue";

	const model = defineModel<CustomerType>();
	const customerTypeOptions: Option<CustomerType>[] = [
		{
			label: "Osoba prywatna",
			value: CustomerType.Invidual,
		},
		{
			label: "Firma",
			value: CustomerType.Company,
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
