import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface GithubOrg {
  login: string
  id: number
  name: string
  email: string
  location: string
  public_repos: number
  followers: number
  is_verified: boolean
  avatar_url: string
  description?: string
  html_url: string
}


export function useGithubOrg(org: string = 'vercel') {
  return useApi<GithubOrg>(() => apiClient.getGithubRepos(org), [org]);
}