<template>
	<Container>
		<v-row class="my-4">
			<v-col>
				<v-card
					rounded="lg"
					:elevation="4">
					<v-card-title>Zaloguj się</v-card-title>
					<v-card-text>
						<v-form
							ref="form"
							@submit.prevent="login()">
							<v-text-field
								density="compact"
								v-model="loginCredentails.email"
								class="mb-4"
								:rules="$v.required"
								hide-details="auto"
								variant="outlined"
								label="Email"
								prepend-inner-icon="mdi-email-outline"></v-text-field>
							<v-text-field
								ref="passwordInput"
								v-model="loginCredentails.password"
								:rules="$v.required"
								density="compact"
								class="mb-4"
								hide-details="auto"
								variant="outlined"
								label="Hasło"
								prepend-inner-icon="mdi-lock-outline"
								:type="showPass ? 'text' : 'password'"
								:append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append-inner="showPass = !showPass"></v-text-field>
							<v-btn
								variant="text"
								class="text-none"
								@click="isResetPassVisible = true">
								Nie pamiętasz hasła?
							</v-btn>
							<v-btn
								class="text-none mt-4"
								block
								color="primary"
								@click="
									loginCredentails = {
										email: 'admin@test.com',
										password: '123',
									}
								">
								Testowe konto
							</v-btn>
							<v-btn
								type="submit"
								class="text-none mt-4"
								block
								color="primary">
								Zaloguj się
							</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col>
				<v-card flat>
					<v-card-title>Nie masz konta?</v-card-title>
					<v-card-text>
						<v-btn
							:link="true"
							to="/auth/register"
							block
							color="primary"
							variant="tonal"
							class="text-none">
							Załóż konto
						</v-btn>
					</v-card-text>
				</v-card>
				<BenefitsList />
			</v-col>
		</v-row>
		<v-dialog
			max-width="520px"
			class="rounded-lg"
			v-model="isResetPassVisible"
			:persistent="true">
			<v-card
				rounded="lg"
				:elevation="4">
				<v-card-text class="py-4">
					<v-card-title class="pa-0">Przypominanie hasła</v-card-title>
					<p class="px-0 py-2 text-subtitle-2">
						Jeśli na ten e-mail jest założone konto, to wyślemy na niego
						wiadomość.
					</p>
					<v-form
						ref="resetPassForm"
						@submit.prevent="resetPassword()">
						<v-text-field
							v-model="resetPassEmail"
							class="mb-4"
							density="compact"
							variant="outlined"
							:rules="$v.required"
							label="Email"
							hide-details="auto"
							prepend-inner-icon="mdi-email-outline"></v-text-field>
						<v-btn
							block
							type="submit"
							class="text-none mb-4"
							color="primary">
							Oszyskaj hasło
						</v-btn>
						<v-btn
							block
							class="text-none"
							@click="
								isResetPassVisible = false;
								$refs.resetPassForm.reset();
							">
							Anuluj
						</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-dialog>
	</Container>
</template>
<script>
	export default {
		data() {
			return {
				showPass: false,
				isResetPassVisible: false,
				erorrMessage: "",
				resetPassEmail: "",
				loginCredentails: {
					email: "",
					password: "",
				},
			};
		},
		methods: {
			async login() {
				if (this.$refs.form.isValid) {
					const response = await this.$nuxt.$auth.login(this.loginCredentails);
					if (!response.ok) {
						this.loginCredentails.password = "";
						this.$nuxt.$toast.error(response.data.message);
					} else {
						this.$nuxt.$toast.success(response.data.message);
					}
				}
			},
			resetPassword() {
				if (this.$refs.resetPassForm.isValid) {
					const response = this.$nuxt.api.post(
						"/api/auth/resetPassword",
						resetPassEmail,
					);
					if (!response.ok) {
						this.$nuxt.$toast.error(response.data.message);
					} else {
						this.resetPassEmail = "";
						this.isResetPassVisible = true;
						this.$nuxt.$toast.success(response.data.message);
					}
				}
			},
		},
	};
</script>
