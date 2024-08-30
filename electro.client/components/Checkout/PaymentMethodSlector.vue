<template>
	<SubCardTitle>Płatność</SubCardTitle>
	<SelectableOptionGroup
		:container-border="true"
		:options="paymentMethods"
		:defaultOption="paymentMethods.at(0)"
		@update:model-value="(v) => (paymentMethod = v)"
		:model-value="paymentMethod"></SelectableOptionGroup>
</template>
<script lang="ts" setup>
	import { PaymentMethod } from "~/types/Order/Order";

	const props = defineProps<{ modelValue: PaymentMethod }>();
	const emit = defineEmits(["update:modelValue"]);

	const paymentMethod = computed({
		get() {
			return props.modelValue;
		},
		set(value: PaymentMethod) {
			emit("update:modelValue", value);
		},
	});

	const paymentMethods = [
		{
			label: "Płatność online",
			value: PaymentMethod.OnlinePayment,
		},
		{
			label: "Przelew tradycyjny",
			value: PaymentMethod.BankTransfer,
		},
		{
			label: "Blik",
			value: PaymentMethod.Blik,
		},
		{
			label: "Przy odbiorze",
			value: PaymentMethod.OnDelivery,
		},
		{
			label: "Karta płatnicza online",
			value: PaymentMethod.OnlineByCard,
		},
	];
</script>
