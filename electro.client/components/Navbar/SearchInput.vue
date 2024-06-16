<template>
	<v-text-field
		density="compact"
		placeholder="Wyszukaj produkt"
		type="text"
		clearable
		variant="outlined"
		single-line
		rounded
		flat
		hide-details
		v-model="query"
		@keyup.enter="onSearchClick">
		<template v-slot:prepend-inner>
			<v-btn
				@click="onSearchClick"
				size="small"
				variant="plain"
				icon="mdi-magnify" />
		</template>
	</v-text-field>
</template>

<script setup>
	const query = ref("");
	const router = useRouter();

	function onSearchClick() {
		const queryParams = {};
		if (query.value) {
			queryParams["query"] = query.value;
		}
		router.push({ path: "/search", query: { ...queryParams } });
	}
</script>
