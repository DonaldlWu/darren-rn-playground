// 使用者資訊介面
export interface UserInfo {
  name: string;
  title: string;
  description: string;
  skills: string[];
  experience: string;
}

// User related types
export interface User {
  id: string;
  name: string;
  title: string;
  description: string;
  experience: number;
  skills: string[];
  email: string;
  avatar?: string;
}

// Project related types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
}

// Blog related types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  slug: string;
  status: string;
  publishedAt?: Date;
  readTime: number;
  featured: boolean;
  originalFileName?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
}

// Blog API Response types
export interface BlogListResponse {
  posts: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Request types
export interface CreateUserRequest {
  name: string;
  title: string;
  description: string;
  experience: number;
  skills: string[];
  email: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string;
}

// Blog Request types
export interface CreateBlogPostRequest {
  title: string;
  content: string;
  excerpt: string;
  tags?: string[];
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {
  id: string;
}

// Blog Query types
export interface BlogQueryParams {
  page?: number;
  limit?: number;
  tag?: string;
  search?: string;
} 