<template>
	<div v-for="(field, index) in features">
		<span class="text-caption text-truncate d-block">
			{{ field.fieldName }}:
			<template v-for="(fieldVal, i) in field.fieldValue">
				{{ `${fieldVal}${i !== field.fieldValue.length - 1 ? ", " : ""}` }}
			</template>
		</span>
	</div>
</template>
<script setup>
	const props = defineProps({
		features: {
			type: Array,
			req: true,
		},
	});
</script>
