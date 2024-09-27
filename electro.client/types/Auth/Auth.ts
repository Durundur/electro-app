export interface IAuthData {
	userId: string;
	jwtToken: string;
	refreshToken: string;
	roles: string[];
	tokenExpiry: string;
}

export interface IAuthHeader {
	Authorization: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	repeatPassword: string;
	rulesConfirmation: false;
}

export interface IRefreshTokenRequest {
	jwtToken: string;
	refreshToken: string;
}

export interface IAuthResult extends IAuthData {
	message: string;
	success: boolean;
}



