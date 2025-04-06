export interface IError {
	message: string;
	statusCode: number;
}

export const createError = (response: any): IError => {
	return {
		message: response?.response?.data?.message ?? response?.response?.data?.error?.message ?? response?.response?.statusText ?? response?.message ?? "Error",
		statusCode: response?.status ?? response?.data?.error?.status ?? response?.error?.status ?? 500,
	};
};

export const translateErrorMessage = (errorMessage: string): string => {
	const errorMessagesMap: { [key: string]: string } = {
		"Invalid email or password": "Nieprawidłowy email lub hasło",
		"Login successful": "Logowanie zakończone sukcesem",
		"User with this email already exists": "Użytkownik z tym emailem już istnieje",
		"Registration successful": "Rejestacja zakończona sukcesem",
		"An error occurred during registration, please try again": "",
		"Failed to create user": "",
	};

	return errorMessagesMap[errorMessage] || errorMessage;
};
