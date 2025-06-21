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

# 複製 Prisma schema
COPY prisma ./prisma/

# 生成 Prisma client
RUN npx prisma generate

# 複製源碼
COPY . .

# 編譯 TypeScript
RUN npm run build

# 暴露端口
EXPOSE 3001

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/v1/health || exit 1

# 啟動應用
CMD ["npm", "start"] 