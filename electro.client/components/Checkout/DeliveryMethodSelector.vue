<template>
	<SubCardTitle>Sposób dostawy</SubCardTitle>
	<SelectableOptionGroup
		:options="deliveryMethods"
		v-model="model">
		<template #default="{ option }">
			<div class="d-flex justify-space-between w-100">
				<span>{{ option.label }}</span>
				<span>{{ $formatters.priceFormatter(option.price) }} zł</span>
			</div>
		</template>
	</SelectableOptionGroup>
</template>
<script lang="ts" setup>
	import { EOrderDeliveryMethod } from "~/types/order";
	const model = defineModel<EOrderDeliveryMethod>(undefined);
	const deliveryMethods = [
		{ value: EOrderDeliveryMethod.Courier, label: "Kurier", price: 19.99 },
		{
			value: EOrderDeliveryMethod.ParcelLocker,
			label: "InPost Paczkomat",
			price: 9.99,
		},
	];
</script>
