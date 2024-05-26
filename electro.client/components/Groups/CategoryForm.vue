<template>
	<v-form
		ref="form"
		@submit.prevent="submitCategoryForm">
		<v-container class="pa-0">
			<v-row>
				<v-col cols="4">
					<v-text-field
						density="compact"
						:model-value="model.id"
						variant="outlined"
						color="primary"
						label="ID"
						hide-details
						readonly
						class="my-3"></v-text-field>
					<v-text-field
						density="compact"
						v-model="model.name"
						variant="outlined"
						color="primary"
						label="Nazwa"
						hide-details="auto"
						:rules="$v.required"
						class="my-3"></v-text-field>
				</v-col>
				<v-col>
					<v-card
						height="100%"
						flat>
						<v-card-title class="px-2">Podkategorie</v-card-title>
						<v-select
							multiple
							chips
							density="compact"
							v-model="model.subCategories"
							:items="subCategories"
							return-object
							closable-chips
							item-title="name"
							variant="outlined"></v-select>
					</v-card>
				</v-col>
			</v-row>
			<v-row class="mt-0">
				<v-col
					cols="12"
					class="d-flex justify-end">
					<v-btn
						color="success"
						prepend-icon="mdi-content-save"
						variant="elevated"
						class="text-none mr-4"
						flat
						size="small"
						type="submit">
						Zapisz
					</v-btn>
					<v-btn
						color="error"
						prepend-icon="mdi-trash-can-outline"
						class="text-none"
						variant="elevated"
						size="small"
						text="Usuń"
						@click="emit('delete-category')"></v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>
<script setup>
	defineProps({
		subCategories: Array,
	});
	const emit = defineEmits([
		"delete-category",
		"save-category",
		"subcategory-assign-remove",
		"subcategory-assign",
	]);
	const model = defineModel({ type: Object });
	const form = ref(null);

	function submitCategoryForm() {
		if (form.value.isValid) {
			emit("save-category");
		}
	}

	watch(
		() => model.value.subCategories,
		(newVal, oldVal) => {
			const addedItems = newVal.filter((c) => !oldVal.includes(c));
			const removedItems = oldVal.filter((cat) => !newVal.includes(cat));
			if (addedItems.length) {
				addedItems.forEach((i) => emit("subcategory-assign", i));
			}
			if (removedItems.length) {
				removedItems.forEach((i) => emit("subcategory-assign-remove", i));
			}
		},
	);
</script>
