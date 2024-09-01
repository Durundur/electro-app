<template>
	<div class="text-center">
		<v-pagination
			:length="paginationData.totalPages"
			density="comfortable"
			total-visible="3"
			:model-value="paginationData.pageNumber"
			@update:model-value="(v: number) => page = v"
			rounded="circle"></v-pagination>
	</div>
</template>
<script setup lang="ts">
	import type { IPaginationResult } from "~/types/Api/PagedResult";

	interface IPaginationProps {
		paginationData: IPaginationResult;
	}

	const props = defineProps<IPaginationProps>();

	const emit = defineEmits<{
		(e: "onNewPageNumber", newPageNumber: number): void;
	}>();

	const page = computed({
		get() {
			return props.paginationData.pageNumber;
		},
		set(value: number) {
			emit("onNewPageNumber", value);
		},
	});
</script>
