import type { User, Project, BlogPost, BlogListResponse, BlogQueryParams, CreateBlogPostRequest, UpdateBlogPostRequest } from '@/types';

// API基礎URL
const API_BASE_URL = 'http://localhost:3001/api/v1';

// 後端回應格式
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// 通用 API 請求函數
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || 'API request failed');
  }
  
  return result.data;
};

// 使用者相關API
export const getUserInfo = async (id: string): Promise<User> => {
  return apiRequest<User>(`/users/${id}`);
};

export const updateUserInfo = async (id: string, data: Partial<User>): Promise<User> => {
  return apiRequest<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// 專案相關API
export const getProjects = async (): Promise<Project[]> => {
  return apiRequest<Project[]>('/projects');
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  return apiRequest<Project[]>('/projects/featured');
};

// 部落格相關API
export const getBlogPosts = async (params?: BlogQueryParams): Promise<BlogListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.tag) queryParams.append('tag', params.tag);
  if (params?.search) queryParams.append('search', params.search);

  const queryString = queryParams.toString();
  const endpoint = `/blog${queryString ? `?${queryString}` : ''}`;
  
  return apiRequest<BlogListResponse>(endpoint);
};

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  return apiRequest<BlogPost>(`/blog/${id}`);
};

// 根據 slug 獲取部落格文章
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  return apiRequest<BlogPost>(`/blog/post/${slug}`);
};

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  return apiRequest<BlogPost[]>('/blog/featured');
};

export const getBlogTags = async (): Promise<string[]> => {
  return apiRequest<string[]>('/blog/tags');
};

export const createBlogPost = async (data: CreateBlogPostRequest): Promise<BlogPost> => {
  return apiRequest<BlogPost>('/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateBlogPost = async (id: string, data: Partial<CreateBlogPostRequest>): Promise<BlogPost> => {
  return apiRequest<BlogPost>(`/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  return apiRequest<void>(`/blog/${id}`, {
    method: 'DELETE',
  });
}; 