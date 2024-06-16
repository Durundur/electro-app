<template>
	<v-card
		class="my-1"
		link
		border
		elevation="0"
		:rounded="false"
		density="compact">
		<v-card-text class="d-flex align-center ga-3">
			<v-icon>mdi-check-circle-outline</v-icon>
			<div class="d-flex flex-column">
				<span class="text-start">Dostępny</span>
				<span class="text-caption">Dowiedz się więcej</span>
			</div>
		</v-card-text>
	</v-card>

	<v-card
		class="my-1"
		link
		border
		elevation="0"
		:rounded="false"
		density="compact">
		<v-card-text class="d-flex align-center ga-3">
			<v-icon>mdi-clock-outline</v-icon>
			<div class="d-flex flex-column">
				<span class="text-start">Kup teraz, a otrzymasz jutro</span>
				<span class="text-caption">Dowiedz się więcej</span>
			</div>
		</v-card-text>
	</v-card>

	<v-card
		link
		border
		elevation="0"
		:rounded="false"
		density="compact">
		<v-card-text class="d-flex align-center ga-3">
			<v-icon>mdi-truck-outline</v-icon>
			<div class="d-flex flex-column">
				<span class="text-start">Darmowa dostawa</span>
				<span class="text-caption">Sprawdź szczegóły</span>
			</div>
		</v-card-text>
	</v-card>
</template>
