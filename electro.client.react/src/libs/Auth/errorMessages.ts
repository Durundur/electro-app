export const translateErrorMessage = (errorMessage: string): string => {
    const errorMessagesMap: { [key: string]: string } = {
        "Invalid email or password": "Nieprawidłowy email lub hasło",
        "Login successful": "Logowanie zakończone sukcesem",

        "User with this email already exists": "Użytkownik z tym emailem już istnieje",
        "Registration successful": "Rejestacja zakończona sukcesem",
        "An error occurred during registration, please try again": "",
        "Failed to create user": ""
    };

    return errorMessagesMap[errorMessage] || errorMessage;
};