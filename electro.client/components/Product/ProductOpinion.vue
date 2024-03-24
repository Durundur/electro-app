<template>
	<v-card flat border rounded="lg">
		<v-card-subtitle>
			<div class="d-flex mt-4 align-center">
				<ProductRatingStars v-model="opinion.rating" :disabled="true"></ProductRatingStars>
				<v-spacer></v-spacer>
				<span>{{ opinion.createdAt }}</span>
			</div>
		</v-card-subtitle>
		<v-card-title> {{ opinion.title }} </v-card-title>
		<v-card-text>
			{{ opinion.review }}
		</v-card-text>
		<v-card-text class="pt-0">
			<div class="d-flex align-center ga-2">
				<v-icon size="x-large">mdi-account-outline</v-icon>
				<div>
					<span class="text-body-1">{{ opinion.authorName }}</span>
					<div v-if="opinion.isVerifiedPurchase" class="text-caption d-flex ga-2 align-center">
						<span>Potwierdzony zakup</span>
						<v-icon color="success">mdi-check-circle</v-icon>
					</div>
				</div>
			</div>
		</v-card-text>
		<v-card-text class="pt-0">
			<v-btn slim density="comfortable" color="success" variant="outlined" prepend-icon="mdi-thumb-up-outline">{{ opinion.likes }}</v-btn>
			<v-btn slim density="comfortable" class="ml-4" color="error" variant="outlined" prepend-icon="mdi-thumb-down-outline">{{ opinion.dislikes }}</v-btn>
		</v-card-text>
	</v-card>
</template>
<script>
export default {
	props: {
		opinion: {
			type: Object
		}
	}
};
</script>
