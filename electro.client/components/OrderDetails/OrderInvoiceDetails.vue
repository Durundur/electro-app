<template>
	<SubCardTitle>Dane do faktury</SubCardTitle>
	<v-card
		border
		flat
		rounded="lg"
		class="pa-2">
		<p>{{ recipient.companyName }}</p>
		<p>NIP: {{ recipient.nip }}</p>
		<p>{{ address.street }} {{ address.buildingNumber }}</p>
		<p>{{ address.postalCode }} {{ address.city }}</p>
		<p>{{ address.country }}</p>
	</v-card>
</template>
<script setup lang="ts">
	import type { IAddressBase } from "~/types/Common/Address";
	import type { IRecipient } from "~/types/Common/Recipient";
	const props = defineProps<{
		recipient: IRecipient;
		address: IAddressBase;
	}>();
</script>
