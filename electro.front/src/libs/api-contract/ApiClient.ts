import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import store from "../Store";
import { TypedDocumentString } from "./graphql-api-contract/graphql";

class ApiClient {
	private axiosInstance: AxiosInstance;
	public apiType = () => store.getState().ApiClientStore.apiType;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		});

		this.axiosInstance.interceptors.request.use(this.addAuthorizationHeaderToRequest.bind(this));
	}

	private getAuthorizationHeader() {
		const state = store.getState().AuthStore;
		return { Authorization: `Bearer ${state.auth.isAuthenticated && state.auth.token ? state.auth.token : ""}` };
	}

	private addAuthorizationHeaderToRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
		config.headers = config.headers || {};
		config.headers.Authorization = this.getAuthorizationHeader().Authorization;

		return config;
	}

	public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.get<T>(url, config);
	}

	public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.post<T>(url, data, config);
	}

	public postGraphql<TResult, TVariables>(
		document: TypedDocumentString<TResult, TVariables>,
		variables?: TVariables extends Record<string, never> ? never : TVariables,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<{ data: TResult; errors?: Array<{ message: string }> }>> {
		const gqlRequest = {
			query: this.minifyGraphQL(document.toString()),
			variables,
		};
		const gqlUrl = "/graphql";
		return this.axiosInstance.post(gqlUrl, gqlRequest, config);
	}

	public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.put<T>(url, data, config);
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.delete<T>(url, config);
	}

	private minifyGraphQL(query: string): string {
		return query.replace(/\s+/g, " ").trim();
	}
}

export default new ApiClient();
