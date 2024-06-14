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
					<span class="text-h4">{{ avgOpinionsRating }}</span>
					<span
						class="ml-1"
						color="red--text">
						/6
					</span>
				</div>
				<v-rating
					:model-value="avgOpinionsRating"
					half-increments
					color="primary"
					hover
					readonly
					density="comfortable"></v-rating>
				<div>
					<span class="ml-2 text-caption">( {{ opinionsCount }} opinii)</span>
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
							@click="stats.count !== 0 && toggleRatingFilter(stats.rating)"
							v-bind="props"
							class="d-flex flex-row align-center ga-2"
							:class="{
								'text-primary':
									stats.count !== 0 &&
									(isHovering || isActiveRatingFilter(stats.rating)),
								'cursor-pointer': stats.count !== 0 && isHovering,
								'active-rating': isActiveRatingFilter(stats.rating),
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
									isHovering || isActiveRatingFilter(stats.rating)
										? 'primary'
										: 'grey-lighten-1'
								"
								:height="10"
								rounded="pill"
								bg-color="grey-darken-1"
								:model-value="
									(stats.count / opinionsCount) * 100
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
		opinionsStats: {
			type: Array,
			required: true,
		},
		avgOpinionsRating: {
			type: Number,
			default: 0,
		},
		opinionsCount: {
			type: Number,
			default: 0,
		},
	});
	const emit = defineEmits(["fetch-opinions"]);

	const activeRatingFilter = ref(null);

	const toggleRatingFilter = (rating) => {
		if (isActiveRatingFilter(rating)) {
			activeRatingFilter.value = null;
		} else {
			activeRatingFilter.value = rating;
		}
	};

	const isActiveRatingFilter = (rating) => {
		return activeRatingFilter.value === rating;
	};

	watch(activeRatingFilter, () => {
		emit("fetch-opinions", activeRatingFilter.value);
	});
</script>

<style scoped>
	.active-rating {
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
