<template>
	<SubCardTitle>Płatność</SubCardTitle>
	<SelectableOptionGroup
		v-model="model"
		:options="paymentMethods"></SelectableOptionGroup>
</template>
<script lang="ts" setup>
	import { EPaymentMethod } from "~/types/order";

	const model = defineModel<EPaymentMethod>();
	const paymentMethods = [
		{
			label: "Płatność online",
			value: EPaymentMethod.OnlinePayment,
		},
		{
			label: "Przelew tradycyjny",
			value: EPaymentMethod.BankTransfer,
		},
		{
			label: "Blik",
			value: EPaymentMethod.Blik,
		},
		{
			label: "Przy odbiorze",
			value: EPaymentMethod.OnDelivery,
		},
		{
			label: "Karta płatnicza online",
			value: EPaymentMethod.OnlineByCard,
		},
	];
</script>
