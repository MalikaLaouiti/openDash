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


export function useLocation(lat?: number, lon?: number) {
  const shouldFetch = lat !== undefined && lon !== undefined;

  return useApi<LocationData>(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!shouldFetch) return Promise.resolve(null as any); // or throw, or whatever fits your logic
      return apiClient.getLocation([lat!, lon!]);
    },
    [lat, lon]
  );
}
