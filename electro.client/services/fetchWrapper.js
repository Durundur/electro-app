import { AuthService } from "./authService";

export const FetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

const fetch = (url, options = {}) =>
  $fetch.raw(`https://localhost:5555/${url}`, options);

function request(method) {
  return async (url, body) => {
    const requestOptions = {
      method,
      headers: {},
      body: body ? body : null,
    };
    try {
      const response = await fetch(url, requestOptions);
      return { ...response._data, status: response.status };
    } catch (error) {
      if ([401, 403].includes(error.status)) {
        AuthService.logout();
      }
      return { ...error.data, status: error.status };
    }
  };
}
