<template>
	<v-card flat>
		<v-card-title class="py-0 text-body-2">{{ header }}</v-card-title>
		<v-list class="py-0" density="compact">
			<v-list-item v-for="(option, index) in options" :key="index" :active="selectedOptions.includes(option)"
				@click="toggleOption(option)" active-class="font-600" height="10px" density="compact">
				<v-checkbox :value="option" v-model="selectedOptions" color="primary" hide-details density="compact">
					<template #label>{{ option }}</template>
				</v-checkbox>
			</v-list-item>
		</v-list>
	</v-card>
</template>

<script>
export default {
	props: {
		modelValue: {
			type: Array,
		},
		header: {
			type: String
		},
		options: {
			type: Array
		}
	},
	data() {
		return {
			selectedOptions: this.modelValue || []
		}
	},
	methods: {
		toggleOption(option) {
			if (this.selectedOptions.includes(option)) {
				this.selectedOptions = this.selectedOptions.filter(item => item !== option);
			} else {
				this.selectedOptions.push(option);
			}
			this.$emit('update:modelValue', this.selectedOptions);
		},
	},
	watch: {
		modelValue: {
			immediate: true,
			handler(newValue) {
				this.selectedOptions = newValue || [];
			}
		},
		selectedOptions: {
			deep: true,
			handler(newValue) {
				this.$emit('update:modelValue', newValue);
			}
		}
	}
}
</script>

<style scoped>
:deep(.v-label--clickable) {
	font-size: 12px;
	opacity: 1;
}
</style>
