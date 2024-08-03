<template>
	<IndividualCustomerForm
		v-if="
			customerType == EOrderCustomerType.Invidual || !customerType
		"></IndividualCustomerForm>
	<CompanyCustomerForm v-else></CompanyCustomerForm>
</template>
<script lang="ts" setup>
	import { EOrderCustomerType } from "~/types/order";
	const props = defineProps<{ customerType: EOrderCustomerType }>();
</script>
