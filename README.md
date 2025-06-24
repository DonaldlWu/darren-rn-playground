# Darren's Personal Website

一個使用現代化技術棧建立的個人網站，包含前端、後端和資料庫。

## 🐳 Docker 相關操作指令

### 啟動所有服務
```bash
# 在專案根目錄執行
docker-compose up -d
```

### 停止所有服務
```bash
docker-compose down
```

### 重新建置並啟動
```bash
docker-compose up -d --build
```

### 查看服務日誌
```bash
# 查看所有服務日誌
docker-compose logs -f

# 查看特定服務日誌
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 進入容器
```bash
# 進入後端容器
docker exec -it darren_portfolio_backend sh

# 進入前端容器
docker exec -it darren_portfolio_frontend sh
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
```

### 重啟特定服務
```bash
docker-compose restart backend
docker-compose restart frontend
```

## 🌐 部署

### 部署架構
- **前端**: Firebase Hosting
- **後端**: Google Cloud Run
- **資料庫**: Google Cloud SQL (PostgreSQL)

### 部署方式
```bash
# 使用自動化部署腳本
./scripts/deploy-gcp.sh

# 或手動部署
# 1. 部署後端到 Cloud Run
# 2. 部署前端到 Firebase Hosting
```

### 環境變數
部署時需要設定以下環境變數：
- `DATABASE_URL`: 資料庫連接字串
- `BLOG_API_KEY`: 部落格 API 金鑰
- `CORS_ORIGIN`: 允許的跨域來源

### 資料庫連接
```bash
# 使用 Cloud SQL Proxy 連接本地開發
cloud_sql_proxy -instances=[PROJECT_ID]:[REGION]:[INSTANCE_NAME]=tcp:5432

# 在 Cloud Shell 中連接
gcloud sql connect [INSTANCE_NAME] --user=[USERNAME] --database=[DATABASE_NAME]
```

### 資料庫初始化
```bash
# 在 Cloud Shell 中執行
cd backend
npm install
npx prisma migrate deploy
npm run db:seed
```

## 📝 上傳文章操作教學

### 功能概述
支援直接上傳 Markdown 檔案來創建部落格文章，系統會自動：
- 解析 Markdown 檔案的 front matter
- 生成 URL 友善的 slug
- 計算閱讀時間
- 提取文章摘要
- 處理標籤和狀態

### 檔案格式

#### Front Matter 支援
```yaml
---
title: 文章標題
excerpt: 文章摘要
tags: 標籤1,標籤2,標籤3
featured: true
status: published  # draft, published, archived
---
```

#### Markdown 內容
支援完整的 Markdown 語法：
- 標題 (H1-H6)
- 粗體、斜體
- 程式碼區塊
- 連結和圖片
- 列表和表格

### API 使用方式

#### 1. 上傳 Markdown 檔案
```bash
curl -X POST http://localhost:3001/api/v1/blog/upload \
  -H "x-api-key: your-custom-api-key-here" \
  -F "file=@your-article.md"
```

#### 2. 可選的表單參數
```bash
curl -X POST http://localhost:3001/api/v1/blog/upload \
  -H "x-api-key: your-custom-api-key-here" \
  -F "file=@your-article.md" \
  -F "title=自定義標題" \
  -F "excerpt=自定義摘要" \
  -F "tags=標籤1,標籤2" \
  -F "featured=true" \
  -F "status=published"
```

#### 3. 根據 slug 獲取文章
```bash
curl http://localhost:3001/api/v1/blog/post/{slug}
```

### 範例檔案
```markdown
---
title: 我的第一篇技術文章
excerpt: 分享我的技術學習心得
tags: 技術,學習,心得
featured: true
status: published
---

# 我的第一篇技術文章

這是文章的內容...

## 小標題

更多內容...
```

### 測試檔案上傳
```bash
# 創建測試檔案
echo '---
title: 測試文章
excerpt: 測試摘要
tags: 測試
status: published
---

# 測試內容
這是測試內容。
' > test.md

# 上傳測試
curl -X POST http://localhost:3001/api/v1/blog/upload \
  -H "x-api-key: your-custom-api-key-here" \
  -F "file=@test.md"
```

### 查看上傳的文章
```bash
# 查看所有文章
curl http://localhost:3001/api/v1/blog

# 查看精選文章
curl http://localhost:3001/api/v1/blog/featured

# 查看標籤
curl http://localhost:3001/api/v1/blog/tags
```

## 👤 Profile API 操作教學

### 獲取用戶資料
```bash
# 獲取所有用戶資料
curl http://localhost:3001/api/v1/users

# 獲取特定用戶資料
curl http://localhost:3001/api/v1/users/1
```

### 更新用戶資料
```bash
curl -X PUT http://localhost:3001/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "吳得人",
    "title": "Full Stack Developer",
    "description": "熱愛技術的全端開發者",
    "experience": 5,
    "skills": ["React", "Node.js", "TypeScript", "PostgreSQL"],
    "email": "deirenwu1101@gmail.com",
    "avatar": "https://example.com/avatar.jpg",
    "workFrom": 2020
  }'
```

### 更新用戶個人資料
```bash
curl -X PUT http://localhost:3001/api/v1/users/1/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "name",
    "title": "Full Stack Developer",
    "description": "熱愛技術的全端開發者",
    "experience": 5,
    "skills": ["React", "Node.js", "TypeScript", "PostgreSQL"],
    "email": "deirenwu1101@gmail.com",
    "avatar": "https://example.com/avatar.jpg",
    "workFrom": 2020
  }'
```

### 獲取專案資料
```bash
# 獲取所有專案
curl http://localhost:3001/api/v1/projects

# 獲取精選專案
curl http://localhost:3001/api/v1/projects/featured
```

## 📚 相關文件

- [資料庫設置指南](./DATABASE_SETUP.md) - 詳細的資料庫配置說明
- [部落格功能說明](./BLOG_FEATURES.md) - 部落格系統功能詳解
- [專案技術文檔](./project-tech.md) - 技術架構說明
- [後端 API 文檔](./backend/README.md) - 後端 API 說明
- [前端組件文檔](./frontend/README.md) - 前端組件說明

## 🔧 開發腳本

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

---

© 2025 Darren's RN playground. Built with ❤️ using React + TypeScript + Node.js + PostgreSQL + Docker 