<template>
	<SubCardTitle>Adres dostawy</SubCardTitle>
	<v-card
		border
		flat
		rounded="lg"
		class="pa-2">
		<p>{{ address.street }} {{ address.buildingNumber }}</p>
		<p>{{ address.postalCode }} {{ address.city }}</p>
		<p>{{ address.country }}</p>
	</v-card>
</template>
<script setup lang="ts">
	import type { IAddressBase } from "~/types/Common/Address";

	const props = defineProps<{
		address: IAddressBase;
	}>();
</script>
