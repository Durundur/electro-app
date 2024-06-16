<template>
	<div>
		<slot
			name="header"
			:toggleExpand="toggleExpand"
			:isExpanded="isExpanded"
			:props="iconProps"></slot>
		<v-expand-transition>
			<div v-if="isExpanded">
				<slot></slot>
			</div>
		</v-expand-transition>
	</div>
</template>

<script setup>
	const props = defineProps({
		iconProps: Object,
		defaultExpanded: Boolean,
	});

	const isExpanded = ref(props.defaultExpanded);

	const toggleExpand = () => {
		isExpanded.value = !isExpanded.value;
	};
</script>
