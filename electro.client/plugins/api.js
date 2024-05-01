export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("api", {
        get: request("GET"),
        post: request("POST"),
        put: request("PUT"),
        delete: request("DELETE"),
    });

	const fetch = (url, options = {}) =>
		$fetch.raw(`https://localhost:5555/${url}`, options);

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
				return { ...response._data, status: response.status };
			} catch (error) {
				return { ...error.data, status: error.status };
			}
		};
	}
});

