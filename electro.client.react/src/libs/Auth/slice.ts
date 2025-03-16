import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../api-contract/Error";
import { LoginUserSuccessResult, RefreshTokenResult, RegisterUserSuccessResult } from "../api-contract/api-contract";

interface AuthStore {
	auth: AuthState;
	user: UserState;
	isLoading: boolean;
	error?: IError;
}

interface AuthState {
	token?: string;
	refreshToken?: string;
	refreshTokenExpiry?: string;
	isAuthenticated: boolean;
}

interface UserState {
	id?: string;
	roles?: string[];
}

export type StoredAuthState = Pick<AuthStore, "auth" | "user">;

const initialState: AuthStore = {
	auth: {
		token: undefined,
		refreshToken: undefined,
		refreshTokenExpiry: undefined,
		isAuthenticated: false,
	},
	user: {
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
		registerUserSuccess(state, action: PayloadAction<RegisterUserSuccessResult>) {
			state.auth.token = action.payload.token;
			state.auth.refreshToken = action.payload.refreshToken;
			state.auth.refreshTokenExpiry = new Date(action.payload.refreshTokenExpiry!).toISOString();
			state.auth.isAuthenticated = true;
			state.user = {
				id: action.payload.userId,
				roles: action.payload.roles,
			};
			state.isLoading = false;
		},
		loginUserSuccess(state, action: PayloadAction<LoginUserSuccessResult>) {
			state.auth.token = action.payload.token;
			state.auth.refreshToken = action.payload.refreshToken;
			state.auth.refreshTokenExpiry = new Date(action.payload.refreshTokenExpiry!).toISOString();
			state.auth.isAuthenticated = true;
			state.user = {
				id: action.payload.userId,
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
			state.user.id = undefined;
			state.user.roles = undefined;
			state.isLoading = false;
		},
		restoreAuth(state, action: PayloadAction<StoredAuthState>) {
			state.auth = action.payload.auth;
			state.user = action.payload.user;
		},
	},
});

export const { loginUserSuccess, refreshTokenSuccess, registerUserSuccess, authLoadingStart, authErrorSet, logout, restoreAuth } = AuthStore.actions;

export default AuthStore.reducer;
