// hooks/useOpenMeteo.ts
import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

export interface OpenMeteoData {
  latitude: number;
  longitude: number;
  timezone: string;
  currentWeather: {
    temperature: number;
    windSpeed: number;
    windDirection: number;
    weatherCode: number;
    isDay: number;
  };
  daily: number; // tu peux préciser le type si tu connais la structure
  hourly: number;
}

export function useOpenMeteo(lat: number, lon: number) {
  return useApi<OpenMeteoData>(() => apiClient.getOpenMeteo(lat, lon), [lat, lon]);
}