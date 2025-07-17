import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface IpInfo {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string; // "lat,lon" format
  org: string;
  postal: string;
  timezone: string;
  // Add other IP info properties as needed
}

export function useIpInfo() {
  return useApi<IpInfo>(() => apiClient.getIpInfo(), []);
}