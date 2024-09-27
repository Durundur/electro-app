<template>
	<Container class="h-inherit">
		<v-container class="px-0">
			<v-row>
				<v-col>
					<v-card
						rounded="lg"
						:elevation="4">
						<v-card-title>{{ $i18n.t('Auth.LoginTitle') }}</v-card-title>
						<v-card-text>
							<v-form
								class="d-flex flex-column ga-4"
								ref="form"
								@submit.prevent="loginSubmit()">
								<v-text-field
									class="size-medium"
									variant="outlined"
									rounded="lg"
									v-model="loginCredentails.email"
									:rules="$v.required"
									hide-details="auto"
									:label="$i18n.t('Auth.Email')"
									prepend-inner-icon="mdi-email-outline"
									autocomplete="username"></v-text-field>

								<v-text-field
									class="size-medium"
									variant="outlined"
									rounded="lg"
									ref="passwordInput"
									v-model="loginCredentails.password"
									:rules="$v.required"
									hide-details="auto"
									:label="$i18n.t('Auth.Password')"
									prepend-inner-icon="mdi-lock-outline"
									:type="showPass ? 'text' : 'password'"
									:append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
									@click:append-inner="showPass = !showPass"
									autocomplete="current-password"></v-text-field>

								<v-btn
									size="small"
									variant="text"
									class="text-none align-self-start">
									{{ $i18n.t('Auth.ForgotPassword') }}
								</v-btn>

								<v-btn
									class="text-none"
									color="primary"
									@click="
										loginCredentails = {
											email: 'admin@test.com',
											password: '123',
										}
									">
									{{ $i18n.t('Auth.TestAccount') }}
								</v-btn>
								<v-btn
									type="submit"
									class="text-none"
									color="primary">
									{{ $i18n.t('Auth.LoginTitle') }}
								</v-btn>
							</v-form>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card flat>
						<v-card-title>{{ $i18n.t('Auth.RegisterTitle') }}</v-card-title>
						<v-card-text>
							<v-btn
								to="/auth/register"
								block
								color="primary"
								variant="tonal"
								class="text-none">
								{{ $i18n.t('Auth.Register') }}
							</v-btn>
						</v-card-text>
					</v-card>
					<BenefitsList />
				</v-col>
			</v-row>
		</v-container>
	</Container>
</template>
<script setup lang="ts">
	import { VForm } from "vuetify/components";
	import type { ILoginRequest } from "~/types/Auth/Auth";
	const { $i18n } = useNuxtApp();
	definePageMeta({
		allowAnonymous: true,
		denyLoggedIn: true,
	});
	const loginCredentails = ref<ILoginRequest>({
		email: "",
		password: "",
	});
	const authStore = useAuthStore();
	const { $toast } = useNuxtApp();
	const showPass = ref(false);
	const form = ref<InstanceType<typeof VForm> | null>(null);

	async function loginSubmit() {
		if (form.value && form.value.isValid) {
			await authStore.login(loginCredentails.value);
		}
	}

	watch(() => authStore.store.error, () => {
		$toast.error(authStore.store.error?.errorMessage as string);
	})

	watch(() => authStore.store.successMessage, () => {
		$toast.success(authStore.store.successMessage as string);
	})
</script>
