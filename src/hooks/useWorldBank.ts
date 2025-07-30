import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

export interface WorldBankResponse {
  [0]: WorldBankMetadata;
  [1]: WorldBankDataPoint[];
}

export interface WorldBankMetadata {
  page: number;
  pages: number;
  per_page: string;
  total: number;
  sourceid: string;
  lastupdated: string;
}

export interface WorldBankDataPoint {
  countryiso3code: string;
  date: string;            
  value: number | null;    
  unit: string;            
  obs_status: string;      
  decimal: number;         
}

export function useWorldBank (countryCode?: string) {
  
  return useApi<WorldBankDataPoint>(() => apiClient.getPopulation(countryCode), [countryCode]);
}