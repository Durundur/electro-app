<template>
	<v-container fluid>
		<v-card
			border
			flat
			rounded="lg">
			<v-card-title class="d-flex justify-space-between align-center">
				<span>Grupy</span>
				<div>
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
					<v-btn
						color="success"
						prepend-icon="mdi-content-save"
						variant="elevated"
						class="text-none ml-4"
						flat
						size="small"
						@click="saveGroups">
						Zapisz
					</v-btn>
				</div>
			</v-card-title>
			<v-card-text>
				<v-expansion-panels
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
									@delete-group="deleteGroup(index)"
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
	const nuxtApp = useNuxtApp();

	const groups = ref([]);
	const expandedPanels = ref([]);
	const categories = ref([]);

	const { data, pending } = await useAsyncData(() =>
		nuxtApp.$api.get("api/categories"),
	);
	categories.value - data.value.data;

	function addNewGroup() {
		const groupsCount = groups.value.length;
		groups.value.push({
			name: "",
			icon: "",
			photo: "",
			categories: [],
		});
		nextTick(() => expandedPanels.value.push(groupsCount));
	}

	function saveGroups() {
		const response = nuxtApp.$api.post("/api/groups", groups.value);
	}

	function deleteGroup(index) {
		groups.value.splice(index, 1);
	}
</script>
