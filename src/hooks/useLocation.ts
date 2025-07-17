// hooks/useLocation.ts
import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface LocationData {
  // Define your location data structure here
  name: string;
  country: string;
  lat: number;
  lon: number;
  // Add other location properties as needed
}

export function useLocation(query: string = 'Monastir') {
  return useApi<LocationData>(() => apiClient.getLocation(query), [query]);
}