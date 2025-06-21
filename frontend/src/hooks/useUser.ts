import { useRequest } from 'ahooks';
import { userApi } from '@/services/api';
import type { UserInfo } from '@/types';

// 獲取使用者資訊的 hook
export function useUser() {
  const {
    data: userInfo,
    loading,
    error,
    refresh
  } = useRequest(userApi.getUserInfo, {
    // 快取時間 5 分鐘
    cacheKey: 'userInfo',
    staleTime: 5 * 60 * 1000,
    // 錯誤重試
    retryCount: 3,
    retryInterval: 1000,
    // 錯誤處理
    onError: (error) => {
      console.error('Failed to fetch user info:', error);
    }
  });

  return {
    userInfo,
    loading,
    error,
    refresh
  };
}

// 更新使用者資訊的 hook
export function useUpdateUser() {
  const {
    run: updateUser,
    loading: updating,
    error: updateError
  } = useRequest(userApi.updateUserInfo, {
    manual: true, // 手動觸發
    // 成功後刷新使用者資訊
    onSuccess: () => {
      // 這裡可以觸發其他操作，比如刷新快取
      console.log('User info updated successfully');
    },
    onError: (error) => {
      console.error('Failed to update user info:', error);
    }
  });

  return {
    updateUser,
    updating,
    updateError
  };
} 