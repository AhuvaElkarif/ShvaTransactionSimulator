import { QueryClient } from '@tanstack/react-query';

/** Shared React Query client with sensible defaults for this app. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
    },
  },
});
