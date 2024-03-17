<template>
	<v-app>
		<NavBar />
		<v-main>
			<slot></slot>
		</v-main>
		<Footer/>
</v-app>
</template>
<style>
* {
	font-size: 14px;
}
.nowrap-text{
	white-space: break-spaces;
}
</style>
