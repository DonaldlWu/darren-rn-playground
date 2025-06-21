import { useRequest } from 'ahooks';
import { getUserInfo, updateUserInfo } from '@/services/api';
import type { User } from '@/types';

// 獲取使用者資訊的 hook
export const useUser = () => {
  const {
    data: userInfo,
    loading,
    error,
    refresh
  } = useRequest(() => getUserInfo('1'), {
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
};

// 更新使用者資訊的 hook
export const useUpdateUser = () => {
  const {
    run: updateUser,
    loading: updating,
    error: updateError
  } = useRequest(
    ({ id, data }: { id: string; data: Partial<User> }) => updateUserInfo(id, data),
    {
      manual: true, // 手動觸發
      // 成功後刷新使用者資訊
      onSuccess: () => {
        // 這裡可以觸發其他操作，比如刷新快取
        console.log('User info updated successfully');
      },
      onError: (error) => {
        console.error('Failed to update user info:', error);
      }
    }
  );

  return {
    updateUser,
    updating,
    updateError
  };
}; 