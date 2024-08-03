<template>
	<div>
		<SummaryItem
			v-for="(item, i) in summary"
			:description="item.description"
			:value="item.value"></SummaryItem>
		<v-divider class="my-2"></v-divider>
		<SummaryTotalItem
			:description="'Do zapłaty'"
			:value="1399.19"></SummaryTotalItem>
	</div>
</template>
<script lang="ts" setup>
	import type { ISummaryItemProps } from "../Common/SummaryItem.vue";

	const summary: ISummaryItemProps[] = [
		{
			description: "Wartość produktów (10)",
			value: 1489,
		},
		{
			description: "Dostawa",
			value: 10,
		},
	];
</script>
