// hooks/useWeather.ts
import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface WeatherData {
  // Define your weather data structure here
  temperature: number;
  humidity: number;
  description: string;
  city: string;
  // Add other weather properties as needed
}

export function useWeather(city: string = 'Monastir') {
  return useApi<WeatherData>(() => apiClient.getWeather(city), [city]);
}
