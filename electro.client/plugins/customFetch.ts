export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    const config = useRuntimeConfig();

    globalThis.$fetch = $fetch.create({
        async onRequest({ request, options }) {
            if (authStore.isLoggedIn && authStore.shouldRefreshToken) {
                try {
                    await authStore.refreshToken();
                } catch (error) {
                    authStore.logout();
                }
            }

            if (authStore.isLoggedIn) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${authStore.getTokenHeader()}`,
                };
            }
        },
        async onResponseError({ request, response, options }) {
            if (response.status === 401 && authStore.isLoggedIn) {
                authStore.logout();
            }
        }
    });
});
