<template>
	<v-sheet
		:max-width="650"
		class="mx-auto">
		<v-row
			class="ma-0"
			align="center">
			<v-col
				cols="12"
				sm="6"
				align-self="center"
				align="center">
				<div>
					<span class="text-h4">{{ product.avgOpinionsRating }}</span>
					<span
						class="ml-1"
						color="red--text">
						/6
					</span>
				</div>
				<v-rating
					v-model="product.avgOpinionsRating"
					half-increments
					color="primary"
					hover
					readonly
					density="comfortable"></v-rating>
				<div>
					<span class="ml-2 text-caption">
						( {{ product.opinionsCount }} opinii)
					</span>
				</div>
			</v-col>
			<v-col
				cols="12"
				sm="6">
				<v-hover
					v-for="stats in opinionsStats"
					:key="stats.rating">
					<template v-slot:default="{ isHovering, props }">
						<div
							@click="stats.count !== 0 && (activeRatingFilter = stats.rating)"
							v-bind="props"
							class="d-flex flex-row align-center ga-2"
							:class="{
								'text-primary':
									stats.count !== 0 &&
									(isHovering || activeRatingFilter === stats.rating),
								'cursor-pointer': stats.count !== 0 && isHovering,
							}">
							<v-rating
								length="1"
								color="primary"
								readonly
								density="comfortable"
								size="x-small"></v-rating>
							<span>{{ stats.rating }}</span>
							<v-progress-linear
								style="left: 0; transform: translateX(0)"
								:color="
									isHovering || activeRatingFilter === stats.rating
										? 'primary'
										: 'grey-lighten-1'
								"
								:height="10"
								rounded="pill"
								bg-color="grey-darken-1"
								:model-value="
									(stats.count / product.opinionsCount) * 100
								"></v-progress-linear>
							<span class="mr-2">{{ stats.count }}</span>
						</div>
					</template>
				</v-hover>
			</v-col>
		</v-row>
	</v-sheet>
</template>
<script setup>
	const props = defineProps({
		product: {
			type: Object,
			required: true,
		},
	});

	const { $api } = useNuxtApp();
	const emit = defineEmits(["fetch-opinions"]);
	const opinionsStats = ref([]);

	const { data: statsRes } = await useAsyncData(() =>
		$api.get(`api/opinions/product/${props.product.id}/stats`),
	);

	if (statsRes.value.ok) {
		opinionsStats.value = statsRes.value.data;
	}

	const activeRatingFilter = ref(null);

	watch(activeRatingFilter, () => {
		emit("fetch-opinions", activeRatingFilter.value);
	});
</script>

<style scoped></style>
