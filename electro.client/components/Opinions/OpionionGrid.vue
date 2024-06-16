<template>
	<MasonryWall
		:items="items"
		:gap="16">
		<template #default="{ item, column, row, index }">
			<Opinion
				@update-opinion="onUpdateOpinion"
				:opinion="item" />
		</template>
	</MasonryWall>
</template>
<script setup>
	const props = defineProps({
		items: {
			type: Array,
		},
	});

	const emit = defineEmits("update-opinion");

	function onUpdateOpinion(updatedOpinion) {
		emit("update-opinion", updatedOpinion);
	}
</script>
<style></style>
