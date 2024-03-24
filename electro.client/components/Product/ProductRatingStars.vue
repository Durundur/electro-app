<template>
	<div class="d-inline-flex">
		<v-img
			v-for="index in 5"
			:key="index"
			:src="starImageUrl(index)"
			:width="starWidth"
			:class="{ 'star-pointer': !disabled }"
			@click="disabled ? null : setValue(index)"
			@mouseover="disabled ? null : (hoverStarIndex = index)"
			@mouseleave="disabled ? null : (hoverStarIndex = null)">
		</v-img>
	</div>
</template>

<script>
export default {
	props: {
		modelValue: {
			type: Number,
			required: true
		},
		starWidth: {
			type: Number,
			default: 18
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			hoverStarIndex: null
		};
	},
	methods: {
		setValue(index) {
			this.$emit('update:modelValue', index);
		},
		starImageUrl(index) {
			return index <= (this.hoverStarIndex || this.modelValue) ? '/starfill.svg' : '/starempty.svg';
		}
	}
};
</script>

<style scoped>
.star-pointer {
	cursor: pointer;
}
</style>
