import { defineStore } from "pinia";
import { parseError, type IError } from "~/types/Api/Error";
import type {
	IAuthData,
	IAuthHeader,
	IAuthResult,
	ILoginRequest,
	IRefreshTokenRequest,
	IRegisterRequest,
} from "~/types/Auth/Auth";

interface IAuthStore {
	authData?: IAuthData;
	error?: IError;
	isPending: boolean;
	successMessage?: string;
}

const initialAuthStore: IAuthStore = {
	error: undefined,
	isPending: false,
	authData: undefined,
	successMessage: undefined
};

export const useAuthStore = defineStore("auth-store", () => {
	const { $i18n } = useNuxtApp();
	const config = useRuntimeConfig();
	const store = ref<IAuthStore>(initialAuthStore);

	const loadFromLocalStorage = () => {
		const userDataJson = localStorage.getItem("electro-user");
		if (!userDataJson) {
			return;
		}
		const userData: IAuthData = JSON.parse(userDataJson);
		if (userData) {
			const s = store.value;
			s.authData = {
				userId: userData.userId,
				jwtToken: userData.jwtToken,
				refreshToken: userData.refreshToken,
				roles: userData.roles,
				tokenExpiry: userData.tokenExpiry,
			};
		}
	};

	loadFromLocalStorage();

	const isLoggedIn = computed(() => {
		const { authData } = store.value;
		if (authData) {
			return (
				!!authData.userId &&
				!!authData.jwtToken &&
				!!authData.refreshToken &&
				!!authData.roles.length &&
				!isTokenExpired(authData.tokenExpiry)
			);
		}
		return false;
	});

	const shouldRefreshToken = computed(() => {
		return isTokenExpired(store.value.authData?.tokenExpiry);
	});

	const isTokenExpired = (tokenExpiry: string | undefined) => {
		if (tokenExpiry) {
			const expiryTime = new Date(tokenExpiry).getTime();
			const currentTime = new Date().getTime();
			return currentTime >= expiryTime - 60000;
		}
		return false;
	};

	const clearStore = () => {
		store.value = { ...initialAuthStore };
		localStorage.removeItem("electro-user");
	};

	const getTokenHeader = (): IAuthHeader => {
		if (isLoggedIn.value && store.value.authData?.jwtToken) {
			return { Authorization: `Bearer ${store.value.authData?.jwtToken}` };
		}
		return { Authorization: "" };
	};

	const login = async (credentials: ILoginRequest): Promise<void> => {
		store.value.isPending = true;
		try {
			const result = await $fetch<IAuthResult>(
				`${config.public.API_BASE}/api/auth/login`,
				{
					method: "POST",
					body: credentials,
				},
			);
			store.value.authData = {
				userId: result.userId,
				jwtToken: result.jwtToken,
				refreshToken: result.refreshToken,
				roles: result.roles,
				tokenExpiry: result.tokenExpiry,
			};
			localStorage.setItem(
				"electro-user",
				JSON.stringify({ ...store.value.authData }),
			);
			store.value.error = undefined;
			store.value.successMessage = $i18n.t("Auth.SuccessfullyLoggedIn");
			navigateTo("/");
		} catch (e) {
			const error = parseError(e);
			if (error.statusCode === 401) {
				error.errorMessage = $i18n.t("Auth.InvalidEmailOrPassword");
			} else {
				error.errorMessage = $i18n.t("Auth.ANetworkErrorOccurred");
			}
			store.value.error = error;
		} finally {
			store.value.isPending = false;
		}
	};

	const register = async (credentials: IRegisterRequest): Promise<void> => {
		store.value.isPending = true;
		try {
			const result = await $fetch<IAuthResult>(
				`${config.public.API_BASE}/api/auth/register`,
				{
					method: "POST",
					body: credentials,
				},
			);
			store.value.authData = {
				userId: result.userId,
				jwtToken: result.jwtToken,
				refreshToken: result.refreshToken,
				roles: result.roles,
				tokenExpiry: result.tokenExpiry,
			};
			localStorage.setItem(
				"electro-user",
				JSON.stringify({ ...store.value.authData }),
			);
			store.value.error = undefined;
			store.value.successMessage = $i18n.t("Auth.RegistrationCompletedSuccessfully");
			navigateTo("/");
		} catch (e) {
			const error = parseError(e);
			if (error.statusCode === 401) {
				error.errorMessage = $i18n.t(
					"Auth.AnAccountWithThisEmailAddressAlreadyExists",
				);
			} else {
				error.errorMessage = $i18n.t("Auth.ANetworkErrorOccurred");
			}
			store.value.error = error;
		} finally {
			store.value.isPending = false;
		}
	};

	const refreshToken = async (): Promise<void> => {
		const body: IRefreshTokenRequest = {
			jwtToken: store.value.authData?.jwtToken ?? "",
			refreshToken: store.value.authData?.refreshToken ?? "",
		};
		const result = await $fetch<IAuthResult>(
			`${config.public.API_BASE}/api/auth/refreshToken`,
			{
				method: "POST",
				body: body,
			},
		);
		store.value.authData = {
			userId: result.userId,
			jwtToken: result.jwtToken,
			refreshToken: result.refreshToken,
			roles: result.roles,
			tokenExpiry: result.tokenExpiry,
		};
		localStorage.setItem(
			"electro-user",
			JSON.stringify({ ...store.value.authData }),
		);
	};

	const logout = () => {
		clearStore();
		const route = useRoute();
		if ("allowAnonymous" in route.meta) {
			route.meta.allowAnonymous ? null : navigateTo("/");
		}
	};

	return {
		store,
		isLoggedIn,
		clearStore,
		getTokenHeader,
		login,
		register,
		refreshToken,
		logout,
		shouldRefreshToken,
	};
});
