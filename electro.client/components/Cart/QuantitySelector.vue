<template>
	<v-sheet
		border
		rounded="pill"
		:width="100"
		class="d-flex justify-space-between align-center">
		<v-btn
			size="x-small"
			variant="tonal"
			icon="mdi-minus"
			@click="
				{
					let v = modelValue;
					updateValue(--v);
				}
			"
			:disabled="modelValue <= 0"></v-btn>
		<span>{{ modelValue }}</span>
		<v-btn
			size="x-small"
			variant="tonal"
			icon="mdi-plus"
			@click="
				{
					let v = modelValue;
					updateValue(++v);
				}
			"></v-btn>
	</v-sheet>
</template>
<script setup>
	const emit = defineEmits(["update:modelValue"]);
	const props = defineProps({
		modelValue: {
			type: Number,
		},
	});
	const updateValue = (newValue) => {
		emit("update:modelValue", newValue);
	};
</script>
