import { Router } from 'express';
import {
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getFeaturedPosts,
  getTags,
  uploadBlogPost,
  getBlogPostBySlug
} from '../controllers/blogController';
import { requireApiKey } from '../middleware/auth';
import upload from '../middleware/upload';

const router = Router();

// GET /api/v1/blog - 取得所有文章（支援分頁、搜尋、標籤篩選）
router.get('/', getAllBlogPosts);

// GET /api/v1/blog/featured - 取得精選文章
router.get('/featured', getFeaturedPosts);

// GET /api/v1/blog/tags - 取得所有標籤
router.get('/tags', getTags);

// GET /api/v1/blog/post/:slug - 根據 slug 取得單篇文章
router.get('/post/:slug', getBlogPostBySlug);

// GET /api/v1/blog/:id - 取得單篇文章（根據 ID）
router.get('/:id', getBlogPost);

// POST /api/v1/blog - 建立新文章
router.post('/', createBlogPost);

// POST /api/v1/blog/upload - 上傳 Markdown 檔案（需要 API Key）
router.post('/upload', requireApiKey, upload.single('file'), uploadBlogPost);

// PUT /api/v1/blog/:id - 更新文章
router.put('/:id', updateBlogPost);

// DELETE /api/v1/blog/:id - 刪除文章
router.delete('/:id', deleteBlogPost);

export default router; 