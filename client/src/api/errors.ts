import { AxiosError } from 'axios';

/** Shape of the RFC 7807 problem responses the API returns. */
interface ProblemDetails {
  title?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

/**
 * Extracts a human-readable message from an API error, preferring validation messages, then the
 * problem detail/title, and finally a generic fallback.
 */
export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong.'): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ProblemDetails | undefined;
    if (data?.errors) {
      const first = Object.values(data.errors).flat()[0];
      if (first) return first;
    }
    return data?.detail ?? data?.title ?? error.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
};
