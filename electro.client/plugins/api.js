export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const authStore = useAuthStore();
	const loading = useLoadingIndicator();
	nuxtApp.provide("api", {
		get: request("GET"),
		post: request("POST"),
		put: request("PUT"),
		delete: request("DELETE"),
		fetch,
	});

	function fetch(url, options = {}) {
		return $fetch.raw(`${config.public.API_URL}/${url}`, options);
	}

	function request(method) {
		return async (url, body) => {
			loading.start();
			if (!(await authStore.ensureTokenValidity())) {
				return {
					error: {
						message: "Błąd uwierzytelniania",
					},
					ok: false,
					status: 401,
				};
			}
			const requestOptions = {
				method,
				headers: {
					...authStore.getTokenHeader(),
				},
				body: body ? body : null,
			};
			try {
				const response = await fetch(url, requestOptions);
				return { data: response._data, ok: true, status: response.status };
			} catch (error) {
				if (error.status) {
					if ([401, 403].includes(error.status)) {
						authStore.logout();
						await navigateTo("/auth/login");
						return {
							error: {
								message: "Błąd uwierzytelniania",
							},
							ok: false,
							status: error.status,
						};
					}
					return {
						error: { ...error.data },
						ok: false,
						status: error.status,
					};
				}
				return {
					error: {
						message: "Błąd połączenia z serwerem",
					},
					ok: false,
					status: 500,
				};
			} finally {
				loading.finish();
			}
		};
	}
});
