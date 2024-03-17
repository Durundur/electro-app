<template>
	<Container>
		<v-row class="my-4">
			<v-col>
				<v-card rounded="lg" :elevation="4">
					<v-card-title>Załóż konto</v-card-title>
					<v-card-text>
						<v-form>
							<v-text-field density="compact" variant="outlined" label="Imię" prepend-inner-icon="mdi-email-outline"></v-text-field>
							<v-text-field density="compact" variant="outlined" label="Nazwisko" prepend-inner-icon="mdi-email-outline"></v-text-field>
							<v-text-field density="compact" variant="outlined" label="Email" prepend-inner-icon="mdi-email-outline"></v-text-field>
							<v-text-field
								density="compact"
								variant="outlined"
								label="Hasło"
								prepend-inner-icon="mdi-lock-outline"
								:type="showPass ? 'text' : 'password'"
								:append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append-inner="showPass = !showPass">
							</v-text-field>
							<v-text-field density="compact" variant="outlined" label="Powrzórz hasło" type="password" prepend-inner-icon="mdi-lock-outline"> </v-text-field>
							<v-checkbox hide-details="" color="primary" label="Akceptuję regulamin sklepu"></v-checkbox>
							<v-btn class="text-none" block :loading="loading" color="primary">Załóż konto</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col>
				<v-card flat>
					<v-card-title>Masz już konto?</v-card-title>
					<v-card-text>
						<v-btn :link="true" to="/login" block color="primary" variant="tonal" class="text-none">Zaloguj się</v-btn>
					</v-card-text>
				</v-card>
				<BenefitsList />
			</v-col>
		</v-row>
	</Container>
</template>
<script>
export default {
	data() {
		return {
			showPass: false,
			loading: false
		};
	}
};
</script>
