import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  // Add other crypto properties as needed
}

export function useCrypto() {
  return useApi<CryptoData[]>(() => apiClient.getCryptoData(), []);
}