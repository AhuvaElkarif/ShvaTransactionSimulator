/** Credentials for login / signup. */
export interface AuthCredentials {
  email: string;
  password: string;
}

/** Successful authentication response from the API. */
export interface AuthResponse {
  token: string;
  expiresAtUtc: string;
  email: string;
}

/** The authenticated user as held in client state. */
export interface AuthUser {
  email: string;
  token: string;
  expiresAtUtc: string;
}
