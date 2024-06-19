<template>
	<v-dialog
		fullscreen
		hide-overlay>
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn
				v-bind="activatorProps"
				variant="text"
				class="text-none">
				Kategorie i filtry
			</v-btn>
		</template>
		<template v-slot:default="{ isActive }">
			<v-card>
				<v-card-title class="d-flex align-center">
					<v-btn
						class="d-inline"
						@click="isActive.value = false"
						icon="mdi-chevron-left"
						variant="text"></v-btn>
					<span>Kategorie i filtry</span>
				</v-card-title>
				<v-card-text>
					<CategoryFilter v-model="model" />
					<FeaturesFilter />
				</v-card-text>
			</v-card>
		</template>
	</v-dialog>
</template>
<script setup>
	const model = defineModel({
		activeCategories: {
			type: Object,
			required: true,
		},
	});
</script>
