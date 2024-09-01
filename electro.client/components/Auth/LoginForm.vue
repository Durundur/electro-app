<template>
	<v-form
		class="d-flex flex-column ga-4"
		ref="form"
		@submit.prevent="login()">
		<v-text-field
			class="size-medium"
			variant="outlined"
			rounded="lg"
			v-model="loginCredentails.email"
			:rules="$v.required"
			hide-details="auto"
			label="Email"
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
			label="Hasło"
			prepend-inner-icon="mdi-lock-outline"
			:type="showPass ? 'text' : 'password'"
			:append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
			@click:append-inner="showPass = !showPass"
			autocomplete="current-password"></v-text-field>

		<v-btn
			size="small"
			variant="text"
			class="text-none align-self-start"
			@click="">
			Nie pamiętasz hasła?
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
			Testowe konto
		</v-btn>
		<v-btn
			type="submit"
			class="text-none"
			color="primary">
			Zaloguj się
		</v-btn>
	</v-form>
</template>
<script lang="ts" setup>
	import { VForm } from "vuetify/components";
	const loginCredentails = ref({
		email: "",
		password: "",
	});
	const authStore = useAuthStore();
	const { $toast } = useNuxtApp();
	const showPass = ref(false);
	const form = ref<InstanceType<typeof VForm> | null>(null);

	async function login() {
		if (form.value && form.value.isValid) {
			const { ok, _data: data } = await authStore.login(loginCredentails.value);
			if (!ok) {
				loginCredentails.value.password = "";
				$toast.error("Błąd logowania");
			} else {
				$toast.success("Pomyślnie zalogowano");
			}
		}
	}
	async function resetPassword() {}
</script>
