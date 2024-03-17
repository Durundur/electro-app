<template>
	<v-text-field
		:loading="loading"
		density="compact"
		placeholder="Wyszukaj produkt"
		type="text"
		clearable
		variant="outlined"
		single-line
		rounded
		flat
		hide-details
		prepend-inner-icon="mdi-magnify"
		@click:prepend-inner="">
	</v-text-field>
</template>
<script>
export default {
};
</script>
<style scoped></style>
