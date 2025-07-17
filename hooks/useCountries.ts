import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  // Add other country properties as needed
}

export function useCountries() {
  return useApi<Country[]>(() => apiClient.getCountries(), []);
}