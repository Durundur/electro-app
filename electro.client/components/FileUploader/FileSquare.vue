<template>
	<v-hover>
		<template v-slot:default="{ isHovering, props }">
			<v-sheet
				v-bind="props"
				flat
				border
				rounded="lg"
				height="100%"
				style="position: relative">
				<v-img
					contain
					height="100%"
					width="100%"
					rounded="lg"
					:aspect-ratio="4 / 3"
					:src="file"></v-img>
				<div
					v-if="isHovering"
					class="d-flex justify-center"
					style="
						position: absolute;
						pointer-events: none;
						width: 100%;
						bottom: 5%;
					">
					<v-btn
						:class="{ invisible: index === 0 }"
						class="mr-2"
						style="pointer-events: all"
						density="comfortable"
						size="small"
						variant="elevated"
						@click="emit('move-file-backward', index)"
						icon="mdi-chevron-left"></v-btn>
					<v-btn
						style="pointer-events: all"
						density="comfortable"
						size="small"
						variant="elevated"
						color="error"
						@click="emit('delete-file', index)"
						icon="mdi-trash-can-outline"></v-btn>
					<v-btn
						:class="{ invisible: index === filesLenght - 1 }"
						class="ml-2"
						style="pointer-events: all"
						density="comfortable"
						size="small"
						variant="elevated"
						@click="emit('move-file-forward', index)"
						icon="mdi-chevron-right"></v-btn>
				</div>
			</v-sheet>
		</template>
	</v-hover>
</template>
<script setup>
	defineProps({
		file: {
			required: true,
			type: String,
		},
		index: {
			required: true,
		},
		filesLenght: {
			required: true,
			type: Number,
		},
	});

	const emit = defineEmits([
		"delete-file",
		"move-file-forward",
		"move-file-backward",
	]);
</script>
