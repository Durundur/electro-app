<template>
	<v-select
		v-bind="$attrs"
		:hide-details="hideDetails"
		:density="density"
		:variant="variant"
		:clearable="clearable"
		:rounded="rounded"
		:error="!!errorMessage"
		:error-messages="errorMessage"
		:item-title="itemTitle"
		:item-value="itemValue"
		:items="items"
		:label="label"
		:model-value="modelValue"
		:menu-props="{ transition: 'fade-transition' }"
		@update:model-value="handleUpdate"
		:class="[sizeClass, { 'is-invalid': !!errorMessage }]">
		<template
			v-if="$slots['prepend-item']"
			#prepend-item>
			<slot name="prepend-item"></slot>
		</template>

		<template
			v-if="$slots['item']"
			#item="{ item, props }">
			<slot
				name="item"
				v-bind="{ item, props }"></slot>
		</template>

		<template
			v-if="$slots['append-item']"
			#append-item>
			<slot name="append-item"></slot>
		</template>
	</v-select>
</template>

<script setup lang="ts" generic="TValue">
	import { computed } from "vue";

	export interface IDefaultSelectItem<TValue> {
		label: string;
		value: TValue;
	}

	interface Props<TValue> {
		size?: "x-small" | "small" | "default" | "large";
		clearable?: boolean;
		rounded?: string | boolean;
		hideDetails?: boolean | "auto";
		density?: string;
		modelValue?: TValue;
		variant?: string;
		label: string;
		items?: IDefaultSelectItem<TValue>[];
		errorMessage?: string;
		itemTitle?: string;
		itemValue?: string;
		validateOnChange?: boolean;
	}

	const props = withDefaults(defineProps<Props<TValue>>(), {
		size: "default",
		clearable: true,
		rounded: "lg",
		hideDetails: true,
		density: "compact",
		modelValue: undefined,
		variant: "outlined",
		errorMessage: "",
		itemTitle: "label",
		itemValue: "value",
		validateOnChange: false,
	});

	const emit = defineEmits<{
		(e: "update:modelValue", value: TValue): void;
		(e: "change", value: TValue): void;
		(e: "validate"): void;
	}>();

	const sizeClass = computed(() => {
		return {
			"size-x-small": props.size === "x-small",
			"size-small": props.size === "small",
			"size-default": props.size === "default",
			"size-large": props.size === "large",
		};
	});

	const handleUpdate = (value: TValue) => {
		emit("update:modelValue", value);
		emit("change", value);
		if (props.validateOnChange) {
			emit("validate");
		}
	};
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

	.is-invalid :deep(.v-field__input) {
		border-color: var(--v-error-base);
	}

	.fade-transition-enter-active,
	.fade-transition-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-transition-enter-from,
	.fade-transition-leave-to {
		opacity: 0;
	}
</style>
