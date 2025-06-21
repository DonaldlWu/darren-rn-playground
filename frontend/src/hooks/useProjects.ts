import { useRequest } from 'ahooks';
import { getProjects } from '@/services/api';
import type { Project } from '@/types';

// 獲取專案列表的 hook
export const useProjects = () => {
  const {
    data: projects,
    loading,
    error,
    refresh
  } = useRequest(getProjects, {
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
};

// 獲取單個專案詳情的 hook (目前 API 中沒有單個專案端點，使用篩選)
export const useProject = (id: string) => {
  const {
    data: projects,
    loading,
    error,
    refresh
  } = useRequest(getProjects, {
    cacheKey: `project-${id}`,
    staleTime: 5 * 60 * 1000,
    retryCount: 3,
    retryInterval: 1000,
    ready: !!id, // 只有當 id 存在時才執行
    onError: (error: any) => {
      console.error(`Failed to fetch project ${id}:`, error);
    }
  });

  // 從專案列表中篩選出指定 ID 的專案
  const project = projects?.find(p => p.id === id);

  return {
    project,
    loading,
    error,
    refresh
  };
}; 