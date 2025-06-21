# Darren's Personal Website - Monorepo

一個使用現代化技術棧建立的個人網站 Monorepo，包含前端、後端和資料庫。

## 專案結構

```
darren-rn-playground/
├── frontend/          # React + TypeScript 前端
├── backend/           # Node.js + Express + Prisma 後端
├── shared/            # 共用類型定義
├── docker-compose.yml # Docker 服務配置
├── DATABASE_SETUP.md  # 資料庫設置指南
└── README.md          # 專案說明
```

## 技術棧

### 前端 (Frontend)
- **框架**: React 18 + TypeScript
- **建構工具**: Vite
- **UI 框架**: Ant Design
- **Hooks 庫**: ahooks
- **路由**: React Router
- **樣式**: CSS3 + 漸層設計

### 後端 (Backend)
- **框架**: Node.js + Express + TypeScript
- **資料庫**: PostgreSQL 15
- **ORM**: Prisma
- **容器化**: Docker & Docker Compose
- **認證**: JWT (計劃中)

## 🚀 快速開始

### 使用 Docker (推薦)

#### 1. 啟動所有服務
```bash
# 在專案根目錄執行
docker-compose up -d
```

#### 2. 初始化資料庫
```bash
# 進入後端容器
docker exec -it darren_portfolio_backend sh

# 執行資料庫遷移
npx prisma migrate dev

# 初始化測試資料
npm run db:seed

# 退出容器
exit
```

#### 3. 查看服務狀態
```bash
# 查看所有容器狀態
docker-compose ps

# 查看日誌
docker-compose logs -f backend
docker-compose logs -f frontend
```

#### 4. 訪問應用
- **前端**: http://localhost:5173
- **後端 API**: http://localhost:3001/api/v1
- **Prisma Studio**: http://localhost:5555 (可選)

### 本地開發

#### 前端開發
```bash
# 進入前端目錄
cd frontend

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

#### 後端開發
```bash
# 進入後端目錄
cd backend

# 安裝依賴
npm install

# 設置環境變數
cp .env.example .env

# 生成 Prisma Client
npm run db:generate

# 啟動開發伺服器
npm run dev
```

## 🛠️ Docker 開發流程

### 常用命令

```bash
# 啟動所有服務
docker-compose up -d

# 停止所有服務
docker-compose down

# 重新建置並啟動
docker-compose up -d --build

# 查看服務日誌
docker-compose logs -f [service_name]

# 進入容器
docker exec -it darren_portfolio_backend sh
docker exec -it darren_portfolio_frontend sh

# 重啟特定服務
docker-compose restart backend
docker-compose restart frontend
```

### 資料庫操作

```bash
# 進入後端容器
docker exec -it darren_portfolio_backend sh

# 資料庫遷移
npx prisma migrate dev

# 生成 Prisma Client
npx prisma generate

# 初始化測試資料
npm run db:seed

# 啟動 Prisma Studio
npm run db:studio

# 查看資料庫狀態
npx prisma db pull
```

### 開發腳本

```bash
# 後端 package.json 中的可用腳本
npm run dev          # 啟動開發伺服器
npm run build        # 建置生產版本
npm run start        # 啟動生產版本
npm run db:generate  # 生成 Prisma Client
npm run db:migrate   # 執行資料庫遷移
npm run db:seed      # 初始化測試資料
npm run db:studio    # 啟動 Prisma Studio
```

## 📊 資料庫結構

### 使用者 (users)
- `id`: 唯一識別碼
- `name`: 姓名
- `title`: 職稱
- `description`: 描述
- `experience`: 經驗年數
- `skills`: 技能陣列
- `email`: 電子郵件
- `avatar`: 頭像 URL

### 部落格文章 (blog_posts)
- `id`: 唯一識別碼
- `title`: 標題
- `content`: 內容 (Text)
- `excerpt`: 摘要
- `tags`: 標籤陣列
- `publishedAt`: 發布時間
- `readTime`: 閱讀時間
- `featured`: 是否精選
- `authorId`: 作者 ID (外鍵)

### 專案 (projects)
- `id`: 唯一識別碼
- `title`: 標題
- `description`: 描述
- `technologies`: 技術棧陣列
- `imageUrl`: 圖片 URL
- `githubUrl`: GitHub 連結
- `liveUrl`: 線上連結
- `featured`: 是否精選
- `authorId`: 作者 ID (外鍵)

## 🔧 開發特色

- 🏗️ **Monorepo 架構**: 統一管理前後端
- 🐳 **Docker 容器化**: 一致的開發環境
- 🎨 **現代化設計**: 響應式 UI 設計
- 🔧 **TypeScript**: 完整的類型安全
- 🎯 **自定義 Hooks**: 使用 ahooks 優化開發
- 🗂️ **路徑映射**: 簡化的 import 路徑
- ⚡ **快速開發**: Vite 熱重載
- 🗄️ **資料庫整合**: PostgreSQL + Prisma
- 📝 **部落格系統**: 完整的文章管理
- 🎯 **專案展示**: 作品集管理

## 🚀 部署

### 生產環境
```bash
# 使用生產環境配置
docker-compose -f docker-compose.prod.yml up -d

# 或使用環境變數
NODE_ENV=production docker-compose up -d
```

### 備份資料庫
```bash
# 備份
docker exec darren_portfolio_db pg_dump -U darren darren_portfolio > backup.sql

# 恢復
docker exec -i darren_portfolio_db psql -U darren darren_portfolio < backup.sql
```

## 📚 相關文件

- [資料庫設置指南](./DATABASE_SETUP.md) - 詳細的資料庫配置說明
- [API 文檔](./backend/README.md) - 後端 API 說明
- [前端組件文檔](./frontend/README.md) - 前端組件說明

## 🐛 故障排除

### 常見問題

1. **容器無法啟動**
   ```bash
   # 檢查端口是否被佔用
   lsof -i :3001
   lsof -i :5173
   
   # 重新建置容器
   docker-compose down
   docker-compose up -d --build
   ```

2. **資料庫連接失敗**
   ```bash
   # 檢查資料庫狀態
   docker-compose logs postgres
   
   # 重新初始化資料庫
   docker-compose down -v
   docker-compose up -d
   ```

3. **Prisma 錯誤**
   ```bash
   # 重新生成 Prisma Client
   docker exec -it darren_portfolio_backend npx prisma generate
   
   # 重置資料庫
   docker exec -it darren_portfolio_backend npx prisma migrate reset
   ```

## 🔄 更新日誌

### v1.0.0 (2024-06-21)
- ✅ 建立 Monorepo 結構
- ✅ 實作 React + TypeScript 前端
- ✅ 建立 Node.js + Express 後端
- ✅ 整合 PostgreSQL + Prisma
- ✅ 實作 Docker 容器化
- ✅ 建立部落格系統
- ✅ 建立專案展示功能

## 未來規劃

- [ ] 實作用戶認證 (JWT)
- [ ] 添加管理後台
- [ ] 實作評論系統
- [ ] 添加搜尋功能
- [ ] 實作圖片上傳
- [ ] 添加 SEO 優化
- [ ] 實作 CDN 整合
- [ ] 添加監控和日誌
- [ ] 實作 CI/CD 流程

## 聯絡資訊

- GitHub: [你的 GitHub]
- LinkedIn: [你的 LinkedIn]
- Email: darren@example.com

---

© 2024 Darren's Portfolio. Built with ❤️ using React + TypeScript + Node.js + PostgreSQL + Docker 