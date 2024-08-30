<template>
	<v-text-field
		v-bind="restProps"
		:model-value="modelValue"
		@update:model-value="$emit('update:modelValue', $event)"
		hide-details
		:class="sizeClass">
		<template
			v-for="(_, name) in $slots"
			v-slot:[name]="slotData">
			<slot
				:name="name"
				v-bind="slotData" />
		</template>
	</v-text-field>
</template>

<script setup lang="ts">
	interface IDefaultInput {
		size?: "x-small" | "small" | "default" | "large";
		placeholder?: string;
		type?: string;
		clearable?: boolean;
		variant?:
			| "underlined"
			| "outlined"
			| "filled"
			| "solo"
			| "solo-inverted"
			| "solo-filled"
			| "plain";
		rounded?: string | boolean;
		hideDetails?: boolean | "auto";
		density?: string;
		modelValue?: string | number;
	}

	const props = withDefaults(defineProps<IDefaultInput>(), {
		size: "default",
		type: "text",
		clearable: false,
		variant: "outlined",
		rounded: "lg",
		hideDetails: false,
		density: "compact",
		modelValue: "",
	});

	const { size, ...restProps } = props;

	const emit = defineEmits<{
		(e: "update:modelValue", value: string | number): void;
	}>();

	const sizeClass = computed(() => {
		return {
			"size-x-small": props.size === "x-small",
			"size-small": props.size === "small",
			"size-default": props.size === "default",
			"size-large": props.size === "large",
		};
	});
</script>

<style scoped>
	.size-x-small :deep(.v-field__input) {
		min-height: 20px !important;
	}

	.size-small :deep(.v-field__input) {
		min-height: 28px !important;
	}

	.size-default :deep(.v-field__input) {
		min-height: 36px !important;
	}

	.size-large :deep(.v-field__input) {
		min-height: 44px !important;
	}

	:deep(.v-field__input) {
		padding-top: 0;
		padding-bottom: 0;
		height: 100%;
	}
</style>
