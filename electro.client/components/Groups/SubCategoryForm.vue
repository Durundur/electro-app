<template>
	<v-form
		ref="form"
		@submit.prevent="submitSubCategoryForm">
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
						@click="emit('delete-subcategory')"
						flat></v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>
<script setup>
	const emit = defineEmits(["delete-subcategory", "save-subcategory"]);
	const model = defineModel({ type: Object });
	const form = ref(null);

	function submitSubCategoryForm() {
		if (form.value.isValid) {
			emit("save-subcategory");
		}
	}
</script>
