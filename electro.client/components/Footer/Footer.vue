<template>
	<v-footer app :absolute="true" :elevation="6" color="grey-lighten-4" class="px-0 py-4">
		<Container>
			<v-row :no-gutters="true">
				<v-col cols="12" md="4">
					<div class="d-flex flex-column ga-4">
						<Logo />
						<div class="d-flex align-center ga-4">
							<v-icon color="primary" size="x-large">mdi-phone-outline</v-icon>
							<div>
								<p class="text-medium-emphasis">Masz pytania? Zadzwoń 24/7!</p>
								<p class="text-body-1">(800) 8001-8588, (0600) 874 548</p>
							</div>
						</div>
						<div>
							<p class="font-weight-bold">Informacje kontaktowe</p>
							<p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
						</div>
						<div class="d-flex ga-4">
							<v-btn size="small" icon="mdi-facebook"></v-btn>
							<v-btn size="small" icon="mdi-instagram"></v-btn>
							<v-btn size="small" icon="mdi-twitter"></v-btn>
						</div>
					</div>
				</v-col>
				<!-- <v-col cols="12" sm="6" md="4" >
					<div class="d-flex flex-column ga-2 align-start">
						<p class="font-weight-bold mb-4">Szybki wybór</p>
						<PureLink>Laptopy i komputery</PureLink>
						<PureLink>Aparaty i fotografia</PureLink>
						<PureLink>Smartfony i tablety </PureLink>
						<PureLink>Gry wideo i konsole</PureLink>
						<PureLink>Telewizja i dźwięk</PureLink>
						<PureLink>Gadżety</PureLink>
						<PureLink>Elektronika samochodowa i GPS</PureLink>
						<PureLink>Drukarki i atrament</PureLink>
						<PureLink>Oprogramowanie</PureLink>
					</div>
				</v-col>
				<v-col cols="12" sm="6" md="4">
					<div class="d-flex flex-column ga-2 align-start">
						<p class="font-weight-bold mb-4">Obsługa klienta</p>
						<PureLink to="account">Moje konto</PureLink>
						<PureLink>Śledzenie zamówienia</PureLink>
						<PureLink>Lista życzeń</PureLink>
						<PureLink>Obsługa klienta</PureLink>
						<PureLink>Zwroty/Wymiana</PureLink>
						<PureLink>Często zadawane pytania</PureLink>
						<PureLink>Wsparcie produktu</PureLink>
					</div>
				</v-col> -->
			</v-row>
			<div class="text-center font-weight-bold">&copy; Electro - All rights Reserved</div>
		</Container>
	</v-footer>
</template>
<script></script>
