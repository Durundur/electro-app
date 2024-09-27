<template>
	<Container class="h-inherit">
		<v-container class="px-0">
			<v-row>
				<v-col>
					<v-card
						rounded="lg"
						:elevation="4">
						<v-card-title>{{ $i18n.t("Auth.Register") }}</v-card-title>
						<v-card-text>
							<v-form
								ref="form"
								@submit.prevent="registerSubmit()">
								<v-text-field
									v-model="registerCredentials.firstName"
									:rules="$v.required"
									density="compact"
									variant="outlined"
									:label="$i18n.t('Auth.FirstName')"
									prepend-inner-icon="mdi-account"
									hide-details="auto"
									class="mb-4" />
								<v-text-field
									v-model="registerCredentials.lastName"
									:rules="$v.required"
									density="compact"
									variant="outlined"
									:label="$i18n.t('Auth.LastName')"
									prepend-inner-icon="mdi-account"
									hide-details="auto"
									class="mb-4" />
								<v-text-field
									v-model="registerCredentials.email"
									:rules="$v.required"
									density="compact"
									variant="outlined"
									:label="$i18n.t('Auth.Email')"
									autocomplete="username"
									prepend-inner-icon="mdi-email-outline"
									hide-details="auto"
									class="mb-4" />
								<v-text-field
									v-model="registerCredentials.password"
									:rules="$v.required"
									density="compact"
									variant="outlined"
									:label="$i18n.t('Auth.Password')"
									prepend-inner-icon="mdi-lock-outline"
									:type="showPass ? 'text' : 'password'"
									:append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
									@click:append-inner="showPass = !showPass"
									hide-details="auto"
									autocomplete="new-password"
									class="mb-4" />
								<v-text-field
									v-model="registerCredentials.repeatPassword"
									:rules="$v.required"
									density="compact"
									variant="outlined"
									:label="$i18n.t('Auth.RepeatPassword')"
									type="password"
									prepend-inner-icon="mdi-lock-outline"
									hide-details="auto"
									autocomplete="new-password"
									class="mb-4" />
								<v-checkbox
									v-model="registerCredentials.rulesConfirmation"
									:rules="$v.checkBoxRequired"
									required
									density="compact"
									color="primary"
									:label="$i18n.t('Auth.AcceptTerms')"
									hide-details="auto"
									class="mb-4" />
								<v-btn
									type="submit"
									class="text-none"
									block
									color="primary">
									{{ $i18n.t("Auth.RegisterSubmit") }}
								</v-btn>
							</v-form>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col>
					<v-card flat>
						<v-card-title>
							{{ $i18n.t("Auth.AlreadyHaveAccountTitle") }}
						</v-card-title>
						<v-card-text>
							<v-btn
								to="/auth/login"
								block
								color="primary"
								variant="tonal"
								class="text-none">
								{{ $i18n.t("Auth.LoginSubmit") }}
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
	import type { IRegisterRequest } from "~/types/Auth/Auth";
	const { $i18n } = useNuxtApp();
	definePageMeta({
		allowAnonymous: true,
		denyLoggedIn: true,
	});
	const showPass = ref(false);
	const registerCredentials = ref<IRegisterRequest>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		repeatPassword: "",
		rulesConfirmation: false,
	});
	const authStore = useAuthStore();
	const { $toast } = useNuxtApp();
	const form = ref<InstanceType<typeof VForm> | null>(null);

	async function registerSubmit() {
		if (form.value && form.value.isValid) {
			await authStore.register(registerCredentials.value);
		}
	}

	watch(
		() => authStore.store.error,
		() => {
			$toast.error(authStore.store.error?.errorMessage as string);
		},
	);

	watch(
		() => authStore.store.successMessage,
		() => {
			$toast.success(authStore.store.successMessage as string);
		},
	);
</script>
