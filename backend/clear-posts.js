const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearPosts() {
  try {
    console.log('正在清空部落格文章...');
    
    const deletedPosts = await prisma.blogPost.deleteMany({});
    
    console.log(`成功刪除 ${deletedPosts.count} 篇文章`);
    
    // 重置自增 ID
    await prisma.$executeRaw`ALTER SEQUENCE "BlogPost_id_seq" RESTART WITH 1`;
    
    console.log('文章 ID 序列已重置');
    
  } catch (error) {
    console.error('清空文章時發生錯誤:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearPosts(); 