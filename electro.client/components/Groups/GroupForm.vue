<template>
	<v-form
		ref="form"
		@submit.prevent="onSubmitGroupForm">
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
					<v-text-field
						density="compact"
						v-model="model.icon"
						variant="outlined"
						color="primary"
						label="Zdjęcie ikony"
						hide-details="auto"
						class="my-3"></v-text-field>
					<v-text-field
						density="compact"
						v-model="model.photo"
						variant="outlined"
						color="primary"
						label="Zdjęcie podglądowe"
						hide-details="auto"
						class="my-3"></v-text-field>
				</v-col>
				<v-col>
					<v-card
						height="100%"
						flat>
						<v-card-title class="px-2">Kategorie</v-card-title>
						<v-select
							multiple
							chips
							density="compact"
							v-model="model.categories"
							:items="categories"
							item-title="name"
							return-object
							closable-chips
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
						@click="emit('delete-group')"></v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>
<script setup>
	defineProps({
		categories: Array,
	});
	const emit = defineEmits([
		"delete-group",
		"save-group",
		"category-assign-remove",
		"category-assign",
	]);
	const model = defineModel({ type: Object });
	const form = ref(null);

	watch(
		() => model.value.categories,
		(newVal, oldVal) => {
			const addedItems = newVal.filter((c) => !oldVal.includes(c));
			const removedItems = oldVal.filter((cat) => !newVal.includes(cat));
			if (addedItems.length) {
				addedItems.forEach((i) => emit("category-assign", i));
			}
			if (removedItems.length) {
				removedItems.forEach((i) => emit("category-assign-remove", i));
			}
		},
	);

	function onSubmitGroupForm() {
		if (form.value.isValid) {
			emit("save-group");
		}
	}
</script>
