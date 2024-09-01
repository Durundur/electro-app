<template>
	<v-app>
		<NavBar />
		<v-main>
			<LoadingContainer>
				<slot></slot>
			</LoadingContainer>
		</v-main>
		<Footer />
	</v-app>
</template>
<style>
	@import url("~/assets/css/global.css");
</style>
