import type { UserInfo, Project, BlogPost } from '@/types';

// 模擬API基礎URL
const API_BASE_URL = 'https://api.example.com';

// 模擬網路延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 通用錯誤處理
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 模擬API響應包裝器
const mockApiResponse = async <T>(data: T, delayMs: number = 1000): Promise<T> => {
  await delay(delayMs);
  
  // 模擬隨機錯誤 (10% 機率)
  if (Math.random() < 0.1) {
    throw new ApiError(500, 'Internal Server Error');
  }
  
  return data;
};

// 使用者相關API
export const userApi = {
  // 獲取使用者資訊
  getUserInfo: async (): Promise<UserInfo> => {
    const mockData: UserInfo = {
      name: 'Darren',
      title: 'Full Stack Developer',
      description: '熱愛程式開發，專注於React、TypeScript和現代化Web技術',
      skills: ['React', 'TypeScript', 'Node.js', 'Rails', 'Docker'],
      experience: '5+ years'
    };
    
    return mockApiResponse(mockData);
  },

  // 更新使用者資訊
  updateUserInfo: async (userInfo: Partial<UserInfo>): Promise<UserInfo> => {
    const mockData: UserInfo = {
      name: 'Darren',
      title: 'Full Stack Developer',
      description: '熱愛程式開發，專注於React、TypeScript和現代化Web技術',
      skills: ['React', 'TypeScript', 'Node.js', 'Rails', 'Docker'],
      experience: '5+ years',
      ...userInfo
    };
    
    return mockApiResponse(mockData, 800);
  }
};

// 專案相關API
export const projectApi = {
  // 獲取專案列表
  getProjects: async (): Promise<Project[]> => {
    const mockData: Project[] = [
      {
        id: '1',
        title: '個人網站',
        description: '使用React + TypeScript建立的現代化個人網站',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Vite'],
        githubUrl: 'https://github.com/darren/personal-website',
        liveUrl: 'https://darren.dev'
      },
      {
        id: '2',
        title: '電商平台',
        description: '基於Rails的全功能電商平台',
        technologies: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Docker'],
        githubUrl: 'https://github.com/darren/ecommerce'
      }
    ];
    
    return mockApiResponse(mockData);
  },

  // 獲取單個專案詳情
  getProject: async (id: string): Promise<Project> => {
    const mockData: Project = {
      id,
      title: '個人網站',
      description: '使用React + TypeScript建立的現代化個人網站',
      technologies: ['React', 'TypeScript', 'Ant Design', 'Vite'],
      githubUrl: 'https://github.com/darren/personal-website',
      liveUrl: 'https://darren.dev'
    };
    
    return mockApiResponse(mockData, 500);
  }
};

// 部落格相關API
export const blogApi = {
  // 獲取部落格文章列表
  getBlogPosts: async (): Promise<BlogPost[]> => {
    const mockData: BlogPost[] = [
      {
        id: '1',
        title: 'React 18 新功能介紹',
        content: 'React 18 帶來了許多令人興奮的新功能...',
        excerpt: 'React 18 帶來了許多令人興奮的新功能，包括自動批處理、Suspense 改進等。',
        publishedAt: '2024-01-15',
        tags: ['React', 'JavaScript', '前端'],
        author: 'Darren'
      },
      {
        id: '2',
        title: 'TypeScript 最佳實踐',
        content: 'TypeScript 是一個強大的類型系統...',
        excerpt: 'TypeScript 是一個強大的類型系統，本文將分享一些最佳實踐。',
        publishedAt: '2024-01-10',
        tags: ['TypeScript', 'JavaScript', '開發'],
        author: 'Darren'
      }
    ];
    
    return mockApiResponse(mockData);
  },

  // 獲取單個部落格文章
  getBlogPost: async (id: string): Promise<BlogPost> => {
    const mockData: BlogPost = {
      id,
      title: 'React 18 新功能介紹',
      content: 'React 18 帶來了許多令人興奮的新功能，包括自動批處理、Suspense 改進、新的 Hooks 等。這些功能將大大改善開發體驗和應用性能。',
      excerpt: 'React 18 帶來了許多令人興奮的新功能，包括自動批處理、Suspense 改進等。',
      publishedAt: '2024-01-15',
      tags: ['React', 'JavaScript', '前端'],
      author: 'Darren'
    };
    
    return mockApiResponse(mockData, 500);
  }
}; 