# Darren Portfolio Backend

現代化的 Node.js + Express + TypeScript 後端 API

## 🚀 技術棧

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Development**: Nodemon, ts-node

## 📁 專案結構

```
src/
├── controllers/     # 控制器層
├── routes/         # 路由層
├── middleware/     # 中間件
├── utils/          # 工具函數
├── types/          # TypeScript 類型定義
└── index.ts        # 應用程式入口
```

## 🛠️ 安裝與執行

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 建置專案
```bash
npm run build
```

### 生產模式
```bash
npm start
```

## 📡 API 端點

### 健康檢查
- `GET /health` - 伺服器狀態檢查

### 使用者 API
- `GET /api/v1/users/:id` - 取得使用者資訊
- `PUT /api/v1/users/:id` - 更新使用者資訊

## 🔧 環境變數

建立 `.env` 檔案：

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# API Configuration
API_PREFIX=/api/v1
```

## 📊 API 回應格式

### 成功回應
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

### 錯誤回應
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔒 安全性

- **Helmet**: 設定安全標頭
- **CORS**: 跨域請求控制
- **Input Validation**: 輸入驗證（待實作）
- **Rate Limiting**: 速率限制（待實作）

## 🚧 待實作功能

- [ ] 資料庫整合 (PostgreSQL/MongoDB)
- [ ] 身份驗證 (JWT)
- [ ] 輸入驗證 (Joi/Zod)
- [ ] 速率限制
- [ ] 檔案上傳
- [ ] 專案管理 API
- [ ] 部落格 API
- [ ] 單元測試
- [ ] API 文件 (Swagger) 