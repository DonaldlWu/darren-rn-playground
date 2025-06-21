import { Request, Response } from 'express';
import { BlogPost } from '@/types';
import { sendSuccess, sendNotFound, sendBadRequest } from '@/utils/response';

// Mock data - 之後可以替換為資料庫
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '從 Rails 到 React：我的技術轉型之路',
    content: `
# 從 Rails 到 React：我的技術轉型之路

## 前言

在過去的幾年裡，我從一個純後端的 Rails 開發者，逐漸轉型為全端開發者。這個過程充滿了挑戰，但也讓我學到了很多寶貴的經驗。

## 為什麼要轉型？

### 1. 技術趨勢的變化
現代 Web 開發越來越注重前端體驗，單頁應用（SPA）已經成為主流。

### 2. 更好的用戶體驗
React 等前端框架提供了更流暢的用戶交互體驗。

### 3. 職業發展需求
全端開發者在市場上更有競爭力。

## 學習過程

### 第一階段：基礎學習
- JavaScript ES6+ 語法
- React 基礎概念
- 組件化開發思維

### 第二階段：進階技術
- TypeScript 類型系統
- 狀態管理（Redux/Zustand）
- 現代化工具鏈

### 第三階段：實戰應用
- 實際專案開發
- 效能優化
- 最佳實踐

## 遇到的挑戰

1. **思維轉換**：從服務端渲染到客戶端渲染
2. **狀態管理**：複雜的狀態同步問題
3. **效能優化**：首屏載入速度優化
4. **測試策略**：前端測試的複雜性

## 收穫與成長

通過這次轉型，我不僅掌握了新的技術棧，更重要的是：

- 提升了問題解決能力
- 學會了從用戶角度思考
- 增強了技術視野
- 建立了持續學習的習慣

## 結語

技術轉型是一個持續的過程，關鍵在於保持開放的心態和持續學習的熱情。無論是 Rails 還是 React，都是優秀的技術，選擇適合的工具解決問題才是最重要的。

---

*這篇文章記錄了我從 Rails 到 React 的學習歷程，希望能對正在考慮技術轉型的開發者有所幫助。*
    `,
    excerpt: '分享我從 Ruby on Rails 後端開發者轉型為 React 全端開發者的學習歷程和心得體會。',
    tags: ['React', 'TypeScript', 'Rails', '全端開發', '技術轉型'],
    publishedAt: new Date('2024-01-15'),
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    title: 'TypeScript 在 React 專案中的最佳實踐',
    content: `
# TypeScript 在 React 專案中的最佳實踐

## 為什麼選擇 TypeScript？

TypeScript 為 JavaScript 添加了靜態類型檢查，能夠在開發階段就發現潛在的錯誤，提高程式碼品質。

## 核心概念

### 1. 類型定義
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
\`\`\`

### 2. 組件 Props 類型
\`\`\`typescript
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
}
\`\`\`

### 3. Hook 類型
\`\`\`typescript
const useUser = (id: string): [User | null, boolean, string | null] => {
  // implementation
};
\`\`\`

## 最佳實踐

### 1. 使用泛型
\`\`\`typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
\`\`\`

### 2. 嚴格模式
在 tsconfig.json 中啟用嚴格模式：
\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

### 3. 類型推斷
讓 TypeScript 自動推斷類型，減少手動類型註解。

## 常見陷阱

1. **any 類型**：避免使用 any，會失去類型檢查的優勢
2. **類型斷言**：謹慎使用，確保類型安全
3. **過度設計**：不要為了類型而類型，保持簡潔

## 工具推薦

- **ESLint**：程式碼品質檢查
- **Prettier**：程式碼格式化
- **TypeScript ESLint**：TypeScript 專用規則

## 結語

TypeScript 是一個強大的工具，正確使用能夠大幅提升開發效率和程式碼品質。關鍵在於找到適合專案的平衡點。
    `,
    excerpt: '分享在 React 專案中使用 TypeScript 的實用技巧和最佳實踐，幫助提升程式碼品質。',
    tags: ['TypeScript', 'React', '最佳實踐', '前端開發'],
    publishedAt: new Date('2024-01-20'),
    readTime: 6,
    featured: false
  },
  {
    id: '3',
    title: '現代化前端開發工具鏈配置指南',
    content: `
# 現代化前端開發工具鏈配置指南

## 工具鏈的重要性

現代前端開發離不開各種工具的配合，一個好的工具鏈能夠大幅提升開發效率。

## 核心工具

### 1. 建置工具
- **Vite**：快速的開發伺服器和建置工具
- **Webpack**：成熟的模組打包工具
- **Rollup**：適合函式庫的打包工具

### 2. 程式碼品質
- **ESLint**：JavaScript/TypeScript 程式碼檢查
- **Prettier**：程式碼格式化
- **Husky**：Git hooks 管理

### 3. 測試工具
- **Jest**：單元測試框架
- **React Testing Library**：React 組件測試
- **Cypress**：端到端測試

## 配置範例

### Vite + TypeScript + React
\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
\`\`\`

### ESLint 配置
\`\`\`json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
\`\`\`

## 自動化流程

### 1. 開發流程
1. 程式碼編輯
2. 自動格式化
3. 程式碼檢查
4. 自動測試

### 2. 部署流程
1. 程式碼提交
2. CI/CD 觸發
3. 自動測試
4. 建置部署

## 效能優化

### 1. 建置優化
- 程式碼分割
- 樹搖優化
- 快取策略

### 2. 開發體驗
- 熱重載
- 快速建置
- 錯誤提示

## 結語

好的工具鏈配置能夠讓開發過程更加順暢，但也要注意不要過度配置，保持簡潔實用。
    `,
    excerpt: '詳細介紹現代前端開發中常用的工具鏈配置，包括建置、測試、程式碼品質等各個方面。',
    tags: ['前端工具', 'Vite', 'ESLint', 'TypeScript', '開發效率'],
    publishedAt: new Date('2024-01-25'),
    readTime: 7,
    featured: false
  }
];

