import { FC, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { StoredAuthState, logout, restoreAuth, setHydrated } from "@/libs/Auth/slice";
import { refreshToken } from "@/libs/Auth/thunks";

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const localStorageKey = "electro-auth";

	const dispatch = useDispatch();

	const authState = useSelector((store) => store.AuthStore.auth);
	const userState = useSelector((store) => store.AuthStore.user);
	const isHydrated = useSelector((store) => store.AuthStore.isHydrated);

	const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(null);

	const isTokenExpired = (expiryDate?: string) => {
		if (!expiryDate) return true;
		return new Date(expiryDate).getTime() <= new Date().getTime();
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const authStateToRestore = localStorage.getItem(localStorageKey);
			if (authStateToRestore) {
				try {
					const parsedStoredAuthState: StoredAuthState = JSON.parse(authStateToRestore);

					if (isTokenExpired(parsedStoredAuthState.auth.refreshTokenExpiry)) {
						dispatch(logout());
						localStorage.removeItem(localStorageKey);
					} else {
						dispatch(restoreAuth(parsedStoredAuthState));

						if (isTokenExpired(parsedStoredAuthState.auth.tokenExpiry)) {
							dispatch(
								refreshToken({
									refreshToken: parsedStoredAuthState.auth.refreshToken,
									token: parsedStoredAuthState.auth.token,
								})
							);
						}
					}
				} catch (error) {
					console.error("Error while parsing stored auth state", error);
					localStorage.removeItem(localStorageKey);
				}
			}
			dispatch(setHydrated());
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined" && isHydrated) {
			if (authState.isAuthenticated) {
				const authStateToStore: StoredAuthState = {
					auth: authState,
					user: userState,
				};
				localStorage.setItem(localStorageKey, JSON.stringify(authStateToStore));
			} else {
				localStorage.removeItem(localStorageKey);
			}
		}
	}, [authState, userState, isHydrated]);

	const scheduleTokenRefresh = () => {
		if (!authState.isAuthenticated || !authState.tokenExpiry) return;

		const now = new Date().getTime();
		const tokenExpiryTime = new Date(authState.tokenExpiry).getTime();
		const refreshTokenExpiryTime = authState.refreshTokenExpiry ? new Date(authState.refreshTokenExpiry).getTime() : 0;

		if (now >= refreshTokenExpiryTime) {
			dispatch(logout());
			return;
		}

		const refreshMargin = 3 * 60 * 1000;
		const timeUntilRefresh = tokenExpiryTime - now - refreshMargin;

		if (refreshTimeout) {
			clearTimeout(refreshTimeout);
		}

		if (timeUntilRefresh > 0) {
			const timeout = setTimeout(async () => {
				try {
					await dispatch(
						refreshToken({
							refreshToken: authState.refreshToken,
							token: authState.token,
						})
					);
				} catch (error) {
					console.error("Error refreshing token", error);
					dispatch(logout());
				}
			}, timeUntilRefresh);
			setRefreshTimeout(timeout);
		} else if (now < refreshTokenExpiryTime) {
			dispatch(
				refreshToken({
					refreshToken: authState.refreshToken,
					token: authState.token,
				})
			);
		}
	};

	useEffect(() => {
		scheduleTokenRefresh();

		return () => {
			if (refreshTimeout) {
				clearTimeout(refreshTimeout);
			}
		};
	}, [authState.token, authState.tokenExpiry, authState.refreshToken, authState.refreshTokenExpiry]);

	return children;
};

export default AuthProvider;
