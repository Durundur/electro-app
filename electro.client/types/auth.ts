export interface AuthStore {
	userId: string;
	jwtToken: string;
	refreshToken: string;
	roles: string[];
	tokenExpiry: string;
}

export interface AuthHeader {
	Authorization: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	repeatPassword: string;
	rulesConfirmation: false;
}

export interface AuthResponseData extends AuthStore {
	message: string;
	success: boolean;
}

export interface AuthResponse {
	_data: AuthResponseData;
	ok: boolean;
	status: number;
}
