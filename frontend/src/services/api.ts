import type { User, Project, BlogPost, BlogListResponse, BlogQueryParams, CreateBlogPostRequest, UpdateBlogPostRequest } from '@/types';

// 模擬API基礎URL
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

// 通用錯誤處理
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 模擬API響應包裝器
const mockApiResponse = async <T>(data: T, delayMs: number = 1000): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, delayMs));
  
  // 模擬隨機錯誤 (10% 機率)
  if (Math.random() < 0.1) {
    throw new ApiError(500, 'Internal Server Error');
  }
  
  return data;
};

// 使用者相關API
export const getUserInfo = async (id: string): Promise<User> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return {
    id: '1',
    name: 'Darren Wu',
    title: 'Full Stack Developer',
    description: 'Passionate full-stack developer with expertise in modern web technologies. From Rails to React, I love creating high-quality web applications and continuously learning new technologies.',
    experience: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Ruby on Rails', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    email: 'darren@example.com',
    avatar: 'https://via.placeholder.com/150'
  };
};

export const updateUserInfo = async (id: string, data: Partial<User>): Promise<User> => {
  return apiRequest<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// 專案相關API
export const getProjects = async (): Promise<Project[]> => {
  // Mock data
  return [
    {
      id: '1',
      title: '個人作品集網站',
      description: '使用 React + TypeScript + Ant Design 建立的現代化個人作品集網站',
      technologies: ['React', 'TypeScript', 'Ant Design', 'Vite'],
      imageUrl: 'https://via.placeholder.com/300x200',
      githubUrl: 'https://github.com/darren/portfolio',
      liveUrl: 'https://darren-portfolio.com',
      featured: true,
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: '電商平台',
      description: '全端電商平台，包含用戶管理、商品管理、訂單處理等功能',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      imageUrl: 'https://via.placeholder.com/300x200',
      githubUrl: 'https://github.com/darren/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      featured: true,
      createdAt: new Date('2023-12-01')
    }
  ];
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