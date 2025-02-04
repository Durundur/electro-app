import { FC, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/libs/Store";
import { StoredAuthState, logout, restoreAuth } from "@/libs/Auth/slice";
import { refreshToken } from "@/libs/Auth/thunks";

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const dispatch = useDispatch();
	const authState = useSelector((store) => store.AuthStore.auth);
	const userProfileState = useSelector((store) => store.AuthStore.userProfile);
	const [isHydrated, setIsHydrated] = useState(false);
	const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(null);
	const localStorageKey = "electro-auth";

	useEffect(() => {
		if (typeof window !== "undefined") {
			const authStateToRestore = localStorage.getItem(localStorageKey);
			if (authStateToRestore) {
				try {
					const parsedStoredAuthState: StoredAuthState = JSON.parse(authStateToRestore);
					dispatch(restoreAuth(parsedStoredAuthState));
				} catch (error) {
					console.error("Error while parsing stored auth state", error);
				}
			}
		}
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined" && isHydrated) {
			const authStateToStore: StoredAuthState = {
				auth: authState,
				userProfile: userProfileState,
			};
			localStorage.setItem(localStorageKey, JSON.stringify(authStateToStore));
		}
	}, [authState, userProfileState, isHydrated]);

	const scheduleTokenRefresh = () => {
		if (!authState.isAuthenticated || !authState.refreshTokenExpiry) return;

		const now = new Date().getTime();
		const expiryTime = new Date(authState.refreshTokenExpiry).getTime();
		const timeUntilRefresh = expiryTime - now - 60 * 1000;

		if (timeUntilRefresh > 0) {
			if (refreshTimeout) clearTimeout(refreshTimeout);

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
		}
	};

	useEffect(() => {
		scheduleTokenRefresh();

		return () => {
			if (refreshTimeout) clearTimeout(refreshTimeout);
		};
	}, [authState.refreshToken, authState.refreshTokenExpiry]);

	return children;
};

export default AuthProvider;
