<template>
	<v-container
		fluid
		class="pa-0">
		<v-row
			no-gutters
			align="center">
			<v-col
				:cols="groups.length / 12"
				v-for="group in groups"
				:key="group.id">
				<v-menu
					open-on-hover
					width="600">
					<template v-slot:activator="{ props }">
						<v-btn
							variant="text"
							class="text-none text-center w-100"
							v-bind="props"
							stacked
							density="compact"
							slim
							size="small"
							link
							:to="`/search/group/${group.id}`">
							{{ group.name }}
						</v-btn>
					</template>
					<v-card @mouseleave="clearHoverCategory">
						<v-container>
							<v-row>
								<v-col
									cols="6"
									class="pa-0">
									<v-list density="compact">
										<v-list-item
											slim
											density="compact">
											<div
												class="d-flex flex-row justify-space-between align-center">
												<span>{{ group.name }}</span>
												<v-btn
													class="text-none"
													variant="plain"
													density="compact"
													slim
													link
													:to="`/search/group/${group.id}`">
													wszystkie
												</v-btn>
											</div>
										</v-list-item>
										<v-list-item
											v-for="(category, index) in group.categories"
											:active="
												hoverCategory.id == category.id &&
												hoverCategory.name === category.name
											"
											link
											:to="`/search/group/${group.id}/category/${category.id}`"
											slim
											density="compact"
											:key="index"
											:append-icon="
												category.subCategories.length > 0
													? 'mdi-chevron-right'
													: ''
											"
											@mouseenter="setHoverCategory(category)">
											{{ category.name }}
										</v-list-item>
									</v-list>
								</v-col>
								<v-col
									cols="6"
									class="pa-0 pl-2">
									<v-img
										v-if="!hoverCategory.id && !hoverCategory.name"
										:src="group.photo"></v-img>
									<v-list
										v-if="hoverCategory.subCategories"
										density="compact">
										<v-list-item
											slim
											density="compact">
											<div
												class="d-flex flex-row justify-space-between align-baseline">
												<span>{{ hoverCategory.name }}</span>
												<v-btn
													class="text-none"
													variant="plain"
													density="compact"
													slim
													link
													:to="`/search/group/${group.id}/category/${hoverCategory.id}`">
													wszystkie
												</v-btn>
											</div>
										</v-list-item>
										<v-list-item
											v-for="(
												subCategory, index
											) in hoverCategory.subCategories"
											:key="index"
											slim
											density="compact"
											link
											:to="`/search/group/${group.id}/category/${subCategory.categoryId}/subcategory/${subCategory.id}`">
											{{ subCategory.name }}
										</v-list-item>
									</v-list>
									<v-btn
										v-if="hoverCategory.subCategories?.length === 0"
										class="text-none"
										variant="outlined"
										density="compact"
										slim
										block>
										Pokaż {{ hoverCategory.name }}
									</v-btn>
								</v-col>
							</v-row>
						</v-container>
					</v-card>
				</v-menu>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
	import { ref } from "vue";

	const { $api } = useNuxtApp();
	const groups = ref([]);
	const hoverCategory = ref({});

	const { data: groupsRes } = await useAsyncData(() =>
		$api.get("api/groups/allGroups"),
	);
	if (groupsRes.value.ok) {
		groups.value = groupsRes.value.data;
	}

	const setHoverCategory = (category) => {
		hoverCategory.value = category;
	};

	const clearHoverCategory = () => {
		hoverCategory.value = {};
	};
</script>

<style scoped>
	:deep(.v-list-item--density-compact.v-list-item--one-line) {
		min-height: unset;
	}
</style>
