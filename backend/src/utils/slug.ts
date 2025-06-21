/**
 * 生成 URL 友善的 slug
 * @param title 標題
 * @returns slug
 */
export function generateSlug(title: string): string {
  // 先嘗試生成英文 slug
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  // 如果 slug 為空（例如全是中文字符），使用時間戳作為後綴
  if (!slug) {
    const timestamp = Date.now().toString(36); // 使用 base36 編碼
    slug = `post-${timestamp}`;
  }
  
  return slug;
} 