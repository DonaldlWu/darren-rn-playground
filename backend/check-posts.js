const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkPosts() {
  try {
    console.log('檢查資料庫中的文章...');
    
    const posts = await prisma.blogPost.findMany();
    
    console.log(`資料庫中共有 ${posts.length} 篇文章:`);
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ID: ${post.id}, 標題: ${post.title}, 創建時間: ${post.createdAt}`);
    });
    
  } catch (error) {
    console.error('檢查文章時發生錯誤:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPosts(); 