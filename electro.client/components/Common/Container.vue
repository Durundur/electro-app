<template>
	<v-container class="w-full h-full m-auto pt-0 px-2 px-sm-4 px-md-0 container">
		<slot></slot>
	</v-container>
</template>
<style lang="css" scoped>
	@media (min-width: 1920px) {
		.container {
			max-width: 1200px !important;
		}
	}
</style>
