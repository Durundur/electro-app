<template>
	<Container
		class="h-inherit text-center d-flex flex-column justify-center align-center">
		<v-icon
			size="xx-large"
			class="mb-2"
			icon="mdi-check-circle-outline"></v-icon>
		<div class="d-flex flex-column ga-2">
			<p class="text-h6 font-weight-bold">Przyjęliśmy Twoje zamówienie</p>
			<p>
				Numer Twojego zamówienia:
				<span class="font-weight-bold">{{ orderId }}</span>
			</p>
			<p>
				Wysłaliśmy potwierdzenie zamówienia na adres:
				<span class="font-weight-bold">{{ email }}</span>
			</p>
			<div class="d-flex justify-center ga-4">
				<v-btn
					class="text-none text-body-2"
					prepend-icon="mdi-clipboard-list-outline">
					Pobierz fakturę
				</v-btn>
				<v-btn
					color="primary"
					class="text-none text-body-2"
					to="/">
					Wróć na stronę główną
				</v-btn>
			</div>
		</div>
	</Container>
</template>
<script setup lang="ts">
	export interface ICompletedCheckoutInfoProps {
		orderId: string;
		email: string;
	}
	const props = defineProps<ICompletedCheckoutInfoProps>();
</script>
