<template>
	<div class="d-flex justify-space-between align-center">
		<span class="text-body-1">{{ description }}</span>
		<span class="font-weight-bold text-h6">
			{{ $formatters.priceFormatter(value) }} zł
		</span>
	</div>
</template>
<script lang="ts" setup>
	export interface ISummaryTotalItemProps {
		description: string;
		value: number;
	}
	const props = defineProps<ISummaryTotalItemProps>();
</script>
