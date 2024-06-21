<template>
	<v-card flat>
		<v-card-title class="py-1 text-body-2">Cena</v-card-title>
		<div class="px-4 d-flex align-center ga-4">
			<v-text-field
				hide-details
				density="compact"
				label="od"
				variant="outlined"
				suffix="zł"
				type="number"
				hide-spin-buttons></v-text-field>
			<span>-</span>
			<v-text-field
				hide-details
				density="compact"
				label="do"
				variant="outlined"
				suffix="zł"
				type="number"
				hide-spin-buttons></v-text-field>
		</div>
	</v-card>
</template>
<style scoped>
	:deep(.v-field__field) {
		align-items: center;
	}
	:deep(.v-input--density-compact) {
		--v-input-control-height: 20px;
		--v-input-padding-top: 0px;
	}
	:deep(.v-field__input) {
		padding-bottom: 0;
	}
	:deep(.v-text-field__suffix) {
		padding-bottom: 0;
	}
	:deep(.v-field) {
		font-size: 14px;
	}
</style>
