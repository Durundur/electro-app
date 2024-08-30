<template>
	<div class="d-flex flex-column">
		<span class="text-body-2">Zamówienie nr</span>
		<span class="font-weight-bold">#{{ number }}</span>
	</div>
</template>
<script lang="ts" setup>
	export interface IOrderHeaderProps {
		number: number;
	}
	const props = defineProps<IOrderHeaderProps>();
</script>
