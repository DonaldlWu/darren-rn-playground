# 使用 Node.js 18 Alpine 映像檔
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 安裝系統依賴
RUN apk add --no-cache libc6-compat

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci && npm cache clean --force

# 複製源碼
COPY . .

# 暴露端口
EXPOSE 5173

# 啟動開發服務器
CMD ["npx", "vite", "--host", "0.0.0.0"] 