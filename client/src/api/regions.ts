import { apiClient } from './client';
import type { Region } from '../types/region';

/** GET /api/regions — the supported regions for the selector. */
export const fetchRegions = async (): Promise<Region[]> => {
  const { data } = await apiClient.get<Region[]>('/api/regions');
  return data;
};
