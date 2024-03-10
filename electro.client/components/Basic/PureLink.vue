<template>
	<NuxtLink color="primary" :to="to">
		<span><slot /></span>
	</NuxtLink>
</template>
<script>
export default {
	props: {
		to: {
			type: String,
			required: false
		}
	}
};
</script>
<style scoped>
a {
	outline: none;
	text-decoration: none;
	color: inherit;
	transition: color 0.3s ease;
}

a:hover {
	filter: brightness(1.75);
}
</style>
