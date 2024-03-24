<template>
	<v-sheet :max-width="650" class="mx-auto">
		<v-row class="ma-0" align="center">
			<v-col cols="12" sm="6" align-self="center" align="center">
				<div><span class="text-h4">{{ rating }}</span><span class="ml-2" color="red--text">/6</span></div>
				<ProductRatingStars :starWidth="24" v-model="rating" :disabled="true"/>
				<div><span class="ml-2 text-caption">(60 opinii)</span></div>
			</v-col>
			<v-col cols="12" sm="6">
				<v-hover v-for="index in 5">
					<template v-slot:default="{ isHovering, props }">
						<div v-bind="props" class="d-flex flex-row align-center ga-2" :class="{ 'text-primary': isHovering, 'cursor-pointer': isHovering }">
							<span>{{ index }}</span>
							<v-progress-linear
								style="left: 0; transform: translateX(0)"
								:color="isHovering ? 'primary' : 'grey-lighten-1'"
								:height="10"
								rounded="pill"
								bg-color="grey-darken-1"
								:model-value="index * 10"></v-progress-linear>
							<span>{{ 10 }}</span>
						</div>
					</template>
				</v-hover>
			</v-col>
		</v-row>
	</v-sheet>
</template>
<script>
export default {
	data() {
		return {
			rating: 1.6
		}
	}
}
</script>