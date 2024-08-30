<template>
	<v-card
		flat
		:border="containerBorder"
		rounded="lg">
		<v-radio-group
			hide-details="auto"
			v-model="proxy"
			ripple
			:inline="horizontal">
			<v-radio
				v-for="option in options"
				:key="option.value"
				:value="option.value"
				class="rounded-lg flex-1-1-0 text-body-2"
				:class="{
					'selection-active': proxy === option.value,
					border: optionBorder,
				}">
				<template #label>
					<slot :option="option">
						{{ option.label }}
					</slot>
				</template>
			</v-radio>
		</v-radio-group>
	</v-card>
</template>

<script lang="ts" setup generic="T">
	export interface Option<T> {
		value: T;
		label: string;
		[key: string]: unknown;
	}

	const props = defineProps<{
		options: Option<T>[];
		modelValue: T;
		defaultOption?: Option<T>;
		containerBorder?: boolean;
		optionBorder?: boolean;
		horizontal?: boolean;
	}>();

	const emit = defineEmits<{
		(e: "update:modelValue", value: T): void;
	}>();

	const proxy = computed({
		get() {
			return props.modelValue;
		},
		set(value: T) {
			emit("update:modelValue", value);
		},
	});

	if (props.defaultOption) {
		proxy.value = props.defaultOption.value;
	}
</script>

<style lang="css" scoped>
	:deep(.v-label) {
		opacity: 1;
		font-size: inherit;
		padding-right: 12px;
	}
	:deep(.v-label--clickable) {
		flex: auto;
	}
	.selection-active {
		border-color: black !important;
		transition: border-color 0.2s ease;
	}
	:deep(.v-selection-control) {
		border-width: 2px;
		border-color: transparent;
		border-style: solid;
	}
	:deep(.v-selection-control-group) {
		column-gap: 8px;
	}
</style>
