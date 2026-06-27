export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAtUtc: string;
  email: string;
}

export interface AuthUser {
  email: string;
  token: string;
  expiresAtUtc: string;
}
