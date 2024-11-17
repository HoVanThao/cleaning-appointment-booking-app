import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

// Cấu hình lưu trữ bộ nhớ
const storage = multer.memoryStorage();

// Cấu hình multer để nhận tối đa 5 file
const upload = multer({ 
  storage,
  limits: { files: 5 }, // Giới hạn số lượng file
});

export default upload;
