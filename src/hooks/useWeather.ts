import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
}
export function useWeather(city: string = 'Monastir') {
  return useApi<WeatherData>(() => apiClient.getWeather(city), [city]);
}
