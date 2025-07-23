// hooks/useLocation.ts
import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

export interface  LocationData {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string];
  lat: string; // as string
  lon: string; // as string
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
}


export function useLocation(query: string = 'Monastir') {
  return useApi<LocationData>(() => apiClient.getLocation(query), [query]);
}