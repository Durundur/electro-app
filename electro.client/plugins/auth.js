export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("auth", {
		login,
		register,
		logout,
		refreshToken,
		isLoggedIn
	});

	const authStore = useAuthStore();

	function isLoggedIn(){
		return authStore.isLoggedIn
	}

	async function login(credentials) {
		const response = await nuxtApp.$api.post("api/auth/login", credentials);
		if (response.success && response.jwtToken && response.refreshToken) {
			authStore.saveStore(response.jwtToken, response.refreshToken, null);
			await navigateTo("/");
			return response
		} else {
			return response
		}
	}

	async function register(credentials) {
		const response = await nuxtApp.$api.post("api/auth/register", credentials);
		if (response.success && response.jwtToken && response.refreshToken) {
			authStore.saveStore(response.jwtToken, response.refreshToken, null);
			await navigateTo("/");
			return response
		}else{
			return response
		}
	}

	function logout() {
		authStore.clearStore();
	}

	async function refreshToken() {
		const response = await nuxtApp.$api.post("api/auth/refreshToken", authStore.getStore());
		if (response.success && response.jwtToken && response.refreshToken) {
			authStore.saveStore(response.jwtToken, response.refreshToken, null);
		} else {
			logout();
			await navigateTo("/");
		}
	}
});
