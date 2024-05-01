import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		user: {
			userId: JSON.parse(localStorage.getItem("electro-user"))?.userId ?? null,
			jwtToken: JSON.parse(localStorage.getItem('electro-user'))?.jwtToken ?? null,
			refreshToken: JSON.parse(localStorage.getItem('electro-user'))?.refreshToken ?? null,
		},
	}),
	getters: {
		getStore(state) {
			return state;
		},
		getAuthHeader(state) {
			if (this.isLoggedIn) {
				return { Authorization: `Bearer ${state.user.jwtToken}` };
			}
			return {};
		},
		isLoggedIn(state) {
			if (state.user.jwtToken && state.user.refreshToken) {
				return true;
			}
			return false;
		},
	},
	actions: {
		clearStore() {
			this.user = {
				jwtToken: null,
				refreshToken: null,
				userId: null
			};
			localStorage.removeItem("electro-user", JSON.stringify(this.user));
		},
		saveStore(jwtToken, refreshToken, userId) {
			this.user = {
				jwtToken,
				refreshToken,
				userId
			};
			localStorage.setItem("electro-user", JSON.stringify(this.user));
		},
	},
});
