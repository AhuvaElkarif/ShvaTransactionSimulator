import { useQuery } from '@tanstack/react-query';
import { fetchRegions } from '../api/regions';

/** Loads the supported regions (cached aggressively — they rarely change). */
export const useRegions = () =>
  useQuery({
    queryKey: ['regions'],
    queryFn: fetchRegions,
    staleTime: 1000 * 60 * 60,
  });
