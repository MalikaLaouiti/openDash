import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stars: number;
  forks: number;
  language: string;
  created_at: string;
  updated_at: string;
  // Add other GitHub repo properties as needed
}

export function useGithub(user: string = 'vercel') {
  return useApi<GithubRepo[]>(() => apiClient.getGithubRepos(user), [user]);
}