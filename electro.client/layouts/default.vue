<template>
	<v-app>
		<Navbar />
		<v-main>
			<slot></slot>
		</v-main>
		<Footer/>
</v-app>
</template>
<style>
* {
	font-size: small;
}
</style>
