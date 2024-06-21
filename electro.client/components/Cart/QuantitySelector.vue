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
			@click="model--"
            :disabled="model <= 0"></v-btn>
		<span>{{ model }}</span>
		<v-btn
			size="x-small"
			variant="tonal"
			icon="mdi-plus"
			@click="model++"></v-btn>
	</v-sheet>
</template>
<script setup>
	const model = defineModel({
		type: Number,
		default: 1,
	});
</script>
