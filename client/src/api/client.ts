import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5080';

/** Shared axios instance pointed at the .NET Web API. */
export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// The auth token is supplied lazily by the AuthProvider, avoiding a circular import between
// the API layer and React state.
let getToken: () => string | null = () => null;

/** Registers the function the request interceptor uses to read the current bearer token. */
export const setAuthTokenProvider = (provider: () => string | null): void => {
  getToken = provider;
};

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
