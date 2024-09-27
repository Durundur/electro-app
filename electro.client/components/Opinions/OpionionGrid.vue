<template>
	<MasonryWall
		:items="items"
		:gap="16">
		<template #default="{ item, column, row, index }">
			<Opinion
				@update-opinion="(v) => onUpdateOpinion(v)"
				:opinion="item" />
		</template>
	</MasonryWall>
</template>
<script setup lang="ts">
	import type { IOpinionWithUserAction } from "~/types/Opinion/Opinion";

	const props = defineProps<{
		items: IOpinionWithUserAction[];
	}>();

	const emit = defineEmits<{
		(e: "update-opinion", v: IOpinionWithUserAction): void;
	}>();

	function onUpdateOpinion(opinion: IOpinionWithUserAction) {
		emit("update-opinion", opinion);
	}
</script>
