<template>
	<v-container fluid>
		<v-card
			border
			flat
			rounded="lg">
			<v-card-title class="d-flex justify-space-between align-center">
				<span>Kategorie</span>
				<v-btn
					color="success"
					prepend-icon="mdi-plus"
					variant="elevated"
					class="text-none"
					flat
					size="small"
					@click="addNewCategory">
					Nowa kategoria
				</v-btn>
			</v-card-title>
			<v-card-text>
				<v-expansion-panels
					flat
					multiple
					rounded="lg"
					v-model="expandedPanels">
					<v-expansion-panel
						class="ma-2"
						v-for="(item, index) in categories">
						<v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
						<v-expansion-panel-text>
							<v-card flat>
								<CategoryForm
									@save-category="onSaveCategory(index)"
									@delete-category="onDeleteCategory(index)"
									:subCategories="subCategories"
									v-model="categories[index]"></CategoryForm>
							</v-card>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-card-text>
		</v-card>
	</v-container>
</template>
<script setup>
	import { ref } from "vue";
	definePageMeta({
		layout: "admin",
	});
	const { $api, $toast } = useNuxtApp();

	const categories = ref([]);
	const expandedPanels = ref([]);
	const subCategories = ref([]);

	const { data: categoriesRes } = await useAsyncData(() =>
		$api.get("api/groups/categories"),
	);

	const { data: subCategoriesRes } = await useAsyncData(() =>
		$api.get("api/groups/subcategories/free"),
	);

	categoriesRes.value.ok
		? (categories.value = categoriesRes.value.data)
		: $toast.error("Błąd podczas pobierania kategorii.");
	subCategoriesRes.value.ok
		? (subCategories.value = subCategoriesRes.value.data)
		: $toast.error("Błąd podczas pobierania podkategorii.");

	function addNewCategory() {
		categories.value.unshift({
			name: "",
			subCategories: [],
		});
		nextTick(() => expandedPanels.value.unshift(0));
	}

	async function onSaveCategory(index) {
		const category = categories.value.at(index);
		if (category.id) {
			const response = await $api.put(
				`api/groups/categories/${category.id}`,
				category,
			);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
		} else {
			const response = await $api.post(`api/groups/categories`, category);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
			categories.value = categories.value.with(index, response.data);
		}
		$toast.success("Pomyślnie zapisano");
	}

	async function onDeleteCategory(index) {
		const category = categories.value.at(index);
		if (category.id) {
			const response = await $api.delete(
				`api/groups/categories/${category.id}`,
			);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
		}
		categories.value.splice(index, 1);
		$toast.success("Pomyślnie usunięto");
	}
</script>
