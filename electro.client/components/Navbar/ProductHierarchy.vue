<template>
	<v-container
		fluid
		class="pa-0"
		v-if="productHierarchy">
		<v-row
			no-gutters
			align="center">
			<v-col
				:cols="productHierarchy.length / 12"
				v-for="group in productHierarchy"
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
													:to="`/search/group/${group.id}`">
													wszystkie
												</v-btn>
											</div>
										</v-list-item>
										<v-list-item
											v-for="(category, index) in group.categories"
											:active="
												hoverCategory?.id === category.id &&
												hoverCategory?.name === category.name
											"
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
										v-if="!hoverCategory?.id && !hoverCategory?.name"
										:src="group.photo"></v-img>
									<v-list
										v-if="hoverCategory?.subCategories"
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
											:to="`/search/group/${group.id}/category/${subCategory.categoryId}/subcategory/${subCategory.id}`">
											{{ subCategory.name }}
										</v-list-item>
									</v-list>
									<v-btn
										v-if="hoverCategory?.subCategories?.length === 0"
										class="text-none"
										variant="outlined"
										density="compact"
										slim
										block
										:to="`/search/group/${group.id}/category/${hoverCategory.id}`">
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
<script setup lang="ts">
	import type {
		IProductHierarchyCategory,
		IProductHierarchyGroup,
	} from "~/types/ProductHierarchy/ProductHierarchy";
	const config = useRuntimeConfig();
	const hoverCategory = ref<IProductHierarchyCategory>();

	const { data: productHierarchy, error, status} = await useAsyncData(() => $fetch<IProductHierarchyGroup[]>(`${config.public.API_BASE}/api/groups/allGroups`));

	const setHoverCategory = (category: IProductHierarchyCategory) => {
		hoverCategory.value = category;
	};

	const clearHoverCategory = () => {
		hoverCategory.value = {} as IProductHierarchyCategory;
	};
</script>
<style scoped>
	:deep(.v-list-item--density-compact.v-list-item--one-line) {
		min-height: unset;
	}
</style>
