import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

interface StackOverflowQuestion {
  question_id: number;
  title: string;
  tags: string[];
  score: number;
  view_count: number;
  answer_count: number;
  creation_date: number;
  link: string;
  owner: {
    user_id: number;
    display_name: string;
    reputation: number;
  };
  // Add other Stack Overflow question properties as needed
}

interface StackOverflowResponse {
  items: StackOverflowQuestion[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export function useStackOverflow(tag: string = 'javascript') {
  return useApi<StackOverflowResponse>(() => apiClient.getStackOverflowQuestions(tag), [tag]);
}