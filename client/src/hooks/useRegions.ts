import { useQuery } from '@tanstack/react-query';
import { fetchRegions } from '../api/regions';

export const useRegions = () =>
  useQuery({
    queryKey: ['regions'],
    queryFn: fetchRegions,
    staleTime: 1000 * 60 * 60,
  });
