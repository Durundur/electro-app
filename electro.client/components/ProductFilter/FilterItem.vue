<template>
	<v-card flat>
		<v-card-title class="py-0 text-body-2">{{ header }}</v-card-title>
		<v-list class="py-0" density="compact">
			<v-list-item @click="handleItemClick(option)" v-for="(option, index) in options" :key="index" :class="checkIfSelected(option)" density="compact">
				<v-checkbox :value="option" :model-value="modelValue" color="primary" hide-details density="compact">
					<template #label>
						<span class="text-body-3">{{ option }}</span>
					</template>
				</v-checkbox>
			</v-list-item>
		</v-list>
	</v-card>
</template>

<style scoped>
:deep(.v-list-item--density-compact) {
	min-height: unset;
}
:deep(.v-checkbox .v-selection-control) {
	min-height: unset;
}
</style>

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
	methods: {
		handleItemClick(option) {
			const currentState = [...this.modelValue];
			const index = currentState.indexOf(option);
			if (index === -1) {
				currentState.push(option);
			} else {
				currentState.splice(index, 1);
			}
			this.$emit('update:modelValue', currentState);
		},
		checkIfSelected(option) {
			return this.modelValue.includes(option) ? 'font-600 bg-grey-lighten-3' : '';
		}
	}
};
</script>
