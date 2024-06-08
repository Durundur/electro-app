import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useNuxtApp } from "#app";

export const useAuthStore = defineStore("auth", () => {
	const userId = ref(null);
	const jwtToken = ref(null);
	const refreshToken = ref(null);
	const roles = ref(null);
	const tokenExpiry = ref(null);

	const loadFromLocalStorage = () => {
		const user = JSON.parse(localStorage.getItem("electro-user")) || {};
		userId.value = user.userId ?? null;
		jwtToken.value = user.jwtToken ?? null;
		refreshToken.value = user.refreshToken ?? null;
		roles.value = user.roles ?? null;
		tokenExpiry.value = user.tokenExpiry ?? null;
	};

	const isLoggedIn = computed(() => {
		return (
			userId.value &&
			jwtToken.value &&
			refreshToken.value &&
			roles.value &&
			!isTokenExpired(tokenExpiry.value)
		);
	});

	const isTokenExpired = (tokenExpiry) => {
		if (tokenExpiry) {
			const expiryTime = new Date(tokenExpiry).getTime();
			const currentTime = new Date().getTime();
			return currentTime >= expiryTime - 60000;
		}
		return false;
	};

	const saveStore = (
		newJwtToken,
		newRefreshToken,
		newUserId,
		newRoles,
		newTokenExpiry,
	) => {
		jwtToken.value = newJwtToken;
		refreshToken.value = newRefreshToken;
		userId.value = newUserId;
		roles.value = newRoles;
		tokenExpiry.value = newTokenExpiry;
		localStorage.setItem(
			"electro-user",
			JSON.stringify({
				userId: userId.value,
				jwtToken: jwtToken.value,
				refreshToken: refreshToken.value,
				roles: roles.value,
				tokenExpiry: tokenExpiry.value,
			}),
		);
	};

	const clearStore = () => {
		userId.value = null;
		jwtToken.value = null;
		refreshToken.value = null;
		roles.value = null;
		tokenExpiry.value = null;
		localStorage.removeItem("electro-user");
	};

	const getTokenHeader = () => {
		if (isLoggedIn.value) {
			return { Authorization: `Bearer ${jwtToken.value}` };
		}
		return {};
	};

	const ensureTokenValidity = async () => {
		if (isLoggedIn.value && isTokenExpired(tokenExpiry.value)) {
			return await refreshTokenAction();
		}
		return true;
	};

	const login = async (credentials) => {
		const { $api } = useNuxtApp();
		const response = await $api.fetch(`api/auth/login`, {
			method: "POST",
			body: credentials,
		});
		const { ok, _data: data } = response;
		if (
			ok &&
			data.jwtToken &&
			data.refreshToken &&
			data.userId &&
			data.roles &&
			data.tokenExpiry
		) {
			saveStore(
				data.jwtToken,
				data.refreshToken,
				data.userId,
				data.roles,
				data.tokenExpiry,
			);
			await navigateTo("/");
			return response;
		} else {
			return response;
		}
	};

	const register = async (credentials) => {
		const { $api } = useNuxtApp();
		const response = await $api.fetch(`api/auth/register`, {
			method: "POST",
			body: credentials,
		});
		const { ok, _data: data } = response;
		if (
			ok &&
			data.jwtToken &&
			data.refreshToken &&
			data.userId &&
			data.roles &&
			data.tokenExpiry
		) {
			saveStore(
				data.jwtToken,
				data.refreshToken,
				data.userId,
				data.roles,
				data.tokenExpiry,
			);
			await navigateTo("/");
			return response;
		} else {
			return response;
		}
	};

	const refreshTokenAction = async () => {
		const { $api } = useNuxtApp();
		const response = await $api.fetch(`api/auth/refreshToken`, {
			method: "POST",
			body: {
				jwtToken: jwtToken.value,
				refreshToken: refreshToken.value,
			},
		});
		const { ok, _data: data } = response;
		if (
			ok &&
			data.jwtToken &&
			data.refreshToken &&
			data.userId &&
			data.roles &&
			data.tokenExpiry
		) {
			saveStore(
				data.jwtToken,
				data.refreshToken,
				data.userId,
				data.roles,
				data.tokenExpiry,
			);
			return true;
		} else {
			logout();
			await navigateTo("/auth/login");
			return false;
		}
	};

	const logout = () => {
		clearStore();
	};

	loadFromLocalStorage();

	return {
		userId,
		jwtToken,
		refreshToken,
		roles,
		tokenExpiry,
		isLoggedIn,
		saveStore,
		clearStore,
		getTokenHeader,
		ensureTokenValidity,
		login,
		register,
		refreshTokenAction,
		logout,
	};
});
