<template>
	<div class="d-flex flex-row align-center">
		<SubCardTitle>Produkty</SubCardTitle>
		<v-badge
			color="grey-lighten-2"
			inline
			:content="productCount"></v-badge>
	</div>
</template>
<script lang="ts" setup>
	const props = defineProps<{
		productCount: number;
	}>();
</script>