export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', tag, search } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    
    let filteredPosts = [...mockBlogPosts];
    
    // 標籤篩選
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(t => t.toLowerCase().includes((tag as string).toLowerCase()))
      );
    }
    
    // 搜尋功能
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // 分頁
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    const response = {
      posts: paginatedPosts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredPosts.length / limitNum),
        totalPosts: filteredPosts.length,
        hasNext: endIndex < filteredPosts.length,
        hasPrev: pageNum > 1
      }
    };
    
    sendSuccess(res, response, 'Blog posts retrieved successfully');
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    sendBadRequest(res, 'Failed to fetch blog posts');
  }
};

export const getBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = mockBlogPosts.find(p => p.id === id);
    
    if (!post) {
      sendNotFound(res, 'Blog post not found');
      return;
    }
    
    sendSuccess(res, post, 'Blog post retrieved successfully');
  } catch (error) {
    console.error('Error fetching blog post:', error);
    sendNotFound(res, 'Failed to fetch blog post');
  }
};

export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, excerpt, tags } = req.body;
    
    if (!title || !content || !excerpt) {
      sendBadRequest(res, 'Title, content, and excerpt are required');
      return;
    }
    
    const newPost: BlogPost = {
      id: (mockBlogPosts.length + 1).toString(),
      title,
      content,
      excerpt,
      tags: tags || [],
      publishedAt: new Date(),
      readTime: Math.ceil(content.split(' ').length / 200), // 估算閱讀時間
      featured: false
    };
    
    mockBlogPosts.push(newPost);
    
    sendSuccess(res, newPost, 'Blog post created successfully', 201);
  } catch (error) {
    console.error('Error creating blog post:', error);
    sendBadRequest(res, 'Failed to create blog post');
  }
};

export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const postIndex = mockBlogPosts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
      sendNotFound(res, 'Blog post not found');
      return;
    }
    
    const updatedPost: BlogPost = {
      ...mockBlogPosts[postIndex],
      ...updateData,
      id: mockBlogPosts[postIndex].id // 確保 ID 不被覆蓋
    };
    
    mockBlogPosts[postIndex] = updatedPost;
    
    sendSuccess(res, updatedPost, 'Blog post updated successfully');
  } catch (error) {
    console.error('Error updating blog post:', error);
    sendBadRequest(res, 'Failed to update blog post');
  }
};

export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const postIndex = mockBlogPosts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
      sendNotFound(res, 'Blog post not found');
      return;
    }
    
    mockBlogPosts.splice(postIndex, 1);
    
    sendSuccess(res, null, 'Blog post deleted successfully');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    sendBadRequest(res, 'Failed to delete blog post');
  }
};

export const getFeaturedPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const featuredPosts = mockBlogPosts.filter(post => post.featured);
    sendSuccess(res, featuredPosts, 'Featured posts retrieved successfully');
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    sendBadRequest(res, 'Failed to fetch featured posts');
  }
};

export const getTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTags = mockBlogPosts.reduce((tags: string[], post) => {
      post.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return tags;
    }, []);
    
    sendSuccess(res, allTags, 'Tags retrieved successfully');
  } catch (error) {
    console.error('Error fetching tags:', error);
    sendBadRequest(res, 'Failed to fetch tags');
  }
}; 