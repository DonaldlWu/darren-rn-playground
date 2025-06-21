import { useRequest } from 'ahooks';
import { projectApi } from '@/services/api';
import type { Project } from '@/types';

// 獲取專案列表的 hook
export function useProjects() {
  const {
    data: projects,
    loading,
    error,
    refresh
  } = useRequest(projectApi.getProjects, {
    cacheKey: 'projects',
    staleTime: 10 * 60 * 1000, // 10 分鐘快取
    retryCount: 2,
    retryInterval: 2000,
    onError: (error: any) => {
      console.error('Failed to fetch projects:', error);
    }
  });

  return {
    projects,
    loading,
    error,
    refresh
  };
}

// 獲取單個專案詳情的 hook
export function useProject(id: string) {
  const {
    data: project,
    loading,
    error,
    refresh
  } = useRequest(() => projectApi.getProject(id), {
    cacheKey: `project-${id}`,
    staleTime: 5 * 60 * 1000,
    retryCount: 3,
    retryInterval: 1000,
    ready: !!id, // 只有當 id 存在時才執行
    onError: (error: any) => {
      console.error(`Failed to fetch project ${id}:`, error);
    }
  });

  return {
    project,
    loading,
    error,
    refresh
  };
} 