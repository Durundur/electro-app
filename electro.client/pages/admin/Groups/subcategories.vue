<template>
	<v-container fluid>
		<v-card
			border
			flat
			rounded="lg">
			<v-card-title class="d-flex justify-space-between align-center">
				<span>Podkategorie</span>

				<v-btn
					color="success"
					prepend-icon="mdi-plus"
					variant="elevated"
					class="text-none"
					flat
					size="small"
					@click="addNewSubCategory">
					Nowa podkategoria
				</v-btn>
			</v-card-title>
			<v-card-text>
				<template v-if="subCategories.length === 0">
					<p class="text-center my-4">
						Brak dostępnych podkategorii, utwórz nowe.
					</p>
				</template>
				<v-expansion-panels
					v-else
					flat
					multiple
					rounded="lg"
					v-model="expandedPanels">
					<v-expansion-panel
						class="ma-2"
						v-for="(item, index) in subCategories">
						<v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
						<v-expansion-panel-text>
							<v-card flat>
								<SubCategoryForm
									@save-subcategory="onSaveSubCategory(index)"
									@delete-subcategory="onDeleteSubCategory(index)"
									v-model="subCategories[index]"></SubCategoryForm>
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
	const { $toast, $api } = useNuxtApp();

	const expandedPanels = ref([]);
	const subCategories = ref([]);

	const { data: subCategoriesRes } = await useAsyncData(() =>
		$api.get("api/groups/subcategories"),
	);

	subCategoriesRes.value.ok
		? (subCategories.value = subCategoriesRes.value.data)
		: $toast.error("Błąd podczas pobierania podkategorii.");

	function addNewSubCategory() {
		subCategories.value.unshift({
			name: "",
		});
		nextTick(() => expandedPanels.value.unshift(0));
	}

	async function onSaveSubCategory(index) {
		const subCategory = subCategories.value.at(index);
		if (subCategory.id) {
			const response = await $api.put(
				`api/groups/subcategories/${subCategory.id}`,
				subCategory,
			);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
		} else {
			const response = await $api.post(
				`api/groups/subcategories`,
				subCategory,
			);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
			subCategories.value = subCategories.value.with(index, response.data);
		}
		$toast.success("Pomyślnie zapisano");
	}

	async function onDeleteSubCategory(index) {
		const subCategory = subCategories.value.at(index);
		if (subCategory.id) {
			const response = await $api.delete(
				`api/groups/subcategories/${subCategory.id}`,
			);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
		}
		subCategories.value.splice(index, 1);
		$toast.success("Pomyślnie usunięto");
	}
</script>
