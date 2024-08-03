<template>
	<Container>
		<CardTitle>Podsumowanie zamówienia</CardTitle>
		<!-- <CardTitleText>
			Poniżej możesz sprawdzić swoje zamówienie przed jego relizacją
		</CardTitleText> -->
		<v-card
			flat
			border
			rounded="lg">
			<v-card-text class="pt-0">
				<CheckoutProducts></CheckoutProducts>
				<OrderAddress :address="deliveryAddress"></OrderAddress>
				<OrderRecipient :recipient="orderRecipient"></OrderRecipient>
				<CheckoutConfirmDelivery></CheckoutConfirmDelivery>
			</v-card-text>
		</v-card>
	</Container>
</template>
<script lang="ts" setup>
	const deliveryAddress = {
		street: "Ulica",
		buildingNumber: "21A",
		city: "Raków",
		postalCode: "12-300",
		country: "Polska",
	};
	const orderRecipient = {
		email: "tomek@gmail.com",
		firstName: "Tomasz",
		lastName: "Rak",
		phoneNumber: "534 684 123",
	};
</script>
