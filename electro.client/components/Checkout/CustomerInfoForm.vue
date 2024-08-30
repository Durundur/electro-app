<template>
	<div>
		<CustomerTypeSwitch v-model="recipient.type"></CustomerTypeSwitch>
		<IndividualCustomerForm
			v-model:address="address"
			v-model:recipient="recipient"
			v-if="
				!recipient.type || recipient.type == CustomerType.Invidual
			"></IndividualCustomerForm>
		<CompanyCustomerForm
			v-model:address="address"
			v-model:recipient="recipient"
			v-else></CompanyCustomerForm>
	</div>
</template>
<script lang="ts" setup>
	import type { IAddressBase } from "~/types/Common/Address";
	import { CustomerType, type IRecipient } from "~/types/Common/Recipient";

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
