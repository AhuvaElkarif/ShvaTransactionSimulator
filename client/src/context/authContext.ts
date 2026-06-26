import { createContext } from 'react';
import type { AuthResponse, AuthUser } from '../types/auth';

/** Value exposed by the authentication context. */
export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** Persists a successful auth response as the active session. */
  setSession: (response: AuthResponse) => void;
  /** Clears the active session. */
  logout: () => void;
}

/** localStorage key under which the session is persisted. */
export const AUTH_STORAGE_KEY = 'shva.auth';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
