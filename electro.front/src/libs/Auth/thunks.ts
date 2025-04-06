import { AppDispatch } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { IError, createError } from "../api-contract/Error";
import { LoginUserCommand, LoginUserSuccessResult, RefreshTokenCommand, RefreshTokenSuccessResult, RegisterUserCommand, RegisterUserSuccessResult } from "../api-contract/api-contract";
import { authErrorSet, authLoadingStart, loginUserSuccess, logout, refreshTokenSuccess, registerUserSuccess } from "./slice";

export const registerUser = (command: RegisterUserCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		const response = await ApiClient.post<RegisterUserSuccessResult>("/api/auth/register", command);
		dispatch(registerUserSuccess(response.data));
	} catch (error) {
		dispatch(authErrorSet(createError(error as IError)));
		throw error;
	}
};

export const loginUser = (command: LoginUserCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		const response = await ApiClient.post<LoginUserSuccessResult>("/api/auth/login", command);
		dispatch(loginUserSuccess(response.data));
	} catch (error) {
		dispatch(authErrorSet(createError(error as IError)));
		throw error;
	}
};

export const refreshToken = (command: RefreshTokenCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		const response = await ApiClient.post<RefreshTokenSuccessResult>("/api/auth/refresh-token", command);
		dispatch(refreshTokenSuccess(response.data));
		return response.data;
	} catch (error) {
		dispatch(authErrorSet(createError(error as IError)));
		throw error;
	}
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		const response = await ApiClient.post("/api/auth/logout");
		dispatch(logout());
	} catch (error) {
		dispatch(logout());
	}
};
