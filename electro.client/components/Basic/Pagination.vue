<template>
	<div class="text-center">
		<v-pagination
			density="comfortable"
			:length="model.totalPages"
			total-visible="3"
			v-model="model.pageNumber"
			rounded="circle"></v-pagination>
	</div>
</template>

<script setup>
	const model = defineModel({
		pageNumber: {
			type: Number,
			default: 1,
		},
		totalPages: {
			type: Number,
			default: 10,
		},
	});
	const route = useRoute();
	const router = useRouter();

	watch(
		() => model.value.pageNumber,
		async () => {
			const queryParams = {
				...route.query,
				pageNumber: model.value.pageNumber,
			};
			router.push({ query: queryParams });
		},
		{ deep: true, immediate: true },
	);
</script>
<style scoped></style>
