import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../api-contract/Error";
import { LoginUserResult, RefreshTokenResult, RegisterUserResult } from "../api-contract/api-contract";

interface AuthStore {
	auth: AuthState;
	userProfile: UserProfileState;
	isLoading: boolean;
	error?: IError;
}

interface AuthState {
	token?: string;
	refreshToken?: string;
	refreshTokenExpiry?: string;
	isAuthenticated: boolean;
}

interface UserProfileState {
	id?: string;
	roles?: string[];
}

export type StoredAuthState = Pick<AuthStore, "auth" | "userProfile">;

const initialState: AuthStore = {
	auth: {
		token: undefined,
		refreshToken: undefined,
		refreshTokenExpiry: undefined,
		isAuthenticated: false,
	},
	userProfile: {
		id: undefined,
		roles: undefined,
	},
	isLoading: false,
	error: undefined,
};

const AuthStore = createSlice({
	name: "AuthStore",
	initialState,
	reducers: {
		registerUserSuccess(state, action: PayloadAction<RegisterUserResult>) {
			state.auth.token = action.payload.token;
			state.auth.refreshToken = action.payload.refreshToken;
			state.auth.refreshTokenExpiry = new Date(action.payload.refreshTokenExpiry!).toISOString();
			state.auth.isAuthenticated = true;
			state.userProfile = {
				id: action.payload.userProfileId,
				roles: action.payload.roles,
			};
			state.isLoading = false;
		},
		loginUserSuccess(state, action: PayloadAction<LoginUserResult>) {
			state.auth.token = action.payload.token;
			state.auth.refreshToken = action.payload.refreshToken;
			state.auth.refreshTokenExpiry = new Date(action.payload.refreshTokenExpiry!).toISOString();
			state.auth.isAuthenticated = true;
			state.userProfile = {
				id: action.payload.userProfileId,
				roles: action.payload.roles,
			};
			state.isLoading = false;
		},
		refreshTokenSuccess(state, action: PayloadAction<RefreshTokenResult>) {
			state.auth.token = action.payload.token;
			state.auth.refreshToken = action.payload.refreshToken;
			state.auth.refreshTokenExpiry = new Date(action.payload.refreshTokenExpiry!).toISOString();
			state.auth.isAuthenticated = true;
			state.isLoading = false;
		},
		authLoadingStart(state) {
			state.isLoading = true;
			state.error = undefined;
		},
		authErrorSet(state, action: PayloadAction<IError>) {
			state.error = action.payload;
			state.isLoading = false;
		},
		logout(state) {
			state.auth.token = undefined;
			state.auth.refreshToken = undefined;
			state.auth.refreshTokenExpiry = undefined;
			state.auth.isAuthenticated = false;
			state.error = undefined;
			state.userProfile.id = undefined;
			state.userProfile.roles = undefined;
		},
		restoreAuth(state, action: PayloadAction<StoredAuthState>) {
			state.auth = action.payload.auth;
			state.userProfile = action.payload.userProfile;
		},
	},
});

export const { loginUserSuccess, refreshTokenSuccess, registerUserSuccess, authLoadingStart, authErrorSet, logout, restoreAuth } = AuthStore.actions;

export default AuthStore.reducer;
