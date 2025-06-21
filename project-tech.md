---
title: 本專案技術選型與工具說明
excerpt: 條列本專案前後端、資料庫、DevOps等技術選型與用途
featured: true
tags: React,TypeScript,Node.js,Prisma,Docker,AntDesign
status: published
---

# 本專案技術選型與工具說明

本專案採用現代全端開發技術棧，強調開發效率、型別安全、可維護性與部署彈性。以下列出主要工具及其用途：

## 前端

- **React**  
  主流 UI 框架，組件化開發，生態成熟。
- **TypeScript**  
  靜態型別，提升大型專案可維護性與開發體驗。
- **Vite**  
  新世代前端建構工具，極速啟動與熱更新，適合現代 React 專案。
- **Ant Design**  
  企業級 UI 元件庫，設計一致性高，開發效率佳。
- **ahooks**  
  高效 React hooks 工具集，簡化資料請求、狀態管理等常見場景。
- **react-markdown**  
  Markdown 轉 React 元件，支援技術文章渲染。

## 後端

- **Node.js + Express**  
  輕量級 Web 框架，API 設計彈性高，與前端 JS/TS 技術棧一致。
- **TypeScript**  
  型別安全，降低 run-time bug，提升團隊協作效率。
- **Prisma ORM**  
  型別自動生成，查詢語法現代化，支援 DB schema migration。
- **PostgreSQL**  
  開源關聯式資料庫，ACID 支援佳，社群活躍。
- **Multer**  
  處理 multipart/form-data，支援檔案（如 Markdown）上傳。
- **gray-matter**  
  解析 Markdown 檔案 front-matter，方便文章 metadata 管理。
- **marked**  
  Markdown 轉 HTML，配合 gray-matter 處理文章內容。

## DevOps

- **Docker & Docker Compose**  
  前後端、資料庫皆容器化，確保環境一致性，方便本地/雲端部署。
- **多階段 Dockerfile**  
  精簡映像檔大小，分離建構與執行階段。

## 其他

- **API Key 驗證**  
  保護後台敏感 API（如文章上傳）。
- **自動產生 slug、閱讀時間、標籤**  
  提升 SEO 與使用者體驗。

---

本專案技術選型以現代化、可維護、易於擴展為核心，適合個人網站、部落格與作品集等應用場景。

本專案持續優化中，歡迎交流指教！ 
