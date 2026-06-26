import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { setAuthTokenProvider } from '../api/client';
import type { AuthResponse, AuthUser } from '../types/auth';
import { AUTH_STORAGE_KEY, AuthContext, type AuthContextValue } from './authContext';

/** Reads a non-expired session from storage, if present. */
const loadStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (new Date(parsed.expiresAtUtc).getTime() <= Date.now()) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

/**
 * Holds the authenticated session and keeps the API client's bearer token in sync. The token is
 * read lazily by the axios interceptor through a ref, so requests always use the latest value.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(loadStoredUser);

  const userRef = useRef(user);
  userRef.current = user;

  useEffect(() => {
    setAuthTokenProvider(() => userRef.current?.token ?? null);
  }, []);

  const setSession = useCallback((response: AuthResponse) => {
    const next: AuthUser = {
      email: response.email,
      token: response.token,
      expiresAtUtc: response.expiresAtUtc,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
    setUser(next);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, setSession, logout }),
    [user, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
