<template>
	<v-card :flat="true">
		<v-card-title class="text-body-1 py-0 font-600">Kategorie</v-card-title>
		<v-list density="compact">
			<v-list-group v-for="(group, index) in groupsCategoriesSubCategories">
				<template v-slot:activator="{ props }">
					<v-list-item
						active-class="font-600 bg-grey-lighten-3"
						density="compact"
						v-bind="props">
						<span class="text-body-3">{{ group.name }}</span>
					</v-list-item>
				</template>

				<v-list-group v-for="(category, index) in group.categories">
					<template v-slot:activator="{ props }">
						<v-list-item
							active-class="font-600 bg-grey-lighten-3"
							density="compact"
							v-bind="props">
							<span class="text-body-3">{{ category.name }}</span>
						</v-list-item>
					</template>

					<v-list-group v-for="(subCategory, index) in category.subCategories">
						<template v-slot:activator="{ props }">
							<v-list-item
								active-class="font-600 bg-grey-lighten-3"
								density="compact"
								v-bind="props">
								<span class="text-body-3">{{ subCategory.name }}</span>
							</v-list-item>
						</template>
					</v-list-group>
				</v-list-group>
			</v-list-group>
		</v-list>
	</v-card>
</template>
<script setup>
	const { $api } = useNuxtApp();
	const groupsCategoriesSubCategories = ref([]);

	const { data } = await useAsyncData(() => $api.get("api/groups/allGroups"));

	data.value.ok
		? (groupsCategoriesSubCategories.value = data.value.data)
		: $toast.error("Błąd podczas pobierania kategorii.");
</script>
<style scoped>
	:deep(.v-list-item--density-compact.v-list-item--one-line) {
		min-height: unset;
	}
</style>
