// 使用者資訊介面
export interface UserInfo {
  name: string;
  title: string;
  description: string;
  skills: string[];
  experience: string;
}

// 專案資訊介面
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

// 部落格文章介面
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  author: string;
} 