import multer from 'multer';

/**
 * Markdown 檔案上傳中間件
 */
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // 檢查檔案類型
    if (file.mimetype === 'text/markdown' || 
        file.mimetype === 'text/plain' ||
        file.originalname.endsWith('.md')) {
      cb(null, true);
    } else {
      cb(new Error('只接受 Markdown 檔案 (.md)'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export default upload; 