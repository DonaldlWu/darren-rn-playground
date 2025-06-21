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
  publishedAt: Date;
  readTime: number;
  featured: boolean;
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