import { useRequest } from 'ahooks';
import type { BlogPost, BlogListResponse, BlogQueryParams, CreateBlogPostRequest } from '@/types';
import { 
  getBlogPosts, 
  getBlogPost, 
  getBlogPostBySlug,
  getFeaturedBlogPosts, 
  getBlogTags,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '@/services/api';

// 取得部落格文章列表
export const useBlogPosts = (params?: BlogQueryParams) => {
  return useRequest(
    () => getBlogPosts(params),
    {
      refreshDeps: [params?.page, params?.limit, params?.tag, params?.search],
      cacheKey: `blog-posts-${JSON.stringify(params)}`,
      staleTime: 5 * 60 * 1000, // 5分鐘快取
    }
  );
};

// 取得單篇部落格文章
export const useBlogPost = (id: string) => {
  return useRequest(
    () => getBlogPost(id),
    {
      ready: !!id,
      cacheKey: `blog-post-${id}`,
      staleTime: 10 * 60 * 1000, // 10分鐘快取
    }
  );
};

// 根據 slug 取得單篇部落格文章
export const useBlogPostBySlug = (slug: string) => {
  return useRequest(
    () => getBlogPostBySlug(slug),
    {
      ready: !!slug,
      cacheKey: `blog-post-slug-${slug}`,
      staleTime: 10 * 60 * 1000, // 10分鐘快取
    }
  );
};

// 取得精選文章
export const useFeaturedBlogPosts = () => {
  return useRequest(
    () => getFeaturedBlogPosts(),
    {
      cacheKey: 'featured-blog-posts',
      staleTime: 15 * 60 * 1000, // 15分鐘快取
    }
  );
};

// 取得所有標籤
export const useBlogTags = () => {
  return useRequest(
    () => getBlogTags(),
    {
      cacheKey: 'blog-tags',
      staleTime: 30 * 60 * 1000, // 30分鐘快取
    }
  );
};

// 建立新文章
export const useCreateBlogPost = () => {
  return useRequest(
    (data: CreateBlogPostRequest) => createBlogPost(data),
    {
      manual: true,
      onSuccess: () => {
        // 清除相關快取
        // 這裡可以實作更精細的快取管理
      },
    }
  );
};

// 更新文章
export const useUpdateBlogPost = () => {
  return useRequest(
    ({ id, data }: { id: string; data: Partial<CreateBlogPostRequest> }) => 
      updateBlogPost(id, data),
    {
      manual: true,
      onSuccess: (_, params) => {
        // 清除相關快取
        // 這裡可以實作更精細的快取管理
      },
    }
  );
};

// 刪除文章
export const useDeleteBlogPost = () => {
  return useRequest(
    (id: string) => deleteBlogPost(id),
    {
      manual: true,
      onSuccess: () => {
        // 清除相關快取
        // 這裡可以實作更精細的快取管理
      },
    }
  );
}; 