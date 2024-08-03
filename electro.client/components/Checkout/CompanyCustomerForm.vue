<template>
	<SubCardTitle>Dane do faktury</SubCardTitle>
	<div class="d-flex flex-column ga-4">
		<DefaultInput label="NIP"></DefaultInput>
		<DefaultInput label="Nazwa firmy"></DefaultInput>
		<div class="d-flex ga-2 flex-md-row">
			<DefaultInput label="Ulica"></DefaultInput>
			<DefaultInput label="Numer domu lub mieszkania"></DefaultInput>
		</div>
		<DefaultInput label="Kod pocztowy"></DefaultInput>
		<DefaultInput label="Miejscowość"></DefaultInput>
	</div>
	<SubCardTitle>Dane odbiorcy przesyłki</SubCardTitle>
	<div class="d-flex flex-column ga-4">
		<DefaultInput label="Imię i nazwisko lub nazwa firmy"></DefaultInput>
		<DefaultInput label="Telefon"></DefaultInput>
		<DefaultInput label="E-mail"></DefaultInput>
	</div>
</template>
