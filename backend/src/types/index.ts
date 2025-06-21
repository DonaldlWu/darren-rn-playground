import { Request } from 'express';

// User related types
export interface User {
  id: number;
  name: string;
  title: string;
  description: string;
  experience: number;
  skills: string[];
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
  authorId: number;
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
  publishedAt?: string;
  readTime: number;
  featured: boolean;
  originalFileName?: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
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

// 擴展 Express Request 類型以支援檔案上傳
export interface UploadRequest extends Request {
  file?: any; // 簡化類型定義
} 