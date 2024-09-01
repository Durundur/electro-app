<template>
	<SubCardTitle>Sposób dostawy</SubCardTitle>
	<SelectableOptionGroup
		:container-border="true"
		:options="deliveryMethods"
		:defaultOption="deliveryMethods.at(0)"
		@update:model-value="(v) => onNewDeliveryMethod(v as DeliveryMethod)"
		:model-value="deliveryDetails.method">
		<template #default="{ option }">
			<div class="d-flex justify-space-between w-100">
				<span>{{ option.label }}</span>
				<span>
					{{
						$formatters.priceFormatter(
							(option.deliveryCost as IPriceBase).value,
						)
					}}
				</span>
			</div>
		</template>
	</SelectableOptionGroup>
</template>

<script lang="ts" setup>
	import type { ICreateOrderDeliveryDetails } from "~/types/Order/OrderCreate";
	import { DeliveryMethod } from "~/types/Order/Order";
	import type { IPriceBase } from "~/types/Common/Price";

	const props = defineProps<{ modelValue: ICreateOrderDeliveryDetails }>();
	const emit = defineEmits(["update:modelValue"]);

	const deliveryDetails = computed({
		get() {
			return props.modelValue;
		},
		set(value: ICreateOrderDeliveryDetails) {
			return emit("update:modelValue", value);
		},
	});

	const onNewDeliveryMethod = (newMethod: DeliveryMethod) => {
		const selectedMethod = deliveryMethods.find(
			(method) => method.value === newMethod,
		);
		if (selectedMethod) {
			deliveryDetails.value = {
				method: selectedMethod.value,
				cost: selectedMethod.deliveryCost,
			};
		}
	};

	const deliveryMethods = [
		{
			value: DeliveryMethod.Courier,
			label: "Kurier",
			deliveryCost: {
				currency: "PLN",
				value: 19.99,
			},
		},
		{
			value: DeliveryMethod.ParcelLocker,
			label: "InPost Paczkomat",
			deliveryCost: {
				currency: "PLN",
				value: 9.99,
			},
		},
	];
</script>
