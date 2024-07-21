import { defineStore } from "pinia";
import type {
	AuthHeader,
	AuthStore,
	AuthResponse,
	LoginRequest,
	RegisterRequest,
} from "~/types/auth";

export const useAuthStore = defineStore("authStore", () => {
	const store = ref<AuthStore>({
		jwtToken: "",
		refreshToken: "",
		roles: [],
		tokenExpiry: "",
		userId: "",
	});

	const loadFromLocalStorage = () => {
		const userDataJson = localStorage.getItem("electro-user");
		if (!userDataJson) {
			return;
		}
		const userData: AuthStore = JSON.parse(userDataJson);
		if (userData) {
			const s = store.value;
			s.userId = userData.userId;
			s.jwtToken = userData.jwtToken;
			s.refreshToken = userData.refreshToken;
			s.roles = userData.roles;
			s.tokenExpiry = userData.tokenExpiry;
		}
	};
	loadFromLocalStorage();

	const isLoggedIn = computed(() => {
		const s = store.value;
		return (
			!!s.userId &&
			!!s.jwtToken &&
			!!s.refreshToken &&
			!!s.roles.length &&
			!isTokenExpired(s.tokenExpiry)
		);
	});

	const isTokenExpired = (tokenExpiry: string) => {
		if (tokenExpiry) {
			const expiryTime = new Date(tokenExpiry).getTime();
			const currentTime = new Date().getTime();
			return currentTime >= expiryTime - 60000;
		}
		return false;
	};

	const saveStore = (
		newJwtToken: string,
		newRefreshToken: string,
		newUserId: string,
		newRoles: string[],
		newTokenExpiry: string,
	) => {
		const s = store.value;
		s.jwtToken = newJwtToken;
		s.refreshToken = newRefreshToken;
		s.userId = newUserId;
		s.roles = newRoles;
		s.tokenExpiry = newTokenExpiry;
		localStorage.setItem("electro-user", JSON.stringify({ ...s }));
	};

	const clearStore = () => {
		const s = store.value;
		s.userId = "";
		s.jwtToken = "";
		s.refreshToken = "";
		s.roles = [];
		s.tokenExpiry = "";
		localStorage.removeItem("electro-user");
	};

	const getTokenHeader = (): AuthHeader => {
		if (isLoggedIn.value) {
			return { Authorization: `Bearer ${store.value.jwtToken}` };
		}
		return { Authorization: "" };
	};

	const ensureTokenValidity = async (): Promise<boolean> => {
		if (isLoggedIn.value && isTokenExpired(store.value.tokenExpiry)) {
			return await refreshTokenAction();
		}
		return true;
	};

	const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
		const { $api } = useNuxtApp();
		try {
			const response: AuthResponse = await $api.fetch(`api/auth/login`, {
				method: "POST",
				body: credentials,
			});
			return await handleAuthResponse(response);
		} catch (error: any) {
			return error.response as AuthResponse;
		}
	};

	const register = async (
		credentials: RegisterRequest,
	): Promise<AuthResponse> => {
		const { $api } = useNuxtApp();
		try {
			const response: AuthResponse = await $api.fetch(`api/auth/register`, {
				method: "POST",
				body: credentials,
			});
			return await handleAuthResponse(response);
		} catch (error: any) {
			return error.response as AuthResponse;
		}
	};

	const handleAuthResponse = async (response: AuthResponse) => {
		const { ok, _data: data } = response;
		if (
			ok &&
			!!data.jwtToken &&
			!!data.refreshToken &&
			!!data.userId &&
			!!data.roles &&
			!!data.tokenExpiry
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

	const refreshTokenAction = async (): Promise<boolean> => {
		const { $api } = useNuxtApp();
		try {
			const response = await $api.fetch(`api/auth/refreshToken`, {
				method: "POST",
				body: {
					jwtToken: store.value.jwtToken,
					refreshToken: store.value.refreshToken,
				},
			});
			const { ok, _data: data } = response;
			if (
				ok &&
				!!data.jwtToken &&
				!!data.refreshToken &&
				!!data.userId &&
				!!data.roles &&
				!!data.tokenExpiry
			) {
				saveStore(
					data.jwtToken,
					data.refreshToken,
					data.userId,
					data.roles,
					data.tokenExpiry,
				);
				return true;
			}
			return false;
		} catch (error: any) {
			logout();
			await navigateTo("/auth/login");
			return false;
		}
	};

	const logout = () => {
		clearStore();
	};

	return {
		store,
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
