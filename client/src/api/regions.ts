import { apiClient } from './client';
import type { Region } from '../types/region';

export const fetchRegions = async (): Promise<Region[]> => {
  const { data } = await apiClient.get<Region[]>('/api/regions');
  return data;
};
