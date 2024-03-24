<template>
	<v-card :link="true" :to="`product/${offer.id}`" height="100%" elevation="0" border rounded="lg">
		<v-card-item style="height: 10%">
			<v-card-title>Gorący strzał</v-card-title>
			<v-btn class="text-none discount my-1" height="auto" elevation="0" color="primary" rounded="lg">
				<div class="d-flex flex-column py-1">
					<span class="text-caption">Oszczędź</span>
					<span class="text-body-1">{{ Math.round(offer.oldPrice - offer.newPrice) }} zł</span>
				</div>
			</v-btn>
		</v-card-item>
		<v-card-text style="height: 90%" class="d-flex flex-column ga-2">
			<v-img :src="offer.image"></v-img>
			<v-card-title class="pa-0 product-name text-body-1">{{ offer.title }} </v-card-title>
			<v-card-title class="pa-0 text-center text-h6">{{ offer.newPrice }} zł</v-card-title>
			<div class="d-flex align-center ga-2 align-start">
				<span class="text-caption">pozostało:</span>
				<span class="text-body-1">{{ offer.remaningQuantity }}</span>
				<v-spacer></v-spacer>
				<span class="text-caption">sprzedano:</span>
				<span class="text-body-1">{{ offer.soldQuantity }}</span>
			</div>
			<v-progress-linear color="primary" :height="20" rounded="pill" bg-color="grey-darken-1" :model-value="progressBarWidth"></v-progress-linear>
			<div class="mb-5 align-end">
				<p class="text-center my-2 text-caption">Śpiesz się, oferta kończy się za:</p>
				<div class="d-flex justify-center align-center ga-2">
					<div style="position: relative">
						<v-sheet rounded="lg" color="grey-lighten-3" class="pa-2 text-h6">11</v-sheet>
						<div style="position: absolute" class="text-center w-100">godz.</div>
					</div>
					<span class="text-h6">:</span>
					<div style="position: relative">
						<v-sheet rounded="lg" color="grey-lighten-3" class="pa-2 text-h6">12</v-sheet>
						<div style="position: absolute" class="text-center w-100">min</div>
					</div>
					<span class="text-h6">:</span>
					<div style="position: relative">
						<v-sheet rounded="lg" color="grey-lighten-3" class="pa-2 text-h6">57</v-sheet>
						<div style="position: absolute" class="text-center w-100">sek.</div>
					</div>
				</div>
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
					title: 'Samsung QE65Q80C QLED 4K 120Hz Dolby Atmos Samsung QE65Q80C QLED 4K 120Hz Dolby Atmos Samsung QE65Q80C QLED 4K 120Hz Dolby Atmos',
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
.product-name {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
	height: 4em;
}
.discount {
	position: absolute;
	right: 0;
	top: 0;
	z-index: 1;
}
:deep(.v-card-item__content) {
	position: relative;
	overflow: visible;
}
</style>
