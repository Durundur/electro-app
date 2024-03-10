<template>
	<v-sheet color="grey-lighten-4">
		<v-row>
			<div class="icon-container">
				<v-icon>mdi-laptop</v-icon>
				<div>Laptopy i komputery</div>
			</div>
			<div class="icon-container">
				<v-icon>mdi-cellphone</v-icon>
				<div>Smartfony i smartwatche</div>
			</div>
			<div class="icon-container">
				<v-icon>mdi-controller</v-icon>
				<div>Gaming i streaming</div>
			</div>
			<div class="icon-container">
				<v-icon>mdi-memory</v-icon>
				<div>Podzespoły komputerowe</div>
			</div>
			<div class="icon-container">
				<v-icon>mdi-printer</v-icon>
				<div>Urządzenia peryferyjne</div>
			</div>
			<div class="icon-container">
				<v-icon>mdi-television-play</v-icon>
				<div>TV i audio</div>
			</div>
			<div class="icon-container">
				<v-icon>mdi-home-city-outline</v-icon>
				<div>Smartfony i lifestyle</div>
			</div>
		</v-row>
	</v-sheet>
</template>
<style>
.icon-container {
	display: flex;
	flex-direction: row;
	max-width: 130px;
	align-items: center;
	gap: 8px;
}
.icon-container:hover {
	background-color: #fff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
</style>
