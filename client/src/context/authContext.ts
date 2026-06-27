import { createContext } from 'react';
import type { AuthResponse, AuthUser } from '../types/auth';

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (response: AuthResponse) => void;
  logout: () => void;
}

export const AUTH_STORAGE_KEY = 'shva.auth';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
