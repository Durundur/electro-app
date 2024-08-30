<template>
	<SubCardTitle>Dane odbiorcy</SubCardTitle>
	<v-card
		border
		flat
		rounded="lg"
		class="pa-2">
		<p>{{ recipient.name }}</p>
		<p>tel. {{ recipient.phoneNumber }}</p>
		<p>email: {{ recipient.email }}</p>
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
