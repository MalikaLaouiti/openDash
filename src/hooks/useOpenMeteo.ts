// hooks/useOpenMeteo.ts
import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

export interface OpenMeteoData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string; // "iso8601"
    temperature_2m_max: string; // "°C"
    temperature_2m_min: string; // "°C"
    precipitation_sum: string; // "mm"
  };
  daily: {
    time: string[]; // Dates au format ISO
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
}


export function useOpenMeteo(lat: number, lon: number) {
  return useApi<OpenMeteoData>(() => apiClient.getOpenMeteo(lat, lon), [lat, lon]);
}