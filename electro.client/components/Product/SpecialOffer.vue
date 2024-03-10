<template>
	<v-card class="ma-10 elevation-4" rounded="xl">
		<v-card-title>
			Gorący strzał
			<v-spacer></v-spacer>
			<v-btn class="text-none" color="primary" rounded="pill">
				<div class="d-flex flex-column">
					<span>Oszczędź</span>
					<span>{{ offer.oldPrice - offer.newPrice }} zł</span>
				</div>
			</v-btn>
		</v-card-title>
		<v-card-text>
			<v-img :src="offer.image"></v-img>
			<v-card-title>{{ offer.title }}</v-card-title>
			<v-card-title class="text-center">{{ offer.newPrice }} zł</v-card-title>
			<div class="d-flex align-center ga-2">
				<span>pozostało:</span>
				<span class="text-h6">{{ offer.remaningQuantity }}</span>
				<v-spacer></v-spacer>
				<span>sprzedano:</span>
				<span class="text-h6">{{ offer.soldQuantity }}</span>
			</div>
			<v-progress-linear color="primary" :height="20" rounded="pill" bg-color="grey-lighten" :model-value="progressBarWidth"></v-progress-linear>
			<div>
				<v-card-subtitle>Śpiesz się, oferta kończy się za:</v-card-subtitle>
			</div>
		</v-card-text>
	</v-card>
</template>
<script>
export default {
	props: {
		offer: {
			type: Object,
			required: true,
			default: () => {
				return {
					id: null,
					title: 'Samsung QE65Q80C QLED 4K 120Hz Dolby Atmos',
					image: 'https://cdn.x-kom.pl/i/img/promotions/hot-shot-large,,hs_2024_3_7_9_31_22.PNG',
					newPrice: 4349.0,
					oldPrice: 4999.99,
					remaningQuantity: 35,
					soldQuantity: 25
				};
			}
		}
	},
	computed: {
		progressBarWidth() {
			const p = (this.offer.remaningQuantity / (this.offer.soldQuantity + this.offer.remaningQuantity)) * 100;
			return p;
		}
	}
};
</script>
<style scoped>
:deep(.v-progress-linear__determinate) {
	border-radius: inherit;
}
</style>
