import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import store from "../Store";

class ApiClient {
	private axiosInstance: AxiosInstance;
	public apiType: "rest" | "graphql" = "rest";

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
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

	public requestGraphQL<T>(query: string, variables?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		const gqlRequest = {
			query,
			variables,
		};
		const gqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "/graphql";
		return this.axiosInstance.post<T>(gqlUrl, gqlRequest, config);
	}

	public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.put<T>(url, data, config);
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.delete<T>(url, config);
	}
}

export default new ApiClient();
