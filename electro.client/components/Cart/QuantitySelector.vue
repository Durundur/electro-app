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
			@click="emit('update:modelValue', --modelValue)"
			:disabled="model <= 0"></v-btn>
		<span>{{ modelValue }}</span>
		<v-btn
			size="x-small"
			variant="tonal"
			icon="mdi-plus"
			@click="emit('update:modelValue', ++modelValue)"></v-btn>
	</v-sheet>
</template>
<script setup>
	const emit = defineEmits(["update:modelValue"]);
	const props = defineProps({
		modelValue: {
			type: Number,
		},
	});
</script>
