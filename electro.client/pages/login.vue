<template>
  <Container>
    <v-row class="my-4">
      <v-col>
        <v-card rounded="lg" :elevation="4">
          <v-card-title>Zaloguj się</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login()">
              <v-text-field
                density="compact"
                v-model="loginCredentails.email"
                variant="outlined"
                label="Email"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
              <v-text-field
                v-model="loginCredentails.password"
                density="compact"
                variant="outlined"
                label="Hasło"
                prepend-inner-icon="mdi-lock-outline"
                :type="showPass ? 'text' : 'password'"
                :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPass = !showPass"
              >
              </v-text-field>
              <v-dialog max-width="520px" class="rounded-lg">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    variant="text"
                    class="text-none"
                    >Nie pamiętasz hasła?</v-btn
                  >
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-card-text class="py-4">
                      <v-card-title class="pa-0"
                        >Przypominanie hasła</v-card-title
                      >
                      <p class="px-0 py-2 text-subtitle-2">
                        Jeśli na ten e-mail jest założone konto, to wyślemy na
                        niego wiadomość.
                      </p>
                      <v-text-field
                        density="compact"
                        variant="outlined"
                        label="Email"
                        prepend-inner-icon="mdi-email-outline"
                      ></v-text-field>
                      <v-btn
                        block
                        class="text-none mb-4"
                        :loading="loading"
                        color="primary"
                        >Oszyskaj hasło</v-btn
                      >
                      <v-btn
                        block
                        class="text-none"
                        @click="isActive.value = false"
                        >Anuluj</v-btn
                      >
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
              <v-btn
                type="submit"
                class="text-none mt-4"
                block
                :loading="loading"
                color="primary"
                >Zaloguj się</v-btn
              >
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
              to="/register"
              block
              color="primary"
              variant="tonal"
              class="text-none"
              >Załóż konto</v-btn
            >
          </v-card-text>
        </v-card>
        <BenefitsList />
      </v-col>
    </v-row>
  </Container>
</template>
<script>
import { AuthService } from '~/services/authService';

export default {
	data() {
		return {
			showPass: false,
			loading: false,
			loginCredentails:{
				email: '',
				password: '',
			}
		};
	},
	methods:{
		login() {
			 AuthService.login(this.loginCredentails)
		},
	}
};
</script>
