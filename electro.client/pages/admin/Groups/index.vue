<template>
	<v-container fluid>
		<v-card
			border
			flat
			rounded="lg">
			<v-card-title class="d-flex justify-space-between align-center">
				<span>Grupy</span>

				<v-btn
					color="success"
					prepend-icon="mdi-plus"
					variant="elevated"
					class="text-none"
					flat
					size="small"
					@click="addNewGroup">
					Nowa grupa
				</v-btn>
			</v-card-title>
			<v-card-text>
				<template v-if="groups.length === 0">
					<p class="text-center my-4">Brak dostępnych grup, utwórz nowe.</p>
				</template>
				<v-expansion-panels
					v-else
					flat
					multiple
					rounded="lg"
					v-model="expandedPanels">
					<v-expansion-panel
						class="ma-2"
						v-for="(item, index) in groups">
						<v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
						<v-expansion-panel-text>
							<v-card flat>
								<GroupForm
									@save-group="onSaveGroup(index)"
									@delete-group="onDeleteGroup(index)"
									@category-assign-remove="onCategoryAssignRemove"
									@category-assign="onCategoryAssign"
									:categories="categories"
									v-model="groups[index]"></GroupForm>
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
	const groups = ref([]);
	const categories = ref([]);

	const { data: groupsRes } = await useAsyncData(() => $api.get("api/groups"));

	const { data: categoriesRes } = await useAsyncData(() =>
		$api.get("api/groups/categories/free"),
	);

	groupsRes.value.ok
		? (groups.value = groupsRes.value.data)
		: $toast.error("Błąd podczas pobierania grup.");
	categoriesRes.value.ok
		? (categories.value = categoriesRes.value.data)
		: $toast.error("Błąd podczas pobierania categorii.");

	function addNewGroup() {
		groups.value.unshift({
			name: "",
			icon: "",
			photo: "",
			categories: [],
		});
		nextTick(() => expandedPanels.value.unshift(0));
	}

	async function onSaveGroup(index) {
		const group = groups.value.at(index);
		if (group.id) {
			const response = await $api.put(`api/groups/${group.id}`, group);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
		} else {
			const response = await $api.post(`api/groups`, group);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
			groups.value = groups.value.with(index, response.data);
		}
		$toast.success("Pomyślnie zapisano");
	}

	async function onDeleteGroup(index) {
		const group = groups.value.at(index);
		if (group.id) {
			const response = await $api.delete(`api/groups/${group.id}`);
			if (!response.ok) {
				$toast.error(response.error.message);
				return;
			}
		}
		groups.value.splice(index, 1);
		$toast.success("Pomyślnie usunięto");
	}

	function onCategoryAssignRemove(category) {
		categories.value.push(category);
	}

	function onCategoryAssign(category) {
		const index = categories.value.findIndex((c) => c.id === category.id);
		categories.value.splice(index, 1);
	}
</script>
