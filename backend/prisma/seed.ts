import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 生成 slug 的函數
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  console.log('開始初始化資料庫...');

  // 創建使用者
  const user = await prisma.user.upsert({
    where: { email: 'deirenwu1101@gmail.com' },
    update: {},
    create: {
      name: 'Darren Wu',
      title: 'Senior iOS Developer',
      description: '走偏的 iOS 工程師',
      experience: 7,
      workFrom: 2017,
      skills: ['swift', 'iOS', 'Xcode', 'React Native'],
      email: 'deirenwu1101@gmail.com',
      avatar: 'https://github.com/user-attachments/assets/dec8d173-3d06-4953-8eb3-b3695d9acb46',
      backgroundImage: 'https://github.com/user-attachments/assets/279945e4-4c55-4b5e-8284-78bccd678885',
      aboutMe: '從 iOS 開始探索軟體開發世界，慢慢接觸不同的開發技術。',
      githubUrl: 'https://github.com/DonaldlWu',
      linkedinUrl: 'https://www.linkedin.com/in/%E5%BE%97%E4%BA%BA-%E5%90%B3-43171a11b/',
      websiteUrl: 'https://pose-coach.com/about',
      location: 'Taipei, Taiwan'
    },
  });

  console.log('使用者已創建:', user.name);

  // 創建專案
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'project-1' },
      update: {},
      create: {
        id: 'project-1',
        title: '個人作品集網站',
        description: '使用 React + TypeScript + Ant Design 建立的現代化個人作品集網站',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Vite'],
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        githubUrl: 'https://github.com/darren/portfolio',
        liveUrl: 'https://darren-portfolio.com',
        featured: true,
        authorId: user.id
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-2' },
      update: {},
      create: {
        id: 'project-2',
        title: '電商平台',
        description: '全端電商平台，包含用戶管理、商品管理、訂單處理等功能',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        githubUrl: 'https://github.com/darren/ecommerce',
        liveUrl: 'https://ecommerce-demo.com',
        featured: true,
        authorId: user.id
      },
    }),
  ]);

  console.log('專案已創建:', projects.length, '個');

  // 注意：部落格文章現在通過 Markdown 檔案上傳功能來創建
  // 這裡不再創建預設的部落格文章，因為實際的文章會通過 API 上傳
  console.log('部落格文章將通過 Markdown 檔案上傳功能創建');

  console.log('資料庫初始化完成！');
}

main()
  .catch((e) => {
    console.error('初始化失敗:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 