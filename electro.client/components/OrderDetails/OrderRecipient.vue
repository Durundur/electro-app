<template>
	<SubCardTitle>Dane odbiorcy</SubCardTitle>
	<v-card
		border
		flat
		rounded="lg"
		class="pa-2">
		<p>{{ recipient.firstName }} {{ recipient.lastName }}</p>
		<p>tel. {{ recipient.phoneNumber }}</p>
		<p>email: {{ recipient.email }}</p>
	</v-card>
</template>
<script setup lang="ts">
	import type { IRecipient } from "~/types/order";
	const props = defineProps<{
		recipient: IRecipient;
	}>();
</script>
