import { AppDispatch } from "../Store";
import ApiClient from "../api-contract/ApiClient";
import { IError, createError } from "../api-contract/Error";
import { graphql } from "../api-contract/graphql-api-contract";
import { AuthPageLoginMutation, AuthPageRefreshTokenMutation, AuthPageRefreshTokenMutationVariables, AuthPageRegisterMutation, AuthPageRegisterMutationVariables } from "../api-contract/graphql-api-contract/graphql";
import { LoginUserCommand, LoginUserSuccessResult, RefreshTokenCommand, RefreshTokenSuccessResult, RegisterUserCommand, RegisterUserSuccessResult } from "../api-contract/rest-api-contract";
import { authErrorSet, authLoadingStart, loginUserSuccess, logout, refreshTokenSuccess, registerUserSuccess } from "./slice";

export const registerUser = (command: RegisterUserCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		if (ApiClient.apiType() == "graphql") {
			const AuthPageRegisterMutation = graphql(`
				mutation AuthPageRegister($input: RegisterInput!) {
					registerUser(input: $input) {
						success
						message
						userId
						token
						tokenExpiry
						refreshToken
						refreshTokenExpiry
						roles
					}
				}
			`);
			const variables: AuthPageRegisterMutationVariables = {
				input: {
					email: command.email!,
					password: command.password!,
				},
			};
			const response = await ApiClient.postGraphql(AuthPageRegisterMutation, variables);
			const mappedResponse = mapGraphQLResponseToRegisterUserResult(response.data.data);
			dispatch(registerUserSuccess(mappedResponse));
		} else {
			const response = await ApiClient.post<RegisterUserSuccessResult>("/api/auth/register", command);
			dispatch(registerUserSuccess(response.data));
		}
	} catch (error) {
		dispatch(authErrorSet(createError(error as IError)));
		throw error;
	}
};

const mapGraphQLResponseToRegisterUserResult = (data: AuthPageRegisterMutation): RegisterUserSuccessResult => {
	return {
		success: data.registerUser.success,
		message: data.registerUser.message,
		userId: data.registerUser.userId,
		token: data.registerUser.token ?? undefined,
		tokenExpiry: new Date(data.registerUser.tokenExpiry!),
		refreshToken: data.registerUser.refreshToken ?? undefined,
		refreshTokenExpiry: new Date(data.registerUser.refreshTokenExpiry!),
		roles: data.registerUser.roles ?? undefined,
	};
};

export const loginUser = (command: LoginUserCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		if (ApiClient.apiType() == "graphql") {
			const AuthPageLoginMutation = graphql(`
				mutation AuthPageLogin($input: LoginInput!) {
					loginUser(input: $input) {
						success
						message
						userId
						token
						tokenExpiry
						refreshToken
						refreshTokenExpiry
						roles
					}
				}
			`);
			const variables: AuthPageRegisterMutationVariables = {
				input: {
					email: command.email!,
					password: command.password!,
				},
			};
			const response = await ApiClient.postGraphql(AuthPageLoginMutation, variables);
			const mappedResponse = mapGraphQLResponseToLoginUserResult(response.data.data);
			dispatch(loginUserSuccess(mappedResponse));
		} else {
			const response = await ApiClient.post<LoginUserSuccessResult>("/api/auth/login", command);
			dispatch(loginUserSuccess(response.data));
		}
	} catch (error) {
		dispatch(authErrorSet(createError(error as IError)));
		throw error;
	}
};

const mapGraphQLResponseToLoginUserResult = (data: AuthPageLoginMutation): LoginUserSuccessResult => {
	return {
		success: data.loginUser.success,
		message: data.loginUser.message,
		userId: data.loginUser.userId,
		token: data.loginUser.token ?? undefined,
		tokenExpiry: new Date(data.loginUser.tokenExpiry!),
		refreshToken: data.loginUser.refreshToken ?? undefined,
		refreshTokenExpiry: new Date(data.loginUser.refreshTokenExpiry!),
		roles: data.loginUser.roles ?? undefined,
	};
};

export const refreshToken = (command: RefreshTokenCommand) => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		if (ApiClient.apiType() == "graphql") {
			const AuthPageRefreshTokenMutation = graphql(`
				mutation AuthPageRefreshToken($input: RefreshTokenInput!) {
					refreshToken(input: $input) {
						success
						message
						userId
						token
						tokenExpiry
						refreshToken
						refreshTokenExpiry
						roles
					}
				}
			`);
			const variables: AuthPageRefreshTokenMutationVariables = {
				input: {
					refreshToken: command.refreshToken!,
					token: command.token!,
				},
			};
			const response = await ApiClient.postGraphql(AuthPageRefreshTokenMutation, variables);
			const mappedResponse = mapGraphQLResponseToRefreshTokenResult(response.data.data);
			dispatch(refreshTokenSuccess(mappedResponse));
			return mappedResponse;
		} else {
			const response = await ApiClient.post<RefreshTokenSuccessResult>("/api/auth/refresh-token", command);
			dispatch(refreshTokenSuccess(response.data));
			return response.data;
		}
	} catch (error) {
		dispatch(authErrorSet(createError(error as IError)));
		throw error;
	}
};

const mapGraphQLResponseToRefreshTokenResult = (data: AuthPageRefreshTokenMutation): RefreshTokenSuccessResult => {
	return {
		success: data.refreshToken.success,
		message: data.refreshToken.message,
		userId: data.refreshToken.userId,
		token: data.refreshToken.token ?? undefined,
		tokenExpiry: new Date(data.refreshToken.tokenExpiry!),
		refreshToken: data.refreshToken.refreshToken ?? undefined,
		refreshTokenExpiry: new Date(data.refreshToken.refreshTokenExpiry!),
	};
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(authLoadingStart());
		if(ApiClient.apiType() == "graphql") {
			const AuthPageLogoutMutation = graphql(`
				mutation AuthPageLogout {
					logoutUser
				}
			`);
			const response = await ApiClient.postGraphql(AuthPageLogoutMutation);
		}
		else{
			const response = await ApiClient.post("/api/auth/logout");
		}
		dispatch(logout());
	} catch (error) {
		dispatch(logout());
	}
};
