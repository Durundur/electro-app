<template>
	<template v-for="(field, i) in modelValue">
		<v-row class="my-0">
			<EditProductSpecificationField
				:field="field"
				:index="i"
				@remove-field="removeField"
				@remove-field-value="removeFieldValue"
				@add-field-value="addFieldValue"></EditProductSpecificationField>
			<v-divider
				v-if="i !== modelValue.length - 1"
				class="ma-2"></v-divider>
		</v-row>
	</template>
	<v-btn
		@click="addField"
		color="success"
		class="text-none mt-2"
		size="small"
		prepend-icon="mdi-plus"
		text="Nowe pole">
	</v-btn>
</template>
<script>
	export default {
		props: {
			modelValue: {
				type: Array,
				default: [],
			},
		},
		methods: {
			removeField(fieldIndex) {
				const fields = [...this.modelValue];
				fields.splice(fieldIndex, 1);
				this.$emit("update:modelValue", fields);
			},
			removeFieldValue(fieldIndex, fieldValueIndex) {
				const fields = [...this.modelValue];
				fields[fieldIndex].fieldValue.splice(fieldValueIndex, 1);
				this.$emit("update:modelValue", fields);
			},
			addFieldValue(fieldIndex) {
				const fields = [...this.modelValue];
				if (Array.isArray(fields[fieldIndex].fieldValue)) {
					fields[fieldIndex].fieldValue.push("");
				}
				this.$emit("update:modelValue", fields);
			},
			addField() {
				this.modelValue.push({ fieldName: "", fieldValue: [""] });
				this.$emit("update:modelValue", this.modelValue);
			},
		},
	};
</script>
