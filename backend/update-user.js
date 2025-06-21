const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateUser() {
  try {
    console.log('更新使用者資料...');
    
    const updatedUser = await prisma.user.update({
      where: { id: 1 },
      data: {
        backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        aboutMe: `我是一名充滿熱情的全端開發者，專注於創建高品質的Web應用程式。從Rails到React，我一直在學習和適應最新的技術趨勢。

目前正在探索現代化的前端開發技術，包括TypeScript、React Hooks和各種實用的開發工具。我相信技術的價值在於解決實際問題，因此我注重實用性和用戶體驗。

在過去的5年中，我參與了多個大型專案的開發，從電商平台到企業級應用程式，積累了豐富的實戰經驗。我熱愛學習新技術，也樂於分享知識，希望能為開源社群貢獻一份力量。`,
        githubUrl: 'https://github.com/darrenwu',
        linkedinUrl: 'https://linkedin.com/in/darrenwu',
        websiteUrl: 'https://darrenwu.dev',
        location: 'Taipei, Taiwan'
      }
    });
    
    console.log('使用者資料已更新:', updatedUser.name);
    console.log('背景圖:', updatedUser.backgroundImage);
    console.log('GitHub:', updatedUser.githubUrl);
    console.log('LinkedIn:', updatedUser.linkedinUrl);
    console.log('Website:', updatedUser.websiteUrl);
    console.log('Location:', updatedUser.location);
    
  } catch (error) {
    console.error('更新使用者資料時發生錯誤:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateUser(); 