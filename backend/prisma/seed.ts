import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 生成 slug 的函數
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  console.log('開始初始化資料庫...');

  // 創建使用者
  const user = await prisma.user.upsert({
    where: { email: 'darren@example.com' },
    update: {},
    create: {
      name: 'Darren Wu',
      title: 'Full Stack Developer',
      description: 'Passionate full-stack developer with expertise in modern web technologies. From Rails to React, I love creating high-quality web applications and continuously learning new technologies.',
      experience: 5,
      skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Ruby on Rails', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
      email: 'darren@example.com',
      avatar: 'https://via.placeholder.com/150'
    },
  });

  console.log('使用者已創建:', user.name);

  // 創建專案
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'project-1' },
      update: {},
      create: {
        id: 'project-1',
        title: '個人作品集網站',
        description: '使用 React + TypeScript + Ant Design 建立的現代化個人作品集網站',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Vite'],
        imageUrl: 'https://via.placeholder.com/300x200',
        githubUrl: 'https://github.com/darren/portfolio',
        liveUrl: 'https://darren-portfolio.com',
        featured: true,
        authorId: user.id
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-2' },
      update: {},
      create: {
        id: 'project-2',
        title: '電商平台',
        description: '全端電商平台，包含用戶管理、商品管理、訂單處理等功能',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        imageUrl: 'https://via.placeholder.com/300x200',
        githubUrl: 'https://github.com/darren/ecommerce',
        liveUrl: 'https://ecommerce-demo.com',
        featured: true,
        authorId: user.id
      },
    }),
  ]);

  console.log('專案已創建:', projects.length, '個');

  // 創建部落格文章
  const blogPosts = await Promise.all([
    prisma.blogPost.upsert({
      where: { id: 'post-1' },
      update: {},
      create: {
        id: 'post-1',
        title: '從 Rails 到 React：我的技術轉型之路',
        content: `# 從 Rails 到 React：我的技術轉型之路

## 引言

在過去的幾年裡，我經歷了從 Ruby on Rails 到 React 的技術轉型。這篇文章將分享我的學習歷程、遇到的挑戰以及獲得的收穫。

## 為什麼要轉型？

### Rails 的優勢
- 快速開發
- 約定優於配置
- 豐富的生態系統

### React 的吸引力
- 組件化開發
- 更好的用戶體驗
- 更靈活的架構

## 學習歷程

### 第一階段：基礎學習
1. JavaScript 基礎
2. ES6+ 語法
3. React 核心概念

### 第二階段：進階應用
1. TypeScript 整合
2. 狀態管理
3. 路由配置

## 遇到的挑戰

### 1. 思維轉換
從服務端渲染到客戶端渲染需要思維上的轉換。

### 2. 工具鏈複雜性
現代前端工具鏈比 Rails 更複雜。

### 3. 性能優化
需要考慮打包大小、懶加載等問題。

## 收穫與成長

### 技術能力提升
- 更深入理解前端技術
- 掌握現代開發工具
- 提升程式碼品質

### 職業發展
- 拓寬技術棧
- 增加就業機會
- 提升競爭力

## 結語

技術轉型是一個持續的過程，重要的是保持學習的熱情和開放的態度。`,
        excerpt: '分享我從 Ruby on Rails 轉向 React 開發的學習歷程和心得體會。',
        tags: ['React', 'Rails', '技術轉型', '全端開發'],
        readTime: 8,
        featured: true,
        authorId: user.id,
        slug: generateSlug('從 Rails 到 React：我的技術轉型之路')
      },
    }),
    prisma.blogPost.upsert({
      where: { id: 'post-2' },
      update: {},
      create: {
        id: 'post-2',
        title: 'TypeScript 在 React 專案中的最佳實踐',
        content: `# TypeScript 在 React 專案中的最佳實踐

## 為什麼選擇 TypeScript？

TypeScript 為 JavaScript 添加了靜態類型檢查，能夠在開發階段就發現潛在的錯誤。

## 基本配置

### 安裝依賴
\`\`\`bash
npm install typescript @types/react @types/react-dom
\`\`\`

### tsconfig.json 配置
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
\`\`\`

## 組件類型定義

### 函數組件
\`\`\`typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
\`\`\`

## 狀態管理

### useState 類型推斷
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);
\`\`\`

## 結語

TypeScript 能夠大幅提升開發體驗和程式碼品質，值得在專案中採用。`,
        excerpt: '詳細介紹在 React 專案中使用 TypeScript 的最佳實踐和配置方法。',
        tags: ['TypeScript', 'React', '最佳實踐', '前端開發'],
        readTime: 6,
        featured: false,
        authorId: user.id,
        slug: generateSlug('TypeScript 在 React 專案中的最佳實踐')
      },
    }),
  ]);

  console.log('部落格文章已創建:', blogPosts.length, '篇');

  console.log('資料庫初始化完成！');
}

main()
  .catch((e) => {
    console.error('初始化失敗:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 