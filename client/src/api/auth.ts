import { apiClient } from './client';
import type { AuthCredentials, AuthResponse } from '../types/auth';

/** POST /api/auth/signup — register and receive a bearer token. */
export const signup = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/signup', credentials);
  return data;
};

/** POST /api/auth/login — authenticate and receive a bearer token. */
export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
  return data;
};
