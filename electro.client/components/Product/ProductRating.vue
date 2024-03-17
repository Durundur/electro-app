<template>
	<div class="d-inline-flex">
		<v-img v-for="index in 5" :key="index" :src="getImage(index)" class="star"></v-img>
	</div>
</template>
<script>
export default {
	props: {
		rating: {
			type: Number,
			required: true,
			default: 0
		}
	},
	methods: {
		getImage(index) {
			if (this.rating - index >= 0) {
				return '/starfill.svg';
			}
			if (index - this.rating <= 0.5) {
				return '/starhalffill.svg';
			}
			return '/starempty.svg';
		}
	}
};
</script>
<style scoped>
.star {
	width: 16px;
	height: 16px;
	margin-right: 1px;
}
</style>
