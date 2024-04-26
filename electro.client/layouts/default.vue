<template>
	<v-app>
		<NavBar />
		<LoadingBar/>
		<v-main>
			<slot></slot>
		</v-main>
		<Footer />
	</v-app>
</template>
<style>


.nowrap-text {
	white-space: break-spaces;
}
.default-text {
	white-space: break-spaces;
	opacity: 1;
	line-height: 1rem;
}

.font-600 {
	font-weight: 600 !important;
}
.text-body-3{
	font-size: 12px !important;
	font-weight: inherit
}
</style>
