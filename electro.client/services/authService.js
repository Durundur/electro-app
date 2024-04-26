import { FetchWrapper } from "./fetchWrapper";
import { useAuthStore } from "../stores/authStore";


export const AuthService = {
  login,
  register,
  logout,
  refreshToken,
  getToken,
  isLoggedIn,
};

const authStore = useAuthStore();

async function login(credentials) {
  const response = await FetchWrapper.post("api/auth/login", credentials);
  if (response.success && response.jwtToken && response.refreshToken) {
    authStore.saveStore(response.jwtToken, response.refreshToken, null);
    //success toast
  }
  //error toast
}

async function register() {
  const response = await FetchWrapper.post("api/auth/register", credentials);
  if (response.success && response.jwtToken && response.refreshToken) {
    authStore.saveStore(response.jwtToken, response.refreshToken, null);
    //success toast
  }
  //error toast
}

function logout() {
  authStore.clearStore();
}

async function refreshToken() {
  const response = await FetchWrapper.post(
    "api/auth/refreshToken",
    authStore.getStore()
  );
  if (response.success && response.jwtToken && response.refreshToken) {
    authStore.saveStore(response.jwtToken, response.refreshToken, null);
  } else {
    logout();
    //redirect
  }
}

function getToken() {
  if (isLoggedIn()) {
    return authStore.getToken();
  }
  return null;
}

function isLoggedIn() {
  const store = authStore.getStore();
  if (store.jwtToken && store.refreshToken) {
    return true;
  }
  return false;
}
