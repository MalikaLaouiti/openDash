// hooks/useOpenMeteo.ts
import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface OpenMeteoData {
  // Define your Open Meteo data structure here
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  // Add other Open Meteo properties as needed
}

export function useOpenMeteo(lat: number, lon: number) {
  return useApi<OpenMeteoData>(() => apiClient.getOpenMeteo(lat, lon), [lat, lon]);
}