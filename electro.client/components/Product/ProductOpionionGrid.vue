<template>
	<MasonryWall :items="items" :gap="16">
		<template #default="{ item, column, row, index }">
			<ProductOpinion :opinion="item" />
		</template>
	</MasonryWall>
</template>
<script>
export default {
	props: {
		items: {
			type: Array
		}
	}
};
</script>
<style></style>
