<template>
	<div class="d-flex justify-space-between align-center pt-2">
		<span>{{ description }}</span>
		<span class="font-weight-medium">
			{{ $formatters.priceFormatter(value) }} zł
		</span>
	</div>
</template>
<script lang="ts" setup>
	export interface ISummaryItemProps {
		description: string;
		value: number;
	}
	const props = defineProps<ISummaryItemProps>();
</script>
