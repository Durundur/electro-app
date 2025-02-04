import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import store from "../Store";

class ApiClient {
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
		});
		this.axiosInstance.interceptors.request.use(this.addTokenToRequest.bind(this));
	}

	private addTokenToRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
		const state = store.getState().AuthStore;

		if (state.auth.isAuthenticated && state.auth.token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${state.auth.token}`;
		}

		return config;
	}

	public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.get<T>(url, config);
	}

	public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.post<T>(url, data, config);
	}

	public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.put<T>(url, data, config);
	}

	public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.delete<T>(url, config);
	}
}

export default new ApiClient();
