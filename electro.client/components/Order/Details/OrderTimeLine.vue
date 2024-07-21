<template>
	<div class="d-flex justify-center">
		<v-timeline
			:direction="smAndUp ? 'horizontal' : 'vertical'"
			density="compact"
			align="center"
			truncate-line="both">
			<v-timeline-item
				style="padding: 0"
				size="x-small"
				density="compact"
				dot-color="grey-lighten-2"
				icon="mdi-check"
				icon-color="white"
				:fill-dot="true">
				<p>Nowe</p>
			</v-timeline-item>
			<v-timeline-item
				size="x-small"
				dot-color="grey-lighten-2"
				icon="mdi-check"
				icon-color="white"
				:fill-dot="true">
				<p>W realizacji</p>
			</v-timeline-item>
			<v-timeline-item
				size="x-small"
				dot-color="grey-lighten-2"
				icon="mdi-check"
				icon-color="white"
				:fill-dot="true">
				<p>Wysłane</p>
			</v-timeline-item>
			<v-timeline-item
				size="x-small"
				dot-color="grey-lighten-2"
				icon="mdi-check"
				icon-color="white"
				:fill-dot="true">
				<p>Zakończone</p>
			</v-timeline-item>
		</v-timeline>
	</div>
</template>
<script setup>
	const { smAndUp } = useDisplay();
</script>
<style scoped>
	:deep(.v-timeline-item__body) {
		padding: 10px !important;
	}
</style>
