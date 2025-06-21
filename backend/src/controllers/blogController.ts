import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UploadRequest } from '@/types';
import { sendSuccess, sendNotFound, sendBadRequest } from '@/utils/response';
import { generateSlug } from '@/utils/slug';
import { parseMarkdownFile, calculateReadTime, extractExcerpt } from '@/utils/markdown';

const prisma = new PrismaClient();

export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', tag, search } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    
    // 從資料庫查詢文章
    let whereClause: any = {
      status: 'published'
    };
    
    // 標籤篩選
    if (tag) {
      whereClause.tags = {
        has: tag as string
      };
    }
    
    // 搜尋功能
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      whereClause.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { excerpt: { contains: searchTerm, mode: 'insensitive' } },
        { content: { contains: searchTerm, mode: 'insensitive' } }
      ];
    }
    
    // 查詢總數
    const totalPosts = await prisma.blogPost.count({ where: whereClause });
    
    // 分頁查詢
    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      }
    });
    
    const response = {
      posts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalPosts / limitNum),
        totalPosts,
        hasNext: (pageNum * limitNum) < totalPosts,
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
    
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      }
    });
    
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
    
    // 生成 slug
    const slug = generateSlug(title);
    
    // 檢查 slug 是否已存在
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });
    
    if (existingPost) {
      sendBadRequest(res, 'A post with this title already exists');
      return;
    }
    
    // 計算閱讀時間
    const readTime = Math.ceil(content.split(' ').length / 200);
    
    // 儲存到資料庫
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        tags: tags || [],
        slug,
        status: 'draft',
        featured: false,
        readTime,
        authorId: 1
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      }
    });
    
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
    
    // 檢查文章是否存在
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      sendNotFound(res, 'Blog post not found');
      return;
    }
    
    // 更新文章
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      }
    });
    
    sendSuccess(res, updatedPost, 'Blog post updated successfully');
  } catch (error) {
    console.error('Error updating blog post:', error);
    sendBadRequest(res, 'Failed to update blog post');
  }
};

export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // 檢查文章是否存在
    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      sendNotFound(res, 'Blog post not found');
      return;
    }
    
    // 刪除文章
    await prisma.blogPost.delete({
      where: { id }
    });
    
    sendSuccess(res, null, 'Blog post deleted successfully');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    sendBadRequest(res, 'Failed to delete blog post');
  }
};

export const getFeaturedPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const featuredPosts = await prisma.blogPost.findMany({
      where: {
        featured: true,
        status: 'published'
      },
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      }
    });
    
    sendSuccess(res, featuredPosts, 'Featured posts retrieved successfully');
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    sendBadRequest(res, 'Failed to fetch featured posts');
  }
};

export const getTags = async (req: Request, res: Response): Promise<void> => {
  try {
    // 從資料庫中查詢所有已發布文章的標籤
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { tags: true }
    });
    
    // 提取所有標籤並去重
    const allTags = posts.reduce((tags: string[], post: { tags: string[] }) => {
      return [...tags, ...post.tags];
    }, []);
    
    // 去重並排序
    const uniqueTags = [...new Set(allTags)].sort();
    
    sendSuccess(res, uniqueTags, 'Tags retrieved successfully');
  } catch (error) {
    console.error('Error fetching tags:', error);
    sendBadRequest(res, 'Failed to fetch tags');
  }
};

/**
 * 上傳 Markdown 檔案並創建部落格文章
 */
export const uploadBlogPost = async (req: UploadRequest, res: Response): Promise<void> => {
  try {
    const file = req.file;
    
    if (!file) {
      sendBadRequest(res, 'No file uploaded');
      return;
    }

    // 解析表單資料
    const { title, excerpt, tags, featured, status } = req.body;
    
    // 解析 Markdown 檔案內容
    const fileContent = file.buffer.toString();
    const { frontMatter, content } = parseMarkdownFile(fileContent);
    
    console.log('Front matter:', frontMatter);
    console.log('Tags from form:', tags);
    console.log('Tags from front matter:', frontMatter.tags);
    
    // 合併 front matter 和表單資料
    const finalTitle = title || frontMatter.title || 'Untitled';
    const finalExcerpt = excerpt || frontMatter.excerpt || extractExcerpt(content);
    
    // 處理標籤：確保是陣列格式
    let finalTags: string[] = [];
    if (tags) {
      finalTags = Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim());
    } else if (frontMatter.tags) {
      finalTags = Array.isArray(frontMatter.tags) ? frontMatter.tags : frontMatter.tags.split(',').map((t: string) => t.trim());
    }
    
    console.log('Final tags:', finalTags);
    
    const finalFeatured = featured === 'true' || frontMatter.featured || false;
    const finalStatus = status || frontMatter.status || 'draft';
    
    // 生成 slug
    const slug = generateSlug(finalTitle);
    
    // 計算閱讀時間
    const readTime = calculateReadTime(content);
    
    // 檢查 slug 是否已存在
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });
    
    if (existingPost) {
      sendBadRequest(res, 'A post with this title already exists');
      return;
    }
    
    // 儲存到資料庫
    const blogPost = await prisma.blogPost.create({
      data: {
        title: finalTitle,
        content,
        excerpt: finalExcerpt,
        tags: finalTags,
        slug,
        status: finalStatus,
        featured: finalFeatured,
        readTime,
        originalFileName: file.originalname,
        authorId: 1, // 固定為你的 user id
        publishedAt: finalStatus === 'published' ? new Date().toISOString() : null
      }
    });
    
    sendSuccess(res, blogPost, 'Blog post uploaded successfully');
  } catch (error) {
    console.error('Error uploading blog post:', error);
    sendBadRequest(res, 'Failed to upload blog post');
  }
};

/**
 * 根據 slug 獲取部落格文章
 */
export const getBlogPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            avatar: true
          }
        }
      }
    });
    
    if (!blogPost) {
      sendNotFound(res, 'Blog post not found');
      return;
    }
    
    sendSuccess(res, blogPost, 'Blog post retrieved successfully');
  } catch (error) {
    console.error('Error fetching blog post:', error);
    sendNotFound(res, 'Blog post not found');
  }
}; 