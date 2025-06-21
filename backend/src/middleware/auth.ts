import { Request, Response, NextFunction } from 'express';

/**
 * API Key 認證中間件
 */
export const requireApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.BLOG_API_KEY;
  
  if (!validApiKey) {
    console.warn('BLOG_API_KEY 環境變數未設定');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }
  
  if (!apiKey || apiKey !== validApiKey) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  
  next();
}; 