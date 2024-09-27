<template>
	<v-text-field
		class="size-medium"
		variant="outlined"
		rounded="lg"
		:hide-details="true"
		:placeholder="$i18n.t('Auth.SearchProduct')"
		v-model="search"
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
	const {$i18n} = useNuxtApp();
	const search = ref("");
	const router = useRouter();

	function onSearchClick() {
		const queryParams = {};
		if (search.value) {
			Object.assign(queryParams, { query: search.value });
		}
		router.push({ path: "/search", query: { ...queryParams } });
	}
</script>
