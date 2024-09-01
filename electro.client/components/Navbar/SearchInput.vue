<template>
	<v-text-field
		class="size-medium"
		variant="outlined"
		rounded="lg"
		:hide-details="true"
		placeholder="Wyszukaj produkt"
		v-model="query"
		:clearable="true"
		@keyup.enter="onSearchClick">
		<template v-slot:prepend-inner>
			<v-btn
				size=""
				@click="onSearchClick"
				variant="plain"
				icon="mdi-magnify" />
		</template>
	</v-text-field>
</template>
<script setup lang="ts">
	const query = ref("");
	const router = useRouter();

	function onSearchClick() {
		const queryParams = {};
		if (query.value) {
			Object.assign(queryParams, { query: query.value });
		}
		router.push({ path: "/search", query: { ...queryParams } });
	}
</script>
