<template>
	<v-card flat>
		<v-card-title class="py-1 text-body-2">{{ header }}</v-card-title>
		<v-list
			class="py-0"
			density="compact">
			<template v-for="(option, index) in options">
				<v-list-item
					@click="handleItemClick(option)"
					v-if="index < maxItems || isExpanded"
					:key="index"
					:class="checkIfSelected(option)"
					density="compact">
					<v-checkbox
						:value="option"
						:model-value="modelValue"
						color="primary"
						hide-details
						density="compact">
						<template #label>
							<span class="text-body-3">{{ option }}</span>
						</template>
					</v-checkbox>
				</v-list-item>
			</template>
		</v-list>
		<v-list
			class="py-0"
			density="compact"
			v-if="options.length > maxItems">
			<v-list-item density="compact">
				<v-btn
					@click="isExpanded = !isExpanded"
					density="compact"
					variant="text"
					class="text-none text-body-3">
					<template
						#prepend
						v-if="!isExpanded">
						<v-icon>mdi-plus</v-icon>
					</template>
					<template
						#prepend
						v-if="isExpanded">
						<v-icon>mdi-minus</v-icon>
					</template>
					<template v-if="!isExpanded">
						Pokaż wszystkie ({{ options.length - maxItems }})
					</template>
					<template v-if="isExpanded">Pokaż mniej</template>
				</v-btn>
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
				type: String,
			},
			options: {
				type: Array,
			},
			maxItems: {
				type: Number,
				default: 5,
			},
		},
		data() {
			return {
				isExpanded: false,
			};
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
				this.$emit("update:modelValue", currentState);
			},
			checkIfSelected(option) {
				return this.modelValue?.includes(option)
					? "font-600 bg-grey-lighten-3"
					: "";
			},
		},
		computed: {},
	};
</script>
