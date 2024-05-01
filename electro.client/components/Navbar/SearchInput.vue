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
		hide-details>
		<template v-slot:['prepend-inner']>
			<v-btn size="small" variant="plain" link to="/list" icon="mdi-magnify" />
		</template>
	</v-text-field>
</template>
<script>
export default {};
</script>
<style scoped></style>
