<template>
	<SubCardTitle>Dostawa</SubCardTitle>
	<v-card
		flat
		rounded="lg"
		border
		class="pa-2">
		<div class="d-flex flex-row align-center">
			<v-img
				class="flex-grow-0"
				:aspect-ratio="4 / 3"
				width="64"
				src="https://cdn.x-kom.pl/i_v2/product-small/assets/img/common/shipment/website/packstation-big-lm.png"></v-img>
			<span class="font-weight-medium">InPost Kurier</span>
		</div>
		<div>Numer przesyłki</div>
		<v-btn
			rounded="lg"
			density="compact"
			variant="tonal"
			append-icon="mdi-open-in-new">
			852313067057
		</v-btn>
	</v-card>
</template>
