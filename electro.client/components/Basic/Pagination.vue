<template>
	<Container>
		<div class="d-flex align-center justify-center ga-2 my-4">
			<v-btn class="controls-border" variant="outlined" color="primary" icon="mdi-chevron-left"></v-btn>
			<v-btn variant="text" border size="small" icon>1</v-btn>
			<v-btn variant="text" border size="small" icon>2</v-btn>
			<v-btn class="active-page" variant="text" border size="small" icon>3</v-btn>
			<span>...</span>
			<v-btn variant="text" border size="small" icon>{{ lastPage }}</v-btn>
			<v-btn class="controls-border" variant="outlined" color="primary" icon="mdi-chevron-right"></v-btn>
		</div>
	</Container>
</template>
<script>
export default {
	props: {
		lastPage: {
			type: Number,
			default: 25
		},
		currentPage: {
			type: Number,
			default: 2
		}
	}
};
</script>
<style scoped>
.active-page {
	font-weight: 500;
	border-width: 2px;
	border-color: #fdd835;
}
.controls-border {
	border-width: 2px;
	color: black;
}
:deep(.v-icon) {
	--v-icon-size-multiplier: 1.5;
}
</style>
