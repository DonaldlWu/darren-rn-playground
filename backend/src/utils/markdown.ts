import matter from 'gray-matter';

/**
 * 解析 Markdown 檔案內容
 * @param content Markdown 內容
 * @returns 解析後的 front matter 和內容
 */
export function parseMarkdownFile(content: string) {
  const { data: frontMatter, content: markdownContent } = matter(content);
  return { frontMatter, content: markdownContent };
}

/**
 * 計算閱讀時間（以分鐘為單位）
 * @param content 文章內容
 * @returns 閱讀時間（分鐘）
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * 從內容中提取摘要
 * @param content 文章內容
 * @param maxLength 最大長度
 * @returns 摘要
 */
export function extractExcerpt(content: string, maxLength: number = 200): string {
  // 移除 Markdown 標記
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // 移除標題
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗體
    .replace(/\*(.*?)\*/g, '$1') // 移除斜體
    .replace(/`(.*?)`/g, '$1') // 移除行內程式碼
    .replace(/```[\s\S]*?```/g, '') // 移除程式碼區塊
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除連結
    .replace(/\n+/g, ' ') // 將換行替換為空格
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).replace(/\s+\w*$/, '') + '...';
} 