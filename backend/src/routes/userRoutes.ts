import { Router } from 'express';
import { getUser, updateUser } from '@/controllers/userController';

const router = Router();

// GET /api/v1/users/:id
router.get('/:id', getUser);

// PUT /api/v1/users/:id
router.put('/:id', updateUser);

export default router; 