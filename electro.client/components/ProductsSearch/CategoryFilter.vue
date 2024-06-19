<template>
	<v-card :flat="true">
		<v-card-title class="text-body-1 py-0 pt-2 font-600">
			Kategorie
		</v-card-title>
		<v-list density="compact">
			<ListGroup
				v-for="(group, index) in groupsCategoriesSubCategories"
				:key="group.id"
				:default-expanded="isGroupActive(group.id)">
				<template v-slot:header="{ isExpanded, toggleExpand }">
					<div
						class="d-flex flex-row justify-space-between align-center no-wrap mr-4">
						<v-list-item
							:active="isGroupActive(group.id)"
							active-class="font-600 bg-grey-lighten-6"
							density="compact"
							class="flex-shrink-1 w-100"
							link
							:to="`/search/group/${group.id}`">
							<div>
								<span class="text-body-3 d-block text-truncate">
									{{ group.name }}
								</span>
							</div>
						</v-list-item>
						<v-icon
							:class="{ invisible: group.categories.length < 1 }"
							class="border rounded-circle cursor-pointer"
							@click="toggleExpand"
							:icon="
								isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
							"></v-icon>
					</div>
				</template>
				<ListGroup
					v-for="(category, index) in group.categories"
					:key="category.id"
					:default-expanded="isCategoryActive(group.id, category.id)">
					<template v-slot:header="{ toggleExpand, isExpanded }">
						<div
							class="d-flex flex-row justify-space-between align-center no-wrap mr-4">
							<v-list-item
								:active="isCategoryActive(group.id, category.id)"
								active-class="font-600 bg-grey-lighten-6"
								density="compact"
								class="flex-shrink-1 w-100"
								link
								:to="`/search/group/${group.id}/category/${category.id}`">
								<div class="ml-3">
									<span class="text-body-3 d-block text-truncate">
										{{ category.name }}
									</span>
								</div>
							</v-list-item>
							<v-icon
								:class="{ invisible: category.subCategories.length < 1 }"
								class="border rounded-circle cursor-pointer"
								@click="toggleExpand"
								:icon="
									isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
								"></v-icon>
						</div>
					</template>

					<ListGroup
						v-for="(subCategory, index) in category.subCategories"
						:key="subCategory.id"
						:default-expanded="
							isSubCategoryActive(group.id, category.id, subCategory.id)
						">
						<template v-slot:header="{ isExpanded, toggleExpand }">
							<div
								class="d-flex flex-row justify-space-between align-center no-wrap mr-4">
								<v-list-item
									:active="
										isSubCategoryActive(group.id, category.id, subCategory.id)
									"
									active-class="font-600 bg-grey-lighten-6"
									density="compact"
									class="flex-shrink-1 w-100"
									link
									:to="`/search/group/${group.id}/category/${category.id}/subcategory/${subCategory.id}`">
									<div class="ml-6">
										<span class="text-body-3 d-block text-truncate">
											{{ subCategory.name }}
										</span>
									</div>
								</v-list-item>
								<v-icon
									:class="{ invisible: true }"
									class="border rounded-circle cursor-pointer"
									@click="toggleExpand"
									:icon="
										isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
									"></v-icon>
							</div>
						</template>
					</ListGroup>
				</ListGroup>
			</ListGroup>
		</v-list>
	</v-card>
</template>

<script setup>
	const { $api } = useNuxtApp();
	const model = defineModel({
		activeCategories: {
			type: Object,
			default: {
				group: {},
				categoty: {},
				subCategory: {},
			},
		},
	});
	const route = useRoute();
	const groupsCategoriesSubCategories = ref([]);

	const { data } = await useAsyncData(() => $api.get("api/groups/allGroups"));
	if (data.value.ok) {
		groupsCategoriesSubCategories.value = data.value.data;
	} else {
		$toast.error("Błąd podczas pobierania kategorii.");
	}

	const isGroupActive = (groupId) => {
		if (route.path.includes(`/search/group/${groupId}`)) {
			const groupName = groupsCategoriesSubCategories.value.find(
				(g) => g.id == groupId,
			).name;
			model.value["group"] = {
				id: groupId,
				name: groupName,
			};
			return true;
		}
		return false;
	};

	const isCategoryActive = (groupId, categoryId) => {
		if (
			route.path.includes(`/search/group/${groupId}/category/${categoryId}`)
		) {
			const group = groupsCategoriesSubCategories.value.find(
				(g) => g.id == groupId,
			);
			const category = group.categories.find((c) => c.id === categoryId);
			model.value["category"] = {
				id: categoryId,
				name: category.name,
			};
			return true;
		}
		return false;
	};

	const isSubCategoryActive = (groupId, categoryId, subCategoryId) => {
		if (
			route.path.includes(
				`/search/group/${groupId}/category/${categoryId}/subcategory/${subCategoryId}`,
			)
		) {
			const group = groupsCategoriesSubCategories.value.find(
				(g) => g.id == groupId,
			);
			const category = group.categories.find((c) => c.id === categoryId);
			const subCategory = category.subCategories.find(
				(s) => s.id === subCategoryId,
			);
			model.value["subCategory"] = {
				id: subCategoryId,
				name: subCategory.name,
			};
			return true;
		}
		return false;
	};
</script>

<style scoped>
	:deep(.v-list-item--density-compact.v-list-item--one-line) {
		min-height: unset;
	}
</style>
