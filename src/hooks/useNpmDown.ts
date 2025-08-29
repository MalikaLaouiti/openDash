import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface DownloadData {
  downloads: number
  day: string
}

interface NpmResponse {
  start: string
  end: string
  package: string
  downloads: DownloadData[]
}

export function useNpmDown (pkg?: string) {
  return useApi<NpmResponse>(() => apiClient.getNpmPackage(pkg), [pkg]);
}