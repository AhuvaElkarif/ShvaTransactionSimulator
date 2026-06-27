import { apiClient } from './client';
import type { AuthCredentials, AuthResponse } from '../types/auth';

export const signup = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/signup', credentials);
  return data;
};

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
  return data;
};
