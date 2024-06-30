<template>
	<Container>
		<v-row class="py-4">
			<v-col>
				<v-card
					rounded="lg"
					:elevation="4">
					<v-card-title>Załóż konto</v-card-title>
					<v-card-text>
						<v-form
							ref="form"
							@submit.prevent="register()">
							<v-text-field
								v-model="registerCredentials.firstName"
								:rules="$v.required"
								density="compact"
								variant="outlined"
								label="Imię"
								prepend-inner-icon="mdi-account"
								hide-details="auto"
								class="mb-4"></v-text-field>
							<v-text-field
								v-model="registerCredentials.lastName"
								:rules="$v.required"
								density="compact"
								variant="outlined"
								label="Nazwisko"
								prepend-inner-icon="mdi-account"
								hide-details="auto"
								class="mb-4"></v-text-field>
							<v-text-field
								v-model="registerCredentials.email"
								:rules="$v.required"
								density="compact"
								variant="outlined"
								label="Email"
								prepend-inner-icon="mdi-email-outline"
								hide-details="auto"
								class="mb-4"></v-text-field>
							<v-text-field
								v-model="registerCredentials.password"
								:rules="$v.required"
								density="compact"
								variant="outlined"
								label="Hasło"
								prepend-inner-icon="mdi-lock-outline"
								:type="showPass ? 'text' : 'password'"
								:append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append-inner="showPass = !showPass"
								hide-details="auto"
								class="mb-4"></v-text-field>
							<v-text-field
								v-model="registerCredentials.repeatPassword"
								:rules="$v.required"
								density="compact"
								variant="outlined"
								label="Powrzórz hasło"
								type="password"
								prepend-inner-icon="mdi-lock-outline"
								hide-details="auto"
								class="mb-4"></v-text-field>
							<v-checkbox
								v-model="registerCredentials.rulesConfirmation"
								:rules="$v.checkBoxRequired"
								required
								density="compact"
								color="primary"
								label="Akceptuję regulamin sklepu"
								hide-details="auto"
								class="mb-4"></v-checkbox>
							<v-btn
								type="submit"
								class="text-none"
								block
								:loading="loading"
								color="primary">
								Załóż konto
							</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col>
				<v-card flat>
					<v-card-title>Masz już konto?</v-card-title>
					<v-card-text>
						<v-btn
							:link="true"
							to="/auth/login"
							block
							color="primary"
							variant="tonal"
							class="text-none">
							Zaloguj się
						</v-btn>
					</v-card-text>
				</v-card>
				<BenefitsList />
			</v-col>
		</v-row>
	</Container>
</template>
<script setup>
	const showPass = ref(false);
	const registerCredentials = ref({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
		rulesConfirmation: false,
	});
	const registerForm = ref(null);
	const authStore = useAuthStore();
	const { $toast, $pinia } = useNuxtApp();

	async function register() {
		if (registerForm.isValid) {
			const { ok, _data: data } = await authStore.register(
				registerCredentials.value,
			);
			if (ok) {
				$toast.success(data.message);
			} else {
				$toast.error(data.message);
			}
		}
	}
</script>
<style scoped>
	:deep(.v-input__details) {
		padding-left: 16px;
	}
</style>
