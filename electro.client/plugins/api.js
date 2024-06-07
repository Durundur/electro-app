export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	nuxtApp.provide("api", {
		get: request("GET"),
		post: request("POST"),
		put: request("PUT"),
		delete: request("DELETE"),
	});

	const fetch = (url, options = {}) =>
		$fetch.raw(`${config.public.API_URL}/${url}`, options);

	const authStore = useAuthStore();

	function request(method) {
		return async (url, body) => {
			const requestOptions = {
				method,
				headers: {
					...authStore.getAuthHeader,
				},
				body: body ? body : null,
			};
			try {
				const response = await fetch(url, requestOptions);
				return { data: response._data, ok: true, status: response.status };
			} catch (error) {
				console.log(error);
				if (error.status) {
					return { error: { ...error.data }, ok: false, status: error.status };
				}
				return {
					error: {
						message: "Błąd połączenia z serwerem",
					},
					ok: false,
					status: error.status,
				};
			}
		};
	}
});
