<template>
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
					hide-details
					class="my-3"></v-text-field>
				<v-text-field
					density="compact"
					v-model="model.icon"
					variant="outlined"
					color="primary"
					label="Zdjęcie ikony"
					hide-details
					class="my-3"></v-text-field>
				<v-text-field
					density="compact"
					v-model="model.photo"
					variant="outlined"
					color="primary"
					label="Zdjęcie podglądowe"
					hide-details
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
						:item-props-subtitle="model.id"
						variant="outlined"></v-select>
				</v-card>
			</v-col>
		</v-row>
		<v-row class="mt-0">
			<v-col
				cols="12"
				class="d-flex justify-end">
				<v-btn
					color="error"
					prepend-icon="mdi-trash-can-outline"
					class="text-none"
					variant="elevated"
					size="small"
					text="Usuń"
					@click="$emit('delete-group')"
					flat></v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
<script setup>
	defineProps({
		categories: Array,
	});
	const model = defineModel({ type: Object });
</script>
