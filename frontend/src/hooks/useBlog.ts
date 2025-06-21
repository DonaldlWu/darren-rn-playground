import { useRequest } from 'ahooks';
import { blogApi } from '@/services/api';
import type { BlogPost } from '@/types';

// 獲取部落格文章列表的 hook
export function useBlogPosts() {
  const {
    data: blogPosts,
    loading,
    error,
    refresh
  } = useRequest(blogApi.getBlogPosts, {
    cacheKey: 'blogPosts',
    staleTime: 15 * 60 * 1000, // 15 分鐘快取
    retryCount: 2,
    retryInterval: 2000,
    onError: (error: any) => {
      console.error('Failed to fetch blog posts:', error);
    }
  });

  return {
    blogPosts,
    loading,
    error,
    refresh
  };
}

// 獲取單個部落格文章的 hook
export function useBlogPost(id: string) {
  const {
    data: blogPost,
    loading,
    error,
    refresh
  } = useRequest(() => blogApi.getBlogPost(id), {
    cacheKey: `blogPost-${id}`,
    staleTime: 10 * 60 * 1000,
    retryCount: 3,
    retryInterval: 1000,
    ready: !!id, // 只有當 id 存在時才執行
    onError: (error: any) => {
      console.error(`Failed to fetch blog post ${id}:`, error);
    }
  });

  return {
    blogPost,
    loading,
    error,
    refresh
  };
} 