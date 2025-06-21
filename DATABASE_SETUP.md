# 資料庫設置指南

## 概述

本專案使用 PostgreSQL + Prisma 作為資料庫解決方案，支援 Docker 部署。

## 技術棧

- **資料庫**: PostgreSQL 15
- **ORM**: Prisma
- **容器化**: Docker & Docker Compose
- **後端**: Node.js 18 + Express + TypeScript

## 快速開始

### 1. 使用 Docker (推薦)

#### 啟動所有服務
```bash
# 在專案根目錄執行
docker-compose up -d
```

#### 初始化資料庫
```bash
# 進入後端容器
docker exec -it darren_portfolio_backend sh

# 執行資料庫遷移
npx prisma migrate dev

# 初始化測試資料
npm run db:seed
```

#### 查看服務狀態
```bash
# 查看所有容器狀態
docker-compose ps

# 查看日誌
docker-compose logs -f
```

### 2. 本地開發

#### 安裝 PostgreSQL
```bash
# macOS (使用 Homebrew)
brew install postgresql
brew services start postgresql

# 創建資料庫
createdb darren_portfolio
```

#### 設置環境變數
```bash
# 複製環境變數範例
cp backend/.env.example backend/.env

# 編輯 .env 檔案
DATABASE_URL="postgresql://darren:password123@localhost:5432/darren_portfolio"
```

#### 初始化資料庫
```bash
cd backend

# 安裝依賴
npm install

# 生成 Prisma client
npm run db:generate

# 執行遷移
npm run db:migrate

# 初始化測試資料
npm run db:seed
```

## 資料庫管理

### Prisma Studio
```bash
# 啟動 Prisma Studio (圖形化資料庫管理工具)
npm run db:studio
```

### 常用命令
```bash
# 生成 Prisma client
npm run db:generate

# 推送 schema 變更到資料庫
npm run db:push

# 創建新的遷移
npm run db:migrate

# 部署遷移到生產環境
npm run db:migrate:deploy

# 初始化測試資料
npm run db:seed
```

## 資料庫結構

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

## Docker 部署

### 生產環境配置
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: darren_portfolio_prod
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - darren_network
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/darren_portfolio_prod
    depends_on:
      - postgres
    networks:
      - darren_network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  darren_network:
    driver: bridge
```

### 環境變數
```bash
# .env.production
DB_USER=darren_prod
DB_PASSWORD=secure_password_here
DATABASE_URL=postgresql://darren_prod:secure_password_here@postgres:5432/darren_portfolio_prod
NODE_ENV=production
```

## 備份與恢復

### 備份資料庫
```bash
# 使用 Docker
docker exec darren_portfolio_db pg_dump -U darren darren_portfolio > backup.sql

# 本地 PostgreSQL
pg_dump -U darren darren_portfolio > backup.sql
```

### 恢復資料庫
```bash
# 使用 Docker
docker exec -i darren_portfolio_db psql -U darren darren_portfolio < backup.sql

# 本地 PostgreSQL
psql -U darren darren_portfolio < backup.sql
```

## 故障排除

### 常見問題

1. **連接資料庫失敗**
   - 檢查 DATABASE_URL 是否正確
   - 確認 PostgreSQL 服務是否運行
   - 檢查防火牆設定

2. **Prisma 遷移失敗**
   - 檢查資料庫權限
   - 確認 schema 語法正確
   - 查看詳細錯誤訊息

3. **Docker 容器無法啟動**
   - 檢查端口是否被佔用
   - 確認 Docker 服務運行
   - 查看容器日誌

### 重置資料庫
```bash
# 刪除所有資料
docker-compose down -v
docker-compose up -d
npm run db:migrate
npm run db:seed
```

## 效能優化

### 資料庫索引
```sql
-- 為常用查詢添加索引
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);
```

### 連接池配置
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

## 監控與日誌

### 資料庫監控
```bash
# 查看資料庫狀態
docker exec darren_portfolio_db psql -U darren -c "SELECT version();"

# 查看連接數
docker exec darren_portfolio_db psql -U darren -c "SELECT count(*) FROM pg_stat_activity;"
```

### 應用日誌
```bash
# 查看後端日誌
docker-compose logs -f backend

# 查看資料庫日誌
docker-compose logs -f postgres
``` 