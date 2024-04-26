import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    userId: null,
    jwtToken: null,
    refreshToken: null,
  }),
  getters: {
    getStore(state){
      return state
    },
    getToken(state){
      return state.jwtToken
    }
  },
  actions: {
    clearStore() {
      this.userId = null;
      this.jwtToken = null;
      this.refreshToken = null;
      localStorage.setItem("jwtToken", null);
      localStorage.setItem("refreshToken", null);
    },
    saveStore(jwtToken, refreshToken, userId) {
      this.userId = userId;
      this.jwtToken = jwtToken;
      this.refreshToken = refreshToken;
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
  },
});
