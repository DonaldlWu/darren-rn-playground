import { Router } from 'express';
import { getAllProjects, getFeaturedProjects } from '../controllers/projectController';

const router = Router();

// GET /api/v1/projects - 取得所有專案
router.get('/', getAllProjects);

// GET /api/v1/projects/featured - 取得精選專案
router.get('/featured', getFeaturedProjects);

export default router; 