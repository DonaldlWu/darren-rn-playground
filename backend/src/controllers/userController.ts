import { Request, Response } from 'express';
import { User } from '@/types';
import { sendSuccess, sendNotFound } from '@/utils/response';

// Mock data - 之後可以替換為資料庫
const mockUser: User = {
  id: '1',
  name: 'Darren Wu',
  title: 'Full Stack Developer',
  description: 'Passionate full-stack developer with expertise in modern web technologies. From Rails to React, I love creating high-quality web applications and continuously learning new technologies.',
  experience: 5,
  skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Ruby on Rails', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
  email: 'darren@example.com',
  avatar: 'https://via.placeholder.com/150'
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    sendSuccess(res, mockUser, 'User data retrieved successfully');
  } catch (error) {
    console.error('Error fetching user:', error);
    sendNotFound(res, 'User not found');
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (id !== mockUser.id) {
      sendNotFound(res, 'User not found');
      return;
    }
    
    const updatedUser: User = {
      ...mockUser,
      ...updateData,
      id: mockUser.id // 確保 ID 不被覆蓋
    };
    
    sendSuccess(res, updatedUser, 'User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    sendNotFound(res, 'Failed to update user');
  }
}; 