<template>
	<SubCardTitle>Dane odbiorcy przesyłki</SubCardTitle>
	<div class="d-flex flex-column ga-4">
		<v-text-field
			class="size-medium"
			variant="outlined"
			rounded="lg"
			hide-details="auto"
			v-model="recipient.name"
			label="Nazwa"></v-text-field>
		<div class="d-flex ga-2 flex-md-row">
			<v-text-field
				class="size-medium"
				variant="outlined"
				rounded="lg"
				hide-details="auto"
				v-model="address.street"
				label="Ulica"></v-text-field>
			<v-text-field
				class="size-medium"
				variant="outlined"
				rounded="lg"
				hide-details="auto"
				v-model="address.buildingNumber"
				label="Numer domu lub mieszkania"></v-text-field>
		</div>
		<v-text-field
			class="size-medium"
			variant="outlined"
			rounded="lg"
			hide-details="auto"
			v-model="address.postalCode"
			label="Kod pocztowy"></v-text-field>
		<v-text-field
			class="size-medium"
			variant="outlined"
			rounded="lg"
			hide-details="auto"
			v-model="address.city"
			label="Miejscowość"></v-text-field>
		<v-text-field
			class="size-medium"
			variant="outlined"
			rounded="lg"
			hide-details="auto"
			v-model="recipient.phoneNumber"
			label="Telefon"></v-text-field>
		<v-text-field
			class="size-medium"
			variant="outlined"
			rounded="lg"
			hide-details="auto"
			v-model="recipient.email"
			label="E-mail"></v-text-field>
	</div>
</template>

<script setup lang="ts">
	import type { IAddressBase } from "~/types/Common/Address";
	import type { IRecipient } from "~/types/Common/Recipient";

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
