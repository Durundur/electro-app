export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();
	const isLoggedIn = authStore.isLoggedIn;

	const allowAnonymous = (to.meta.allowAnonymous as boolean) ?? true;
	const denyLoggedIn = (to.meta.denyLoggedIn as boolean) ?? false;

	if (isLoggedIn && denyLoggedIn) {
		return navigateTo("/");
	}

	if (!isLoggedIn && !allowAnonymous) {
		return navigateTo("/auth/login");
	}
});
