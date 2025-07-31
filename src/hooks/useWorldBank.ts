import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';


export interface WorldBankDataPoint {
  countryiso3code: string;
  date: string;            
  value: number | null;    
  unit: string;            
  obs_status: string;      
  decimal: number;         
}

export function useWorldBank (countryCode?: string) {
  return useApi<WorldBankDataPoint[]>(() => apiClient.getPopulation(countryCode), [countryCode]);
}