import { FetchError } from 'ofetch';

export interface IError {
    errorMessage?: string,
    statusCode?: number
}

export const parseError = (error: unknown): IError => {
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;

    if (error instanceof FetchError) {
        statusCode = error.response?.status ?? 500;
        errorMessage = error.message || 'Error during fetch operation';

        const responseData = error.data;
        if (typeof responseData === 'object' && responseData !== null) {
            errorMessage = (responseData as any).message || errorMessage;
        }
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else if (typeof error === 'object' && error !== null) {
        if ('statusCode' in error) {
            statusCode = (error as any).statusCode;
        }
        if ('message' in error) {
            errorMessage = (error as any).message;
        } else if ('errorMessage' in error) {
            errorMessage = (error as any).errorMessage;
        }
    }

    return {
        errorMessage,
        statusCode
    };
};