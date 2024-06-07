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
					<span class="text-h4">{{ avgRating.toFixed(1) }}</span>
					<span
						class="ml-1"
						color="red--text">
						/6
					</span>
				</div>
				<v-rating
					v-model="avgRating"
					half-increments
					color="primary"
					hover
					readonly
					density="comfortable"></v-rating>
				<div>
					<span class="ml-2 text-caption">( {{ opinions.length }} opinii)</span>
				</div>
			</v-col>
			<v-col
				cols="12"
				sm="6">
				<v-hover v-for="index in [4, 3, 2, 1, 0]">
					<template v-slot:default="{ isHovering, props }">
						<div
							v-bind="props"
							class="d-flex flex-row align-center ga-2"
							:class="{
								'text-primary': isHovering,
								'cursor-pointer': isHovering,
							}">
							<v-rating
								length="1"
								color="primary"
								readonly
								density="comfortable"
								size="x-small"></v-rating>
							<span>{{ index + 1 }}</span>
							<v-progress-linear
								style="left: 0; transform: translateX(0)"
								:color="isHovering ? 'primary' : 'grey-lighten-1'"
								:height="10"
								rounded="pill"
								bg-color="grey-darken-1"
								:model-value="countRatings[index] * 10"></v-progress-linear>
							<span>{{ countRatings[index] }}</span>
						</div>
					</template>
				</v-hover>
			</v-col>
		</v-row>
	</v-sheet>
</template>
<script setup>
	const props = defineProps({
		opinions: {
			type: Array,
			default: [],
		},
	});

	const avgRating = computed(() => {
		if (props.opinions.length === 0) return 0;
		const total = props.opinions.reduce(
			(accumulator, opinion) => (accumulator += opinion.rating),
			0,
		);
		return total / props.opinions.length;
	});

	const countRatings = computed(() => {
		const counts = [0, 0, 0, 0, 0, 0];
		props.opinions.forEach((o) => {
			const rating = Math.ceil(o.rating);
			if (rating >= 1 && rating <= 5) {
				counts[rating] += 1;
			}
		});
		return counts.slice(1);
	});
</script>
