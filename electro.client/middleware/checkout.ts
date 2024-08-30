export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();
	const { $toast } = useNuxtApp();
	if (!authStore.isLoggedIn) {
        // trzeba cos takiego zeby nie dalo sie skakac po etapach -  zeby z url nie dalo sie przechodzic
        $toast.error("Tylko zalogowani mogą dokonywać zamówień");
		return navigateTo("/auth/login");
	}
	return;
});
