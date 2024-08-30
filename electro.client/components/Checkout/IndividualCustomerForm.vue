<template>
	<SubCardTitle>Dane odbiorcy przesyłki</SubCardTitle>
	<div class="d-flex flex-column ga-4">
		<DefaultInput
			v-model="recipient.name"
			label="Nazwa"></DefaultInput>
		<div class="d-flex ga-2 flex-md-row">
			<DefaultInput
				v-model="address.street"
				label="Ulica"></DefaultInput>
			<DefaultInput
				v-model="address.buildingNumber"
				label="Numer domu lub mieszkania"></DefaultInput>
		</div>
		<DefaultInput
			v-model="address.postalCode"
			label="Kod pocztowy"></DefaultInput>
		<DefaultInput
			v-model="address.city"
			label="Miejscowość"></DefaultInput>
		<DefaultInput
			v-model="recipient.phoneNumber"
			label="Telefon"></DefaultInput>
		<DefaultInput
			v-model="recipient.email"
			label="E-mail"></DefaultInput>
	</div>
</template>

<script setup lang="ts">
	import type { IAddressBase, IRecipient } from "~/types/order";

	const props = defineProps<{
		recipient: IRecipient;
		address: IAddressBase;
	}>();
	const emit = defineEmits(["update:recipient", "update:address"]);

	const recipient = computed({
		get() {
			return props.recipient;
		},
		set(v: IRecipient) {
			emit("update:recipient", v);
		},
	});

	const address = computed({
		get() {
			return props.address;
		},
		set(v: IAddressBase) {
			emit("update:address", v);
		},
	});
</script>
